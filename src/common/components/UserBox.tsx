import clsx from "clsx"
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth"
import { Fragment, useCallback } from "react"
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components"
import IconGoogle from "~icons/mdi/google"
import { firebaseAuth, useUser } from "../contexts"

import classes from "./UserBox.module.css"
import { Alert } from "./ui/Alert"

const googleProvider = new GoogleAuthProvider()

const isInAppBrowser = (agent: string): boolean =>
  agent.search(/(iPhone|iPad|iPod)(?!.*Safari)/) !== -1 ||
  agent.search(/Android.*(wv|\.0\.0\.0)/) !== -1

const UserBoxComponent = () => {
  const user = useUser()

  const performLogin = async (provider: GoogleAuthProvider) => {
    try {
      if (isInAppBrowser(navigator.userAgent)) {
        await signInWithRedirect(firebaseAuth, provider)
      } else {
        await signInWithPopup(firebaseAuth, provider)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.code === "auth/popup-blocked") {
        alert("彈出視窗被瀏覽器阻擋。請試著重點一次「登入」。")
      } else {
        alert(`登入失敗，請再試一次。原因：${e.code}`)
      }
    }
  }

  const handleLoginGoogle = useCallback(async (): Promise<void> => {
    await performLogin(googleProvider)
  }, [])

  const handleLogout = async (): Promise<void> => {
    await signOut(firebaseAuth)
  }
  if (user !== null) {
    return (
      <>
        <button onClick={handleLogout}>登出</button>
      </>
    )
  }
  return (
    <Fragment>
      <DialogTrigger>
        <Button>登入</Button>
        <Popover>
          <Dialog className={clsx("react-aria-Dialog", classes["dialog"])}>
            <p>
              <button onClick={handleLoginGoogle}>
                <IconGoogle /> 以 Google 帳號登入
              </button>
            </p>
            <Alert severity="warning">
              <p>Facebook 登入已於 7/15 停止運作。</p>
              <p>
                如果您還沒重新綁定，您可以登入後透過既有的 Bookmarklet
                連結進行成績單帳號轉移。
              </p>
              <p>
                請參考{" "}
                <a
                  href="https://littlebtc.gitbook.io/otohime-docs/data-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  隱私權與資料使用政策
                </a>
                了解個人資料的取回、刪除等詳情。
              </p>
            </Alert>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </Fragment>
  )
}

export default UserBoxComponent
