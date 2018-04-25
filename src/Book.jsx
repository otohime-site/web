import { Component } from 'react';
import parser from 'semiquaver-parser/laundry';
import './Book.css';

export default class Book extends Component {
  state = {
    progress: 0,
    nickname: '',
    myNicknames: [],
  };
  componentDidMount = async () => {
    const res = await fetch('https://localhost:5000/api/mai/me', {
      credentials: 'include',
    });
    const results = await res.json();
    const myNicknames = [];
    for (let i = 0; i < results.length; i += 1) {
      myNicknames.push(results[i].nickname);
    }
    this.setState({ myNicknames });
  };
  handleUpdate = async () => {
    try {
      const result = await parser(this.handleProgress); // eslint-disable-line no-unused-vars
      result.icon = 'na';
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

  handleRadioChange = (e) => {
    this.setState({ nickname: e.target.value });
  };

  handleProgress = async (progress) => {
    this.setState({ progress });
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  render() {
    const radios = [];
    for (let i = 0; i < this.state.myNicknames.length; i += 1) {
      const nickname = this.state.myNicknames[i];
      radios.push(<p key={nickname}><input type="radio" name="nickname" value={nickname} onChange={this.handleRadioChange} /> {nickname}</p>);
    }
    return (
      <div className="Book">
        <h3>Updater</h3>
        <p>Nickname:</p>
        { radios }
        <p>
          <button onClick={this.handleUpdate}>Update</button>
          <progress value={this.state.progress} max="100" />
        </p>
      </div>
    );
  }
}
