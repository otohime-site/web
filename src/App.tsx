import React from 'react'
import { Route, Link } from 'react-router-dom'
import { Icon, Divider, Menu, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css'

import Home from './Home'
import UserBox from './UserBox'
import Laundry from './laundry/components/Laundry'
import './App.css'

export default function App () {
  return (
    <div className='App'>
      <Menu secondary={true} fixed='top' id='header'>
        <Container>
          <Menu.Item className='logo'>
            <Link to='/'>
              <Icon name='music' />
                Semiquaver
            </Link>
          </Menu.Item>
          <UserBox />
        </Container>
      </Menu>
      <Container id='container'>
        <Route path='/' exact={true} component={Home} />
        <Route path='/mai' component={Laundry} />
      </Container>
      <Divider />
      <Container id='footer'>
        <p>
          Powered by Semiquaver Team.
          <a href='https://github.com/semiquaver-moe/' target='_blank' rel='noopener noreferrer'>
            <Icon name='github' />
            {' '}
GitHub
          </a>
        </p>
      </Container>
    </div>
  )
}
