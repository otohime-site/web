import { Dialog } from "@ark-ui/react/dialog"
import { Popover } from "@ark-ui/react/popover"
import { Portal } from "@ark-ui/react/portal"
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth"
import { useCallback, useState } from "react"
import { navigate } from "wouter/use-browser-location"
import MdiCloudDownloadOutline from "~icons/mdi/cloud-download-outline"
import IconGoogle from "~icons/mdi/google"
import { firebaseAuth, useUser } from "../contexts"

import Token from "./Token"
import { Alert } from "./ui/Alert"
import { Avatar } from "./ui/Avatar"
import { Menu } from "./ui/Menu"
import classes from "./UserBox.module.css"

const googleProvider = new GoogleAuthProvider()

const isInAppBrowser = (agent: string): boolean =>
  agent.search(/(iPhone|iPad|iPod)(?!.*Safari)/) !== -1 ||
  agent.search(/Android.*(wv|\.0\.0\.0)/) !== -1

const UserBoxComponent = () => {
  const user = useUser()
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false)

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
    // Facebook login is abandoned but its provider can't be removed yet for
    // compatibility, so its profile data (which can be stale/empty) is skipped.
    // providerData is ordered oldest-first, so the last non-FB entry is the
    // latest usable profile; fall back to the aggregated top-level fields.
    const profile =
      [...user.providerData]
        .reverse()
        .find((pd) => pd.providerId !== "facebook.com") ?? user
    return (
      <div className={classes["user-box"]}>
        <button
          className={classes["token-button"]}
          onClick={() => setTokenDialogOpen(true)}
        >
          <MdiCloudDownloadOutline />
          <span>取得更新連結</span>
        </button>
        <Dialog.Root
          lazyMount
          unmountOnExit
          open={tokenDialogOpen}
          onOpenChange={(e) => setTokenDialogOpen(e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content className={classes["token-dialog"]}>
                <Dialog.Title>取得更新連結</Dialog.Title>
                <Token onNavigate={() => setTokenDialogOpen(false)} />
                <Dialog.CloseTrigger asChild>
                  <button>關閉</button>
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        <Menu
          trigger={
            <Avatar
              src={profile.photoURL ?? undefined}
              name={profile.displayName ?? undefined}
            />
          }
          items={[
            {
              value: "settings",
              label: "設定",
              onSelect: () => {
                navigate("/settings")
              },
            },
            { value: "signout", label: "登出", onSelect: handleLogout },
          ]}
        />
      </div>
    )
  }
  return (
    <Popover.Root>
      <Popover.Trigger>登入</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content className={classes["popover"]}>
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
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}

export default UserBoxComponent
