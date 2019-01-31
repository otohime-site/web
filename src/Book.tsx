import React, { Component, FunctionComponent, useEffect, useState, ChangeEvent } from 'react'
import parser from 'semiquaver-parser/laundry'
import './Book.css'
import host from './host'

const book: FunctionComponent = () => {
  const noMaimaiNet = (document.location.href.indexOf('https://maimai-net.com/') !== 0)
  const [loggedIn, setLoggedIn] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentNickname, setCurrentNickname] = useState('')
  const [myNicknames, setMyNicknames] = useState([] as string[])

  const handleGetNicknames = async () => {
    const res = await fetch(`https://${host}/api/mai/me`, {
      credentials: 'include'
    })
    if (!res.ok) {
      setLoggedIn(false)
      return
    }
    const results = await res.json()
    const myNicknames = []
    for (let i = 0; i < results.length; i += 1) {
      myNicknames.push(results[i].nickname)
    }
    setLoggedIn(true)
    setMyNicknames(myNicknames)
  }

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentNickname(e.target.value)
  }

  const handleProgress = async (progress: number) => {
    setProgress(progress)
    return new Promise(resolve => setTimeout(resolve, 1000))
  }

  const handleUpdate = async () => {
    try {
      const result = await parser(handleProgress) // eslint-disable-line no-unused-vars
      result.icon = 'na'
      await fetch(`https://${host}/api/mai/${currentNickname}`, {
        method: 'POST',
        body: JSON.stringify(result),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      alert('OK!')
    } catch (e) {
      alert('Error!')
    }
  }

  useEffect(() => {
    if (noMaimaiNet) {
      alert('請使用 Bookmarklet 形式觸發，並確定已經連上對應網站。')
      return
    }
    window.addEventListener('focus', handleGetNicknames, false)
    return () => {
      window.removeEventListener('focus', handleGetNicknames, false)
    }
  }, [])
  if (noMaimaiNet) {
    return (
      <></>
    )
  }
  const radios = []
  for (let i = 0; i < myNicknames.length; i += 1) {
    const nickname = myNicknames[i]
    radios.push((
      <p key={nickname} className='nickname'>
        {/* eslint-disable-next-line */}
        <label>
          <input type='radio' name='nickname' value={nickname} onChange={handleRadioChange} />
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
        <button type='button' onClick={handleUpdate} disabled={!currentNickname}>開始更新</button>
      </p>
      <p>
        <progress value={progress} max='100' />
      </p>
      <p><a href={`https://${host}/mai/me`} className='btn' rel='noopener noreferrer' target='_blank'>管理成績單</a></p>
    </div>
  )
}
export default book
