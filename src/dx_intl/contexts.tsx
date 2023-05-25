import { createContext, PropsWithChildren, useCallback, useMemo } from "react"
import { useQuery } from "urql"
import { graphql } from "../gql"
import { levels } from "./models/constants"

export interface VariantMapValue {
  id: string
  category: number
  title: string
  order: number
  deluxe: boolean
  version: number
  active: boolean
  notesMap: Map<
    number,
    {
      internal_lv?: number | null
      difficulty: number
      level: (typeof levels)[number]
    }
  >
}

const VariantMapContext = createContext<{
  variantMap?: Map<string, VariantMapValue>
  ready?: boolean
  refresh?: () => void
}>({})

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

export const VariantMapProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const [dxIntlSongsResult, refreshDxIntlSongs] = useQuery({
    query: dxIntlSongsDocument,
  })
  const refresh = useCallback(() => {
    refreshDxIntlSongs({ requestPolicy: "network-only" })
  }, [refreshDxIntlSongs])

  const variantMap = useMemo(
    () =>
      new Map(
        (dxIntlSongsResult.data?.dx_intl_songs ?? []).flatMap((song) => {
          const { dx_intl_variants, ...restSong } = song
          return dx_intl_variants.map((variant) => {
            const { dx_intl_notes, ...restVariant } = variant
            return [
              song.id,
              {
                ...restSong,
                ...restVariant,
                notesMap: new Map(
                  dx_intl_notes.map((note) => [note.difficulty, note])
                ),
              },
            ]
          })
        })
      ),
    [dxIntlSongsResult]
  )

  return (
    <VariantMapContext.Provider
      value={{
        variantMap,
        ready: !dxIntlSongsResult.fetching && !dxIntlSongsResult.error,
        refresh,
      }}
    >
      {children}
    </VariantMapContext.Provider>
  )
}
