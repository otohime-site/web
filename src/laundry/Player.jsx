import { PropTypes } from 'prop-types';
import { Component } from 'react';
import Class from './Class';
import Flags from './Flags';
import './Player.css';

export default class Player extends Component {
  static propTypes = {
    match: PropTypes.shape({ params: { nickname: PropTypes.string } }).isRequired,
  };
  state = {
    record: {},
    scores: new Map(),
  };
  componentDidMount = async () => {
    const songRes = await fetch('https://localhost:5000/api/mai/songs');
    const songList = await songRes.json();
    const scores = new Map();
    for (let i = 0; i < songList.length; i += 1) {
      scores.set(songList[i].id, { ...songList[i], difficulties: new Array(6) });
    }
    this.setState({ scores });

    const res = await fetch(`https://localhost:5000/api/mai/${this.props.match.params.nickname}`);
    const result = await res.json();

    for (let i = 0; i < result.scores.length; i += 1) {
      const score = result.scores[i];
      scores.get(score.song_id).difficulties[score.difficulty] = score;
    }
    this.setState({ record: result.record, scores });
  };
  render() {
    const rows = [];
    this.state.scores.forEach((scores, key) => {
      rows.push((
        /* eslint-disable-next-line react/no-array-index-key */
        <tr key={key}>
          <td className="song-name">{scores.name}</td>
          { scores.difficulties.map((score, i) => (
            (score) ? (
              <td
                className={`difficulty-${i} score`}
                style={{
                textAlign: 'right',
                }}
              >{ (score.score > 0) ? `${score.score.toFixed(2)}%` : '' } <Flags rawFlags={score.flag} />
              </td>) : (<td />)
          ))}
        </tr>
      ));
    });
    return (
      <div>
        <div className="player-info">
          <h3 className="player-name">{this.state.record.card_name}</h3>
          <Class rawClass={this.state.record.class} />
          <p className="player-title">{this.state.record.title}</p>
          <p className="player-rating">Rating {this.state.record.rating} (Max {this.state.record.max_rating})</p>
        </div>
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
