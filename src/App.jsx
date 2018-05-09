import { Route } from 'react-router-dom';
import Laundry from './laundry/components/Laundry';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1>Semiquaver</h1>
      <div>
        <Route path="/mai" component={Laundry} />
      </div>
    </div>
  );
}
