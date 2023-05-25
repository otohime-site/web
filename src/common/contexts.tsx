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

export const UserContext = createContext<User | null>(null)

export const AuthProvider = ({
  children,
  skeleton,
}: {
  children: ReactNode
  skeleton?: ReactNode
}) => {
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
  if (loading) {
    return <>{skeleton}</>
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export const useUser = (): User | null => {
  return useContext(UserContext)
}
