/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
import * as types from "./graphql"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  query dxIntlPlayers {\n    dx_intl_players {\n      ...dxIntlPlayersFragment\n    }\n  }\n":
    types.DxIntlPlayersDocument,
  "\n  mutation InsertDxIntlRecordWithScores(\n    $record: dx_intl_records_insert_input!\n    $scores: [dx_intl_scores_insert_input!]!\n  ) {\n    insert_dx_intl_records_one(\n      object: $record\n      on_conflict: {\n        constraint: dx_intl_records_player_id_key\n        update_columns: [\n          card_name\n          title\n          trophy\n          rating\n          rating_legacy\n          max_rating\n          grade\n          course_rank\n          class_rank\n        ]\n      }\n    ) {\n      __typename\n    }\n    insert_dx_intl_scores(\n      objects: $scores\n      on_conflict: {\n        constraint: dx_intl_scores_player_id_song_id_deluxe_difficulty_key\n        update_columns: [score, combo_flag, sync_flag]\n      }\n    ) {\n      affected_rows\n    }\n  }\n":
    types.InsertDxIntlRecordWithScoresDocument,
  "\n  query Tokens {\n    tokens {\n      id\n      created_at\n    }\n  }\n":
    types.TokensDocument,
  "\n  mutation regenerateToken {\n    delete_tokens(where: {}) {\n      affected_rows\n    }\n    insert_tokens_one(object: {}) {\n      id\n    }\n  }\n":
    types.RegenerateTokenDocument,
  "\n  mutation deleteUser {\n    delete_users(where: {}) {\n      affected_rows\n    }\n  }\n":
    types.DeleteUserDocument,
  "\n  fragment dxIntlPlayersFragment on dx_intl_players {\n    id\n    nickname\n    private\n    created_at\n    updated_at\n    dx_intl_record {\n      ...dxIntlRecordsFragment \n    }\n  }\n":
    types.DxIntlPlayersFragmentFragmentDoc,
  "\n  fragment dxIntlSongsFragment on dx_intl_songs {\n    id\n    category\n    title\n    order\n    dx_intl_variants(order_by: { deluxe: asc }) {\n      deluxe\n      version\n      active\n      dx_intl_notes(order_by: { difficulty: asc }) {\n        internal_lv\n        difficulty\n        level\n      }\n    }\n  }\n":
    types.DxIntlSongsFragmentFragmentDoc,
  "\n  fragment dxIntlRecordsFragment on dx_intl_records {\n    card_name\n    title\n    trophy\n    rating\n    max_rating\n    rating_legacy\n    grade\n    course_rank\n    class_rank\n  }\n":
    types.DxIntlRecordsFragmentFragmentDoc,
  "\n  fragment dxIntlScoresFragment on dx_intl_scores {\n    song_id\n    deluxe\n    difficulty\n    score\n    combo_flag\n    sync_flag\n  }\n":
    types.DxIntlScoresFragmentFragmentDoc,
  "\n  query dxIntlNewRatingStats {\n    dx_intl_new_rating_stats {\n      range\n      count\n    }\n  }\n":
    types.DxIntlNewRatingStatsDocument,
  "\n  query dxIntlPlayersEditable($userId: String!, $nickname: String!) {\n    dx_intl_players(\n      where: { user_id: { _eq: $userId }, nickname: { _eq: $nickname } }\n    ) {\n      id\n      nickname\n      private\n    }\n  }\n":
    types.DxIntlPlayersEditableDocument,
  "\n  mutation insertDxIntlPlayer($nickname: String!, $private: Boolean!) {\n    insert_dx_intl_players_one(\n      object: { nickname: $nickname, private: $private }\n    ) {\n      id\n    }\n  }\n":
    types.InsertDxIntlPlayerDocument,
  "\n  mutation updateDxIntlPlayer(\n    $pk: Int!\n    $nickname: String!\n    $private: Boolean!\n  ) {\n    update_dx_intl_players_by_pk(\n      pk_columns: { id: $pk }\n      _set: { nickname: $nickname, private: $private }\n    ) {\n      id\n    }\n  }\n":
    types.UpdateDxIntlPlayerDocument,
  "\n  mutation deleteDxIntlPlayer($pk: Int!) {\n    delete_dx_intl_players_by_pk(id: $pk) {\n      id\n    }\n  }\n":
    types.DeleteDxIntlPlayerDocument,
  "\n  query dxIntlPlayersTimelines($nickname: String!) {\n    dx_intl_players_timelines(where: { nickname: { _eq: $nickname } }) {\n      timelines\n    }\n  }\n":
    types.DxIntlPlayersTimelinesDocument,
  "\n  query dxIntlScoresStats(\n    $songId: String!\n    $deluxe: Boolean!\n    $difficulty: smallint!\n  ) {\n    dx_intl_scores_stats(\n      where: {\n        song_id: { _eq: $songId }\n        deluxe: { _eq: $deluxe }\n        difficulty: { _eq: $difficulty }\n      }\n    ) {\n      range\n      count\n    }\n  }\n":
    types.DxIntlScoresStatsDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query dxIntlPlayers {\n    dx_intl_players {\n      ...dxIntlPlayersFragment\n    }\n  }\n"
): (typeof documents)["\n  query dxIntlPlayers {\n    dx_intl_players {\n      ...dxIntlPlayersFragment\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation InsertDxIntlRecordWithScores(\n    $record: dx_intl_records_insert_input!\n    $scores: [dx_intl_scores_insert_input!]!\n  ) {\n    insert_dx_intl_records_one(\n      object: $record\n      on_conflict: {\n        constraint: dx_intl_records_player_id_key\n        update_columns: [\n          card_name\n          title\n          trophy\n          rating\n          rating_legacy\n          max_rating\n          grade\n          course_rank\n          class_rank\n        ]\n      }\n    ) {\n      __typename\n    }\n    insert_dx_intl_scores(\n      objects: $scores\n      on_conflict: {\n        constraint: dx_intl_scores_player_id_song_id_deluxe_difficulty_key\n        update_columns: [score, combo_flag, sync_flag]\n      }\n    ) {\n      affected_rows\n    }\n  }\n"
): (typeof documents)["\n  mutation InsertDxIntlRecordWithScores(\n    $record: dx_intl_records_insert_input!\n    $scores: [dx_intl_scores_insert_input!]!\n  ) {\n    insert_dx_intl_records_one(\n      object: $record\n      on_conflict: {\n        constraint: dx_intl_records_player_id_key\n        update_columns: [\n          card_name\n          title\n          trophy\n          rating\n          rating_legacy\n          max_rating\n          grade\n          course_rank\n          class_rank\n        ]\n      }\n    ) {\n      __typename\n    }\n    insert_dx_intl_scores(\n      objects: $scores\n      on_conflict: {\n        constraint: dx_intl_scores_player_id_song_id_deluxe_difficulty_key\n        update_columns: [score, combo_flag, sync_flag]\n      }\n    ) {\n      affected_rows\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query Tokens {\n    tokens {\n      id\n      created_at\n    }\n  }\n"
): (typeof documents)["\n  query Tokens {\n    tokens {\n      id\n      created_at\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation regenerateToken {\n    delete_tokens(where: {}) {\n      affected_rows\n    }\n    insert_tokens_one(object: {}) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation regenerateToken {\n    delete_tokens(where: {}) {\n      affected_rows\n    }\n    insert_tokens_one(object: {}) {\n      id\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation deleteUser {\n    delete_users(where: {}) {\n      affected_rows\n    }\n  }\n"
): (typeof documents)["\n  mutation deleteUser {\n    delete_users(where: {}) {\n      affected_rows\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment dxIntlPlayersFragment on dx_intl_players {\n    id\n    nickname\n    private\n    created_at\n    updated_at\n    dx_intl_record {\n      ...dxIntlRecordsFragment \n    }\n  }\n"
): (typeof documents)["\n  fragment dxIntlPlayersFragment on dx_intl_players {\n    id\n    nickname\n    private\n    created_at\n    updated_at\n    dx_intl_record {\n      ...dxIntlRecordsFragment \n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment dxIntlSongsFragment on dx_intl_songs {\n    id\n    category\n    title\n    order\n    dx_intl_variants(order_by: { deluxe: asc }) {\n      deluxe\n      version\n      active\n      dx_intl_notes(order_by: { difficulty: asc }) {\n        internal_lv\n        difficulty\n        level\n      }\n    }\n  }\n"
): (typeof documents)["\n  fragment dxIntlSongsFragment on dx_intl_songs {\n    id\n    category\n    title\n    order\n    dx_intl_variants(order_by: { deluxe: asc }) {\n      deluxe\n      version\n      active\n      dx_intl_notes(order_by: { difficulty: asc }) {\n        internal_lv\n        difficulty\n        level\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment dxIntlRecordsFragment on dx_intl_records {\n    card_name\n    title\n    trophy\n    rating\n    max_rating\n    rating_legacy\n    grade\n    course_rank\n    class_rank\n  }\n"
): (typeof documents)["\n  fragment dxIntlRecordsFragment on dx_intl_records {\n    card_name\n    title\n    trophy\n    rating\n    max_rating\n    rating_legacy\n    grade\n    course_rank\n    class_rank\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  fragment dxIntlScoresFragment on dx_intl_scores {\n    song_id\n    deluxe\n    difficulty\n    score\n    combo_flag\n    sync_flag\n  }\n"
): (typeof documents)["\n  fragment dxIntlScoresFragment on dx_intl_scores {\n    song_id\n    deluxe\n    difficulty\n    score\n    combo_flag\n    sync_flag\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query dxIntlNewRatingStats {\n    dx_intl_new_rating_stats {\n      range\n      count\n    }\n  }\n"
): (typeof documents)["\n  query dxIntlNewRatingStats {\n    dx_intl_new_rating_stats {\n      range\n      count\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query dxIntlPlayersEditable($userId: String!, $nickname: String!) {\n    dx_intl_players(\n      where: { user_id: { _eq: $userId }, nickname: { _eq: $nickname } }\n    ) {\n      id\n      nickname\n      private\n    }\n  }\n"
): (typeof documents)["\n  query dxIntlPlayersEditable($userId: String!, $nickname: String!) {\n    dx_intl_players(\n      where: { user_id: { _eq: $userId }, nickname: { _eq: $nickname } }\n    ) {\n      id\n      nickname\n      private\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation insertDxIntlPlayer($nickname: String!, $private: Boolean!) {\n    insert_dx_intl_players_one(\n      object: { nickname: $nickname, private: $private }\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation insertDxIntlPlayer($nickname: String!, $private: Boolean!) {\n    insert_dx_intl_players_one(\n      object: { nickname: $nickname, private: $private }\n    ) {\n      id\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation updateDxIntlPlayer(\n    $pk: Int!\n    $nickname: String!\n    $private: Boolean!\n  ) {\n    update_dx_intl_players_by_pk(\n      pk_columns: { id: $pk }\n      _set: { nickname: $nickname, private: $private }\n    ) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation updateDxIntlPlayer(\n    $pk: Int!\n    $nickname: String!\n    $private: Boolean!\n  ) {\n    update_dx_intl_players_by_pk(\n      pk_columns: { id: $pk }\n      _set: { nickname: $nickname, private: $private }\n    ) {\n      id\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  mutation deleteDxIntlPlayer($pk: Int!) {\n    delete_dx_intl_players_by_pk(id: $pk) {\n      id\n    }\n  }\n"
): (typeof documents)["\n  mutation deleteDxIntlPlayer($pk: Int!) {\n    delete_dx_intl_players_by_pk(id: $pk) {\n      id\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query dxIntlPlayersTimelines($nickname: String!) {\n    dx_intl_players_timelines(where: { nickname: { _eq: $nickname } }) {\n      timelines\n    }\n  }\n"
): (typeof documents)["\n  query dxIntlPlayersTimelines($nickname: String!) {\n    dx_intl_players_timelines(where: { nickname: { _eq: $nickname } }) {\n      timelines\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query dxIntlScoresStats(\n    $songId: String!\n    $deluxe: Boolean!\n    $difficulty: smallint!\n  ) {\n    dx_intl_scores_stats(\n      where: {\n        song_id: { _eq: $songId }\n        deluxe: { _eq: $deluxe }\n        difficulty: { _eq: $difficulty }\n      }\n    ) {\n      range\n      count\n    }\n  }\n"
): (typeof documents)["\n  query dxIntlScoresStats(\n    $songId: String!\n    $deluxe: Boolean!\n    $difficulty: smallint!\n  ) {\n    dx_intl_scores_stats(\n      where: {\n        song_id: { _eq: $songId }\n        deluxe: { _eq: $deluxe }\n        difficulty: { _eq: $difficulty }\n      }\n    ) {\n      range\n      count\n    }\n  }\n"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
