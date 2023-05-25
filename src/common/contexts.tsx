import { initializeApp } from "firebase/app"
import {
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  User,
} from "firebase/auth"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import firebaseConfig from "../firebase"

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export const AuthContext = createContext<{
  user: User | null
  loading: boolean
}>({ user: null, loading: true })

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRedirectResult(firebaseAuth).then()
    const unlisten = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => {
      unlisten()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): [User | null, boolean] => {
  const { user, loading } = useContext(AuthContext)
  return [user, loading]
}
