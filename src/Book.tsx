import React, { FunctionComponent, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, LinearProgress, Link, Typography } from '@material-ui/core'
import host from './host'
import { useObservable, useObservableState, pluckFirst, useSubscription } from 'observable-hooks'
import { parsePlayer, parseScores } from '@otohime-site/parser/dx_intl'
import { DxIntlPlayersDocument, DxIntlSongsDocument, InsertDxIntlRecordWithScoresDocument } from './generated/graphql'
import { useQuery, useClient } from 'urql'
import { QueryResult } from './QueryResult'
import { from } from 'rxjs'
import { mergeMap, map, switchMap, delay, scan, distinctUntilChanged, filter, withLatestFrom, takeLast, shareReplay, take } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'
import { Alert } from '@material-ui/lab'
import { ScoresParseEntry } from '@otohime-site/parser/dx_intl/scores'
import PlayerListItem from './dx_intl/PlayerListItem'
import styled from './styled'
import { constructSongs } from './dx_intl/helper'

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

const book: FunctionComponent = () => {
  const [open, setOpen] = useState(true)
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined)
  const [dxIntlPlayersResult] = useQuery({ query: DxIntlPlayersDocument })
  const client$ = useObservable(pluckFirst, [useClient()])
  const [fetchState, setFetchState] = useState<'idle' | 'fetching' | 'done'>('idle')
  const handleFetch = (): void => setFetchState('fetching')
  const fetchState$ = useObservable(pluckFirst, [fetchState])
  const selectedPlayerId$ = useObservable(pluckFirst, [selectedPlayerId])
  const fetchResult$ = useObservable(() => fetchState$.pipe(
    filter(state => state === 'fetching'),
    distinctUntilChanged(),
    switchMap(() => from(DIFFICULTIES).pipe(
      mergeMap((difficulty) =>
        fromFetch(`/maimai-mobile/record/musicGenre/search/?genre=99&diff=${difficulty}`).pipe(
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          mergeMap(resp => {
            if (!resp.ok) { throw new Error('Network Error!') }
            return resp.text()
          }),
          map(text => parseScores(text)),
          delay(1000)
        ), 1)
    )),
    scan<ScoresParseEntry[], [ScoresParseEntry[], number]>((prev, curr) =>
      [[...prev[0], ...curr], prev[1] + 1], [[], 0]),
    take(DIFFICULTIES.length),
    shareReplay()
  ))
  const submission$ = useObservable(() => fetchResult$.pipe(
    takeLast(1),
    withLatestFrom(client$),
    mergeMap(([[entries, count], client]) => {
      return from(client.query(DxIntlSongsDocument).toPromise()).pipe(
        map((songsResult) => {
          if (songsResult.data == null || songsResult.error != null) {
            throw new Error('Cannot get song data!')
          }
          const constructed = constructSongs(songsResult.data.dx_intl_songs)
          return entries.map(entry => {
            const noteId = constructed[entry.category].get(entry.title)?.get(entry.deluxe)?.notes[entry.difficulty]?.id
            if (noteId == null) {
              throw new Error(
                `Cannot find song with ${entry.category}:${entry.title}:${entry.deluxe ? 'true' : 'false'}:${entry.difficulty}`
              )
            }
            if (!('score' in entry)) {
              throw new Error('Find out entry without scores!')
            }
            return {
              note_id: noteId,
              score: entry.score,
              combo_flag: entry.combo_flag,
              sync_flag: entry.sync_flag
            }
          })
        })
      )
    }),
    withLatestFrom(client$, selectedPlayerId$),
    mergeMap(([scores, client, playerId]) => {
      if (parsedPlayer === undefined) {
        throw new Error('No parsed players!')
      }
      return from(client.mutation(
        InsertDxIntlRecordWithScoresDocument,
        {
          record: {
            player_id: playerId,
            ...parsedPlayer
          },
          scores: scores.map(score => ({
            player_id: playerId,
            ...score
          }))
        }
      ).toPromise())
    })
  ))
  useSubscription(submission$, () => setFetchState('done'))

  const fetchProgress = useObservableState(
    fetchResult$.pipe(map(([entry, count]) => count)),
    0
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
      {(fetchState === 'fetching')
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
        <Button color='primary' variant='text' disabled={fetchState !== 'idle' || selectedPlayerId === undefined} onClick={handleFetch}>上傳成績</Button>
        <Button disabled={fetchProgress != null && isFinite(fetchProgress)} onClick={handleClose}>關閉</Button>
      </DialogActions>
    </ResetDialog>
  )
}
export default book
