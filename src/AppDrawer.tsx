import styled from 'styled-components'
import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, Badge } from '@material-ui/core'
import CardIcon from '@material-ui/icons/CreditCard'
import ListIcon from '@material-ui/icons/List'
import HomeIcon from '@material-ui/icons/Home'
import LaundryIcon from '@material-ui/icons/LocalLaundryService'
import LaundryOutlinedIcon from '@material-ui/icons/LocalLaundryServiceOutlined'

import { AdapterLink } from './utils'
import { RootState } from './reducers'

const StyledDrawer = styled(Drawer)`
  width: ${props => props.theme.spacing(7) + 1}px;
  flex-shrink: 0;
  white-space: nowrap;
  &.open {
    width: 240px;
    .paper {
      width: 240px;
    }
  }
  .paper {
    top: ${props => props.theme.spacing(6)}px;
    width: ${props => props.theme.spacing(7) + 1}px;
  }
`
const NestedList = styled(List)`
  padding-left: ${props => props.theme.spacing(2)}px;
`
/*
const StyledBadge = styled(Badge)`
  .badge {
    top: 50%;
    right: -${props => props.theme.spacing(3)}px;
  }
`
*/

const AppDrawer: FunctionComponent<{
  drawerOpen: boolean
  toggleDrawerOpen: () => void
}> = ({ drawerOpen, toggleDrawerOpen }) => {
  const me = useSelector((state: RootState) => state.laundry.me)
  return (
    <StyledDrawer
      anchor='left'
      variant='permanent'
      open={drawerOpen}
      className={(drawerOpen) ? 'open' : ''}
      classes={{ paper: 'paper' }}
    >
      <List>
        <ListItem button={true} component={AdapterLink} to='/'>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary='首頁' />
        </ListItem>
        <ListItem button={true} component={AdapterLink} to='/mai/me'>
          <ListItemIcon><ListIcon /></ListItemIcon>
          <ListItemText primary='管理成績單' />
        </ListItem>
        <ListItem button={true} onClick={toggleDrawerOpen}>
          <ListItemIcon><LaundryOutlinedIcon /></ListItemIcon>
          <ListItemText primary='maimai' />
        </ListItem>
        <Collapse in={drawerOpen} timeout='auto' unmountOnExit={true}>
          <NestedList disablePadding={true}>
            {/* tslint:disable-next-line: jsx-no-multiline-js */}
            { me.map(player => (
              <ListItem
                button={true}
                key={player.id}
                component={AdapterLink}
                to={`/mai/${player.nickname}`}
              >
                <ListItemIcon><CardIcon /></ListItemIcon>
                <ListItemText primary={player.nickname} />
              </ListItem>
            ))}
          </NestedList>
        </Collapse>
      </List>
    </StyledDrawer>
  )
}

export default AppDrawer
