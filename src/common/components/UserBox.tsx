import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import { Button, Skeleton } from "@mui/material"
import {
  FacebookAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth"
import { useSnackbar } from "notistack"
import { Fragment, FunctionComponent, useCallback } from "react"
import { firebaseAuth, useAuth } from "../../auth"

const provider = new FacebookAuthProvider()
const isInAppBrowser = (agent: string): boolean =>
  agent.search(/(iPhone|iPad|iPod)(?!.*Safari)/) !== -1 ||
  agent.search(/Android.*(wv|\.0\.0\.0)/) !== -1

const UserBoxComponent: FunctionComponent = () => {
  const [user, loading] = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const handleLogin = useCallback(async (): Promise<void> => {
    try {
      if (isInAppBrowser(navigator.userAgent)) {
        await signInWithRedirect(firebaseAuth, provider)
      } else {
        await signInWithPopup(firebaseAuth, provider)
      }
    } catch (e: any) {
      if (e.code === "auth/popup-blocked") {
        enqueueSnackbar("彈出視窗被瀏覽器阻擋。請試著重點一次「登入」。", {
          variant: "error",
        })
      } else {
        enqueueSnackbar("登入失敗，請再試一次。", { variant: "error" })
      }
    }
  }, [enqueueSnackbar])
  const handleLogout = async (): Promise<void> => {
    await signOut(firebaseAuth)
  }
  if (loading) {
    return <Skeleton variant="text" width={60} />
  } else if (user !== null) {
    return (
      <Fragment>
        <Button color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
          登出
        </Button>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Button color="inherit" onClick={handleLogin}>
        登入
      </Button>
    </Fragment>
  )
}

export default UserBoxComponent
