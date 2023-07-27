import { parsePlayer, parseScores } from "@otohime-site/parser/dx_intl"
import { ScoresParseEntry } from "@otohime-site/parser/dx_intl/scores"
import { useState } from "react"
import { useClient, useQuery } from "urql"
import { QueryResult } from "../../common/components/QueryResult"
import { Alert } from "../../common/components/ui/Alert"
import { Button } from "../../common/components/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "../../common/components/ui/Dialog"
import { Radio, RadioRoot } from "../../common/components/ui/Radio"
import PlayerItem from "../../dx_intl/components/PlayerItem"
import { dxIntlPlayersFields } from "../../dx_intl/models/fragments"
import { getFragmentData, graphql } from "../../gql"
import host from "../../host"

const DIFFICULTIES = [0, 1, 2, 3, 4]

// Needed as bookmarklet will not know user ID
const dxIntlPlayersDocument = graphql(`
  query dxIntlPlayers {
    dx_intl_players {
      ...dxIntlPlayersFields
    }
  }
`)

const insertDxIntlRecordWithScoresDocument = graphql(`
  mutation InsertDxIntlRecordWithScores(
    $record: dx_intl_records_insert_input!
    $scores: [dx_intl_scores_insert_input!]!
  ) {
    insert_dx_intl_records_one(
      object: $record
      on_conflict: {
        constraint: dx_intl_records_player_id_key
        update_columns: [
          card_name
          title
          trophy
          rating
          rating_legacy
          max_rating
          grade
          course_rank
          class_rank
        ]
      }
    ) {
      __typename
    }
    insert_dx_intl_scores(
      objects: $scores
      on_conflict: {
        constraint: dx_intl_scores_player_id_song_id_deluxe_difficulty_key
        update_columns: [score, combo_flag, sync_flag]
      }
    ) {
      affected_rows
    }
  }
`)

const parsedPlayer = (() => {
  try {
    return parsePlayer(window.parent.document)
  } catch {
    return undefined
  }
})()

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
const sha256Sum = async (text: string): Promise<string> => {
  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  )
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

const Book = () => {
  const [open, setOpen] = useState(true)
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(
    undefined,
  )
  const [dxIntlPlayersResult] = useQuery({ query: dxIntlPlayersDocument })
  const players = getFragmentData(
    dxIntlPlayersFields,
    dxIntlPlayersResult.data?.dx_intl_players ?? [],
  )
  const client = useClient()
  const [fetchState, setFetchState] = useState<
    "idle" | "fetching" | "error" | "done"
  >("idle")
  const [fetchProgress, setFetchProgress] = useState(0)
  const handleFetch = async (): Promise<void> => {
    const player = players.find((p) => p.id === selectedPlayerId)
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
        const resp = await window.parent.fetch(
          `/maimai-mobile/record/musicGenre/search/?genre=99&diff=${difficulty}`,
        )
        if (!resp.ok) {
          throw new Error("Network Error!")
        }
        const result = parseScores(await resp.text())
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setFetchProgress(difficulty + 1)
        return [...prev, ...result]
      },
      Promise.resolve([]),
    )
    const scores = await Promise.all(
      entries.map(async (entry) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { category, title, level, ...entryWithoutSong } = entry
        return {
          song_id: await sha256Sum(`${category}_${title}`),
          ...entryWithoutSong,
        }
      }),
    )

    const mutation = await client
      .mutation(insertDxIntlRecordWithScoresDocument, {
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

  const onOpenChange = (open: boolean): void => {
    setOpen(open)
    if (!open) {
      window.parent.location.href = "/"
    }
  }

  if (window.parent.document.location.pathname !== "/maimai-mobile/home/") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <Alert severity="info">
            您必須先回到官方成績單首頁。按一下「OK」帶你去！
          </Alert>
          <DialogClose asChild>
            <Button color="violet">OK</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    )
  }
  if (parsedPlayer === undefined) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <Alert severity="error">
            無法擷取玩家資料，請重試一次。如果問題持續請聯絡 Otohime 開發團隊。
          </Alert>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>更新成績</DialogTitle>
        {fetchState === "fetching" ? (
          <div>
            <p>
              {fetchProgress < DIFFICULTIES.length
                ? "擷取成績中..."
                : "正在上傳成績單..."}
            </p>
            <progress
              value={
                fetchProgress < DIFFICULTIES.length ? fetchProgress : undefined
              }
              max={DIFFICULTIES.length + 1}
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
                <RadioRoot
                  variant="card"
                  value={selectedPlayerId?.toString()}
                  onValueChange={(val) =>
                    setSelectedPlayerId(parseInt(val, 10))
                  }
                >
                  {players.map((player) => (
                    <Radio key={player.id} value={player.id.toString()}>
                      <PlayerItem player={player} />
                    </Radio>
                  ))}
                </RadioRoot>
              </div>
            )}
          </QueryResult>
        )}
        <div>
          <Button
            color="violet"
            disabled={fetchState !== "idle" || selectedPlayerId === undefined}
            onClick={handleFetchWithCatch}
          >
            上傳成績
          </Button>
          <DialogClose asChild>
            <Button color="violet" disabled={fetchState === "fetching"}>
              關閉
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default Book
