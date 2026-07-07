import { useState } from "react"
import { Titled } from "react-titled"
import { useMutation } from "urql"
import { useLocation } from "wouter"
import MdiDeleteAlert from "~icons/mdi/delete-alert"
import { graphql } from "../../graphql"
import TransferSection from "../components/TransferSection"
import { Alert } from "../components/ui/Alert"
import { useUser } from "../contexts"

import classes from "./Settings.module.css"

const deleteUserDocument = graphql(`
  mutation deleteUser {
    delete_users(where: {}) {
      affected_rows
    }
  }
`)

const Settings = () => {
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
    <div className={classes.container}>
      <Titled title={(title) => `使用者設定 - ${title}`} />
      <h3>使用者設定</h3>
      <section className={classes.section}>
        <h4>成績單帳號轉移</h4>
        <TransferSection />
      </section>
      <section className={classes["danger-zone"]}>
        <h4>危險區域</h4>
        <h6>刪除帳號（忘記我）</h6>
        <p>這個功能將會移除您在本站的所有個人資料，包含：</p>
        <ul>
          <li>Firebase 的帳號與其儲存的 Facebook / Google 帳號公開資料</li>
          <li>所有遊戲的成績單與歷史紀錄</li>
        </ul>
        <p>
          <strong>此動作無法復原。</strong>
          請確定您是為了完全清除您在 Otohime 的個人資料才執行這個功能。
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              onClick={(e) => setConfirmed(e.currentTarget.checked)}
            />
            是的，請完全清除我在 Otohime 的個人資料。
          </label>
        </p>
        <button className="danger" disabled={!confirmed} onClick={bye}>
          <MdiDeleteAlert />
          刪除帳號
        </button>
        <p className={classes.notes}>
          如果執行失敗，可能是您登入太久了，請您嘗試登出、再登入、再重新執行一次。
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
      </section>
    </div>
  )
}

export default Settings
