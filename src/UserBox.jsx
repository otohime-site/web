import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown, Menu, Icon } from 'semantic-ui-react';
import { getMe } from './laundry/actions';

class UserBox extends Component {
  static propTypes = {
    dGetMe: PropTypes.func.isRequired,
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
    const { dGetMe } = this.props;
    dGetMe();
  }

  render() {
    const { loggedIn, me } = this.props;
    if (loggedIn) {
      return (
        <Menu.Menu position="right">
          <Dropdown item icon="user" text="我的成績單">
            <Dropdown.Menu>
              {me.map(player => (
                <Dropdown.Item key={player.nickname} as={Link} to={`/mai/${player.nickname}`}>{player.nickname}</Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item as={Link} to="/mai/me">管理成績單</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item as="a" href="/api/logout">
            <Icon name="sign out" />
            {' '}
登出
          </Menu.Item>
        </Menu.Menu>
      );
    }
    return (
      <Menu.Menu position="right">
        <Menu.Item as="a" href="/api/connect/facebook">
          <Icon name="sign in" />
          {' '}
登入
        </Menu.Item>
      </Menu.Menu>
    );
  }
}
const mapStateToProps = state => ({
  me: state.laundry.me,
  loggedIn: state.laundry.loggedIn,
});
const mapDispatchToProps = dispatch => ({
  dGetMe: () => {
    dispatch(getMe());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(UserBox);
