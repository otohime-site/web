import { GET_ME, GET_PLAYER, GET_SONGS, GET_TIMELINE, GET_TIMELINE_DETAIL } from './actions';

export default function laundryReducers(state = {}, action) {
  switch (action.type) {
    case `${GET_ME}_FULFILLED`:
      return { ...state, loggedIn: true, me: action.payload };

    case `${GET_ME}_REJECTED`:
      return { ...state, loggedIn: false, me: [] };

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
    case `${GET_TIMELINE}_FULFILLED`:
      return { ...state, timeline: action.payload };
    case `${GET_TIMELINE_DETAIL}_FULFILLED`: {
      const rawRecords = action.payload.records;
      const timelineDetailRecords = [null, null];
      for (let i = 0; i < rawRecords.length; i += 1) {
        const rawRecord = rawRecords[i];
        if (rawRecord.from === 'before') {
          timelineDetailRecords[0] = rawRecord;
        } else {
          timelineDetailRecords[1] = rawRecord;
        }
      }
      const rawScores = action.payload.scores;
      const timelineDetailScores = {};
      for (let i = 0; i < rawScores.length; i += 1) {
        const score = rawScores[i];
        if (!timelineDetailScores[score.song_id]) {
          timelineDetailScores[score.song_id] = [];
        }
        if (!timelineDetailScores[score.song_id][score.difficulty]) {
          timelineDetailScores[score.song_id][score.difficulty] = [null, null];
        }
        if (score.from === 'before') {
          timelineDetailScores[score.song_id][score.difficulty][0] = score;
        } else {
          timelineDetailScores[score.song_id][score.difficulty][1] = score;
        }
      }
      return { ...state, timelineDetailRecords, timelineDetailScores };
    }
    default:
      return state;
  }
}
