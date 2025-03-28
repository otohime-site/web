import { parsePlayer, parseScores } from "@otohime-site/parser/dx_intl"
import { ScoresParseEntry } from "@otohime-site/parser/dx_intl/scores"
import clsx from "clsx"
import { useEffect, useState } from "react"
import {
  Button,
  Dialog,
  Heading,
  ListBox,
  ListBoxItem,
  Modal,
  Selection,
} from "react-aria-components"
import { useClient, useQuery } from "urql"
import PlayerItem from "../../common/components/PlayerItem"
import { QueryResult } from "../../common/components/QueryResult"
import { Alert } from "../../common/components/ui/Alert"
import { dxIntlPlayersFields } from "../../dx_intl/models/fragments"
import { graphql, readFragment } from "../../graphql"
import host from "../../host"
import classes from "./DxIntl.module.css"

const DIFFICULTIES = [0, 1, 2, 3, 4]

const castKey = (key: string | number | undefined): number | undefined =>
  typeof key === "number" ? key : undefined

// Needed as bookmarklet will not know user ID
const dxIntlPlayersDocument = graphql(
  `
    query dxIntlPlayers {
      dx_intl_players {
        ...dxIntlPlayersFields
      }
    }
  `,
  [dxIntlPlayersFields],
)

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

const fetchNetPlayer = async () => {
  const resp = await window.parent.fetch(`/maimai-mobile/home/`)
  if (!resp.ok) {
    throw new Error("Network Error!")
  }
  return parsePlayer(await resp.text())
}

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
  const [isOpen, setOpen] = useState(true)
  const [pageState, setPageState] = useState<
    "loading" | "ready" | "fetching" | "error" | "done"
  >("loading")
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<Selection>(
    new Set(),
  )
  const client = useClient()
  const [dxIntlPlayersResult] = useQuery({ query: dxIntlPlayersDocument })
  const players = readFragment(
    dxIntlPlayersFields,
    dxIntlPlayersResult.data?.dx_intl_players ?? [],
  )

  const [netPlayerResult, setNetPlayerResult] = useState<{
    data?: ReturnType<typeof parsePlayer>
    fetching: boolean
    error: boolean
  }>({ fetching: true, error: false })
  useEffect(() => {
    fetchNetPlayer()
      .then((data) =>
        setNetPlayerResult({ data, fetching: false, error: false }),
      )
      .catch(() => setNetPlayerResult({ fetching: false, error: true }))
  }, [])

  useEffect(() => {
    if (
      pageState !== "loading" ||
      netPlayerResult.fetching ||
      dxIntlPlayersResult.fetching
    ) {
      return
    }
    if (netPlayerResult.error || dxIntlPlayersResult.error) {
      setPageState("error")
      return
    }
    const firstMatchPlayer = readFragment(
      dxIntlPlayersFields,
      dxIntlPlayersResult.data?.dx_intl_players ?? [],
    ).find(
      (player) =>
        player.dx_intl_record?.card_name == netPlayerResult.data?.card_name,
    )
    if (firstMatchPlayer != null) {
      setSelectedPlayerIds(new Set([firstMatchPlayer.id]))
    }
    setPageState("ready")
  }, [netPlayerResult, dxIntlPlayersResult, pageState])

  const parsedPlayer = netPlayerResult.data
  const [fetchProgress, setFetchProgress] = useState(0)
  const selectedPlayerId =
    selectedPlayerIds !== "all"
      ? castKey(selectedPlayerIds.values().next().value)
      : undefined
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
    setPageState("fetching")
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
    setPageState("done")
  }

  const handleFetchWithCatch = async (): Promise<void> => {
    try {
      await handleFetch()
    } catch (e) {
      console.error(e)
      setPageState("error")
    }
  }

  const onOpenChange = (open: boolean): void => {
    setOpen(open)
    if (!open) {
      window.parent.location.href = "/"
    }
  }

  if (netPlayerResult.fetching) {
    return <></>
  }

  return (
    <Modal isDismissable isOpen={isOpen} onOpenChange={onOpenChange}>
      <Dialog className={clsx("react-aria-Dialog", classes.dialog)}>
        <Heading slot="title">更新 Otohime 成績單</Heading>
        {pageState === "loading" ? (
          <div></div>
        ) : pageState === "fetching" ? (
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
        ) : pageState === "done" ? (
          <div>
            <p>上傳完成！</p>
            <p>您現在可以在 Otohime 網站上檢視你的成績單了。</p>
            <a
              className="btn"
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
        ) : pageState === "error" ? (
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
            {players.length === 0 ? (
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
                <ListBox
                  selectionMode="single"
                  selectedKeys={selectedPlayerIds}
                  onSelectionChange={setSelectedPlayerIds}
                >
                  {players.map((player) => (
                    <ListBoxItem key={player.id} id={player.id}>
                      <PlayerItem player={player} />
                    </ListBoxItem>
                  ))}
                </ListBox>
              </div>
            )}
          </QueryResult>
        )}
        <div>
          <Button
            isDisabled={pageState !== "ready" || selectedPlayerId === undefined}
            onPress={handleFetchWithCatch}
          >
            上傳成績
          </Button>
          <Button
            isDisabled={pageState === "fetching"}
            onPress={() => onOpenChange(false)}
          >
            關閉
          </Button>
        </div>
      </Dialog>
    </Modal>
  )
}
export default Book
