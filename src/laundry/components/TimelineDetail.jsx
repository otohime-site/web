import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { getTimelineDetail, getSongs } from '../actions';
import { difficulties } from '../consts';
import Record from './Record';
import Score from './Score';

class TimelineDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: { nickname: PropTypes.string, time: PropTypes.string },
    }).isRequired,
    getTimelineDetail: PropTypes.func.isRequired,
    getSongs: PropTypes.func.isRequired,
    timelineDetailRecords: PropTypes.arrayOf(PropTypes.shape({
      card_name: PropTypes.string,
      class: PropTypes.string,
      title: PropTypes.string,
      rating: PropTypes.number,
      max_rating: PropTypes.number,
    })),
    timelineDetailScores: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
      flag: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    })))),
    songs: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
  };
  static defaultProps = {
    songs: [],
    timelineDetailRecords: [],
    timelineDetailScores: {},
  }
  componentDidMount = async () => {
    if (this.props.songs.length === 0) {
      this.props.getSongs();
    }
    this.props.getTimelineDetail(this.props.match.params.nickname, this.props.match.params.time);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      this.props.getTimelineDetail(this.props.match.params.nickname, this.props.match.params.time);
    }
  }
  render() {
    const beforeRecord = this.props.timelineDetailRecords[0];
    const afterRecord = this.props.timelineDetailRecords[1];
    console.log(this.props.timelineDetailScores); // eslint-disable-line no-console
    const rows = this.props.songs.map((song) => {
      const scoresOutput = [];
      console.log(this.props.timelineDetailScores[song.id]); // eslint-disable-line no-console
      if (this.props.timelineDetailScores[song.id]) {
        const scores = this.props.timelineDetailScores[song.id];
        for (let i = 0; i < scores.length; i += 1) {
          if (scores[i]) {
            const beforeScore = scores[i][0];
            const afterScore = scores[i][1];
            scoresOutput.push((
              <tr>
                <td>{song.name} {difficulties[i]}</td>
                <td>{(beforeScore) ? <Score score={beforeScore} /> : ''}</td>
                <td>{(afterScore) ? <Score score={afterScore} /> : ''}</td>
              </tr>
            ));
          }
        }
      }
      return (
        scoresOutput
      );
    });
    return (
      <Table lang="ja">
        <thead>
          <tr>
            <th>What</th>
            <th style={{ width: '20em' }}>Before</th>
            <th style={{ width: '20em' }}>After</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Record</td>
            <td>{ (beforeRecord) ? <Record record={beforeRecord} /> : '' }</td>
            <td>{ (afterRecord) ? <Record record={afterRecord} /> : ''}</td>
          </tr>
          { rows }
        </tbody>
      </Table>
    );
  }
}
const mapStateToProps = state => ({
  timelineDetailRecords: state.laundry.timelineDetailRecords,
  timelineDetailScores: state.laundry.timelineDetailScores,
  songs: state.laundry.songs,
});

const mapDispatchToProps = dispatch => ({
  getTimelineDetail: (nickname, time) => {
    dispatch(getTimelineDetail(nickname, time));
  },
  getSongs: () => {
    dispatch(getSongs());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimelineDetail);
