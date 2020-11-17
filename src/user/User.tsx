import React, { FunctionComponent, useState } from 'react'
import * as clipboard from 'clipboard-polyfill'
import firebase from 'firebase/app'
import { useAuth } from '../auth'
import { useQuery, useMutation } from 'urql'
import { TokensDocument, RegenerateTokenDocument, DxIntlPlayersDocument } from '../generated/graphql'
import { Tooltip, Link, Button, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { QueryResult } from '../QueryResult'
import host from '../host'
import LinkIcon from '@material-ui/icons/Link'

const bookmarkletContent = (token: string): string => `
javascript:
var s = document.createElement("script");
s.src = "https://${host}/go.js"; document.body.appendChild(s);
document.body.setAttribute('data-otohime-token', ${JSON.stringify(token)});
void(0);
`

const User: FunctionComponent = () => {
  const [user] = useAuth(firebase.auth())
  const [tokensResult, refetchTokens] = useQuery({ query: TokensDocument })
  const [dxIntlPlayersResult] = useQuery({
    query: DxIntlPlayersDocument,
    variables: {
      userId: user?.uid ?? ''
    }
  })
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
  if (user == null) {
    return <></>
  }
  const token = (tokensResult.data == null || tokensResult.data.tokens.length === 0)
    ? ''
    : tokensResult.data.tokens[0].id
  return (
    <div>
      <h3>Bookmarklet</h3>
      <p>
        若要上傳成績，您需要先將本站的 Bookmarklet 加入您的書籤，
        然後在瀏覽官方成績網站時觸發書籤。
      </p>
      <p>
        用來識別登入者的權杖會寫在 Bookmarklet 裡面，所以當你的連結外洩給別人時，
        請更換一個。權杖裡並不包含任何你的個人資訊。
      </p>
      <p>
        <Link>詳細使用說明</Link>
      </p>
      <QueryResult result={tokensResult} skeletonVariant='rect' skeletonHeight={28}>
        {(token.length === 0)
          ? '請生成一個權杖。'
          : <>
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
          </>
        }
      </QueryResult>
      <p>
        <Button variant='contained' color='secondary' disabled={regenerateTokenResult.fetching} onClick={generateToken}>
          {(tokensResult.data == null || tokensResult.data.tokens.length === 0)
            ? '產生權杖' : '重新產生權杖'
          }
        </Button>
      </p>
      <h3>紀錄的玩家資料</h3>
      <h4>maimai DX 國際版</h4>
      <Paper>

      </Paper>
    </div>
  )
}

export default User
