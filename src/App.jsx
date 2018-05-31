import { Route, Link } from 'react-router-dom';
import Laundry from './laundry/components/Laundry';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1><Link to="/">Semiquaver</Link></h1>
      <div>
        <Route path="/mai" component={Laundry} />
      </div>
    </div>
  );
}
