import React, { Component } from 'react'
import parser from 'semiquaver-parser/laundry'
import './Book.css'
import host from './host'

export default class Book extends Component {
  state = {
    progress: 0,
    loggedIn: false,
    currentNickname: '',
    myNicknames: []
  }

  componentDidMount = async () => {
    if (document.location.href.indexOf('https://maimai-net.com/') !== 0) {
      alert('請使用 Bookmarklet 形式觸發，並確定已經連上對應網站。') // eslint-disable-line no-alert
      return
    }
    this.handleGetNicknames()
    // Dirty helper :)
    this.boundHandleGetNicknames = this.handleGetNicknames.bind(this)
    window.addEventListener('focus', this.boundHandleGetNicknames, false)
  }

  handleGetNicknames = async () => {
    let loggedIn = false
    const res = await fetch(`https://${host}/api/mai/me`, {
      credentials: 'include'
    })
    if (!res.ok) {
      this.setState({ loggedIn })
      return
    }
    const results = await res.json()
    loggedIn = true
    const myNicknames = []
    for (let i = 0; i < results.length; i += 1) {
      myNicknames.push(results[i].nickname)
    }
    this.setState({ loggedIn, myNicknames })
  }

  handleUpdate = async () => {
    try {
      const { currentNickname } = this.state
      const result = await parser(this.handleProgress) // eslint-disable-line no-unused-vars
      result.icon = 'na'
      await fetch(`https://${host}/api/mai/${currentNickname}`, {
        method: 'POST',
        body: JSON.stringify(result),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      alert('OK!') // eslint-disable-line no-alert
    } catch (e) {
      alert('Error!') // eslint-disable-line no-alert
    }
  }

  handleRadioChange = (e) => {
    this.setState({ currentNickname: e.target.value })
  }

  handleProgress = async (progress) => {
    this.setState({ progress })
    return new Promise(resolve => setTimeout(resolve, 1000))
  }

  render () {
    if (document.location.href.indexOf('https://maimai-net.com/') !== 0) {
      return (
        <div />
      )
    }
    const {
      myNicknames, loggedIn, currentNickname, progress
    } = this.state
    const radios = []
    for (let i = 0; i < myNicknames.length; i += 1) {
      const nickname = myNicknames[i]
      radios.push((
        <p key={nickname} className='nickname'>
          {/* eslint-disable-next-line */}
          <label>
            <input type='radio' name='nickname' value={nickname} onChange={this.handleRadioChange} />
            {' '}
            {nickname}
          </label>
          <a href={`https://${host}/mai/${nickname}`} rel='noopener noreferrer' target='_blank' title='新分頁打開網頁，檢視成績單'>(檢視)</a>
        </p>))
    }
    if (!loggedIn) {
      return (
        <div className='smq-bookmarklet' lang='zh-TW'>
          <h3>Updater</h3>
          <p>請先以 Facebook 帳號登入 Semiquaver 以使用服務。</p>
          <p>您的 Facebook 帳號將僅用於使用者認證，Semiquaver 團隊保證不會將您的 Facebook 帳號挪作他用或透漏給任何人。</p>
          <a className='btn' href={`https://${host}/api/connect/facebook`} rel='noopener noreferrer' target='_blank'>登入</a>
        </div>)
    }
    return (
      <div className='smq-bookmarklet' lang='zh-TW'>
        <h3>Updater</h3>
        <p>請選擇要更新的成績單：</p>
        {radios}
        {(radios.length === 0) ? '您還沒有任何成績單。請從下面「管理成績單」頁面新增一個！' : ''}
        <p>
          <button type='button' onClick={this.handleUpdate} disabled={!currentNickname}>開始更新</button>
        </p>
        <p>
          <progress value={progress} max='100' />
        </p>
        <p><a href={`https://${host}/mai/me`} className='btn' rel='noopener noreferrer' target='_blank'>管理成績單</a></p>
      </div>
    )
  }
}
