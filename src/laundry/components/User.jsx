import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Modal, Message, Table, Button, Icon } from 'semantic-ui-react';
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
    getMe: PropTypes.func.isRequired,
    openUserModal: PropTypes.func.isRequired,
    closeUserModal: PropTypes.func.isRequired,
    openUserDeleteModal: PropTypes.func.isRequired,
    closeUserDeleteModal: PropTypes.func.isRequired,
    newOrUpdatePlayer: PropTypes.func.isRequired,
    deletePlayer: PropTypes.func.isRequired,
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
    this.props.getMe();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.newOrUpdatePlayerResult !== this.props.newOrUpdatePlayerResult) {
      if (this.props.newOrUpdatePlayerResult.status === 'ok') {
        this.props.closeUserModal();
        this.props.getMe();
      }
    }
    if (prevProps.deletePlayerResult !== this.props.deletePlayerResult) {
      if (this.props.deletePlayerResult.status === 'ok') {
        this.props.closeUserDeleteModal();
        this.props.getMe();
      }
    }
  }
  handleSubmit = (values) => {
    this.props.newOrUpdatePlayer(this.props.userModal.nickname, values);
  };
  validateDeleteNickname = val => (
    (val !== this.props.userDeleteModal.nickname) ? '暱稱不一致。' : undefined
  );
  handleDeleteSubmit = (values) => {
    this.props.deletePlayer(this.props.userDeleteModal.nickname, values);
  };
  render() {
    if (!this.props.loggedIn) {
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
          onClick={this.props.openUserModal({
            nickname: '',
            privacy: 'public',
          })}
        >
          <Icon name="plus" />新增成績單
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
            { (this.props.me.length > 0) ? (this.props.me.map(player => (
              <tr key={player.id}>
                <td>{player.nickname}</td>
                <td>{privacyOptions.get(player.privacy)}</td>
                <td>
                  <Button
                    positive
                    onClick={
                    this.props.openUserModal({
                      nickname: player.nickname,
                      privacy: player.privacy,
                    })
                  }
                  >
                      編輯
                  </Button>
                  <Button
                    negative
                    onClick={this.props.openUserDeleteModal(player.nickname)}
                  >
                      刪除
                  </Button>
                </td>
              </tr>
            ))) :
            <tr><td colSpan="3">你還沒有成績單。新增一個吧！</td></tr>
            }
          </tbody>
        </Table>
        <Modal size="mini" open={this.props.userModal.open} onClose={this.props.closeUserModal}>
          <Modal.Header>{(this.props.userModal.nickname) ? '編輯成績單' : '新增成績單'}</Modal.Header>
          <Modal.Content>
            <UserForm
              enableReinitialize
              edit={!!this.props.userModal.nickname}
              onSubmit={this.handleSubmit}
              initialValues={{
                nickname: this.props.userModal.nickname,
                privacy: this.props.userModal.privacy,
              }}
            />
            { (this.props.newOrUpdatePlayerResult.status === 'err') ? (
              <Message error>
                { (this.props.newOrUpdatePlayerResult.err.content &&
                   this.props.newOrUpdatePlayerResult.err.content.err === 'exists') ?
                  '該暱稱已存在，請換一個。' : '發生錯誤，請通報 :('
                }
              </Message>
            ) : '' }
          </Modal.Content>
        </Modal>
        <Modal size="mini" open={this.props.userDeleteModal.open} onClose={this.props.closeUserDeleteModal}>
          <Modal.Header>刪除成績單 </Modal.Header>
          <Modal.Content>
            <p>您確定刪除成績單「{this.props.userDeleteModal.nickname}」嗎？</p>
            <p><strong>所有此成績單的現有與歷史紀錄將被刪除，且無法復原。</strong></p>
            <p>如果你真的確定的話，請在下方重新輸入您的暱稱。</p>
            <UserDeleteForm
              validateNickname={this.validateDeleteNickname}
              onSubmit={this.handleDeleteSubmit}
            />
            { (this.props.deletePlayerResult.status === 'err') ? (
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
  getMe: () => {
    dispatch(getMe());
  },
  openUserModal: values => (
    () => dispatch(openUserModal(values))
  ),
  closeUserModal: () => {
    dispatch(closeUserModal());
  },
  openUserDeleteModal: nickname => (
    () => dispatch(openUserDeleteModal(nickname))
  ),
  closeUserDeleteModal: () => {
    dispatch(closeUserDeleteModal());
  },
  newOrUpdatePlayer: (nickname, values) => {
    dispatch(newOrUpdatePlayer(nickname, values));
  },
  deletePlayer: (nickname, values) => {
    dispatch(deletePlayer(nickname, values));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
