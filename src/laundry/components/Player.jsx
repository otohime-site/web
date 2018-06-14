import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Checkbox, Loader, Table, Button } from 'semantic-ui-react';
import Score from './Score';
import Record from './Record';
import { getPlayer, getSongs, setShowDifficulties } from '../actions';
import './Player.css';

class Player extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ nickname: PropTypes.string }),
    }).isRequired,
    getPlayer: PropTypes.func.isRequired,
    getSongs: PropTypes.func.isRequired,
    setShowDifficulties: PropTypes.func.isRequired,
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
    getPlayerResult: PropTypes.shape({
      status: PropTypes.string,
      err: PropTypes.instanceOf(Error),
    }),
    showDifficulties: PropTypes.bool,
  };
  static defaultProps = {
    record: {},
    scores: {},
    songs: [],
    getPlayerResult: {},
    showDifficulties: false,
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
            let className = `score difficulty-${i}`;
            if (score.score === 0) {
              className += ' score-zero';
            }
            scoresOutput.push((
              <td
                className={className}
                key={`difficulty-${i}`}
                style={{
                textAlign: 'right',
                }}
              ><Score score={score} />
              </td>
            ));
          } else {
            scoresOutput.push((<td key={`difficulty-${i}`} />));
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
    if (this.props.getPlayerResult.status === 'err') {
      if (this.props.getPlayerResult.err.code === 404) {
        return <div>玩家不存在。</div>;
      }
      return <div>發生錯誤，請稍候再試。</div>;
    } else if (this.props.getPlayerResult.status !== 'ok') {
      return <Loader active />;
    }
    return (
      <div>
        <Record record={this.props.record} />
        <p className="player-options">
          <Button as={Link} to={`/mai/${this.props.match.params.nickname}/timeline`}>歷史紀錄</Button>
          <Checkbox toggle label="顯示所有難易度" onChange={this.props.setShowDifficulties} />
        </p>
        <Table className={(this.props.showDifficulties) ? 'player-scores' : 'player-scores hide-difficulties'} lang="ja">
          <Table.Header>
            <tr>
              <th>Name</th>
              <th className="score difficulty-0">Easy</th>
              <th className="score difficulty-1">Basic</th>
              <th className="score difficulty-2">Advanced</th>
              <th className="score difficulty-3">Expert</th>
              <th className="score difficulty-4">Master</th>
              <th className="score difficulty-5">Re:Master</th>
            </tr>
          </Table.Header>
          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  record: state.laundry.record,
  scores: state.laundry.scores,
  songs: state.laundry.songs,
  getPlayerResult: state.laundry.getPlayerResult,
  showDifficulties: state.laundry.showDifficulties,
});

const mapDispatchToProps = dispatch => ({
  getPlayer: (nickname) => {
    dispatch(getPlayer(nickname));
  },
  getSongs: () => {
    dispatch(getSongs());
  },
  setShowDifficulties: (e, data) => (
    dispatch(setShowDifficulties(data.checked))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
