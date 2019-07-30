import React, { FunctionComponent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Formik, Field, Form, FormikActions } from 'formik'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
         FormControl, InputLabel, Button, MenuItem, Paper,
         Table, TableRow, TableCell, TableHead, TableBody, Typography } from '@material-ui/core'
import { TextField, Select } from 'formik-material-ui'
import { getMe } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPromise } from '../utils'
import { LaundryError } from '../types'
import { RootState } from '../../reducers'

const SpacedButton = styled(Button)`
  margin: ${(props) => props.theme.spacing(1)}px;
`

const privacyOptions = {
  'public': '公開',
  'anonymous': '匿名',
  'private': '私人'
}

interface UserModalProps {
  open: boolean,
  setClose: () => void,
  nickname?: string,
  privacy?: 'public' | 'anonymous' | 'private'
}

const UserModal: FunctionComponent<UserModalProps> = ({ open, setClose, nickname, privacy }) => {
  interface Values {
    nickname: string,
    privacy: 'public' | 'anonymous' | 'private'
  }
  const initialValues: Values = {
    nickname: nickname || '',
    privacy: privacy || 'public'
  }
  const validate = (values: Values) => {
    let errors: { nickname?: string } = {}
    if (!values.nickname) {
      errors.nickname = '請輸入暱稱。'
    }
    if (/[^0-9a-z\-_]/.test(values.nickname)) {
      errors.nickname = '暱稱格式不正確。'
    }
    return errors
  }
  const handleSubmit = async (values: Values, actions: FormikActions<Values>) => {
    try {
      await fetchPromise(
        (nickname) ? `/api/mai/${nickname}/update` : '/api/mai/new',
        values
      )
      setClose()
    } catch (e) {
      if (e instanceof LaundryError && e.content.err === 'exists') {
        actions.setFieldError('nickname', '該暱稱已存在，請換一個。')
      } else {
        actions.setFieldError('nickname', '發生錯誤，可能是網路問題或內部錯誤。')
      }
    }
    actions.setSubmitting(false)
  }

  const render = () => (
    <Form>
      <DialogContent>
        <Field label='暱稱' name='nickname' component={TextField} />
        <DialogContentText>暱稱將會作為網址的一部分。僅能使用小寫英數字、「-」或「_」。</DialogContentText>
        <FormControl>
          <InputLabel>隱私</InputLabel>
          <Field
            name='privacy'
            component={Select}
          >
            <MenuItem value='public'>{privacyOptions['public']}</MenuItem>
            <MenuItem value='anonymous'>{privacyOptions['anonymous']}</MenuItem>
            <MenuItem value='private'>{privacyOptions['private']}</MenuItem>
          </Field>
        </FormControl>
        <DialogContentText>隱私會決定您的成績單是否會出現在排行榜或玩家搜尋介面等公開項目中。</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='primary' type='submit'>{(nickname) ? '編輯' : '新增'}</Button>
        <Button onClick={setClose}>取消</Button>
      </DialogActions>
    </Form>
  )

  return (
    <Dialog open={open} onClose={setClose}>
      <DialogTitle>{(nickname) ? '編輯成績單' : '新增成績單'}</DialogTitle>
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={validate}
        render={render}
      />
    </Dialog>
  )
}

interface UserDeleteModalProps {
  open: boolean,
  setClose: (() => void),
  nickname: string
}

