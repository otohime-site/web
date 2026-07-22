import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import { useState } from "react"
import { Titled } from "react-titled"
import { useMutation, useQuery } from "urql"
import MdiCheckCircle from "~icons/mdi/check-circle"
import MdiCloudDownloadOutline from "~icons/mdi/cloud-download-outline"
import MdiContentCopy from "~icons/mdi/content-copy"
import IconRefresh from "~icons/mdi/refresh"
import { graphql } from "../../graphql"
import host from "../../host"
import { useUser } from "../contexts"
import { QueryResult } from "./QueryResult"
import classes from "./Token.module.css"
import { Alert } from "./ui/Alert"

// Phones and tablets cannot drag the bookmarklet link to a bookmark bar, so
// they get the copy-and-edit-bookmark flow instead. iPadOS 13+ reports itself
// as Macintosh, hence the extra touch-points check.
const isMobile =
  /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
  (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1)

const bookmarkletContent = (token: string): string => `
javascript:
var s = document.createElement("script");
s.src = "https://${host}/go.js"; document.body.appendChild(s);
document.body.setAttribute('data-otohime-token', ${JSON.stringify(
  token.replace(/-/g, ""),
)});
void(0);
`

const tokensDocument = graphql(`
  query Tokens {
    tokens {
      id
      created_at
    }
  }
`)

const generateTokenDocument = graphql(`
  mutation generateToken {
    insert_tokens_one(object: {}) {
      id
    }
  }
`)

const regenerateTokenDocument = graphql(`
  mutation regenerateToken {
    delete_tokens(where: {}) {
      affected_rows
    }
    insert_tokens_one(object: {}) {
      id
    }
  }
`)

// The Bookmarklet link-generation block for the home page. First-time token
// creation and regeneration both live here.
const Token = () => {
  const user = useUser()
  const [tokensResult, refetchTokens] = useQuery({
    query: tokensDocument,
    requestPolicy: "network-only",
  })
  const [generateTokenResult, generateTokenMutation] = useMutation(
    generateTokenDocument,
  )
  const [regenerateTokenResult, regenerateTokenMutation] = useMutation(
    regenerateTokenDocument,
  )
  const [bookDialogOpen, setBookDialogOpen] = useState(false)
  const generateToken = async (): Promise<void> => {
    await generateTokenMutation({})
    refetchTokens({ requestPolicy: "network-only" })
  }
  const regenerateToken = async (): Promise<void> => {
    if (!confirm("舊的書籤連結將立即失效。確定要重新產生嗎？")) {
      return
    }
    await regenerateTokenMutation({})
    refetchTokens({ requestPolicy: "network-only" })
  }
  // On mobile a single tap both copies the link and opens the how-to dialog,
  // so the user can paste straight into the bookmark they just created.
  const copyBookmarklet = async (token: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(bookmarkletContent(token))
      setBookDialogOpen(true)
    } catch {
      alert("無法複製到剪貼簿。")
    }
  }
  const notSupported = !("DOMParser" in window && "fetch" in window)
  if (user == null) {
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
      {isMobile && token.length > 0 ? (
        <Titled title="更新 Otohime 成績單" />
      ) : (
        <></>
      )}
      <Dialog.Root
        open={bookDialogOpen}
        onOpenChange={(e) => {
          setBookDialogOpen(e.open)
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className={classes["howto-dialog"]}>
              <Dialog.Title>安裝更新書籤</Dialog.Title>
              <p className={classes["copied"]}>
                <MdiCheckCircle />
                連結已複製到剪貼簿。
              </p>
              <section className={classes["howto-section"]}>
                <h5>接下來</h5>
                <ol className={classes["howto-steps"]}>
                  <li>
                    <div>
                      <span>關閉對話框前，將本頁加入書籤。</span>
                      <small>書籤的標題會變成「更新 Otohime 成績單」。</small>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>編輯書籤網址。</span>
                      <small>清空網址、貼上剛剛複製的網址並儲存。</small>
                    </div>
                  </li>
                </ol>
              </section>
              <section className={classes["howto-section"]}>
                <h5>使用時</h5>
                <p>進入官方 DXNET 後，點一下更新書籤，就可以同步成績單。</p>
                <p className={classes["hint"]}>
                  有些瀏覽器（例如 Android
                  Chrome）需要從網址列搜尋「Otohime」才能觸發書籤。
                </p>
              </section>
              <Dialog.CloseTrigger asChild>
                <button className="primary">OK</button>
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <QueryResult
        result={tokensResult}
        skeletonVariant="rectangular"
        skeletonHeight={36}
      >
        {token.length === 0 ? (
          <div className={classes["body"]}>
            <p>在進入官方 DXNET 後，點擊更新書籤，就可以把成績單同步到這裡。</p>
            <p>首先請先產生一個書籤。</p>
            <button
              className="primary"
              disabled={generateTokenResult.fetching}
              onClick={generateToken}
            >
              <MdiCloudDownloadOutline />
              產生更新書籤
            </button>
          </div>
        ) : (
          <div className={classes["body"]}>
            {isMobile ? (
              <div className={classes["install"]}>
                <p>請點下方的按鈕後照指示添加書籤。</p>
                <button
                  className="primary"
                  onClick={async () => await copyBookmarklet(token)}
                >
                  <MdiContentCopy />
                  複製連結並顯示說明
                </button>
              </div>
            ) : (
              <div className={classes["install"]}>
                <p>拖曳下方按鈕到瀏覽器的書籤列。</p>
                <a
                  className={`btn primary ${classes["drag-link"]}`}
                  ref={(node) => {
                    // Fix React 19 blocking `javascript:` URLs
                    // https://github.com/facebook/react/issues/16382#issuecomment-607252694
                    if (node) {
                      node.setAttribute("href", bookmarkletContent(token))
                    }
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  <MdiCloudDownloadOutline />
                  更新 Otohime 成績單
                </a>
                <p>進入官方 DXNET 後點一下書籤。</p>
              </div>
            )}
            <details className={classes["raw"]}>
              <summary>顯示書籤連結內容</summary>
              <textarea
                className={classes["content"]}
                readOnly
                rows={5}
                value={bookmarkletContent(token)}
                onFocus={(e) => e.currentTarget.select()}
              />
            </details>
            <p className={classes["hint"]}>
              連結可用於成績單更新與轉移帳號，請妥善保管。 詳細操作流程可參考{" "}
              <a
                href="https://littlebtc.gitbook.io/otohime-docs/bookmarklet-help"
                target="_blank"
                rel="noreferrer"
              >
                圖文說明
              </a>
              。
            </p>
            <button
              className={`danger ${classes["regenerate"]}`}
              disabled={regenerateTokenResult.fetching}
              onClick={regenerateToken}
            >
              <IconRefresh /> 重新產生
            </button>
          </div>
        )}
      </QueryResult>
    </div>
  )
}

export default Token
