import { graphql } from "../../gql"

export const dxIntlPlayersFragment = graphql(`
  fragment dxIntlPlayersFragment on dx_intl_players {
    id
    nickname
    private
    created_at
    updated_at
    dx_intl_record {
      card_name
      rating
      grade
      course_rank
      class_rank
    }
  }
`)
