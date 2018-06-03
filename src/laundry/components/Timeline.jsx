import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import TimelineDetail from './TimelineDetail';
import { getTimeline } from '../actions';

class Timeline extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: { nickname: PropTypes.string },
      url: PropTypes.string,
    }).isRequired,
    timeline: PropTypes.arrayOf(PropTypes.number),
    getTimeline: PropTypes.func.isRequired,
  };
  static defaultProps = {
    timeline: [],
  }
  componentDidMount = async () => {
    this.props.getTimeline(this.props.match.params.nickname);
  };
  render() {
    return (
      <div>
        <Link to={encodeURI(`/mai/${this.props.match.params.nickname}`)} className="btn">&lt; Back</Link>
        <ul>
          {this.props.timeline.map(time => (
            <li key={time}><Link to={encodeURI(`/mai/${this.props.match.params.nickname}/timeline/${time}`)}>{(new Date(Math.floor(time * 1000))).toString()}</Link></li>
          ))}
        </ul>
        <div>
          <Route path="/mai/:nickname/timeline/:time" component={TimelineDetail} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timeline: state.laundry.timeline,
});

const mapDispatchToProps = dispatch => ({
  getTimeline: (nickname) => {
    dispatch(getTimeline(nickname));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
