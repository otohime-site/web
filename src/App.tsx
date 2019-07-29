import React, { useState } from 'react'
import { hot } from 'react-hot-loader/root'
import styled from 'styled-components'
import { Route, Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton, Theme } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/styles'
import MenuIcon from '@material-ui/icons/Menu'

import AppDrawer from './AppDrawer'
import Home from './Home'
import UserBox from './UserBox'
import Laundry from './laundry/components/Laundry'
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
`
const AppMenuButton = styled(IconButton)`
  margin-right: ${props => props.theme.spacing(2) }px;
`
const StyledMain = styled('main')`
  margin-top: ${props => props.theme.spacing(6)}px;
  padding: ${props => props.theme.spacing(1)}px;
  flex: 1;
`

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    toolbar: { ...theme.mixins.toolbar }
  })
))

function App () {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles()

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
            <Link to='/'>
              Semiquaver
            </Link>
          </Title>
          <UserBox />
        </Toolbar>
      </StyledAppBar>
      <AppDrawer drawerOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
      <StyledMain>
        <Route path='/' exact={true} component={Home} />
        <Route path='/mai' component={Laundry} />
        <footer>
          <p>
            Powered by Semiquaver Team.
            <a href='https://github.com/semiquaver-moe/' target='_blank' rel='noopener noreferrer'>
              GitHub
            </a>
          </p>
        </footer>
      </StyledMain>
    </div>
  )
}

export default hot(App)
