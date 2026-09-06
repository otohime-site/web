import { Popover } from "@ark-ui/react/popover"
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth"
import { useCallback } from "react"
import { navigate } from "wouter/use-browser-location"
import IconGoogle from "~icons/mdi/google"
import { firebaseAuth, prepareSignIn, useUser } from "../contexts"
import { isMobile } from "../utils/browser"

import { Alert } from "./ui/Alert"
import { Avatar } from "./ui/Avatar"
import { Menu } from "./ui/Menu"
import classes from "./UserBox.module.css"

const googleProvider = new GoogleAuthProvider()

const UserBoxComponent = () => {
  const { user, pending } = useUser()

  const performLogin = async (provider: GoogleAuthProvider) => {
    try {
      // Mobile browsers (in-app ones especially) block popups, so they take
      // the full-page redirect. Desktop keeps the popup and stays on the page.
      if (isMobile) {
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
  if (pending) {
    // Keep the slot so the header does not jump once the state resolves.
    return <div className={classes["user-box"]} />
  }
  if (user !== null) {
    // Facebook login is long gone but accounts linked back then still carry
    // its provider entry, whose profile data can be stale/empty, so it is
    // skipped. providerData is ordered oldest-first, so the last non-FB entry
    // is the latest usable profile; fall back to the aggregated top-level
    // fields.
    const profile =
      [...user.providerData]
        .reverse()
        .find((pd) => pd.providerId !== "facebook.com") ?? user
    return (
      <div className={classes["user-box"]}>
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
    <Popover.Root
      onOpenChange={(details) => {
        // Opening the popover signals intent: load the sign-in iframe now so
        // the popup opens on the first click. Redirect sign-in needs no iframe.
        if (details.open && !isMobile) {
          prepareSignIn()
        }
      }}
    >
      <Popover.Trigger>登入</Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content className={classes["popover"]}>
          <p>
            <button className="primary" onClick={handleLoginGoogle}>
              <IconGoogle /> 以 Google 帳號登入
            </button>
          </p>
          {/* For visitors who last signed in back when Facebook login still
              existed. */}
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
