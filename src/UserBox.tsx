import { Fragment, FunctionComponent } from "react"
import { Button } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import {
  FacebookAuthProvider,
  signInWithRedirect,
  signOut,
} from "firebase/auth"
import { firebaseAuth, useAuth } from "./auth"

const UserBoxComponent: FunctionComponent = () => {
  const provider = new FacebookAuthProvider()
  const [user, loading] = useAuth()
  const handleLogin = async (): Promise<void> => {
    await signInWithRedirect(firebaseAuth, provider)
  }
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
