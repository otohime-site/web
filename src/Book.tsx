import { parsePlayer, parseScores } from "@otohime-site/parser/dx_intl"
import { ScoresParseEntry } from "@otohime-site/parser/dx_intl/scores"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useState } from "react"
import { useQuery, useClient } from "urql"
import { QueryResult } from "./QueryResult"
import { Alert } from "./components/Alert"
import { Dialog } from "./components/Dialog"
import PlayerListItemNew from "./dx_intl/PlayerListItemNew"
import {
  DxIntlPlayersDocument,
  DxIntlSongsRefMapCountDocument,
  InsertDxIntlRecordWithScoresDocument,
} from "./generated/graphql"
import host from "./host"

const DIFFICULTIES = [0, 1, 2, 3, 4]

const parsedPlayer = (() => {
  try {
    return parsePlayer(document)
  } catch {
    return undefined
  }
})()

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
const sha256Sum = async (text: string): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  )
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

const Book = () => {
  const [open, setOpen] = useState(true)
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(
    undefined
  )
  const [dxIntlPlayersResult] = useQuery({ query: DxIntlPlayersDocument })
  const [refMapCountResult] = useQuery({
    query: DxIntlSongsRefMapCountDocument,
  })
  const client = useClient()
  const [fetchState, setFetchState] = useState<
    "idle" | "fetching" | "error" | "done"
  >("idle")
  const [fetchProgress, setFetchProgress] = useState(0)
  const mayFailWithMap =
    (refMapCountResult.data?.dx_intl_songs ?? []).length === 1
  const handleFetch = async (): Promise<void> => {
    const player = (dxIntlPlayersResult.data?.dx_intl_players ?? []).find(
      (p) => p.id === selectedPlayerId
    )
    if (player == null) {
      return
    }
    if (
      player.dx_intl_record?.card_name !== parsedPlayer?.card_name &&
      !confirm("卡名似乎不一致。仍然確定要更新？")
    ) {
      return
    }
    setFetchState("fetching")
    const entries = await DIFFICULTIES.reduce<Promise<ScoresParseEntry[]>>(
      async (prevPromise, _, difficulty) => {
        const prev = await prevPromise
        const resp = await fetch(
          `/maimai-mobile/record/musicGenre/search/?genre=99&diff=${difficulty}`
        )
        if (!resp.ok) {
          throw new Error("Network Error!")
        }
        const result = parseScores(await resp.text())
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setFetchProgress(difficulty + 1)
        return [...prev, ...result]
      },
      Promise.resolve([])
    )
    const scores = await Promise.all(
      entries.map(async (entry) => {
        const { category, title, level, ...entryWithoutSong } = entry
        return {
          song_id: await sha256Sum(`${category}_${title}`),
          ...entryWithoutSong,
        }
      })
    )

    const mutation = await client
      .mutation(InsertDxIntlRecordWithScoresDocument, {
        record: {
          player_id: selectedPlayerId,
          max_rating: -1,
          ...parsedPlayer,
        },
        scores: scores.map((score) => ({
          player_id: selectedPlayerId,
          ...score,
        })),
      })
      .toPromise()
    if (mutation.error != null) {
      throw new Error("Mutation error")
    }
    setFetchState("done")
  }

  const handleFetchWithCatch = async (): Promise<void> => {
    try {
      await handleFetch()
    } catch (e) {
      console.error(e)
      setFetchState("error")
    }
  }

  const handleClose = (): void => {
    setOpen(false)
    window.location.href = "/"
  }
  const players = dxIntlPlayersResult.data?.dx_intl_players
  if (document.location.pathname !== "/maimai-mobile/home/") {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <Alert severity="info">
          您必須先回到官方成績單首頁。按一下「OK」帶你去！
        </Alert>
        <div>
          <button onClick={handleClose}>OK</button>
        </div>
      </Dialog>
    )
  }
  if (parsedPlayer === undefined) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <Alert severity="error">
          無法擷取玩家資料，請重試一次。如果問題持續請聯絡 Otohime 開發團隊。
        </Alert>
      </Dialog>
    )
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle>更新成績</DialogTitle>
      {mayFailWithMap ? (
        <Alert severity="error">
          由於已知的狀況，系統現在可能無法正常更新成績。
          <br />
          若更新失敗，請十分鐘後再試。這個問題排除時，此訊息會消失。
        </Alert>
      ) : (
        <></>
      )}
      {fetchState === "fetching" ? (
        <div>
          <p>
            {fetchProgress < DIFFICULTIES.length
              ? "擷取成績中..."
              : "正在上傳成績單..."}
          </p>
          <progress
            value={
              fetchProgress < DIFFICULTIES.length
                ? (fetchProgress / DIFFICULTIES.length) * 100
                : undefined
            }
          />
        </div>
      ) : fetchState === "done" ? (
        <div>
          <p>上傳完成！</p>
          <p>您現在可以在 Otohime 網站上檢視你的成績單了。</p>
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://${host}/dxi/p/${
              (players ?? []).find((p) => p.id === selectedPlayerId)
                ?.nickname ?? ""
            }`}
          >
            檢視成績單
          </a>
        </div>
      ) : fetchState === "error" ? (
        <div>
          <Alert severity="error">
            成績擷取或上傳發生錯誤。請稍後再重試一次。
          </Alert>
        </div>
      ) : (
        <QueryResult
          result={dxIntlPlayersResult}
          errorMsg="無法取得玩家資料。可能您的權杖失效了，請到 Otohime 上重新複製新的連結。"
        >
          {players == null || players.length === 0 ? (
            <Alert severity="warning">
              請到 Otohime 網站上
              <a
                target="_blank"
                href={`https://${host}/dxi/p/new`}
                rel="noreferrer"
              >
                新增一個成績單。
              </a>
            </Alert>
          ) : (
            <div>
              <div>請選擇要更新的成績單：</div>
              <div>
                {players.map((player) => (
                  <PlayerListItemNew
                    key={player.id}
                    player={player}
                    selected={selectedPlayerId === player.id}
                    onSelect={setSelectedPlayerId}
                  />
                ))}
              </div>
            </div>
          )}
        </QueryResult>
      )}
      <div>
        <button
          color="primary"
          disabled={fetchState !== "idle" || selectedPlayerId === undefined}
          onClick={handleFetchWithCatch}
        >
          上傳成績
        </button>
        <button disabled={fetchState === "fetching"} onClick={handleClose}>
          關閉
        </button>
      </div>
    </Dialog>
  )
}
export default Book
