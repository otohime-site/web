import { LaundryError } from './types'

export const fetchPromise = async (url: string, values?: object) => {
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
    const err = new LaundryError(res.status, await res.json())
    throw err
  }
  return res.json()
}
