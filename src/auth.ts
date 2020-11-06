import { useState, useEffect } from 'react'
import firebase from 'firebase/app'

export const useAuth = (auth: firebase.auth.Auth): [ firebase.User | null, boolean ] => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return () => {
      unlisten()
    }
  })
  return [user, loading]
}
