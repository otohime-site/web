import { graphql } from "../../gql"

const playerFragment = graphql(`
  fragment dxIntlPlayersFields on dx_intl_players {
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
