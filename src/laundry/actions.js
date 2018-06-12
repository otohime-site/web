export const OPEN_USER_MODAL = 'laundry/OPEN_USER_MODAL';
export const CLOSE_USER_MODAL = 'laundry/CLOSE_USER_MODAL';
export const OPEN_USER_DELETE_MODAL = 'laundry/OPEN_USER_DELETE_MODAL';
export const CLOSE_USER_DELETE_MODAL = 'laundry/CLOSE_USER_DELETE_MODAL';
export const GET_ME = 'laundry/GET_ME';
export const NEW_OR_UPDATE_PLAYER = 'laundry/NEW_OR_UPDATE_PLAYER';
export const UPDATE_PLAYER = 'laundry/UPDATE_PLAYER';
export const DELETE_PLAYER = 'laundry/DELETE_PLAYER';
export const GET_SONGS = 'laundry/GET_SONGS';
export const GET_PLAYER = 'laundry/GET_PLAYER';
export const GET_TIMELINE = 'laundry/GET_TIMELINE';
export const GET_TIMELINE_DETAIL = 'laundry/GET_TIMELINE_DETAIL';

const fetchPayload = (url, values) => (
  async () => {
    let res;
    if (values) {
      res = await fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } else {
      res = await fetch(url);
    }
    if (!res.ok) {
      const err = new Error('request');
      err.content = await res.json();
      err.code = res.status;
      throw err;
    }
    return res.json();
  }
);

export const openUserModal = values => ({
  type: OPEN_USER_MODAL,
  payload: values,
});

export const closeUserModal = () => ({
  type: CLOSE_USER_MODAL,
});

export const openUserDeleteModal = nickname => ({
  type: OPEN_USER_DELETE_MODAL,
  payload: nickname,
});

export const closeUserDeleteModal = () => ({
  type: CLOSE_USER_DELETE_MODAL,
});

export const getMe = () => ({
  type: GET_ME,
  payload: fetchPayload('/api/mai/me'),
});

export const newOrUpdatePlayer = (nickname, values) => ({
  type: NEW_OR_UPDATE_PLAYER,
  payload: fetchPayload((nickname) ? `/api/mai/${nickname}/update` : '/api/mai/new', values),
});

export const deletePlayer = (nickname, values) => ({
  type: DELETE_PLAYER,
  payload: fetchPayload(`/api/mai/${nickname}/delete`, values),
});

export const getSongs = () => ({
  type: GET_SONGS,
  payload: fetchPayload('/api/mai/songs'),
});

export const getPlayer = nickname => ({
  type: GET_PLAYER,
  payload: fetchPayload(`/api/mai/${nickname}`),
});

export const getTimeline = nickname => ({
  type: GET_TIMELINE,
  payload: fetchPayload(`/api/mai/${nickname}/timeline`),
});

export const getTimelineDetail = (nickname, time) => ({
  type: GET_TIMELINE_DETAIL,
  payload: fetchPayload(`/api/mai/${nickname}/timeline/${time}`),
});
