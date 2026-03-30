import { cacheExchange, fetchExchange } from "@urql/core"
import { authExchange } from "@urql/exchange-auth"
import { initializeApp } from "firebase/app"
import {
  User,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
} from "firebase/auth"
import { NuqsAdapter, enableHistorySync } from "nuqs/adapters/react"
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

// After running migration plan and testing with Claude Opus 4.6,
// it seems that using nuqs with wouter is simple: use React SPA Adapter and `enableHistorySync()`.
// See https://github.com/littlebtc/nuqs/tree/feat/wouter for more details.
enableHistorySync()

export const AppProvider = ({
  children,
  skeleton,
}: PropsWithChildren<{
  skeleton?: ReactNode
}>) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRedirectResult(firebaseAuth)
      .then((r) => {
        if (r?.operationType == "link") {
          alert("綁定 Google 帳號成功，感謝您 :)")
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((e: any) => {
        alert(`登入或綁定失敗，原因：${e.code}`)
      })
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
        preferGetMethod: false, // Hasura doesn't support it for free
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
                  (e) => e.extensions?.code === "access-denied",
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
    [user],
  )

  if (loading) {
    return <>{skeleton}</>
  }

  return (
    <NuqsAdapter>
      <UserContext.Provider value={user}>
        <UrqlProvider value={client}>{children}</UrqlProvider>
      </UserContext.Provider>
    </NuqsAdapter>
  )
}

export const useUser = (): User | null => {
  return useContext(UserContext)
}
