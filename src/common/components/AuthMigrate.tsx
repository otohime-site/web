import {
  GoogleAuthProvider,
  linkWithPopup,
  linkWithRedirect,
} from "firebase/auth"
import { useCallback } from "react"
import { Button } from "react-aria-components"
import IconGoogle from "~icons/mdi/google"
import { useUser } from "../contexts"
import { Alert } from "./ui/Alert"

const isInAppBrowser = (agent: string): boolean =>
  agent.search(/(iPhone|iPad|iPod)(?!.*Safari)/) !== -1 ||
  agent.search(/Android.*(wv|\.0\.0\.0)/) !== -1

const googleProvider = new GoogleAuthProvider()

export const AuthMigrate = () => {
  const user = useUser()
  const handleMigrate = useCallback(async (): Promise<void> => {
    if (user == null) {
      return
    }
    try {
      if (isInAppBrowser(navigator.userAgent)) {
        await linkWithRedirect(user, googleProvider)
      } else {
        await linkWithPopup(user, googleProvider)
        alert("綁定 Google 帳號成功，感謝您 :)")
        // or the page status may not be updated
        window.location.reload()
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.code === "auth/popup-blocked") {
        alert("彈出視窗被瀏覽器阻擋。請試著重點一次。")
      } else {
        alert(`綁定失敗，請再試一次。原因： ${e.code}`)
      }
    }
  }, [user])

  if (
    user != null &&
    !user.providerData.find((pd) => pd.providerId != "facebook.com")
  ) {
    return (
      <Alert severity="error">
        <h6>請重新綁定 Google 帳號</h6>
        <p>
          <strong>本網站的 Facebook 登入將於 7/15 停止運作。</strong>
        </p>
        <p>
          請使用下方的按鈕綁定一個 Google 帳號，確保以後您可以繼續以 Google
          帳號登入。
        </p>
        <Button onPress={handleMigrate}>
          <IconGoogle /> 登入並綁定 Google 帳號
        </Button>
        <p>（如果你來不及或忘記進行綁定，日後可能會提供贖回程序）</p>
      </Alert>
    )
  }
  return <></>
}
