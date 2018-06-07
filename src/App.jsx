import { Route, Link } from 'react-router-dom';
import { Menu, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';

import Home from './Home';
import UserBox from './UserBox';
import Laundry from './laundry/components/Laundry';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Menu secondary fixed="top" id="header">
        <Container>
          <Menu.Item className="logo"><Link to="/">♬ Semiquaver</Link></Menu.Item>
          <UserBox />
        </Container>
      </Menu>
      <Container id="container">
        <Route path="/" exact component={Home} />
        <Route path="/mai" component={Laundry} />
      </Container>
    </div>
  );
}
