import { Route, Link } from 'react-router-dom';
import Home from './Home';
import Laundry from './laundry/components/Laundry';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1><Link to="/">♬ Semiquaver</Link></h1>
      <div id="container">
        <Route path="/" exact component={Home} />
        <Route path="/mai" component={Laundry} />
      </div>
    </div>
  );
}
