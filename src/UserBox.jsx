import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';
import { getMe } from './laundry/actions';

class UserBox extends Component {
  static propTypes = {
    getMe: PropTypes.func.isRequired,
    me: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      privacy: PropTypes.string.isRequired,
    })),
    loggedIn: PropTypes.bool,
  };
  static defaultProps = {
    me: [],
    loggedIn: false,
  };
  componentDidMount() {
    this.props.getMe();
  }
  render() {
    if (this.props.loggedIn) {
      return (
        <Menu.Menu position="right">
          <Dropdown item icon="user" text="我的成績單">
            <Dropdown.Menu>
              {this.props.me.map(player => (
                <Dropdown.Item key={player.nickname} as={Link} to={`/mai/${player.nickname}`}>{player.nickname}</Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item>管理成績單</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item as="a" href="/api/logout"><Icon name="sign out" /> 登出</Menu.Item>
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position="right">
        <Menu.Item as="a" href="/api/connect/facebook"><Icon name="sign in" /> 登入</Menu.Item>
      </Menu.Menu>
    );
  }
}
const mapStateToProps = state => ({
  me: state.laundry.me,
  loggedIn: state.laundry.loggedIn,
});
const mapDispatchToProps = dispatch => ({
  getMe: () => {
    dispatch(getMe());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
