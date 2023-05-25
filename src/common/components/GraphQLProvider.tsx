import { cacheExchange, fetchExchange } from "@urql/core"
import { authExchange } from "@urql/exchange-auth"
import { PropsWithChildren, useMemo } from "react"
import { createClient, Provider as UrqlProvider } from "urql"
import { apiHost } from "../../host"
import { useAuth } from "../contexts"

const GraphQLProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [user] = useAuth()
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

  return <UrqlProvider value={client}>{children}</UrqlProvider>
}

export default GraphQLProvider
