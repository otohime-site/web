export const GET_SONGS = 'laundry/GET_SONGS';
export const GET_PLAYER = 'laundry/GET_PLAYER';

export const getSongs = () => ({
  type: GET_SONGS,
  payload: async () => {
    const res = await fetch('/api/mai/songs');
    if (!res.ok) {
      throw new Error('request');
    }
    return res.json();
  },
});

export const getPlayer = nickname => ({
  type: GET_PLAYER,
  payload: async () => {
    const res = await fetch(`/api/mai/${nickname}`);
    if (!res.ok) {
      throw new Error('request');
    }
    return res.json();
  },
});
