import clsx from "clsx"
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth"
import { Fragment, useCallback } from "react"
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components"
import IconArrowDown from "~icons/mdi/arrow-down"
import IconFacebook from "~icons/mdi/facebook"
import IconGoogle from "~icons/mdi/google"
import { firebaseAuth, useUser } from "../contexts"

import classes from "./UserBox.module.css"
import { Alert } from "./ui/Alert"

const facebookProvider = new FacebookAuthProvider()
const googleProvider = new GoogleAuthProvider()

const isInAppBrowser = (agent: string): boolean =>
  agent.search(/(iPhone|iPad|iPod)(?!.*Safari)/) !== -1 ||
  agent.search(/Android.*(wv|\.0\.0\.0)/) !== -1

const UserBoxComponent = () => {
  const user = useUser()

  const performLogin = async (
    provider: FacebookAuthProvider | GoogleAuthProvider,
  ) => {
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
    if (
      !confirm(`登入成功後，該 Google 帳號將無法執行帳號綁定。

如果您希望將已有的 Facebook 帳號重新綁定，請先按「取消」，再點選「以 Facebook 帳號登入」，登入後我們會提示您如何綁定。

是否確定繼續？`)
    ) {
      return
    }
    await performLogin(googleProvider)
  }, [])
  const handleLoginFacebook = useCallback(async (): Promise<void> => {
    await performLogin(facebookProvider)
  }, [])

  const handleLogout = async (): Promise<void> => {
    await signOut(firebaseAuth)
  }
  if (user !== null) {
    return (
      <>
        <Button onPress={handleLogout}>登出</Button>
      </>
    )
  }
  return (
    <Fragment>
      <DialogTrigger>
        <Button>登入</Button>
        <Popover
          ref={(ref) =>
            // https://github.com/adobe/react-spectrum/issues/1513
            ref?.addEventListener("touchend", (e) => e.preventDefault())
          }
        >
          <Dialog className={clsx("react-aria-Dialog", classes["dialog"])}>
            <Alert severity="warning">
              <p>Facebook 登入將於 7/15 停止運作。</p>
              <p>既有使用者請儘速登入後循指示重新綁定。</p>
              <IconArrowDown />
            </Alert>
            <p>
              <Button onPress={handleLoginFacebook}>
                <IconFacebook /> 以 Facebook 帳號登入
              </Button>
            </p>
            <p>&nbsp;</p>
            <Alert severity="info">
              <p>新加入或已完成綁定的使用者請使用這個。</p>
              <IconArrowDown />
            </Alert>
            <p>
              <Button onPress={handleLoginGoogle}>
                <IconGoogle /> 以 Google 帳號登入
              </Button>
            </p>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </Fragment>
  )
}

export default UserBoxComponent
