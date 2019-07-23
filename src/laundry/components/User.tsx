import React, { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { FormikActions } from 'formik'
import { Modal, Message, Table, Icon, Button } from 'semantic-ui-react'
import { Form, Input, Dropdown, Button as FormButton } from 'formik-semantic-ui'
import { getMe } from '../actions'
import { useDispatch, useMappedState } from 'redux-react-hook'
import { fetchPromise } from '../utils'
import { LaundryError } from '../types'
import { RootState } from '../../reducers'

const privacyOptions = {
  'public': '公開',
  'anonymous': '匿名',
  'private': '私人'
}

const privacyOptionsForForm = [
  { key: 'public', value: 'public', text: privacyOptions['public'] },
  { key: 'anonymous', value: 'anonymous', text: privacyOptions['anonymous'] },
  { key: 'private', value: 'private', text: privacyOptions['private'] }
]

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

  return (
    <Modal size='mini' open={open} onClose={setClose}>
      <Modal.Header>{(nickname) ? '編輯成績單' : '新增成績單'}</Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validate={validate}
        >
          <Input label='暱稱' name='nickname' />
          <p>暱稱將會作為網址的一部分。</p>
          <p>僅能使用小寫英數字、「-」或「_」。</p>
          <Dropdown
            options={privacyOptionsForForm}
            name='privacy'
            label='隱私'
          />
          <p>隱私會決定您的成績單是否會出現在排行榜或玩家搜尋介面等公開項目中。</p>
          <FormButton.Submit>{(nickname) ? '編輯' : '新增'}</FormButton.Submit>
        </Form>
      </Modal.Content>
    </Modal>
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

  return (
    <Modal size='mini' open={open} onClose={setClose}>
      <Modal.Header>刪除成績單 </Modal.Header>
      <Modal.Content>
        <p>
          您確定刪除成績單「
            {nickname}
          」嗎？
          </p>
        <p><strong>所有此成績單的現有與歷史紀錄將被刪除，且無法復原。</strong></p>
        <p>如果你真的確定的話，請在下方重新輸入您的暱稱。</p>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validate={validate}
        >
          <Input label='暱稱' name='confirm_nickname' />
          <FormButton.Submit negative={true}>確定刪除！</FormButton.Submit>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
const UserComponent: FunctionComponent = () => {
  const { me, loggedIn } = useMappedState(
    useCallback((state: RootState) => ({
      me: state.laundry.me,
      loggedIn: state.laundry.loggedIn
    }), [])
  )
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
      <Message>
        請先登入。
      </Message>
    )
  }
  return (
    <div>
      <h3>管理我的成績單</h3>
      <Button
        primary={true}
        onClick={openUserModal('', 'public')}
      >
        <Icon name='plus' />
        新增成績單
      </Button>
      <Table>
        <thead>
          <tr>
            <th>暱稱</th>
            <th>隱私設定</th>
            <Table.HeaderCell width={4}>編輯/刪除</Table.HeaderCell>
          </tr>
        </thead>
        <tbody>
          {/* tslint:disable-next-line:jsx-no-multiline-js */}
          {(me.length > 0) ? (me.map(player => (
            <tr key={player.id}>
              <td>{player.nickname}</td>
              <td>{privacyOptions[player.privacy]}</td>
              <td>
                <Button
                  positive={true}
                  onClick={openUserModal(player.nickname, player.privacy)}
                >
                  編輯
                </Button>
                <Button
                  negative={true}
                  onClick={openUserDeleteModal(player.nickname)}
                >
                  刪除
                </Button>
              </td>
            </tr>
          )))
            : <tr><td colSpan={3}>你還沒有成績單。新增一個吧！</td></tr>
        }
        </tbody>
      </Table>
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
    </div>
  )
}

export default UserComponent
