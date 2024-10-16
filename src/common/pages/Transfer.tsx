import { useEffect, useState } from "react"
import { Button } from "react-aria-components"
import { Titled } from "react-titled"
import { useMutation } from "urql"
import { useLocation } from "wouter"
import MdiBriefcaseTransfer from "~icons/mdi/briefcase-transfer"
import { graphql } from "../../graphql"
import { Alert } from "../components/ui/Alert"
import { useUser } from "../contexts"

const tokenTransferDocument = graphql(`
  mutation tokenTransfer($token: String!) {
    tokenTransfer(token: $token) {
      finale_players_count
      dx_intl_players_count
    }
  }
`)

const Transfer = () => {
  const [, navigate] = useLocation()
  const user = useUser()
  const [, tokenTransfer] = useMutation(tokenTransferDocument)
  const [token, setToken] = useState("")

  useEffect(() => {
    const listener = (e: MessageEvent) => {
      if (e.origin === window.origin && typeof e.data === "object") {
        setToken(e.data.token ?? "")
      }
      const iframe = document.querySelector("iframe:last-of-type")
      if (iframe) {
        document.body.removeChild(iframe)
      }
    }
    window.addEventListener("message", listener, false)
    return () => {
      window.removeEventListener("message", listener)
    }
  }, [])

  const handleTransfer = async (): Promise<void> => {
    try {
      const result = await tokenTransfer({ token: token })
      if (result.error) {
        const message = result.error.message
        if (message.indexOf("bad_token") >= 0) {
          alert(
            "權杖有問題，可能是格式不正確、不屬於任何人、或者是您目前帳號的權杖。",
          )
        } else if (message.indexOf("transfer_used") >= 0) {
          alert("這個權杖或者您現在的帳號已經超過 90 天內轉移 1 次的限制。")
        } else {
          alert("發生錯誤，請重試。")
        }
        return
      }
      alert(`成績單已成功轉移！
* maimai DX 成績單：${result.data?.tokenTransfer?.dx_intl_players_count ?? 0} 筆
* 舊版 maimai 成績單：${result.data?.tokenTransfer?.finale_players_count ?? 0} 筆
 
將跳轉回首頁，由於權杖會重新產生，請重新複製您的 Bookmarklet 連結。
`)
      navigate("/")
    } catch {
      alert("發生錯誤，請重試。")
    }
  }
  if (user == null) {
    return <Alert severity="info">請先登入。</Alert>
  }

  return (
    <div>
      <Titled title={(title) => `成績單資料轉移 - ${title}`} />
      <h3>成績單資料轉移</h3>
      <div>
        <p>
          您可以在這個頁面，透過觸發另外一個帳號的
          Bookmarklet，將本來屬於另外一個帳號的成績單資料轉移到這個帳號。
        </p>
        <p>
          這是為了因應 Facebook 登入停用與未來其他帳號丟失等情境設計的功能。
        </p>

        <Alert severity="warning">
          <ul>
            <li>您無法使用您自己擁有的權杖進行轉移。</li>
            <li>
              成績單帳號轉移後，您舊的帳號與相關的個人資料依舊會留存在 Firebase
              中，惟我們會預期定期清除沒有任何成績單的使用者。
            </li>
            <li>
              轉移成功後您現在帳號將生成一組新的權杖（無論您的帳號目前有沒有權杖）。
            </li>
            <li>
              每90天內，每一個權杖只能被轉移一次，每一個帳號只能進行一次資料轉移。
            </li>
            <li>
              <strong>此動作無法復原。</strong>
            </li>
            <li>
              如果您連 Bookmarklet
              都沒有留存，或者您需要清除轉移後的舊帳號，您可以參考
              <a
                href="https://littlebtc.gitbook.io/otohime-docs/data-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                隱私權與資料使用政策
              </a>
              中的方式提出成績單取回或帳號刪除申請。
            </li>
          </ul>
        </Alert>
        {token ? (
          <div>
            轉移過後，被轉移的帳號跟其權杖不會改變，只是成績單會移動到您現在的帳號中。
          </div>
        ) : (
          <div>
            <p>
              請找出您儲存的書籤連結，在這個頁面按下「更新 Otohime
              成績」書籤來繼續。
            </p>
            <p>書籤觸發後才能繼續。</p>
          </div>
        )}
        <Button isDisabled={!token} onPress={handleTransfer}>
          <MdiBriefcaseTransfer /> 進行轉移
        </Button>
      </div>
    </div>
  )
}

export default Transfer