const UserDeleteModal: FunctionComponent<UserDeleteModalProps> = ({ open, setClose, nickname }) => {
  interface Values {
    confirm_nickname: string
  }
  const initialValues: Values = {
    confirm_nickname: ''
  }
  const validate = (values: Values) => {
    let errors: { confirm_nickname?: string } = {}
    if (!values.confirm_nickname) {
      errors.confirm_nickname = '請輸入暱稱。'
    }
    if (values.confirm_nickname !== nickname) {
      errors.confirm_nickname = '暱稱不正確。'
    }
    return errors
  }
  const handleSubmit = async (values: Values, actions: FormikActions<Values>) => {
    try {
      await fetchPromise(
        `/api/mai/${nickname}/delete`,
        values
      )
      setClose()
    } catch (e) {
      actions.setFieldError('confirm_nickname', '發生錯誤，可能是網路問題或內部錯誤。')
    }
    actions.setSubmitting(false)
  }

  const render = () => (
    <Form>
      <DialogContent>
        <DialogContentText>
          您確定刪除成績單「
            {nickname}
          」嗎？
          </DialogContentText>
        <DialogContentText><strong>所有此成績單的現有與歷史紀錄將被刪除，且無法復原。</strong></DialogContentText>
        <DialogContentText>如果你真的確定的話，請在下方重新輸入您的暱稱。</DialogContentText>
        <Field label='暱稱' name='confirm_nickname' component={TextField} />
      </DialogContent>
      <DialogActions>
        <Button color='secondary' type='submit'>確定刪除！</Button>
        <Button onClick={setClose}>取消</Button>
      </DialogActions>
    </Form>
  )
  return (
    <Dialog open={open} onClose={setClose}>
      <DialogTitle>刪除成績單 </DialogTitle>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={validate}
        render={render}
      />
    </Dialog>
  )
}
const UserComponent: FunctionComponent = () => {
  const me = useSelector((state: RootState) => state.laundry.me)
  const loggedIn = useSelector((state: RootState) => state.laundry.loggedIn)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMe.request())
  }, [])

  const [userModalOpened, setUserModalOpened] = useState(false)
  const [userModalNickname, setUserModalNickname] = useState('')
  const [userModalPrivacy, setUserModalPrivacy] = useState('public' as ('public' | 'anonymous' | 'private'))

  const [userDeleteModalOpened, setUserDeleteModalOpened] = useState(false)
  const [userDeleteModalNickname, setUserDeleteModalNickname] = useState('')

  const openUserModal = (
    nickname: string, privacy: 'public' | 'anonymous' | 'private'
  ) => (
    (e: React.MouseEvent) => {
      setUserModalNickname(nickname)
      setUserModalPrivacy(privacy)
      setUserModalOpened(true)
    }
  )
  const closeUserModal = () => {
    setUserModalOpened(false)
    dispatch(getMe.request())
  }
  const openUserDeleteModal = (
    nickname: string
  ) => (
    (e: React.MouseEvent) => {
      setUserDeleteModalNickname(nickname)
      setUserDeleteModalOpened(true)
    }
  )
  const closeUserDeleteModal = () => {
    setUserDeleteModalOpened(false)
    dispatch(getMe.request())
  }
  if (!loggedIn) {
    return (
        <p>請先登入。</p>
    )
  }
  return (
    <React.Fragment>
      <Typography variant='h5'>管理我的成績單</Typography>
      <SpacedButton
        variant='contained'
        color='primary'
        onClick={openUserModal('', 'public')}
      >
        新增成績單
      </SpacedButton>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component='th'>暱稱</TableCell>
              <TableCell component='th'>隱私設定</TableCell>
              <TableCell component='th'>編輯/刪除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* tslint:disable-next-line:jsx-no-multiline-js */}
            {(me.length > 0) ? (me.map(player => (
              <TableRow key={player.id}>
                <TableCell>{player.nickname}</TableCell>
                <TableCell>{privacyOptions[player.privacy]}</TableCell>
                <TableCell>
                  <SpacedButton
                    variant='outlined'
                    onClick={openUserModal(player.nickname, player.privacy)}
                  >
                    編輯
                  </SpacedButton>
                  <SpacedButton
                    variant='outlined'
                    color='secondary'
                    onClick={openUserDeleteModal(player.nickname)}
                  >
                    刪除
                  </SpacedButton>
                </TableCell>
              </TableRow>
            )))
              : <TableRow><TableCell colSpan={3}>你還沒有成績單。新增一個吧！</TableCell></TableRow>
          }
          </TableBody>
        </Table>
      </Paper>
      <UserModal
        open={userModalOpened}
        setClose={closeUserModal}
        nickname={userModalNickname}
        privacy={userModalPrivacy}
      />
      <UserDeleteModal
        open={userDeleteModalOpened}
        setClose={closeUserDeleteModal}
        nickname={userDeleteModalNickname}
      />
    </React.Fragment>
  )
}

export default UserComponent
