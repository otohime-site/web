import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
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
    console.log(this.props.me); // eslint-disable-line
    let nav = (
      <a href="/api/connect/facebook"><Icon name="user" />Login</a>
    );
    if (this.props.loggedIn) {
      nav = (
        <a href="/api/logout">Logout</a>
      );
    }
    return (
      <Menu.Item>
        {nav}
      </Menu.Item>
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
