import { cacheExchange, fetchExchange } from "@urql/core"
import { authExchange } from "@urql/exchange-auth"
import { initializeApp } from "firebase/app"
import {
  User,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth"
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Provider as UrqlProvider, createClient } from "urql"
import firebaseConfig from "../firebase"
import { apiHost } from "../host"

const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export const UserContext = createContext<User | null>(null)

export const AppProvider = ({
  children,
  skeleton,
}: PropsWithChildren<{
  skeleton?: ReactNode
}>) => {
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

  const client = useMemo(
    () =>
      createClient({
        url: `https://${apiHost}/graphql`,
        exchanges: [
          cacheExchange,
          authExchange(async (utils) => {
            const token = await user?.getIdToken()
            return {
              addAuthToOperation(operation) {
                return token
                  ? utils.appendHeaders(operation, {
                      Authorization: `Bearer ${token}`,
                    })
                  : operation
              },
              didAuthError(error) {
                return error.graphQLErrors.some(
                  (e) => e.extensions?.code === "access-denied"
                )
              },
              async refreshAuth() {
                // getIdToken should do the job
                return
              },
            }
          }),
          fetchExchange,
        ],
      }),
    [user]
  )

  if (loading) {
    return <>{skeleton}</>
  }

  return (
    <UserContext.Provider value={user}>
      <UrqlProvider value={client}>{children}</UrqlProvider>
    </UserContext.Provider>
  )
}

export const useUser = (): User | null => {
  return useContext(UserContext)
}
