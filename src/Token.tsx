import React, { FunctionComponent } from 'react'
import * as clipboard from 'clipboard-polyfill'
import firebase from 'firebase/app'
import { useAuth } from './auth'
import { useQuery, useMutation } from 'urql'
import { TokensDocument, RegenerateTokenDocument } from './generated/graphql'
import { Tooltip, Button, ButtonGroup } from '@material-ui/core'
import { QueryResult } from './QueryResult'
import host from './host'
import LinkIcon from '@material-ui/icons/Link'
import RefreshIcon from '@material-ui/icons/Refresh'
import { Alert } from '@material-ui/lab'

const bookmarkletContent = (token: string): string => `
javascript:
var s = document.createElement("script");
s.src = "https://${host}/go.js"; document.body.appendChild(s);
document.body.setAttribute('data-otohime-token', ${JSON.stringify(token.replace(/-/g, ''))});
void(0);
`

const User: FunctionComponent = () => {
  const [user] = useAuth(firebase.auth())
  const [tokensResult, refetchTokens] = useQuery({ query: TokensDocument })
  const [regenerateTokenResult, regenerateToken] = useMutation(RegenerateTokenDocument)
  const generateToken = async (): Promise<void> => {
    if (confirm('您舊的 Bookmarklet 連結將會失效。確定要重新產生權杖？')) {
      await regenerateToken()
      refetchTokens({ requestPolicy: 'network-only' })
    }
  }
  const copyBookmarklet = async (e: React.MouseEvent, token: string): Promise<void> => {
    e.preventDefault()
    try {
      await clipboard.writeText(bookmarkletContent(token))
      alert('已經複製到剪貼簿。請使用瀏覽器的「編輯書籤」功能將網址貼上。')
    } catch {
      alert('無法複製到剪貼簿。')
    }
  }
  const notSupported = !('DOMParser' in window && 'fetch' in window)
  if (user == null) {
    return <></>
  }
  if (notSupported) {
    return <Alert severity="error">
      您的瀏覽器不支援 fetch 或 DOMParser，無法使用 Bookmarklet。
      請考慮更換瀏覽器或升級手機系統版本。
    </Alert>
  }
  const token = (tokensResult.data == null || tokensResult.data.tokens.length === 0)
    ? ''
    : tokensResult.data.tokens[0].id
  return (
    <div>
      <QueryResult result={tokensResult} skeletonVariant='rect' skeletonHeight={36}>
        {(token.length === 0)
          ? <Button
            variant='contained' color='secondary'
            disabled={regenerateTokenResult.fetching} onClick={generateToken}>
            產生權杖
          </Button>
          : <ButtonGroup>
            <Tooltip title="把我拖曳到書籤列，或著按一下我複製到剪貼簿！">
              <Button
                variant='contained' color='primary'
                href={bookmarkletContent(token)}
                onClick={async (e) => await copyBookmarklet(e, token)}
                startIcon={<LinkIcon />}
              >
               更新 Otohime 成績
              </Button>
            </Tooltip>
            <Tooltip title="重新產生權杖">
              <Button variant='contained' color='secondary'
                disabled={regenerateTokenResult.fetching} onClick={generateToken}>
                <RefreshIcon />
              </Button>
            </Tooltip>
          </ButtonGroup>
        }
      </QueryResult>
    </div>
  )
}

export default User
