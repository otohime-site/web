import { ActionType, getType } from 'typesafe-actions'
import { Player, Record, Score, Sort, TimelineRecord, TimelineScore } from './types'
import * as laundry from './actions'

type AsyncResult = 'pending' | 'ok' | 'err'

export interface LaundryState {
  me: Player[]
  songs?: any
  record?: Record,
  scores?: { [songId: number]: Score[] }
  timeline?: string[]
  timelineDetailRecords?: TimelineRecord[]
  timelineDetailScores?: { [songId: number]: TimelineScore[][] }
  sort: Sort
  userModal: {
    open: boolean,
    nickname?: string,
    privacy?: string
  }
  userDeleteModal: {
    open: boolean,
    nickname?: string
  }
  newOrUpdatePlayerResult?: {
    status: AsyncResult
    err?: any
  }
  deletePlayerResult?: {
    status: AsyncResult
    err?: any
  }
  getPlayerResult?: {
    status: AsyncResult
    err?: any
  },
}

export type LaundryAction = ActionType<typeof laundry>

export default (state: LaundryState = {
  userModal: { open: false },
  userDeleteModal: { open: false },
  me: [],
  sort: 'category'
}, action: LaundryAction) => {
  switch (action.type) {
    case getType(laundry.openUserModal):
      return { ...state, userModal: { open: true, ...action.payload } }

    case getType(laundry.closeUserModal):
      return { ...state, userModal: { open: false } }

    case getType(laundry.openUserDeleteModal):
      return { ...state, userDeleteModal: { open: true, nickname: action.payload } }

    case getType(laundry.closeUserDeleteModal):
      return { ...state, userDeleteModal: { open: false } }

    case getType(laundry.getMe.success):
      return { ...state, loggedIn: true, me: action.payload }

    case getType(laundry.getMe.failure):
      return { ...state, loggedIn: false, me: [] }

    case getType(laundry.newOrUpdatePlayer.request):
      return { ...state, newOrUpdatePlayerResult: { status: 'pending' as AsyncResult } }

    case getType(laundry.newOrUpdatePlayer.success):
      return { ...state, newOrUpdatePlayerResult: { status: 'ok' as AsyncResult } }

    case getType(laundry.newOrUpdatePlayer.failure):
      return { ...state, newOrUpdatePlayerResult: { status: 'err' as AsyncResult, err: action.payload } }

    case getType(laundry.deletePlayer.request):
      return { ...state, deletePlayerResult: { status: 'pending' as AsyncResult } }

    case getType(laundry.deletePlayer.success):
      return { ...state, deletePlayerResult: { status: 'ok' as AsyncResult } }

    case getType(laundry.deletePlayer.failure):
      return { ...state, deletePlayerResult: { status: 'err' as AsyncResult, err: action.payload } }

    case getType(laundry.getPlayer.request):
      return { ...state, getPlayerResult: { status: 'pending' as AsyncResult } }

    case getType(laundry.getPlayer.success): {
      const { record } = action.payload
      const rawScores = action.payload.scores
      const scores: { [songId: number]: Score[] } = {}
      for (let i = 0; i < rawScores.length; i += 1) {
        const score = rawScores[i]
        if (!scores[score.song_id]) {
          scores[score.song_id] = new Array(6)
        }
        scores[score.song_id][score.difficulty] = score
      }
      return {
        ...state, getPlayerResult: { status: 'ok' as AsyncResult }, record, scores
      }
    }
    case getType(laundry.getPlayer.failure): {
      return { ...state, getPlayerResult: { status: 'err' as AsyncResult, err: action.payload } }
    }
    case getType(laundry.setSort): {
      return { ...state, sort: action.payload }
    }
    case getType(laundry.getSongs.success):
      return { ...state, songs: action.payload }
    case getType(laundry.getTimeline.success):
      return { ...state, timeline: action.payload }
    case getType(laundry.getTimelineDetail.success): {
      const rawRecords = action.payload.records
      const timelineDetailRecords = []
      for (let i = 0; i < rawRecords.length; i += 1) {
        const rawRecord = rawRecords[i]
        if (rawRecord.from === 'before') {
          timelineDetailRecords[0] = rawRecord
        } else {
          timelineDetailRecords[1] = rawRecord
        }
      }
      const rawScores = action.payload.scores
      const timelineDetailScores: { [songId: number]: TimelineScore[][] } = {}
      for (let i = 0; i < rawScores.length; i += 1) {
        const score = rawScores[i]
        if (!timelineDetailScores[score.song_id]) {
          timelineDetailScores[score.song_id] = []
        }
        if (score.from === 'before') {
          timelineDetailScores[score.song_id][score.difficulty][0] = score
        } else {
          timelineDetailScores[score.song_id][score.difficulty][1] = score
        }
      }
      return { ...state, timelineDetailRecords, timelineDetailScores }
    }
    case getType(laundry.setShowDifficulties):
      return { ...state, showDifficulties: action.payload }

    default:
      return state
  }
}
