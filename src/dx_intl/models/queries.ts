import { graphql } from "../../gql"

export const dxIntlSongsDocument = graphql(`
  query dxIntlSongs {
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
