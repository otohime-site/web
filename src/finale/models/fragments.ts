import { graphql } from "../../graphql"

export const finalePlayersFields = graphql(`
  fragment finalePlayersFields on finale_players {
    id
    nickname
    private
    created_at
    updated_at
    finale_record {
      card_name
      rating
      max_rating
      class
    }
  }
`)
