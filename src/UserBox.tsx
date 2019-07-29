import React, { FunctionComponent, useEffect } from 'react'
import { getMe } from './laundry/actions'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './reducers'
import { Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const UserBoxComponent: FunctionComponent = () => {
  const loggedIn = useSelector((state: RootState) => state.laundry.loggedIn)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMe.request())
  }, [])

  if (loggedIn) {
    return (
      <React.Fragment>
        <Button color='inherit' href='/api/logout'>
          <ExitToAppIcon />
          登出
        </Button>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Button color='inherit' href='/api/connect/facebook'>
        登入
      </Button>
    </React.Fragment>
  )
}

export default UserBoxComponent
