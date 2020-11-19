import firebase from 'firebase/app'
import React, { FunctionComponent, useMemo } from 'react'
import { createClient, Provider as UrqlProvider } from 'urql'
import { subscriptionExchange, cacheExchange, dedupExchange, fetchExchange, makeOperation } from '@urql/core'
import { authExchange } from '@urql/exchange-auth'
import { useAuth } from './auth'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import host from './host'
import AppBar from './AppBar'

const GraphQLProvider: FunctionComponent = ({ children }) => {
  const auth = firebase.auth()
  const [user, loading] = useAuth(auth)
  const subscriptionClient = useMemo(() => {
    const subscriptionClient = new SubscriptionClient(
      `wss://${location.host}/graphql`,
      {
        reconnect: true,
        timeout: 30000,
        connectionParams: async () => ((user !== null)
          ? {
            headers: {
              Authorization: `Bearer ${await user.getIdToken()}`
            }
          }
          : {}
        )
      }
    )
    return subscriptionClient
  }, [user])
  const client = useMemo(() => (
    createClient({
      url: `https://${location.host}/graphql`,
      exchanges: [
        dedupExchange,
        cacheExchange,
        authExchange({
          getAuth: async () => {
            if (user == null) {
              return null
            }
            const token = await user.getIdToken()
            return { token }
          },
          addAuthToOperation: ({ authState, operation }) => {
            if (authState == null || authState.token == null || operation.kind === 'subscription') {
              return operation
            }
            const fetchOptions = typeof operation.context.fetchOptions === 'function'
              ? operation.context.fetchOptions()
              : operation.context.fetchOptions ??
              { }
            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: `Bearer ${authState.token}`
                }
              }
            })
          }
        }),
        fetchExchange,
        subscriptionExchange({
          forwardSubscription (operation) {
            return subscriptionClient.request(operation)
          }
        })
      ]
    })
  ), [user])

  if (loading) {
    return (<AppBar></AppBar>)
  }
  return (
    <UrqlProvider value={client}>
      {children}
    </UrqlProvider>
  )
}
export const GraphQLBookmarkletProvider: FunctionComponent<{token: string}> = ({ token, children }) => {
  const client = useMemo(() => (
    createClient({
      url: `https://${host}/graphql`,
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      exchanges: [
        dedupExchange,
        cacheExchange,
        fetchExchange
      ]
    })
  ), [token])

  return (
    <UrqlProvider value={client}>
      {children}
    </UrqlProvider>
  )
}

export default GraphQLProvider
