import { getMe, getSongs, getPlayer, getTimeline, getTimelineDetail } from './actions'
import { filter, switchMap, map, catchError } from 'rxjs/operators'
import { LaundryAction, LaundryState } from './reducers'
import { Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { fetchPromise } from './utils'
import { from, of } from 'rxjs'

export const getMeEpic: Epic<LaundryAction, LaundryAction, LaundryState> = (action$, store) => (
  action$.pipe(
    filter(isActionOf(getMe.request)),
    switchMap(() => (
      from(fetchPromise('/api/mai/me')).pipe(
        map(getMe.success),
        catchError(err => of(getMe.failure(err)))
      )
    ))
  )
)

export const getSongsEpic: Epic<LaundryAction, LaundryAction, LaundryState> = (action$, store) => (
  action$.pipe(
    filter(isActionOf(getSongs.request)),
    switchMap(() => (
      from(fetchPromise('/api/mai/songs')).pipe(
        map(getSongs.success),
        catchError(err => of(getSongs.failure(err)))
      )
    ))
  )
)

export const getPlayerEpic: Epic<LaundryAction, LaundryAction, LaundryState> = (action$, store) => (
  action$.pipe(
    filter(isActionOf(getPlayer.request)),
    switchMap(({ payload }) => (
      from(fetchPromise(`/api/mai/${payload}`)).pipe(
        map(getPlayer.success),
        catchError(err => of(getPlayer.failure(err)))
      )
    ))
  )
)

export const getTimelineEpic: Epic<LaundryAction, LaundryAction, LaundryState> = (action$, store) => (
  action$.pipe(
    filter(isActionOf(getTimeline.request)),
    switchMap(({ payload }) => (
      from(fetchPromise(`/api/mai/${payload}/timeline`)).pipe(
        map(getTimeline.success),
        catchError(err => of(getTimeline.failure(err)))
      )
    ))
  )
)

export const getTimelineDetailEpic: Epic<LaundryAction, LaundryAction, LaundryState> = (action$, store) => (
  action$.pipe(
    filter(isActionOf(getTimelineDetail.request)),
    switchMap(({ payload }) => (
      from(fetchPromise(`/api/mai/${payload.nickname}/timeline/${payload.time}`)).pipe(
        map(getTimelineDetail.success),
        catchError(err => of(getTimelineDetail.failure(err)))
      )
    ))
  )
)
