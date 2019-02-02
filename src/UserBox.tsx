import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu, Icon } from 'semantic-ui-react'
import { getMe } from './laundry/actions'
import { useMappedState, useDispatch } from 'redux-react-hook'
import { RootState } from './reducers'

const UserBoxComponent: FunctionComponent = () => {
  const { me, loggedIn } = useMappedState(
    useCallback((state: RootState) => ({
      me: state.laundry.me,
      loggedIn: state.laundry.loggedIn
    }), [])
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMe.request())
  }, [])

  if (loggedIn) {
    return (
      <Menu.Menu position='right'>
        <Dropdown item={true} icon='user' text='我的成績單'>
          <Dropdown.Menu>
            {me.map(player => (<Dropdown.Item key={player.nickname} as={Link} to={`/mai/${player.nickname}`}>{player.nickname}</Dropdown.Item>))}
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to='/mai/me'>管理成績單</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item as='a' href='/api/logout'>
          <Icon name='sign out' />
          {' '}
          登出
          </Menu.Item>
      </Menu.Menu>
    )
  }
  return (
    <Menu.Menu position='right'>
      <Menu.Item as='a' href='/api/connect/facebook'>
        <Icon name='sign in' />
        {' '}
        登入
        </Menu.Item>
    </Menu.Menu>
  )
}

export default UserBoxComponent
