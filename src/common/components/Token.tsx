import { FunctionComponent, useState } from "react"
import { MdLink, MdRefresh } from "react-icons/md"
import { Titled } from "react-titled"
import { useMutation, useQuery } from "urql"
import { useAuth } from "../../auth"
import {
  RegenerateTokenDocument,
  TokensDocument,
} from "../../generated/graphql"
import host from "../../host"
import { QueryResult } from "./QueryResult"
import { Alert } from "./ui/Alert"
import { Button } from "./ui/Button"

const bookmarkletContent = (token: string): string => `
javascript:
var s = document.createElement("script");
s.src = "https://${host}/go.js"; document.body.appendChild(s);
document.body.setAttribute('data-otohime-token', ${JSON.stringify(
  token.replace(/-/g, "")
)});
void(0);
`

const User: FunctionComponent = () => {
  const [user, loading] = useAuth()
  const [tokensResult, refetchTokens] = useQuery({ query: TokensDocument })
  const [regenerateTokenResult, regenerateToken] = useMutation(
    RegenerateTokenDocument
  )
  const [bookDialogOpen, setBookDialogOpen] = useState(false)
  const handleClose = (): void => setBookDialogOpen(false)
  const generateToken = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault()
    if (confirm("您舊的 Bookmarklet 連結將會失效。確定要重新產生權杖？")) {
      await regenerateToken({})
      refetchTokens({ requestPolicy: "network-only" })
    }
  }
  const copyBookmarklet = async (
    e: React.MouseEvent,
    token: string
  ): Promise<void> => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(bookmarkletContent(token))
      setBookDialogOpen(true)
    } catch {
      alert("無法複製到剪貼簿。")
    }
  }
  const notSupported = !("DOMParser" in window && "fetch" in window)
  if (loading || user == null) {
    return <></>
  }
  if (notSupported) {
    return (
      <Alert severity="error">
        您的瀏覽器不支援 fetch 或 DOMParser，無法使用 Bookmarklet。
        請考慮更換瀏覽器或升級手機系統版本。
      </Alert>
    )
  }
  const token =
    tokensResult.data == null || tokensResult.data.tokens.length === 0
      ? ""
      : tokensResult.data.tokens[0].id
  return (
    <div>
      {bookDialogOpen ? <Titled title="更新 Otohime 成績" /> : <></>}
      {bookDialogOpen && (
        <div>
          <h3>Bookmarklet 操作說明</h3>
          <div>
            <p>連結已經複製到剪貼簿！接下來的步驟大致如下：</p>
            <ol>
              <li>將這個網頁加入書籤。（標題已經幫你改好了）</li>
              <li>打開瀏覽器的書籤，並選擇編輯書籤。</li>
              <li>將剛加入的書籤網址清空，將剪貼簿的內容貼上於網址中即可。</li>
            </ol>
            <p>
              接下來只要進到官方成績單網站後，選開書籤，點擊「更新 Otohime
              成績」即可。 但如果你使用 Android 的
              Chrome，您需要在網址列輸入「Otohime」找到並點擊書籤才能成功觸發！
            </p>
            <Button color="indigo" onClick={handleClose}>
              關閉
            </Button>
          </div>
        </div>
      )}
      <QueryResult
        result={tokensResult}
        skeletonVariant="rectangular"
        skeletonHeight={36}
      >
        {token.length === 0 ? (
          <Button
            color="violet"
            disabled={regenerateTokenResult.fetching}
            onClick={generateToken}
          >
            產生權杖
          </Button>
        ) : (
          <div>
            <a
              href={bookmarkletContent(token)}
              onClick={async (e) => await copyBookmarklet(e, token)}
            >
              <MdLink />
              更新 Otohime 成績
            </a>
            <Button
              color="violet"
              disabled={regenerateTokenResult.fetching}
              onClick={generateToken}
            >
              <MdRefresh /> 重新產生
            </Button>
          </div>
        )}
      </QueryResult>
    </div>
  )
}

export default User
