import { ResultOf } from "@graphql-typed-document-node/core"

import { createContext, PropsWithChildren, useContext } from "react"
import { useQuery } from "urql"
import { graphql } from "../gql"

const SongsContext = createContext<
  ResultOf<typeof dxIntlSongsDocument>["dx_intl_songs"] | undefined
>(undefined)

const dxIntlSongsDocument = graphql(`
  query dxIntlSongsContext {
    dx_intl_songs(order_by: [{ category: asc }, { order: asc }]) {
      id
      category
      title
      order
      dx_intl_variants(order_by: { deluxe: asc }) {
        deluxe
        version
        active
        dx_intl_notes(order_by: { difficulty: asc }) {
          internal_lv
          difficulty
          level
        }
      }
    }
  }
`)

export const SongsProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [dxIntlSongsResult] = useQuery({
    query: dxIntlSongsDocument,
  })

  return (
    <SongsContext.Provider
      value={
        dxIntlSongsResult.error
          ? undefined
          : dxIntlSongsResult.data?.dx_intl_songs
      }
    >
      {children}
    </SongsContext.Provider>
  )
}

export const useSongs = () => {
  return useContext(SongsContext)
}
