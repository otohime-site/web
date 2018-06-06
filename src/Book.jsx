import { Component } from 'react';
import parser from 'semiquaver-parser/laundry';
import './Book.css';
import host from './host';

export default class Book extends Component {
  state = {
    progress: 0,
    loggedIn: false,
    newNickname: '',
    nickname: '',
    myNicknames: [],
  };
  componentDidMount = async () => {
    if (document.location.href.indexOf('https://maimai-net.com/') !== 0) {
      alert('請使用 Bookmarklet 形式觸發，並確定已經連上對應網站。'); // eslint-disable-line no-alert
      return;
    }
    this.handleGetNicknames();
    this.boundHandleGetNicknames = this.handleGetNicknames.bind(this);
    window.addEventListener('focus', this.boundHandleGetNicknames, false);
  };
  handleAddNickname = async () => {
    const body = {
      nickname: this.state.newNickname,
      privacy: 'public',
    };
    await fetch(`https://${host}/api/mai/new`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    return this.handleGetNicknames();
  };
  handleGetNicknames = async () => {
    let loggedIn = false;
    const res = await fetch(`https://${host}/api/mai/me`, {
      credentials: 'include',
    });
    if (!res.ok) {
      this.setState({ loggedIn });
      return;
    }
    const results = await res.json();
    loggedIn = true;
    const myNicknames = [];
    for (let i = 0; i < results.length; i += 1) {
      myNicknames.push(results[i].nickname);
    }
    window.removeEventListener('focus', this.boundHandleGetNicknames, false);
    this.setState({ loggedIn, myNicknames });
  };
  handleUpdate = async () => {
    try {
      const result = await parser(this.handleProgress); // eslint-disable-line no-unused-vars
      result.icon = 'na';
      await fetch(`https://${host}/api/mai/${this.state.nickname}`, {
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
  handleNewNicknameChange = (e) => {
    this.setState({ newNickname: e.target.value });
  };

  handleRadioChange = (e) => {
    this.setState({ nickname: e.target.value });
  };

  handleProgress = async (progress) => {
    this.setState({ progress });
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  render() {
    if (document.location.href.indexOf('https://maimai-net.com/') !== 0) {
      return (
        <div />
      );
    }
    const radios = [];
    for (let i = 0; i < this.state.myNicknames.length; i += 1) {
      const nickname = this.state.myNicknames[i];
      radios.push((
        <p key={nickname}>
          <input type="radio" name="nickname" value={nickname} onChange={this.handleRadioChange} />
          <a href={`https://${host}/mai/${nickname}`} rel="noopener noreferrer" target="_blank">{nickname}</a>
        </p>));
    }
    if (!this.state.loggedIn) {
      return (
        <div className="Book" lang="zh-TW">
          <h3>Updater</h3>
          <p>請先以 Facebook 帳號登入 Semiquaver 以使用服務。</p>
          <p>您的 Facebook 帳號將僅用於使用者認證，Semiquaver 團隊保證不會將您的 Facebook 帳號挪作他用或透漏給任何人。</p>
          <a className="btn" href={`https://${host}/api/connect/facebook`} rel="noopener noreferrer" target="_blank">登入</a>
        </div>);
    }
    return (
      <div className="Book" lang="zh-TW">
        <h3>Updater</h3>
        <p>請選擇要更新的成績單：</p>
        { radios }
        <p>
          <button onClick={this.handleUpdate} disabled={!this.state.nickname}>Update</button>
          <progress value={this.state.progress} max="100" />
        </p>
        <hr />
        <h3>建立新的成績單</h3>
        <p>請輸入暱稱：</p>
        <p>
          <input type="text" onChange={this.handleNewNicknameChange} />
          <button onClick={this.handleAddNickname} disabled={!this.state.newNickname}>Add</button>
        </p>
      </div>
    );
  }
}
