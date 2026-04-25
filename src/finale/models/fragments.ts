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

export const finaleRecordsFields = graphql(`
  fragment finaleRecordsFields on finale_records {
    card_name
    title
    rating
    max_rating
    class
  }
`)

export const finaleScoresFields = graphql(`
  fragment finaleScoresFields on finale_scores {
    song_id
    difficulty
    score
    combo_flag
    sync_flag
    start
  }
`)

export const finaleRecordsWithHistoryFields = graphql(`
  fragment finaleRecordsWithHistoryFields on finale_records_with_history {
    card_name
    title
    rating
    max_rating
    class
    start
    end
  }
`)

export const finaleScoresWithHistoryFields = graphql(`
  fragment finaleScoresWithHistoryFields on finale_scores_with_history {
    song_id
    difficulty
    score
    combo_flag
    sync_flag
    start
    end
  }
`)
