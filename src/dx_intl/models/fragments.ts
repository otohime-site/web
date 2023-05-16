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

export const dxIntlSongsFragment = graphql(`
  fragment dxIntlSongsFragment on dx_intl_songs {
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
`)

export const dxIntlRecordsFragment = graphql(`
  fragment dxIntlRecordsFragment on dx_intl_records {
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

export const dxIntlScoresFragment = graphql(`
  fragment dxIntlScoresFragment on dx_intl_scores {
    song_id
    deluxe
    difficulty
    score
    combo_flag
    sync_flag
  }
`)
