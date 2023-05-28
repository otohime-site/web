import { graphql } from "../../gql"

export const dxIntlPlayersFields = graphql(`
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

export const dxIntlRecordsFields = graphql(`
  fragment dxIntlRecordsFields on dx_intl_records {
    card_name
    title
    trophy
    rating
    max_rating
    rating_legacy
    grade
    course_rank
    class_rank
  }
`)

export const dxIntlScoresFields = graphql(`
  fragment dxIntlScoresFields on dx_intl_scores {
    song_id
    deluxe
    difficulty
    score
    combo_flag
    sync_flag
    start
  }
`)

export const dxIntlRecordsWithHistoryFields = graphql(`
  fragment dxIntlRecordsWithHistoryFields on dx_intl_records_with_history {
    card_name
    title
    trophy
    rating
    max_rating
    rating_legacy
    grade
    course_rank
    class_rank
  }
`)

export const dxIntlScoresWithHistoryFields = graphql(`
  fragment dxIntlScoresWithHistoryFields on dx_intl_scores_with_history {
    song_id
    deluxe
    difficulty
    score
    combo_flag
    sync_flag
  }
`)
