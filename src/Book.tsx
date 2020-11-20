import React, { FunctionComponent, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, LinearProgress, Link, Typography } from '@material-ui/core'
import host from './host'
import { useObservableState } from 'observable-hooks'
import { parsePlayer, parseScores } from '@otohime-site/parser/dx_intl'
import { DxIntlPlayersDocument } from './generated/graphql'
import { useQuery } from 'urql'
import { QueryResult } from './QueryResult'
import { concat, from, of } from 'rxjs'
import { mergeMap, map, switchMap, delay, scan, startWith, tap } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'
import { Alert } from '@material-ui/lab'
import { ScoresParseEntry } from '@otohime-site/parser/dx_intl/scores'
import PlayerListItem from './dx_intl/PlayerListItem'
import styled from './styled'

const DIFFICULTIES = [0, 1, 2, 3, 4]

const ResetDialog = styled(Dialog)`
  *:disabled {
    background-color: unset;
  }
`

const book: FunctionComponent = () => {
  const parsedPlayer = (() => {
    try {
      return parsePlayer(document)
    } catch {
      return undefined
    }
  })()
  const [open, setOpen] = useState(true)
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined)
  const [dxIntlPlayersResult] = useQuery({ query: DxIntlPlayersDocument })
  const [fetchProgress, handleFetch] = useObservableState<number | null, React.MouseEvent>(
    (event$) => (
      event$.pipe(
        switchMap(() => concat(
          of(0),
          from(DIFFICULTIES).pipe(
            mergeMap((difficulty) =>
              fromFetch(`/maimai-mobile/record/musicGenre/search/?genre=99&diff=${difficulty}`).pipe(
                // eslint-disable-next-line @typescript-eslint/promise-function-async
                switchMap(resp => {
                  if (!resp.ok) { throw new Error('Network Error!') }
                  return resp.text()
                }),
                map(text => parseScores(text)),
                delay(1000)
              ), 1),
            scan<ScoresParseEntry[], [ScoresParseEntry[], number]>((prev, curr) =>
              [[...prev[0], ...curr], prev[1] + 1], [[], 0]),
            switchMap(([entries, progress]) => {
              if (progress < DIFFICULTIES.length) {
                return of(progress)
              }
              return of(progress)
            })
          )
        ))
      )
    ), null
  )
  const handleClose = (): void => {
    setOpen(false)
    window.location.href = '/'
  }
  const players = dxIntlPlayersResult.data?.dx_intl_players
  if (document.location.pathname !== '/maimai-mobile/home/') {
    return (
      <ResetDialog lang='zh-TW' disableEscapeKeyDown={true} open={open} onClose={handleClose}>
        <Alert severity='info'>您必須先回到官方成績單首頁。按一下「OK」帶你去！</Alert>
        <DialogActions>
          <Button color='primary' onClick={handleClose}>OK</Button>
        </DialogActions>
      </ResetDialog>
    )
  }
  if (parsedPlayer === undefined) {
    return (
      <ResetDialog lang='zh-TW' disableEscapeKeyDown={true} fullWidth={true} maxWidth='md' open={open} onClose={handleClose}>
        <Alert severity='error'>無法擷取玩家資料，請重試一次。如果問題持續請聯絡 Otohime 開發團隊。</Alert>
      </ResetDialog>
    )
  }
  return (
    <ResetDialog lang='zh-TW' disableEscapeKeyDown={true} fullWidth={true} maxWidth='md' open={open} onClose={handleClose}>
      <DialogTitle>更新成績</DialogTitle>
      {(fetchProgress != null)
        ? <DialogContent>
          <Typography variant='body2'>
            {(fetchProgress < DIFFICULTIES.length) ? '擷取成績中...' : '正在上傳成績單...'}
          </Typography>
          <LinearProgress
            variant={(fetchProgress < DIFFICULTIES.length) ? 'determinate' : 'indeterminate'}
            value={(fetchProgress < DIFFICULTIES.length) ? fetchProgress / DIFFICULTIES.length * 100 : undefined} />
        </DialogContent>
        : <QueryResult
          result={dxIntlPlayersResult}
          errorMsg='無法取得玩家資料。可能您的權杖失效了，請到 Otohime 上重新複製新的連結。'
        >
          {(players == null || players.length === 0)
            ? <Alert severity='warning'>
              請到 Otohime 網站上
              <Link target='_blank' href={`${host}/dxi/up/new`} rel='noopener'>新增一個成績單。</Link>
            </Alert>
            : <DialogContent>
              <DialogContentText>請選擇要更新的成績單：</DialogContentText>
              <List>
                {players.map((player) =>
                  <PlayerListItem
                    key={player.id}
                    player={player}
                    selected={selectedPlayerId === player.id}
                    onSelect={setSelectedPlayerId}
                  />)
                }
              </List>
            </DialogContent>
          }
        </QueryResult>
      }
      <DialogActions>
        <Button color='primary' variant='text' disabled={fetchProgress != null || selectedPlayerId === undefined} onClick={handleFetch}>上傳成績</Button>
        <Button disabled={fetchProgress != null && isFinite(fetchProgress)} onClick={handleClose}>關閉</Button>
      </DialogActions>
    </ResetDialog>
  )
}
export default book
