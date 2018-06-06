import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Score from './Score';
import Record from './Record';
import { getPlayer, getSongs } from '../actions';
import './Player.css';

class Player extends Component {
  static propTypes = {
    match: PropTypes.shape({ params: { nickname: PropTypes.string } }).isRequired,
    getPlayer: PropTypes.func.isRequired,
    getSongs: PropTypes.func.isRequired,
    record: PropTypes.shape({
      card_name: PropTypes.string,
      class: PropTypes.string,
      title: PropTypes.string,
      rating: PropTypes.number,
      max_rating: PropTypes.number,
    }),
    scores: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
      flag: PropTypes.string.isRequired,
      score: PropTypes.number.isRequired,
    }))),
    songs: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
  };
  static defaultProps = {
    record: {},
    scores: {},
    songs: [],
  };
  componentDidMount() {
    if (this.props.songs.length === 0) {
      this.props.getSongs();
    }
    this.props.getPlayer(this.props.match.params.nickname);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match !== this.props.match) {
      this.props.getPlayer(this.props.match.params.nickname);
    }
  }
  render() {
    const rows = this.props.songs.map((song) => {
      const scoresOutput = [];
      if (this.props.scores[song.id]) {
        const scores = this.props.scores[song.id];
        for (let i = 0; i < scores.length; i += 1) {
          if (scores[i]) {
            const score = scores[i];
            scoresOutput.push((
              <td
                className={`difficulty-${i}`}
                style={{
                textAlign: 'right',
                }}
              ><Score score={score} />
              </td>
            ));
          } else {
            scoresOutput.push((<td />));
          }
        }
      }
      return (
        <tr key={song.id}>
          <td className="song-name">{song.name}</td>
          { scoresOutput }
        </tr>
      );
    });
    return (
      <div>
        <Record record={this.props.record} />
        <p className="player-options"><Link to={`/mai/${this.props.match.params.nickname}/timeline`} className="btn">歷史紀錄</Link></p>
        <table className="player-scores">
          <thead>
            <tr>
              <th>Name</th>
              <th className="difficulty-0">Easy</th>
              <th className="difficulty-1">Basic</th>
              <th className="difficulty-2">Advanced</th>
              <th className="difficulty-3">Expert</th>
              <th className="difficulty-4">Master</th>
              <th className="difficulty-5">Re:Master</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  record: state.laundry.record,
  scores: state.laundry.scores,
  songs: state.laundry.songs,
});

const mapDispatchToProps = dispatch => ({
  getPlayer: (nickname) => {
    dispatch(getPlayer(nickname));
  },
  getSongs: () => {
    dispatch(getSongs());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
