import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {
  Modal, Message, Table, Button, Icon,
} from 'semantic-ui-react';
import { InputField, SelectField } from 'react-semantic-redux-form';
import {
  getMe, openUserModal, closeUserModal,
  openUserDeleteModal, closeUserDeleteModal,
  newOrUpdatePlayer, deletePlayer,
} from '../actions';

const privacyOptions = new Map([
  ['public', '公開'],
  ['anonymous', '匿名'],
  ['private', '私人'],
]);

const privacyOptionsForForm = [];
privacyOptions.forEach((value, key) => {
  privacyOptionsForForm.push({ key, value: key, text: value });
});

const validateNicknameField = val => ((!val || /[^0-9a-z\-_]/.test(val)) ? '不合規格或空白。' : undefined);

let UserForm = ({
  edit, handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="ui form">
    <Field
      name="nickname"
      component={InputField}
      id="form-nickname"
      validate={validateNicknameField}
      label="暱稱"
    />
    <p>暱稱將會作為網址的一部分。</p>
    <p>僅能使用小寫英數字、「-」或「_」。</p>
    <Field
      name="privacy"
      component={SelectField}
      options={privacyOptionsForForm}
      id="form-privacy"
      label="隱私"
    />
    <p>隱私會決定您的成績單是否會出現在排行榜或玩家搜尋介面等公開項目中。</p>
    <Button type="submit" primary>{(edit) ? '編輯' : '新增'}</Button>
  </form>
);

UserForm.propTypes = {
  edit: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

UserForm = reduxForm({ form: 'laundryUserForm' })(UserForm);

let UserDeleteForm = ({ handleSubmit, validateNickname }) => (
  <form onSubmit={handleSubmit} className="ui form">
    <Field
      name="confirm_nickname"
      component={InputField}
      id="form-confirm-nickname"
      validate={validateNickname}
    />
    <Button type="submit" negative>確定刪除！</Button>
  </form>
);

UserDeleteForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  validateNickname: PropTypes.func.isRequired,
};

UserDeleteForm = reduxForm({ form: 'laundryUserDeleteForm' })(UserDeleteForm);

class User extends Component {
  static propTypes = {
    dGetMe: PropTypes.func.isRequired,
    dOpenUserModal: PropTypes.func.isRequired,
    dCloseUserModal: PropTypes.func.isRequired,
    dOpenUserDeleteModal: PropTypes.func.isRequired,
    dCloseUserDeleteModal: PropTypes.func.isRequired,
    dNewOrUpdatePlayer: PropTypes.func.isRequired,
    dDeletePlayer: PropTypes.func.isRequired,
    me: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      privacy: PropTypes.string.isRequired,
    })),
    userModal: PropTypes.shape({
      open: PropTypes.bool,
      nickname: PropTypes.string,
      privacy: PropTypes.string,
    }),
    userDeleteModal: PropTypes.shape({
      open: PropTypes.bool,
      nickname: PropTypes.string,
    }),
    loggedIn: PropTypes.bool,
    newOrUpdatePlayerResult: PropTypes.shape({
      status: PropTypes.string,
      err: PropTypes.instanceOf(Error),
    }),
    deletePlayerResult: PropTypes.shape({
      status: PropTypes.string,
      err: PropTypes.instanceOf(Error),
    }),
  };

  static defaultProps = {
    me: [],
    loggedIn: false,
    userModal: { open: false },
    userDeleteModal: { open: false },
    newOrUpdatePlayerResult: {},
    deletePlayerResult: {},
  };

  componentDidMount() {
    const { dGetMe } = this.props;
    dGetMe();
  }

  componentDidUpdate(prevProps) {
    const {
      newOrUpdatePlayerResult, deletePlayerResult,
      dCloseUserModal, dCloseUserDeleteModal, dGetMe,
    } = this.props;
    if (prevProps.newOrUpdatePlayerResult !== newOrUpdatePlayerResult) {
      if (newOrUpdatePlayerResult.status === 'ok') {
        dCloseUserModal();
        dGetMe();
      }
    }
    if (prevProps.deletePlayerResult !== deletePlayerResult) {
      if (deletePlayerResult.status === 'ok') {
        dCloseUserDeleteModal();
        dGetMe();
      }
    }
  }

  handleSubmit = (values) => {
    const { dNewOrUpdatePlayer, userModal } = this.props;
    dNewOrUpdatePlayer(userModal.nickname, values);
  };

  validateDeleteNickname = (val) => {
    const { userDeleteModal } = this.props;
    return (val !== userDeleteModal.nickname) ? '暱稱不一致。' : undefined;
  };

  handleDeleteSubmit = (values) => {
    const { dDeletePlayer, userDeleteModal } = this.props;
    dDeletePlayer(userDeleteModal.nickname, values);
  };

  render() {
    const {
      loggedIn, me, userModal, userDeleteModal,
      newOrUpdatePlayerResult, deletePlayerResult,
      dOpenUserModal, dCloseUserModal,
      dOpenUserDeleteModal, dCloseUserDeleteModal,
    } = this.props;
    if (!loggedIn) {
      return (
        <Message>
          請先登入。
        </Message>
      );
    }
    return (
      <div>
        <h3>管理我的成績單</h3>
        <Button
          primary
          onClick={dOpenUserModal({
            nickname: '',
            privacy: 'public',
          })}
        >
          <Icon name="plus" />
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
            { (me.length > 0) ? (me.map(player => (
              <tr key={player.id}>
                <td>{player.nickname}</td>
                <td>{privacyOptions.get(player.privacy)}</td>
                <td>
                  <Button
                    positive
                    onClick={
                    dOpenUserModal({
                      nickname: player.nickname,
                      privacy: player.privacy,
                    })
                  }
                  >
                      編輯
                  </Button>
                  <Button
                    negative
                    onClick={dOpenUserDeleteModal(player.nickname)}
                  >
                      刪除
                  </Button>
                </td>
              </tr>
            )))
              : <tr><td colSpan="3">你還沒有成績單。新增一個吧！</td></tr>
            }
          </tbody>
        </Table>
        <Modal size="mini" open={userModal.open} onClose={dCloseUserModal}>
          <Modal.Header>{(userModal.nickname) ? '編輯成績單' : '新增成績單'}</Modal.Header>
          <Modal.Content>
            <UserForm
              enableReinitialize
              edit={!!userModal.nickname}
              onSubmit={this.handleSubmit}
              initialValues={{
                nickname: userModal.nickname,
                privacy: userModal.privacy,
              }}
            />
            { (newOrUpdatePlayerResult.status === 'err') ? (
              <Message error>
                { (newOrUpdatePlayerResult.err.content
                   && newOrUpdatePlayerResult.err.content.err === 'exists')
                  ? '該暱稱已存在，請換一個。' : '發生錯誤，請通報 :('
                }
              </Message>
            ) : '' }
          </Modal.Content>
        </Modal>
        <Modal size="mini" open={userDeleteModal.open} onClose={dCloseUserDeleteModal}>
          <Modal.Header>刪除成績單 </Modal.Header>
          <Modal.Content>
            <p>
您確定刪除成績單「
              {userDeleteModal.nickname}
」嗎？
            </p>
            <p><strong>所有此成績單的現有與歷史紀錄將被刪除，且無法復原。</strong></p>
            <p>如果你真的確定的話，請在下方重新輸入您的暱稱。</p>
            <UserDeleteForm
              validateNickname={this.validateDeleteNickname}
              onSubmit={this.handleDeleteSubmit}
            />
            { (deletePlayerResult.status === 'err') ? (
              <Message error>
                發生錯誤，請通報 :(
              </Message>
            ) : '' }
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  me: state.laundry.me,
  loggedIn: state.laundry.loggedIn,
  userModal: state.laundry.userModal,
  userDeleteModal: state.laundry.userDeleteModal,
  newOrUpdatePlayerResult: state.laundry.newOrUpdatePlayerResult,
  deletePlayerResult: state.laundry.deletePlayerResult,
});
const mapDispatchToProps = dispatch => ({
  dGetMe: () => {
    dispatch(getMe());
  },
  dOpenUserModal: values => (
    () => dispatch(openUserModal(values))
  ),
  dCloseUserModal: () => {
    dispatch(closeUserModal());
  },
  dOpenUserDeleteModal: nickname => (
    () => dispatch(openUserDeleteModal(nickname))
  ),
  dCloseUserDeleteModal: () => {
    dispatch(closeUserDeleteModal());
  },
  dNewOrUpdatePlayer: (nickname, values) => {
    dispatch(newOrUpdatePlayer(nickname, values));
  },
  dDeletePlayer: (nickname, values) => {
    dispatch(deletePlayer(nickname, values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
