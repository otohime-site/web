import React, { FunctionComponent, useState } from "react"
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  LinearProgress,
  Link,
  Typography,
} from "@material-ui/core"

import { parsePlayer, parseScores } from "@otohime-site/parser/dx_intl"
import { useQuery, useClient } from "urql"

import { Alert } from "@material-ui/lab"
import { ScoresParseEntry } from "@otohime-site/parser/dx_intl/scores"
import styled from "@emotion/styled"
import PlayerListItem from "./dx_intl/PlayerListItem"
import { QueryResult } from "./QueryResult"
import {
  DxIntlPlayersDocument,
  InsertDxIntlRecordWithScoresDocument,
} from "./generated/graphql"
import host from "./host"

const DIFFICULTIES = [0, 1, 2, 3, 4]

const ResetDialog = styled(Dialog)`
  *:disabled {
    background-color: unset;
  }
`
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

const book: FunctionComponent = () => {
  const [open, setOpen] = useState(true)
  const [selectedPlayerId, setSelectedPlayerId] =
    useState<number | undefined>(undefined)
  const [dxIntlPlayersResult] = useQuery({ query: DxIntlPlayersDocument })
  const client = useClient()
  const [fetchState, setFetchState] =
    useState<"idle" | "fetching" | "done">("idle")
  const [fetchProgress, setFetchProgress] = useState(0)
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

    await client
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
    setFetchState("done")
  }

  const handleClose = (): void => {
    setOpen(false)
    window.location.href = "/"
  }
  const players = dxIntlPlayersResult.data?.dx_intl_players
  if (document.location.pathname !== "/maimai-mobile/home/") {
    return (
      <ResetDialog
        lang="zh-TW"
        disableEscapeKeyDown={true}
        open={open}
        onClose={handleClose}
      >
        <Alert severity="info">
          您必須先回到官方成績單首頁。按一下「OK」帶你去！
        </Alert>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </ResetDialog>
    )
  }
  if (parsedPlayer === undefined) {
    return (
      <ResetDialog
        lang="zh-TW"
        disableEscapeKeyDown={true}
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
      >
        <Alert severity="error">
          無法擷取玩家資料，請重試一次。如果問題持續請聯絡 Otohime 開發團隊。
        </Alert>
      </ResetDialog>
    )
  }
  return (
    <ResetDialog
      lang="zh-TW"
      disableEscapeKeyDown={true}
      fullWidth={true}
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>更新成績</DialogTitle>
      {fetchState === "fetching" ? (
        <DialogContent>
          <Typography variant="body2">
            {fetchProgress < DIFFICULTIES.length
              ? "擷取成績中..."
              : "正在上傳成績單..."}
          </Typography>
          <LinearProgress
            variant={
              fetchProgress < DIFFICULTIES.length
                ? "determinate"
                : "indeterminate"
            }
            value={
              fetchProgress < DIFFICULTIES.length
                ? (fetchProgress / DIFFICULTIES.length) * 100
                : undefined
            }
          />
        </DialogContent>
      ) : fetchState === "done" ? (
        <DialogContent>
          <Typography variant="body2">上傳完成！</Typography>
          <Typography variant="body2">
            您現在可以在 Otohime 網站上檢視你的成績單了。
          </Typography>
          <Button
            variant="contained"
            color="primary"
            target="_blank"
            href={`https://${host}/dxi/p/${
              (players ?? []).find((p) => p.id === selectedPlayerId)
                ?.nickname ?? ""
            }`}
          >
            檢視成績單
          </Button>
        </DialogContent>
      ) : (
        <QueryResult
          result={dxIntlPlayersResult}
          errorMsg="無法取得玩家資料。可能您的權杖失效了，請到 Otohime 上重新複製新的連結。"
        >
          {players == null || players.length === 0 ? (
            <Alert severity="warning">
              請到 Otohime 網站上
              <Link
                target="_blank"
                href={`https://${host}/dxi/p/new`}
                rel="noopener"
              >
                新增一個成績單。
              </Link>
            </Alert>
          ) : (
            <DialogContent>
              <DialogContentText>請選擇要更新的成績單：</DialogContentText>
              <List>
                {players.map((player) => (
                  <PlayerListItem
                    key={player.id}
                    player={player}
                    selected={selectedPlayerId === player.id}
                    onSelect={setSelectedPlayerId}
                  />
                ))}
              </List>
            </DialogContent>
          )}
        </QueryResult>
      )}
      <DialogActions>
        <Button
          color="primary"
          variant="text"
          disabled={fetchState !== "idle" || selectedPlayerId === undefined}
          onClick={handleFetch}
        >
          上傳成績
        </Button>
        <Button disabled={fetchState === "fetching"} onClick={handleClose}>
          關閉
        </Button>
      </DialogActions>
    </ResetDialog>
  )
}
export default book
