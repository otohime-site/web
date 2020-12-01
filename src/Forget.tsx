import { Container, Typography, FormControlLabel, Checkbox, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import firebase from 'firebase/app'
import React, { FunctionComponent, useState } from 'react'
import { useHistory } from 'react-router'
import { useMutation } from 'urql'
import { useAuth } from './auth'
import { DeleteUserDocument } from './generated/graphql'

const Forget: FunctionComponent = () => {
  const auth = firebase.auth()
  const history = useHistory()
  const [user] = useAuth(auth)
  const [, deleteUser] = useMutation(DeleteUserDocument)
  const [confirmed, setConfirmed] = useState(false)
  const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>): void => setConfirmed(e.target.checked)
  const bye = async (): Promise<void> => {
    if (!confirmed || user == null) {
      return
    }
    try {
      await deleteUser()
      await user?.delete()
      history.push('/')
    } catch {
      alert('發生錯誤，請登出再登入後重試。')
    }
  }

  if (user == null) {
    return <>請先登入。</>
  }

  return <Container component='main' maxWidth='md'>
    <Typography variant='h6'>忘記我</Typography>
    <Alert severity='error'>
      <p>這個功能將會移除您在本站的所有個人資料，以滿足各地個資法規的要求。包含：</p>
      <ul>
        <li>Firebase 認證所儲存的 Facebook 內部 ID 與電子郵件地址（雖然我們不會利用它）</li>
        <li>所有遊戲的成績單與歷史紀錄</li>
      </ul>
      <p><strong>此動作無法復原。</strong></p>
      <p><strong>請確定您是為了完全清除您在 Otohime 的個人資料才執行這個功能。</strong></p>
      <FormControlLabel control={
        <Checkbox checked={confirmed} onChange={handleConfirm} color='primary' />
      } label='是的，請完全清除我在 Otohime 的個人資料。' />
      <p>如果執行失敗，可能是您登入太久了，請您嘗試登出、再登入、再重新執行一次。</p>
      <Button color='primary' variant='contained' disabled={!confirmed} onClick={bye}>Bye :)</Button>
    </Alert>

  </Container>
}

export default Forget
