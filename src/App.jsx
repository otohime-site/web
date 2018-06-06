import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import Home from './Home';
import Laundry from './laundry/components/Laundry';
import { getMe } from './laundry/actions';
import './App.css';

class App extends Component {
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
      <a href="/api/connect/facebook">Login</a>
    );
    if (this.props.loggedIn) {
      nav = (
        <a href="/api/logout">Logout</a>
      );
    }
    return (
      <div className="App">
        <div id="header">
          <h1><Link to="/">♬ Semiquaver</Link></h1>
          <div className="nav">
            { nav }
          </div>
        </div>
        <div id="container">
          <Route path="/" exact component={Home} />
          <Route path="/mai" component={Laundry} />
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
