import { useState } from "react"
import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components"
import { Titled } from "react-titled"
import { useMutation, useQuery } from "urql"
import MdiBriefcaseTransfer from "~icons/mdi/briefcase-transfer"
import MdiCloudDownloadOutline from "~icons/mdi/cloud-download-outline"
import IconRefresh from "~icons/mdi/refresh"
import { graphql } from "../../graphql"
import host from "../../host"
import { useUser } from "../contexts"
import { QueryResult } from "./QueryResult"
import { Alert } from "./ui/Alert"
import { LinkButton } from "./ui/Button"

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

const User = () => {
  const user = useUser()
  const [tokensResult, refetchTokens] = useQuery({
    query: tokensDocument,
    requestPolicy: "network-only",
  })
  const [regenerateTokenResult, regenerateToken] = useMutation(
    regenerateTokenDocument,
  )
  const [bookDialogOpen, setBookDialogOpen] = useState(false)
  const handleClose = (): void => setBookDialogOpen(false)
  const generateToken = async (): Promise<void> => {
    if (confirm("您舊的 Bookmarklet 連結將會失效。確定要重新產生權杖？")) {
      await regenerateToken({})
      refetchTokens({ requestPolicy: "network-only" })
    }
  }
  const copyBookmarklet = async (
    e: React.MouseEvent,
    token: string,
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
      {bookDialogOpen ? <Titled title="更新 Otohime 成績" /> : <></>}
      <DialogTrigger isOpen={bookDialogOpen} onOpenChange={setBookDialogOpen}>
        <Modal isDismissable>
          <Dialog role="alertdialog">
            <div>
              <h3>Bookmarklet 操作說明</h3>
              <div>
                <p>連結已經複製到剪貼簿！接下來的步驟大致如下：</p>
                <ol>
                  <li>將這個網頁加入書籤。（標題已經幫你改好了）</li>
                  <li>打開瀏覽器的書籤，並選擇編輯書籤。</li>
                  <li>
                    將剛加入的書籤網址清空，將剪貼簿的內容貼上於網址中即可。
                  </li>
                </ol>
                <p>
                  接下來只要進到官方成績單網站後，選開書籤，點擊「更新 Otohime
                  成績」即可。 但如果你使用 Android 的
                  Chrome，您需要在網址列輸入「Otohime」找到並點擊書籤才能成功觸發！
                </p>
                <Button onPress={handleClose}>關閉</Button>
              </div>
            </div>
          </Dialog>
        </Modal>
      </DialogTrigger>
      <QueryResult
        result={tokensResult}
        skeletonVariant="rectangular"
        skeletonHeight={36}
      >
        {token.length === 0 ? (
          <div>
            <p>
              如果您第一次使用，您要先產生一個權杖來生成觸發更新的 Bookmarklet。
            </p>
            <p>
              <Button
                isDisabled={regenerateTokenResult.fetching}
                onPress={generateToken}
              >
                產生權杖
              </Button>
            </p>
            <p>
              如果您因為任何原因無法在存取帳號（例如以前透過 Facebook
              登入），但您的 Bookmarklet
              觸發書籤留著，您可以使用這個功能將原本帳號的成績單轉移。
            </p>
            <p>
              <LinkButton href="/transfer">
                <MdiBriefcaseTransfer />
                成績單帳號轉移
              </LinkButton>
            </p>
          </div>
        ) : (
          <div>
            <p>新增好成績單後，您需要透過書籤從瀏覽器將成績匯入到 Otohime。</p>
            <p>
              如果您使用桌面瀏覽器，請將下面的按鈕拖曳到書籤列。如果您使用手機瀏覽器，請按下下方按鈕。{" "}
              <a
                href="https://littlebtc.gitbook.io/otohime-docs/bookmarklet-help"
                target="_blank"
                rel="noreferrer"
              >
                詳細圖文說明
              </a>
              。
            </p>
            <p>
              <a
                className="btn"
                ref={(node) => {
                  // Fix React 19 blocking `javascript:` URLs
                  // https://github.com/facebook/react/issues/16382#issuecomment-607252694
                  if (node) {
                    node.setAttribute("href", bookmarkletContent(token))
                  }
                }}
                onClick={async (e) => await copyBookmarklet(e, token)}
              >
                <MdiCloudDownloadOutline />
                更新 Otohime 成績
              </a>
            </p>
            <p>
              請妥善保管好您的連結，取得這個連結的人除了可以更新成績單，也能將您已上傳的成績單跟歷史紀錄轉移到其他帳號。
            </p>
            <p>如果您有需要可以重新產生權杖，或者使用成績單帳號轉移。</p>
            <p>
              <Button
                isDisabled={regenerateTokenResult.fetching}
                onPress={generateToken}
              >
                <IconRefresh /> 重新產生權杖
              </Button>
              <LinkButton href="/transfer">
                <MdiBriefcaseTransfer />
                成績單帳號轉移
              </LinkButton>
            </p>
          </div>
        )}
      </QueryResult>
    </div>
  )
}

export default User
