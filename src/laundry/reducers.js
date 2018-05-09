import { GET_PLAYER, GET_SONGS } from './actions';

export default function laundryReducers(state = {}, action) {
  switch (action.type) {
    case `${GET_PLAYER}_FULFILLED`: {
      const { record } = action.payload;
      const rawScores = action.payload.scores;
      const scores = {};
      for (let i = 0; i < rawScores.length; i += 1) {
        const score = rawScores[i];
        if (!scores[score.song_id]) {
          scores[score.song_id] = new Array(6);
        }
        scores[score.song_id][score.difficulty] = score;
      }
      return { ...state, record, scores };
    }
    case `${GET_SONGS}_FULFILLED`:
      return { ...state, songs: action.payload };
    default:
      return state;
  }
}
