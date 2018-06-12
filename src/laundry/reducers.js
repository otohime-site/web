import {
  OPEN_USER_MODAL, CLOSE_USER_MODAL, OPEN_USER_DELETE_MODAL, CLOSE_USER_DELETE_MODAL,
  GET_ME, GET_PLAYER, NEW_OR_UPDATE_PLAYER, DELETE_PLAYER,
  GET_SONGS, GET_TIMELINE, GET_TIMELINE_DETAIL,
} from './actions';

export default function laundryReducers(state = {}, action) {
  switch (action.type) {
    case OPEN_USER_MODAL:
      return { ...state, userModal: { open: true, ...action.payload } };

    case CLOSE_USER_MODAL:
      return { ...state, userModal: { open: false } };

    case OPEN_USER_DELETE_MODAL:
      return { ...state, userDeleteModal: { open: true, nickname: action.payload } };

    case CLOSE_USER_DELETE_MODAL:
      return { ...state, userDeleteModal: { open: false } };

    case `${GET_ME}_FULFILLED`:
      return { ...state, loggedIn: true, me: action.payload };

    case `${GET_ME}_REJECTED`:
      return { ...state, loggedIn: false, me: [] };

    case NEW_OR_UPDATE_PLAYER:
      return { ...state, newOrUpdatePlayerResult: { status: 'pending' } };

    case `${NEW_OR_UPDATE_PLAYER}_FULFILLED`:
      return { ...state, newOrUpdatePlayerResult: { status: 'ok' } };

    case `${NEW_OR_UPDATE_PLAYER}_REJECTED`:
      return { ...state, newOrUpdatePlayerResult: { status: 'err', err: action.payload } };

    case DELETE_PLAYER:
      return { ...state, deletePlayerResult: { status: 'pending' } };

    case `${DELETE_PLAYER}_FULFILLED`:
      return { ...state, deletePlayerResult: { status: 'ok' } };

    case `${DELETE_PLAYER}_REJECTED`:
      return { ...state, deletePlayerResult: { status: 'err', err: action.payload } };

    case GET_PLAYER:
      return { ...state, getPlayerResult: { status: 'pending' } };

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
      return {
        ...state, getPlayerResult: { status: 'ok' }, record, scores,
      };
    }
    case `${GET_PLAYER}_REJECTED`:
      return { ...state, getPlayerResult: { status: 'err', err: action.payload } };

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
