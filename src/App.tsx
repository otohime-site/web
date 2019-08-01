import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton, Link, Hidden } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import AppDrawer from './AppDrawer'
import Home from './Home'
import UserBox from './UserBox'
import Laundry from './laundry/components/Laundry'
import { AdapterLink } from './utils'
import './App.css'

const StyledAppBar = styled(AppBar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};

  .MuiToolbar-regular {
    height: ${props => props.theme.spacing(6)}px;
    min-height: ${props => props.theme.spacing(6)}px;
  }
`

const Title = styled(Typography)`
  flex-grow: 1;
  font-family: 'Carter One';
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
`
const AppMenuButton = styled(IconButton)`
  margin-right: ${props => props.theme.spacing(2) }px;
`
const StyledMain = styled('main')`
  margin-top: ${props => props.theme.spacing(6)}px;
  padding: ${props => props.theme.spacing(1)}px;
  flex: 1;
  min-width: 0;
`

const StyledFooter = styled('footer')`
  margin-top: ${props => props.theme.spacing(2)}px;
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-top: ${props => props.theme.spacing(2)}px;
  border-top: 1px solid #CCCCCC;
  color: #999999;
`

const StyledLink = styled(Link)`
  margin: 0 ${props => props.theme.spacing(2)}px;
`

function App () {
  const [drawerOpen, setDrawerOpen] = useState(false)

  function toggleDrawerOpen () {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <div className='App'>
      <StyledAppBar position='fixed' className={(drawerOpen) ? 'open' : ''}>
        <Toolbar>
          <AppMenuButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawerOpen}>
            <MenuIcon />
          </AppMenuButton>
          <Title variant='h6'>
            <Link component={AdapterLink} to='/'>
              Semiquaver
            </Link>
          </Title>
          <UserBox />
        </Toolbar>
      </StyledAppBar>
      <Hidden smUp={true}>
        <AppDrawer variant='temporary' drawerOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
      </Hidden>
      <Hidden xsDown={true} implementation='css'>
        <AppDrawer variant='permanent' drawerOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
      </Hidden>
      <StyledMain>
        <Route path='/' exact={true} component={Home} />
        <Route path='/mai' component={Laundry} />
        <StyledFooter>
          <Typography variant='body2'>
            Powered by Semiquaver Team.
            <StyledLink href='https://github.com/semiquaver-moe/' target='_blank' rel='noopener noreferrer'>
              GitHub
            </StyledLink>
          </Typography>
        </StyledFooter>
      </StyledMain>
    </div>
  )
}

export default hot(App)
