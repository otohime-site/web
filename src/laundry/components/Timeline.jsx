import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Button, Grid, Menu } from 'semantic-ui-react';
import moment from 'moment';
import TimelineDetail from './TimelineDetail';
import { getTimeline } from '../actions';

class Timeline extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ nickname: PropTypes.string }),
      url: PropTypes.string,
    }).isRequired,
    timeline: PropTypes.arrayOf(PropTypes.string),
    getTimeline: PropTypes.func.isRequired,
  };
  static defaultProps = {
    timeline: [],
  }
  componentDidMount() {
    this.props.getTimeline(this.props.match.params.nickname);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      this.props.getTimeline(this.props.match.params.nickname);
    }
  }
  render() {
    moment.locale('zh-TW');
    return (
      <div>
        <Button as={Link} to={encodeURI(`/mai/${this.props.match.params.nickname}`)}>&lt; Back</Button>
        <Grid columns={2} stackable>
          <Grid.Column width={4}>
            <Menu vertical>
              {this.props.timeline.map(time => (
                <Menu.Item key={time} as={Link} to={encodeURI(`/mai/${this.props.match.params.nickname}/timeline/${time}`)}>{(moment(time).format('LLL'))}</Menu.Item>
              ))}
            </Menu>
          </Grid.Column>
          <Grid.Column width={12}>
            <Route path="/mai/:nickname/timeline/:time" component={TimelineDetail} />
          </Grid.Column>
        </Grid>
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
