import {
  useContext,
  useState,
  useEffect,
  createContext,
  FunctionComponent,
} from "react"
import firebase from "firebase/app"

export const AuthContext = createContext<{
  user: firebase.User | null
  loading: boolean
}>({ user: null, loading: true })

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return () => {
      unlisten()
    }
  })
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): [firebase.User | null, boolean] => {
  const { user, loading } = useContext(AuthContext)
  return [user, loading]
}
