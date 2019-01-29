import { getMe, newOrUpdatePlayer, getSongs, deletePlayer, getPlayer, getTimeline, getTimelineDetail } from './actions'
import { filter, switchMap, map, catchError } from 'rxjs/operators'
import { LaundryAction, LaundryState } from './reducers'
import { Epic } from 'redux-observable'
import { isActionOf } from 'typesafe-actions'
import { LaundryError } from './types'
import { from, of } from 'rxjs'

const fetchPromise = async (url: string, values?: object) => {
  let res
  if (values) {
    res = await fetch(
      url,
      {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin'
      }
    )
  } else {
    res = await fetch(url, { credentials: 'same-origin' })
  }
  if (!res.ok) {
    const err = new LaundryError('request')
    err.content = await res.json()
    err.code = res.status
    throw err
  }
  return res.json()
}
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

export const newOrUpdatePlayerEpic: Epic<LaundryAction, LaundryAction, LaundryState> = (action$, store) => (
  action$.pipe(
    filter(isActionOf(newOrUpdatePlayer.request)),
    switchMap(({ payload }) => (
      from(fetchPromise(
        (payload.nickname) ? `/api/mai/${payload.nickname}/update` : '/api/mai/new',
        payload.values
      )).pipe(
        map(newOrUpdatePlayer.success),
        catchError(err => of(newOrUpdatePlayer.failure(err)))
      )
    ))
  )
)

export const deletePlayerEpic: Epic<LaundryAction, LaundryAction, LaundryState> = (action$, store) => (
  action$.pipe(
    filter(isActionOf(deletePlayer.request)),
    switchMap(({ payload }) => (
      from(fetchPromise(
        `/api/mai/${payload.nickname}/delete`,
        payload.values
      )).pipe(
        map(deletePlayer.success),
        catchError(err => of(deletePlayer.failure(err)))
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
