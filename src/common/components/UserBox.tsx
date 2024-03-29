import {
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth"
import { Fragment, useCallback } from "react"
import { firebaseAuth, useUser } from "../contexts"

const provider = new FacebookAuthProvider()
const isInAppBrowser = (agent: string): boolean =>
  agent.search(/(iPhone|iPad|iPod)(?!.*Safari)/) !== -1 ||
  agent.search(/Android.*(wv|\.0\.0\.0)/) !== -1

const UserBoxComponent = () => {
  const user = useUser()

  const handleLogin = useCallback(async (): Promise<void> => {
    try {
      if (isInAppBrowser(navigator.userAgent)) {
        await signInWithRedirect(firebaseAuth, provider)
      } else {
        await signInWithPopup(firebaseAuth, provider)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.code === "auth/popup-blocked") {
        // TODO: rework
        console.log("彈出視窗被瀏覽器阻擋。請試著重點一次「登入」。")
      } else {
        // TODO: rework
        console.log("登入失敗，請再試一次。")
      }
    }
  }, [])
  const handleLogout = async (): Promise<void> => {
    await signOut(firebaseAuth)
  }
  if (user !== null) {
    return (
      <Fragment>
        <a href="#" onClick={handleLogout}>
          登出
        </a>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <a href="#" onClick={handleLogin}>
        登入
      </a>
    </Fragment>
  )
}

export default UserBoxComponent
