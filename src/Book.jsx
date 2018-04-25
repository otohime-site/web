import { Component } from 'react';
import parser from 'semiquaver-parser/laundry';
import './Book.css';

export default class Book extends Component {
  state = {
    progress: 0,
    nickname: '',
  };
  handleUpdate = async () => {
    try {
      const result = await parser(this.handleProgress); // eslint-disable-line no-unused-vars
      result.icon = '1524338941329';
      await fetch(`https://localhost:5000/api/mai/${this.state.nickname}`, {
        method: 'POST',
        body: JSON.stringify(result),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      alert('OK!'); // eslint-disable-line no-alert
    } catch (e) {
      alert('Error!'); // eslint-disable-line no-alert
    }
  };

  handleProgress = async (progress) => {
    this.setState({ progress });
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  render() {
    return (
      <div className="Book">
        <h3>Updater</h3>
        <p>Nickname: <input type="text" value={this.state.nickname} onChange={(e) => { this.setState({ nickname: e.target.value }); }} /></p>
        <p>
          <button onClick={this.handleUpdate}>Update</button>
          <progress value={this.state.progress} max="100" />
        </p>
      </div>
    );
  }
}
