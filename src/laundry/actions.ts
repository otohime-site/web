import { createStandardAction, createAsyncAction } from 'typesafe-actions'
import { LaundryError, Sort, Player, Song, PlayerWithRecord, TimelineDetail } from './types'

export const getMe = createAsyncAction(
  'laundry/GET_ME',
  'laundry/GET_ME_DONE',
  'laundry/GET_ME_FAIL'
)<void, Player[], LaundryError>()

export const getSongs = createAsyncAction(
  'laundry/GET_SONGS',
  'laundry/GET_SONGS_DONE',
  'laundry/GET_SONGS_FAIL'
)<void, Song[], LaundryError>()

export const getPlayer = createAsyncAction(
  'laundry/GET_PLAYER',
  'laundry/GET_PLAYER_DONE',
  'laundry/GET_player_FAIL'
)<string, PlayerWithRecord, LaundryError>()

export const setSort = createStandardAction(
  'laundry/SET_SORT')<Sort>()

export const getTimeline = createAsyncAction(
  'laundry/GET_TIMELINE',
  'laundry/GET_TIMELINE_DONE',
  'laundry/GET_TIMELINE_FAIL'
)<string, string[], LaundryError>()

export const getTimelineDetail = createAsyncAction(
  'laundry/GET_TIMELINE_DETAIL',
  'laundry/GET_TIMELINE_DETAIL_DONE',
  'laundry/GET_TIMELINE_DETAIL_FAIL'
)<{nickname: string, time: string}, TimelineDetail, LaundryError>()