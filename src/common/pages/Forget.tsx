import { useState } from "react"
import { Button } from "react-aria-components"
import { Titled } from "react-titled"
import { useMutation } from "urql"
import { useLocation } from "wouter"
import { graphql } from "../../graphql"
import { Alert } from "../components/ui/Alert"
import { useUser } from "../contexts"

const deleteUserDocument = graphql(`
  mutation deleteUser {
    delete_users(where: {}) {
      affected_rows
    }
  }
`)

const Forget = () => {
  const [, navigate] = useLocation()
  const user = useUser()
  const [, deleteUser] = useMutation(deleteUserDocument)
  const [confirmed, setConfirmed] = useState(false)

  const bye = async (): Promise<void> => {
    if (!confirmed || user == null) {
      return
    }
    try {
      await deleteUser({})
      await user?.delete()
      navigate("/")
    } catch {
      alert("發生錯誤，請登出再登入後重試。")
    }
  }

  if (user == null) {
    return <Alert severity="info">請先登入。</Alert>
  }

  return (
    <div>
      <Titled title={(title) => `刪除帳號 - ${title}`} />
      <h3>刪除帳號</h3>
      <Alert severity="error">
        <p>這個功能將會移除您在本站的所有個人資料，包含：</p>
        <ul>
          <li>Firebase 的帳號與其儲存的 Facebook / Google 帳號公開資料</li>
          <li>所有遊戲的成績單與歷史紀錄</li>
        </ul>
        <p>
          <strong>此動作無法復原。</strong>
        </p>
        <p>
          <strong>
            請確定您是為了完全清除您在 Otohime 的個人資料才執行這個功能。
          </strong>
        </p>
        <p>
          <input
            type="checkbox"
            onClick={(e) => setConfirmed(e.currentTarget.checked)}
          />
          是的，請完全清除我在 Otohime 的個人資料。
        </p>
        <p>
          如果執行失敗，可能是您登入太久了，請您嘗試登出、再登入、再重新執行一次。
        </p>
        <p>
          如果您因為 Facebook 登入被停用等理由無法重新登入，請您參考{" "}
          <a
            href="https://littlebtc.gitbook.io/otohime-docs/data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            隱私權與資料使用政策
          </a>
          中「關於您的權利」一段，填寫請求表單請求刪除。
        </p>
        <Button isDisabled={!confirmed} onPress={bye}>
          Bye :)
        </Button>
      </Alert>
    </div>
  )
}

export default Forget
