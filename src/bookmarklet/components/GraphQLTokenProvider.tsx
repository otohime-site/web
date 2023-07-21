import { cacheExchange, fetchExchange } from "@urql/core"
import { PropsWithChildren, useMemo } from "react"
import { Provider as UrqlProvider, createClient } from "urql"
import { apiHost } from "../../host"

const GraphQLTokenProvider = ({
  token,
  children,
}: PropsWithChildren<{ token: string }>) => {
  const client = useMemo(
    () =>
      createClient({
        url: `https://${apiHost}/graphql`,
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        exchanges: [cacheExchange, fetchExchange],
      }),
    [token],
  )

  return <UrqlProvider value={client}>{children}</UrqlProvider>
}

export default GraphQLTokenProvider
