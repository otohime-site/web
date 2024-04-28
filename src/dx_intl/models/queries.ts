import { graphql } from "../../graphql"

export const dxIntlPlayersEditableDocument = graphql(`
  query dxIntlPlayersEditable($userId: String!, $nickname: String!) {
    dx_intl_players(
      where: { user_id: { _eq: $userId }, nickname: { _eq: $nickname } }
    ) {
      id
      nickname
      private
    }
  }
`)

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
          dx_intl_scores_rates {
            play
            sss_rate
            fc_rate
            ap_rate
          }
        }
      }
    }
  }
`)
