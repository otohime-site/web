import { cacheExchange, fetchExchange } from "@urql/core"
import { authExchange } from "@urql/exchange-auth"
import { initializeApp } from "firebase/app"
import {
  Auth,
  PopupRedirectResolver,
  User,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  browserSessionPersistence,
  getRedirectResult,
  indexedDBLocalPersistence,
  initializeAuth,
  onAuthStateChanged,
} from "firebase/auth"
import { NuqsAdapter, enableHistorySync } from "nuqs/adapters/react"
import {
  PropsWithChildren,
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { Provider as UrqlProvider, createClient } from "urql"
import firebaseConfig from "../firebase"
import { apiHost } from "../host"

const firebaseApp = initializeApp(firebaseConfig)

// On mobile browsers, Safari and iOS the stock resolver loads the Google API
// script and the sign-in iframe during auth initialization, before the
// persisted user is even looked up. That is several hundred ms to seconds on
// a slow connection, on every page load, for a popup most visitors never
// open. This subclass turns the eager load off and exposes it as an explicit
// warm-up instead (see prepareSignIn).
//
// The resolver has to stay registered on the auth instance rather than being
// passed per call: a persisted user from an unfinished link-with-redirect
// still carries a redirect event id, and initialization asserts a default
// resolver for it. Without one those users would never be signed in.
//
// `_shouldInitProactively` and `_initialize` are internal SDK names. They are
// property names, so they survive minification, but they need re-checking on
// Firebase upgrades.
const BaseResolver = browserPopupRedirectResolver as unknown as new () => {
  _initialize?: (auth: Auth) => Promise<unknown>
}
class LazyPopupRedirectResolver extends BaseResolver {
  // The SDK instantiates the class itself (once, cached by class); keep the
  // instance so the warm-up can reach it.
  static instance: LazyPopupRedirectResolver | undefined
  constructor() {
    super()
    LazyPopupRedirectResolver.instance = this
  }
  get _shouldInitProactively(): boolean {
    return false
  }
}

// Same persistence hierarchy as getAuth(), only the resolver differs.
export const firebaseAuth = initializeAuth(firebaseApp, {
  persistence: [
    indexedDBLocalPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
  ],
  popupRedirectResolver:
    LazyPopupRedirectResolver as unknown as PopupRedirectResolver,
})

/**
 * Start loading the sign-in iframe ahead of a popup sign-in, so the first
 * click still opens the popup inside the user activation window. Redirect
 * sign-in does not need it. Safe to call repeatedly; failures are ignored
 * because the sign-in call itself retries and reports them.
 */
export const prepareSignIn = (): void => {
  LazyPopupRedirectResolver.instance
    ?._initialize?.(firebaseAuth)
    .catch(() => {})
}

interface AuthState {
  user: User | null
  /** True until Firebase has resolved the persisted sign-in state. */
  pending: boolean
}
const AuthContext = createContext<AuthState>({ user: null, pending: true })

// After trying to write a wouter adapter with Claude Opus 4.6,
// it seems that using nuqs with wouter is simple: use React SPA Adapter and `enableHistorySync()`.
// See https://github.com/littlebtc/nuqs/tree/feat/wouter for more details.
enableHistorySync()

const createUrqlClient = () =>
  createClient({
    url: `https://${apiHost}/graphql`,
    preferGetMethod: false, // Hasura doesn't support it for free
    exchanges: [
      cacheExchange,
      authExchange(async (utils) => {
        // Read the user from Firebase directly instead of capturing it: the
        // client outlives the pending → resolved transition.
        let token = await firebaseAuth.currentUser?.getIdToken()
        let tokenUid = firebaseAuth.currentUser?.uid ?? null
        return {
          addAuthToOperation(operation) {
            return token
              ? utils.appendHeaders(operation, {
                  Authorization: `Bearer ${token}`,
                })
              : operation
          },
          willAuthError() {
            // The token belongs to a different identity than the one that is
            // signed in now (typically: resolved while pending).
            return (firebaseAuth.currentUser?.uid ?? null) !== tokenUid
          },
          didAuthError(error) {
            // Nothing to refresh for anonymous visitors; retrying would only
            // repeat the same request.
            return (
              firebaseAuth.currentUser != null &&
              error.graphQLErrors.some(
                (e) =>
                  e.extensions?.code === "access-denied" ||
                  e.extensions?.code === "invalid-jwt",
              )
            )
          },
          async refreshAuth() {
            const current = firebaseAuth.currentUser
            // getIdToken() renews expired tokens by itself. Only force a
            // refresh when the API rejected a token the SDK still considers
            // valid.
            let next = await current?.getIdToken()
            if (next != null && next === token) {
              next = await current?.getIdToken(true)
            }
            token = next
            tokenUid = current?.uid ?? null
          },
        }
      }),
      fetchExchange,
    ],
  })

export const AppProvider = ({ children }: PropsWithChildren) => {
  // undefined: auth state not resolved yet; null: signed out.
  const [user, setUser] = useState<User | null | undefined>(undefined)
  // The urql client (and its cache) is rebuilt only when the signed-in
  // identity changes after the initial resolution. Resolving from "pending"
  // keeps the client so that identity-independent queries already in flight
  // (song lists) are not fetched twice.
  const [client, setClient] = useState(createUrqlClient)
  const resolvedUidRef = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    getRedirectResult(firebaseAuth)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((e: any) => {
        alert(`登入失敗，原因：${e.code}`)
      })
    const unlisten = onAuthStateChanged(firebaseAuth, (user) => {
      const uid = user?.uid ?? null
      const resolvedUid = resolvedUidRef.current
      if (resolvedUid !== undefined && resolvedUid !== uid) {
        setClient(createUrqlClient())
      }
      resolvedUidRef.current = uid
      setUser(user)
    })
    return () => {
      unlisten()
    }
  }, [])

  // Context consumers re-render on value identity, so keep it stable per
  // user.
  const authState = useMemo<AuthState>(
    () => ({ user: user ?? null, pending: user === undefined }),
    [user],
  )

  return (
    <NuqsAdapter>
      <AuthContext value={authState}>
        <UrqlProvider value={client}>{children}</UrqlProvider>
      </AuthContext>
    </NuqsAdapter>
  )
}

export const useUser = (): AuthState => use(AuthContext)
