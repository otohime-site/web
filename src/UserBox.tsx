import React, { FunctionComponent } from "react"
import { useAuth } from "./auth"
import { Button } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import firebase from "firebase/app"

const UserBoxComponent: FunctionComponent = () => {
  const auth = firebase.auth()
  const provider = new firebase.auth.FacebookAuthProvider()
  const [user, loading] = useAuth(auth)
  const handleLogin = async (): Promise<void> => {
    await auth.signInWithRedirect(provider)
  }
  const handleLogout = async (): Promise<void> => {
    await auth.signOut()
  }
  if (loading) {
    return <Skeleton variant="text" width={60} />
  } else if (user !== null) {
    return (
      <React.Fragment>
        <Button color="inherit" onClick={handleLogout}>
          <ExitToAppIcon />
          登出
        </Button>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleLogin}>
        登入
      </Button>
    </React.Fragment>
  )
}

export default UserBoxComponent
