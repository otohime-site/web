import { graphql } from "../../graphql"

export const finalePlayersEditableDocument = graphql(`
  query finalePlayersEditable($userId: String!, $nickname: String!) {
    finale_players(
      where: { user_id: { _eq: $userId }, nickname: { _eq: $nickname } }
    ) {
      id
      nickname
      private
    }
  }
`)

export const finaleSongsDocument = graphql(`
  query finaleSongs {
    finale_songs(order_by: [{ category: asc }, { order: asc }]) {
      id
      category
      title
      order
      active
      version
      finale_notes(order_by: { difficulty: asc }) {
        difficulty
        level
      }
    }
  }
`)
