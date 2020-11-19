import React, { FunctionComponent, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
// import host from './host'
import { useObservableState } from 'observable-hooks'
import { parsePlayer, parseScores } from '@otohime-site/parser/dx_intl'
import { DxIntlPlayersDocument } from './generated/graphql'
import { useQuery } from 'urql'
import { QueryResult } from './QueryResult'
import { map, switchMap } from 'rxjs/operators'
import { fromFetch } from 'rxjs/fetch'
import { Alert } from '@material-ui/lab'
import { ScoresParseEntry } from '@otohime-site/parser/dx_intl/scores'

const book: FunctionComponent = () => {
  const player = (() => {
    try {
      return parsePlayer(document)
    } catch {
      return undefined
    }
  })()
  const [open, setOpen] = useState(true)
  const [dxIntlPlayersResult] = useQuery({ query: DxIntlPlayersDocument })
  const [fetchResult, handleFetch] = useObservableState<ScoresParseEntry[] | null, React.MouseEvent>(
    (event$) => (
      event$.pipe(
        switchMap(() => fromFetch('/maimai-mobile/record/musicGenre/search/?genre=99&diff=2')),
        // eslint-disable-next-line @typescript-eslint/promise-function-async
        switchMap(resp => {
          if (!resp.ok) { throw new Error('Network Error!') }
          return resp.text()
        }),
        map(text => parseScores(text))
      )
    ),
    null
  )
  const handleClose = (): void => {
    setOpen(false)
    window.location.href = '/'
  }
  const players = dxIntlPlayersResult.data?.dx_intl_players
  if (document.location.pathname !== '/maimai-mobile/home/') {
    return (
      <Dialog lang='zh-TW' disableEscapeKeyDown={true} open={open} onClose={handleClose}>
        <Alert severity='info'>您必須先回到官方成績單首頁。按一下「OK」帶你去！</Alert>
        <DialogActions>
          <Button color='primary' onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    )
  }
  if (player === undefined) {
    return (
      <Dialog lang='zh-TW' disableEscapeKeyDown={true} fullWidth={true} maxWidth='md' open={open} onClose={handleClose}>
        <Alert severity='error'>無法擷取玩家資料，請重試一次。如果問題持續請聯絡 Otohime 開發團隊。</Alert>
      </Dialog>
    )
  }
  return (
    <Dialog lang='zh-TW' disableEscapeKeyDown={true} fullWidth={true} maxWidth='md' open={open} onClose={handleClose}>
      <DialogTitle>更新成績</DialogTitle>
      <QueryResult
        result={dxIntlPlayersResult}
        errorMsg='無法取得玩家資料。可能您的權杖失效了，請到 Otohime 上重新複製新的連結。'
      >
        {(players == null || players.length === 0)
          ? '請到 Otohime 網站上新增一個玩家。'
          : <DialogContent>
            <DialogContentText>請選擇要更新的玩家資料：</DialogContentText>
            {players.map(player => player.nickname)}
            <p>{JSON.stringify(player)}</p>
            <p>{JSON.stringify(fetchResult)}</p>
          </DialogContent>
        }
      </QueryResult>
      <DialogActions>
        <Button color='primary' onClick={handleFetch}>上傳成績</Button>
        <Button onClick={handleClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  )
}
export default book
