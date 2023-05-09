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
  "\n  mutation InsertDxIntlRecordWithScores(\n    $record: dx_intl_records_insert_input!\n    $scores: [dx_intl_scores_insert_input!]!\n  ) {\n    insert_dx_intl_records_one(\n      object: $record\n      on_conflict: {\n        constraint: dx_intl_records_player_id_key\n        update_columns: [\n          card_name\n          title\n          trophy\n          rating\n          rating_legacy\n          max_rating\n          grade\n          course_rank\n          class_rank\n        ]\n      }\n    ) {\n      __typename\n    }\n    insert_dx_intl_scores(\n      objects: $scores\n      on_conflict: {\n        constraint: dx_intl_scores_player_id_song_id_deluxe_difficulty_key\n        update_columns: [score, combo_flag, sync_flag]\n      }\n    ) {\n      affected_rows\n    }\n  }\n":
    types.InsertDxIntlRecordWithScoresDocument,
  "\n  query Tokens {\n    tokens {\n      id\n      created_at\n    }\n  }\n":
    types.TokensDocument,
  "\n  mutation regenerateToken {\n    delete_tokens(where: {}) {\n      affected_rows\n    }\n    insert_tokens_one(object: {}) {\n      id\n    }\n  }\n":
    types.RegenerateTokenDocument,
  "\n  mutation deleteUser {\n    delete_users(where: {}) {\n      affected_rows\n    }\n  }\n":
    types.DeleteUserDocument,
  "\n  query dxIntlNewRatingStats {\n    dx_intl_new_rating_stats {\n      range\n      count\n    }\n  }\n":
    types.DxIntlNewRatingStatsDocument,
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
  source: "\n  query dxIntlNewRatingStats {\n    dx_intl_new_rating_stats {\n      range\n      count\n    }\n  }\n"
): (typeof documents)["\n  query dxIntlNewRatingStats {\n    dx_intl_new_rating_stats {\n      range\n      count\n    }\n  }\n"]
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
