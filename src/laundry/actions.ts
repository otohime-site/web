import { createStandardAction, createAsyncAction } from 'typesafe-actions'
import { LaundryError, Sort, Player, Song, PlayerWithRecord, TimelineDetail } from './types'

export const openUserModal = createStandardAction(
  'laundry/OPEN_USER_MODAL')<{nickname: string, privacy: string}>()

export const closeUserModal = createStandardAction(
  'laundry/CLOSE_USER_MODAL')()

export const openUserDeleteModal = createStandardAction(
  'laundry/OPEN_USER_DELETE_MODAL')<string>()

export const closeUserDeleteModal = createStandardAction(
  'laundry/CLOSE_USER_DELETE_MODAL')()

export const getMe = createAsyncAction(
  'laundry/GET_ME',
  'laundry/GET_ME_DONE',
  'laundry/GET_ME_FAIL'
)<void, Player[], LaundryError>()

export const newOrUpdatePlayer = createAsyncAction(
  'laundry/NEW_OR_UPDATE_PLAYER',
  'laundry/NEW_OR_UPDATE_PLAYER_DONE',
  'laundry/NEW_OR_UPDATE_PLAYER_FAIL'
)<{nickname?: string, values: Player}, void, LaundryError>()

export const deletePlayer = createAsyncAction(
  'laundry/DELETE_PLAYER',
  'laundry/DELETE_PLAYER_DONE',
  'laundry/DELETE_PLAYER_FAIL'
)<{nickname: string, values: {nickname: string}}, void, LaundryError>()

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
//  payload: fetchPayload(`/api/mai/${nickname}/timeline`)

export const getTimelineDetail = createAsyncAction(
  'laundry/GET_TIMELINE_DETAIL',
  'laundry/GET_TIMELINE_DETAIL_DONE',
  'laundry/GET_TIMELINE_DETAIL_FAIL'
)<{nickname: string, time: string}, TimelineDetail, LaundryError>()
//  payload: fetchPayload(`/api/mai/${nickname}/timeline/${time}`)

export const setShowDifficulties = createStandardAction(
  'laundry/SET_SHOW_DIFFICULTIES')<boolean>()
