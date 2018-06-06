export const GET_ME = 'laundry/GET_ME';
export const GET_SONGS = 'laundry/GET_SONGS';
export const GET_PLAYER = 'laundry/GET_PLAYER';
export const GET_TIMELINE = 'laundry/GET_TIMELINE';
export const GET_TIMELINE_DETAIL = 'laundry/GET_TIMELINE_DETAIL';

const fetchPayload = url => (
  async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('request');
    }
    return res.json();
  }
);

export const getMe = () => ({
  type: GET_ME,
  payload: fetchPayload('/api/mai/me'),
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
