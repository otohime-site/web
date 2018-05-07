import { Route } from 'react-router-dom';
import Player from './laundry/Player';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1>Semiquaver</h1>
      <div>
        <Route path="/mai/:nickname" component={Player} />
      </div>
    </div>
  );
}
