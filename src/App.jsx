import { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    name: 'Semiquaver',
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.name}</h1>
      </div>
    );
  }
}
