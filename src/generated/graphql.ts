import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  _timestamptz: string[]
  bigint: number
  dx_intl_combo_flag: "" | "fc" | "fc+" | "ap" | "ap+"
  dx_intl_level:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "7+"
    | "8"
    | "8+"
    | "9"
    | "9+"
    | "10"
    | "10+"
    | "11"
    | "11+"
    | "12"
    | "12+"
    | "13"
    | "13+"
    | "14"
    | "14+"
    | "15"
  dx_intl_sync_flag: "" | "fs" | "fs+" | "fdx" | "fdx+"
  dx_intl_trophy: "normal" | "bronze" | "silver" | "gold" | "rainbow"
  finale_combo_flag: "" | "fc_silver" | "fc_gold" | "ap" | "ap_plus"
  finale_level:
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "7+"
    | "8"
    | "8+"
    | "9"
    | "9+"
    | "10"
    | "10+"
    | "11"
    | "11+"
    | "12"
    | "12+"
    | "13"
    | "13+"
    | "14"
  finale_sync_flag: any
  numeric: number
  smallint: number
  timestamptz: string
  uuid: string
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Boolean"]>
  _gt?: InputMaybe<Scalars["Boolean"]>
  _gte?: InputMaybe<Scalars["Boolean"]>
  _in?: InputMaybe<Array<Scalars["Boolean"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["Boolean"]>
  _lte?: InputMaybe<Scalars["Boolean"]>
  _neq?: InputMaybe<Scalars["Boolean"]>
  _nin?: InputMaybe<Array<Scalars["Boolean"]>>
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Int"]>
  _gt?: InputMaybe<Scalars["Int"]>
  _gte?: InputMaybe<Scalars["Int"]>
  _in?: InputMaybe<Array<Scalars["Int"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["Int"]>
  _lte?: InputMaybe<Scalars["Int"]>
  _neq?: InputMaybe<Scalars["Int"]>
  _nin?: InputMaybe<Array<Scalars["Int"]>>
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]>
  _gt?: InputMaybe<Scalars["String"]>
  _gte?: InputMaybe<Scalars["String"]>
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>
  _in?: InputMaybe<Array<Scalars["String"]>>
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>
  _lt?: InputMaybe<Scalars["String"]>
  _lte?: InputMaybe<Scalars["String"]>
  _neq?: InputMaybe<Scalars["String"]>
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>
  _nin?: InputMaybe<Array<Scalars["String"]>>
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>
}

/** Boolean expression to compare columns of type "_timestamptz". All fields are combined with logical 'AND'. */
export type _Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["_timestamptz"]>
  _gt?: InputMaybe<Scalars["_timestamptz"]>
  _gte?: InputMaybe<Scalars["_timestamptz"]>
  _in?: InputMaybe<Array<Scalars["_timestamptz"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["_timestamptz"]>
  _lte?: InputMaybe<Scalars["_timestamptz"]>
  _neq?: InputMaybe<Scalars["_timestamptz"]>
  _nin?: InputMaybe<Array<Scalars["_timestamptz"]>>
}

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["bigint"]>
  _gt?: InputMaybe<Scalars["bigint"]>
  _gte?: InputMaybe<Scalars["bigint"]>
  _in?: InputMaybe<Array<Scalars["bigint"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["bigint"]>
  _lte?: InputMaybe<Scalars["bigint"]>
  _neq?: InputMaybe<Scalars["bigint"]>
  _nin?: InputMaybe<Array<Scalars["bigint"]>>
}

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = "ASC",
  /** descending ordering of the cursor */
  Desc = "DESC",
}

/** Boolean expression to compare columns of type "dx_intl_combo_flag". All fields are combined with logical 'AND'. */
export type Dx_Intl_Combo_Flag_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  _gt?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  _gte?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  _in?: InputMaybe<Array<Scalars["dx_intl_combo_flag"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  _lte?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  _neq?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  _nin?: InputMaybe<Array<Scalars["dx_intl_combo_flag"]>>
}

/** Boolean expression to compare columns of type "dx_intl_level". All fields are combined with logical 'AND'. */
export type Dx_Intl_Level_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["dx_intl_level"]>
  _gt?: InputMaybe<Scalars["dx_intl_level"]>
  _gte?: InputMaybe<Scalars["dx_intl_level"]>
  _in?: InputMaybe<Array<Scalars["dx_intl_level"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["dx_intl_level"]>
  _lte?: InputMaybe<Scalars["dx_intl_level"]>
  _neq?: InputMaybe<Scalars["dx_intl_level"]>
  _nin?: InputMaybe<Array<Scalars["dx_intl_level"]>>
}

/** columns and relationships of "dx_intl_new_rating_stats" */
export type Dx_Intl_New_Rating_Stats = {
  __typename?: "dx_intl_new_rating_stats"
  count?: Maybe<Scalars["bigint"]>
  range?: Maybe<Scalars["String"]>
}

/** aggregated selection of "dx_intl_new_rating_stats" */
export type Dx_Intl_New_Rating_Stats_Aggregate = {
  __typename?: "dx_intl_new_rating_stats_aggregate"
  aggregate?: Maybe<Dx_Intl_New_Rating_Stats_Aggregate_Fields>
  nodes: Array<Dx_Intl_New_Rating_Stats>
}

/** aggregate fields of "dx_intl_new_rating_stats" */
export type Dx_Intl_New_Rating_Stats_Aggregate_Fields = {
  __typename?: "dx_intl_new_rating_stats_aggregate_fields"
  avg?: Maybe<Dx_Intl_New_Rating_Stats_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_New_Rating_Stats_Max_Fields>
  min?: Maybe<Dx_Intl_New_Rating_Stats_Min_Fields>
  stddev?: Maybe<Dx_Intl_New_Rating_Stats_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_New_Rating_Stats_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_New_Rating_Stats_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_New_Rating_Stats_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_New_Rating_Stats_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_New_Rating_Stats_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_New_Rating_Stats_Variance_Fields>
}

/** aggregate fields of "dx_intl_new_rating_stats" */
export type Dx_Intl_New_Rating_Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Dx_Intl_New_Rating_Stats_Avg_Fields = {
  __typename?: "dx_intl_new_rating_stats_avg_fields"
  count?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "dx_intl_new_rating_stats". All fields are combined with a logical 'AND'. */
export type Dx_Intl_New_Rating_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_New_Rating_Stats_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Bool_Exp>>
  count?: InputMaybe<Bigint_Comparison_Exp>
  range?: InputMaybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type Dx_Intl_New_Rating_Stats_Max_Fields = {
  __typename?: "dx_intl_new_rating_stats_max_fields"
  count?: Maybe<Scalars["bigint"]>
  range?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Dx_Intl_New_Rating_Stats_Min_Fields = {
  __typename?: "dx_intl_new_rating_stats_min_fields"
  count?: Maybe<Scalars["bigint"]>
  range?: Maybe<Scalars["String"]>
}

/** Ordering options when selecting data from "dx_intl_new_rating_stats". */
export type Dx_Intl_New_Rating_Stats_Order_By = {
  count?: InputMaybe<Order_By>
  range?: InputMaybe<Order_By>
}

/** select columns of table "dx_intl_new_rating_stats" */
export enum Dx_Intl_New_Rating_Stats_Select_Column {
  /** column name */
  Count = "count",
  /** column name */
  Range = "range",
}

/** aggregate stddev on columns */
export type Dx_Intl_New_Rating_Stats_Stddev_Fields = {
  __typename?: "dx_intl_new_rating_stats_stddev_fields"
  count?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_New_Rating_Stats_Stddev_Pop_Fields = {
  __typename?: "dx_intl_new_rating_stats_stddev_pop_fields"
  count?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_New_Rating_Stats_Stddev_Samp_Fields = {
  __typename?: "dx_intl_new_rating_stats_stddev_samp_fields"
  count?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "dx_intl_new_rating_stats" */
export type Dx_Intl_New_Rating_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_New_Rating_Stats_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_New_Rating_Stats_Stream_Cursor_Value_Input = {
  count?: InputMaybe<Scalars["bigint"]>
  range?: InputMaybe<Scalars["String"]>
}

/** aggregate sum on columns */
export type Dx_Intl_New_Rating_Stats_Sum_Fields = {
  __typename?: "dx_intl_new_rating_stats_sum_fields"
  count?: Maybe<Scalars["bigint"]>
}

/** aggregate var_pop on columns */
export type Dx_Intl_New_Rating_Stats_Var_Pop_Fields = {
  __typename?: "dx_intl_new_rating_stats_var_pop_fields"
  count?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Dx_Intl_New_Rating_Stats_Var_Samp_Fields = {
  __typename?: "dx_intl_new_rating_stats_var_samp_fields"
  count?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Dx_Intl_New_Rating_Stats_Variance_Fields = {
  __typename?: "dx_intl_new_rating_stats_variance_fields"
  count?: Maybe<Scalars["Float"]>
}

/** columns and relationships of "dx_intl_notes" */
export type Dx_Intl_Notes = {
  __typename?: "dx_intl_notes"
  deluxe: Scalars["Boolean"]
  difficulty: Scalars["smallint"]
  /** An array relationship */
  dx_intl_scores: Array<Dx_Intl_Scores>
  /** An aggregate relationship */
  dx_intl_scores_aggregate: Dx_Intl_Scores_Aggregate
  /** An object relationship */
  dx_intl_variant?: Maybe<Dx_Intl_Variants>
  internal_lv?: Maybe<Scalars["numeric"]>
  level: Scalars["dx_intl_level"]
  song_id: Scalars["String"]
}

/** columns and relationships of "dx_intl_notes" */
export type Dx_Intl_NotesDx_Intl_ScoresArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

/** columns and relationships of "dx_intl_notes" */
export type Dx_Intl_NotesDx_Intl_Scores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

/** aggregated selection of "dx_intl_notes" */
export type Dx_Intl_Notes_Aggregate = {
  __typename?: "dx_intl_notes_aggregate"
  aggregate?: Maybe<Dx_Intl_Notes_Aggregate_Fields>
  nodes: Array<Dx_Intl_Notes>
}

export type Dx_Intl_Notes_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Dx_Intl_Notes_Aggregate_Bool_Exp_Bool_And>
  bool_or?: InputMaybe<Dx_Intl_Notes_Aggregate_Bool_Exp_Bool_Or>
  count?: InputMaybe<Dx_Intl_Notes_Aggregate_Bool_Exp_Count>
}

export type Dx_Intl_Notes_Aggregate_Bool_Exp_Bool_And = {
  arguments: Dx_Intl_Notes_Select_Column_Dx_Intl_Notes_Aggregate_Bool_Exp_Bool_And_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Dx_Intl_Notes_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Dx_Intl_Notes_Select_Column_Dx_Intl_Notes_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Dx_Intl_Notes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dx_Intl_Notes_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "dx_intl_notes" */
export type Dx_Intl_Notes_Aggregate_Fields = {
  __typename?: "dx_intl_notes_aggregate_fields"
  avg?: Maybe<Dx_Intl_Notes_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Notes_Max_Fields>
  min?: Maybe<Dx_Intl_Notes_Min_Fields>
  stddev?: Maybe<Dx_Intl_Notes_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Notes_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Notes_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Notes_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Notes_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Notes_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Notes_Variance_Fields>
}

/** aggregate fields of "dx_intl_notes" */
export type Dx_Intl_Notes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Notes_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "dx_intl_notes" */
export type Dx_Intl_Notes_Aggregate_Order_By = {
  avg?: InputMaybe<Dx_Intl_Notes_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Dx_Intl_Notes_Max_Order_By>
  min?: InputMaybe<Dx_Intl_Notes_Min_Order_By>
  stddev?: InputMaybe<Dx_Intl_Notes_Stddev_Order_By>
  stddev_pop?: InputMaybe<Dx_Intl_Notes_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Dx_Intl_Notes_Stddev_Samp_Order_By>
  sum?: InputMaybe<Dx_Intl_Notes_Sum_Order_By>
  var_pop?: InputMaybe<Dx_Intl_Notes_Var_Pop_Order_By>
  var_samp?: InputMaybe<Dx_Intl_Notes_Var_Samp_Order_By>
  variance?: InputMaybe<Dx_Intl_Notes_Variance_Order_By>
}

/** input type for inserting array relation for remote table "dx_intl_notes" */
export type Dx_Intl_Notes_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Notes_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Notes_On_Conflict>
}

/** aggregate avg on columns */
export type Dx_Intl_Notes_Avg_Fields = {
  __typename?: "dx_intl_notes_avg_fields"
  difficulty?: Maybe<Scalars["Float"]>
  internal_lv?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Avg_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "dx_intl_notes". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Notes_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Notes_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Notes_Bool_Exp>>
  deluxe?: InputMaybe<Boolean_Comparison_Exp>
  difficulty?: InputMaybe<Smallint_Comparison_Exp>
  dx_intl_scores?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
  dx_intl_scores_aggregate?: InputMaybe<Dx_Intl_Scores_Aggregate_Bool_Exp>
  dx_intl_variant?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
  internal_lv?: InputMaybe<Numeric_Comparison_Exp>
  level?: InputMaybe<Dx_Intl_Level_Comparison_Exp>
  song_id?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "dx_intl_notes" */
export enum Dx_Intl_Notes_Constraint {
  /** unique or primary key constraint on columns "deluxe", "song_id", "difficulty" */
  DxIntlNotesPkey1 = "dx_intl_notes_pkey1",
}

/** input type for incrementing numeric columns in table "dx_intl_notes" */
export type Dx_Intl_Notes_Inc_Input = {
  difficulty?: InputMaybe<Scalars["smallint"]>
  internal_lv?: InputMaybe<Scalars["numeric"]>
}

/** input type for inserting data into table "dx_intl_notes" */
export type Dx_Intl_Notes_Insert_Input = {
  deluxe?: InputMaybe<Scalars["Boolean"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  dx_intl_scores?: InputMaybe<Dx_Intl_Scores_Arr_Rel_Insert_Input>
  dx_intl_variant?: InputMaybe<Dx_Intl_Variants_Obj_Rel_Insert_Input>
  internal_lv?: InputMaybe<Scalars["numeric"]>
  level?: InputMaybe<Scalars["dx_intl_level"]>
  song_id?: InputMaybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Dx_Intl_Notes_Max_Fields = {
  __typename?: "dx_intl_notes_max_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  internal_lv?: Maybe<Scalars["numeric"]>
  level?: Maybe<Scalars["dx_intl_level"]>
  song_id?: Maybe<Scalars["String"]>
}

/** order by max() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Max_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
  level?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Dx_Intl_Notes_Min_Fields = {
  __typename?: "dx_intl_notes_min_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  internal_lv?: Maybe<Scalars["numeric"]>
  level?: Maybe<Scalars["dx_intl_level"]>
  song_id?: Maybe<Scalars["String"]>
}

/** order by min() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Min_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
  level?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "dx_intl_notes" */
export type Dx_Intl_Notes_Mutation_Response = {
  __typename?: "dx_intl_notes_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Dx_Intl_Notes>
}

/** input type for inserting object relation for remote table "dx_intl_notes" */
export type Dx_Intl_Notes_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Notes_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Notes_On_Conflict>
}

/** on_conflict condition type for table "dx_intl_notes" */
export type Dx_Intl_Notes_On_Conflict = {
  constraint: Dx_Intl_Notes_Constraint
  update_columns?: Array<Dx_Intl_Notes_Update_Column>
  where?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
}

/** Ordering options when selecting data from "dx_intl_notes". */
export type Dx_Intl_Notes_Order_By = {
  deluxe?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  dx_intl_scores_aggregate?: InputMaybe<Dx_Intl_Scores_Aggregate_Order_By>
  dx_intl_variant?: InputMaybe<Dx_Intl_Variants_Order_By>
  internal_lv?: InputMaybe<Order_By>
  level?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: dx_intl_notes */
export type Dx_Intl_Notes_Pk_Columns_Input = {
  deluxe: Scalars["Boolean"]
  difficulty: Scalars["smallint"]
  song_id: Scalars["String"]
}

/** select columns of table "dx_intl_notes" */
export enum Dx_Intl_Notes_Select_Column {
  /** column name */
  Deluxe = "deluxe",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  InternalLv = "internal_lv",
  /** column name */
  Level = "level",
  /** column name */
  SongId = "song_id",
}

/** select "dx_intl_notes_aggregate_bool_exp_bool_and_arguments_columns" columns of table "dx_intl_notes" */
export enum Dx_Intl_Notes_Select_Column_Dx_Intl_Notes_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Deluxe = "deluxe",
}

/** select "dx_intl_notes_aggregate_bool_exp_bool_or_arguments_columns" columns of table "dx_intl_notes" */
export enum Dx_Intl_Notes_Select_Column_Dx_Intl_Notes_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Deluxe = "deluxe",
}

/** input type for updating data in table "dx_intl_notes" */
export type Dx_Intl_Notes_Set_Input = {
  deluxe?: InputMaybe<Scalars["Boolean"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  internal_lv?: InputMaybe<Scalars["numeric"]>
  level?: InputMaybe<Scalars["dx_intl_level"]>
  song_id?: InputMaybe<Scalars["String"]>
}

/** aggregate stddev on columns */
export type Dx_Intl_Notes_Stddev_Fields = {
  __typename?: "dx_intl_notes_stddev_fields"
  difficulty?: Maybe<Scalars["Float"]>
  internal_lv?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Stddev_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Notes_Stddev_Pop_Fields = {
  __typename?: "dx_intl_notes_stddev_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  internal_lv?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Stddev_Pop_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Notes_Stddev_Samp_Fields = {
  __typename?: "dx_intl_notes_stddev_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  internal_lv?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Stddev_Samp_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "dx_intl_notes" */
export type Dx_Intl_Notes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Notes_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Notes_Stream_Cursor_Value_Input = {
  deluxe?: InputMaybe<Scalars["Boolean"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  internal_lv?: InputMaybe<Scalars["numeric"]>
  level?: InputMaybe<Scalars["dx_intl_level"]>
  song_id?: InputMaybe<Scalars["String"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Notes_Sum_Fields = {
  __typename?: "dx_intl_notes_sum_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  internal_lv?: Maybe<Scalars["numeric"]>
}

/** order by sum() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Sum_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
}

/** update columns of table "dx_intl_notes" */
export enum Dx_Intl_Notes_Update_Column {
  /** column name */
  Deluxe = "deluxe",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  InternalLv = "internal_lv",
  /** column name */
  Level = "level",
  /** column name */
  SongId = "song_id",
}

export type Dx_Intl_Notes_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Dx_Intl_Notes_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dx_Intl_Notes_Set_Input>
  where: Dx_Intl_Notes_Bool_Exp
}

/** aggregate var_pop on columns */
export type Dx_Intl_Notes_Var_Pop_Fields = {
  __typename?: "dx_intl_notes_var_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  internal_lv?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Var_Pop_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Notes_Var_Samp_Fields = {
  __typename?: "dx_intl_notes_var_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  internal_lv?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Var_Samp_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Dx_Intl_Notes_Variance_Fields = {
  __typename?: "dx_intl_notes_variance_fields"
  difficulty?: Maybe<Scalars["Float"]>
  internal_lv?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Variance_Order_By = {
  difficulty?: InputMaybe<Order_By>
  internal_lv?: InputMaybe<Order_By>
}

/** columns and relationships of "dx_intl_players" */
export type Dx_Intl_Players = {
  __typename?: "dx_intl_players"
  created_at: Scalars["timestamptz"]
  /** An object relationship */
  dx_intl_record?: Maybe<Dx_Intl_Records>
  /** An array relationship */
  dx_intl_scores: Array<Dx_Intl_Scores>
  /** An aggregate relationship */
  dx_intl_scores_aggregate: Dx_Intl_Scores_Aggregate
  id: Scalars["Int"]
  nickname: Scalars["String"]
  private: Scalars["Boolean"]
  /** An object relationship */
  timelines?: Maybe<Dx_Intl_Players_Timelines>
  updated_at?: Maybe<Scalars["timestamptz"]>
  /** An object relationship */
  user: Users
  user_id: Scalars["String"]
}

/** columns and relationships of "dx_intl_players" */
export type Dx_Intl_PlayersDx_Intl_ScoresArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

/** columns and relationships of "dx_intl_players" */
export type Dx_Intl_PlayersDx_Intl_Scores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

/** aggregated selection of "dx_intl_players" */
export type Dx_Intl_Players_Aggregate = {
  __typename?: "dx_intl_players_aggregate"
  aggregate?: Maybe<Dx_Intl_Players_Aggregate_Fields>
  nodes: Array<Dx_Intl_Players>
}

export type Dx_Intl_Players_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Dx_Intl_Players_Aggregate_Bool_Exp_Bool_And>
  bool_or?: InputMaybe<Dx_Intl_Players_Aggregate_Bool_Exp_Bool_Or>
  count?: InputMaybe<Dx_Intl_Players_Aggregate_Bool_Exp_Count>
}

export type Dx_Intl_Players_Aggregate_Bool_Exp_Bool_And = {
  arguments: Dx_Intl_Players_Select_Column_Dx_Intl_Players_Aggregate_Bool_Exp_Bool_And_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Dx_Intl_Players_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Dx_Intl_Players_Select_Column_Dx_Intl_Players_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Dx_Intl_Players_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dx_Intl_Players_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "dx_intl_players" */
export type Dx_Intl_Players_Aggregate_Fields = {
  __typename?: "dx_intl_players_aggregate_fields"
  avg?: Maybe<Dx_Intl_Players_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Players_Max_Fields>
  min?: Maybe<Dx_Intl_Players_Min_Fields>
  stddev?: Maybe<Dx_Intl_Players_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Players_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Players_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Players_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Players_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Players_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Players_Variance_Fields>
}

/** aggregate fields of "dx_intl_players" */
export type Dx_Intl_Players_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Players_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "dx_intl_players" */
export type Dx_Intl_Players_Aggregate_Order_By = {
  avg?: InputMaybe<Dx_Intl_Players_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Dx_Intl_Players_Max_Order_By>
  min?: InputMaybe<Dx_Intl_Players_Min_Order_By>
  stddev?: InputMaybe<Dx_Intl_Players_Stddev_Order_By>
  stddev_pop?: InputMaybe<Dx_Intl_Players_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Dx_Intl_Players_Stddev_Samp_Order_By>
  sum?: InputMaybe<Dx_Intl_Players_Sum_Order_By>
  var_pop?: InputMaybe<Dx_Intl_Players_Var_Pop_Order_By>
  var_samp?: InputMaybe<Dx_Intl_Players_Var_Samp_Order_By>
  variance?: InputMaybe<Dx_Intl_Players_Variance_Order_By>
}

/** input type for inserting array relation for remote table "dx_intl_players" */
export type Dx_Intl_Players_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Players_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Players_On_Conflict>
}

/** aggregate avg on columns */
export type Dx_Intl_Players_Avg_Fields = {
  __typename?: "dx_intl_players_avg_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Avg_Order_By = {
  id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "dx_intl_players". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Players_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Players_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Players_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  dx_intl_record?: InputMaybe<Dx_Intl_Records_Bool_Exp>
  dx_intl_scores?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
  dx_intl_scores_aggregate?: InputMaybe<Dx_Intl_Scores_Aggregate_Bool_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  nickname?: InputMaybe<String_Comparison_Exp>
  private?: InputMaybe<Boolean_Comparison_Exp>
  timelines?: InputMaybe<Dx_Intl_Players_Timelines_Bool_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  user?: InputMaybe<Users_Bool_Exp>
  user_id?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "dx_intl_players" */
export enum Dx_Intl_Players_Constraint {
  /** unique or primary key constraint on columns "nickname" */
  DxIntlPlayersNicknameKey = "dx_intl_players_nickname_key",
  /** unique or primary key constraint on columns "id" */
  DxIntlPlayersPkey = "dx_intl_players_pkey",
}

/** input type for incrementing numeric columns in table "dx_intl_players" */
export type Dx_Intl_Players_Inc_Input = {
  id?: InputMaybe<Scalars["Int"]>
}

/** input type for inserting data into table "dx_intl_players" */
export type Dx_Intl_Players_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  dx_intl_record?: InputMaybe<Dx_Intl_Records_Obj_Rel_Insert_Input>
  dx_intl_scores?: InputMaybe<Dx_Intl_Scores_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  private?: InputMaybe<Scalars["Boolean"]>
  timelines?: InputMaybe<Dx_Intl_Players_Timelines_Obj_Rel_Insert_Input>
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>
  user_id?: InputMaybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Dx_Intl_Players_Max_Fields = {
  __typename?: "dx_intl_players_max_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
  user_id?: Maybe<Scalars["String"]>
}

/** order by max() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Max_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  nickname?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Dx_Intl_Players_Min_Fields = {
  __typename?: "dx_intl_players_min_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
  user_id?: Maybe<Scalars["String"]>
}

/** order by min() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Min_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  nickname?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "dx_intl_players" */
export type Dx_Intl_Players_Mutation_Response = {
  __typename?: "dx_intl_players_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Dx_Intl_Players>
}

/** input type for inserting object relation for remote table "dx_intl_players" */
export type Dx_Intl_Players_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Players_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Players_On_Conflict>
}

/** on_conflict condition type for table "dx_intl_players" */
export type Dx_Intl_Players_On_Conflict = {
  constraint: Dx_Intl_Players_Constraint
  update_columns?: Array<Dx_Intl_Players_Update_Column>
  where?: InputMaybe<Dx_Intl_Players_Bool_Exp>
}

/** Ordering options when selecting data from "dx_intl_players". */
export type Dx_Intl_Players_Order_By = {
  created_at?: InputMaybe<Order_By>
  dx_intl_record?: InputMaybe<Dx_Intl_Records_Order_By>
  dx_intl_scores_aggregate?: InputMaybe<Dx_Intl_Scores_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  nickname?: InputMaybe<Order_By>
  private?: InputMaybe<Order_By>
  timelines?: InputMaybe<Dx_Intl_Players_Timelines_Order_By>
  updated_at?: InputMaybe<Order_By>
  user?: InputMaybe<Users_Order_By>
  user_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: dx_intl_players */
export type Dx_Intl_Players_Pk_Columns_Input = {
  id: Scalars["Int"]
}

/** select columns of table "dx_intl_players" */
export enum Dx_Intl_Players_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Nickname = "nickname",
  /** column name */
  Private = "private",
  /** column name */
  UserId = "user_id",
}

/** select "dx_intl_players_aggregate_bool_exp_bool_and_arguments_columns" columns of table "dx_intl_players" */
export enum Dx_Intl_Players_Select_Column_Dx_Intl_Players_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Private = "private",
}

/** select "dx_intl_players_aggregate_bool_exp_bool_or_arguments_columns" columns of table "dx_intl_players" */
export enum Dx_Intl_Players_Select_Column_Dx_Intl_Players_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Private = "private",
}

/** input type for updating data in table "dx_intl_players" */
export type Dx_Intl_Players_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  private?: InputMaybe<Scalars["Boolean"]>
  user_id?: InputMaybe<Scalars["String"]>
}

/** aggregate stddev on columns */
export type Dx_Intl_Players_Stddev_Fields = {
  __typename?: "dx_intl_players_stddev_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Stddev_Order_By = {
  id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Players_Stddev_Pop_Fields = {
  __typename?: "dx_intl_players_stddev_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Players_Stddev_Samp_Fields = {
  __typename?: "dx_intl_players_stddev_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "dx_intl_players" */
export type Dx_Intl_Players_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Players_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Players_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  private?: InputMaybe<Scalars["Boolean"]>
  user_id?: InputMaybe<Scalars["String"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Players_Sum_Fields = {
  __typename?: "dx_intl_players_sum_fields"
  id?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Sum_Order_By = {
  id?: InputMaybe<Order_By>
}

/** columns and relationships of "dx_intl_players_timelines" */
export type Dx_Intl_Players_Timelines = {
  __typename?: "dx_intl_players_timelines"
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
  /** An object relationship */
  player?: Maybe<Dx_Intl_Players>
  timelines?: Maybe<Scalars["_timestamptz"]>
}

/** aggregated selection of "dx_intl_players_timelines" */
export type Dx_Intl_Players_Timelines_Aggregate = {
  __typename?: "dx_intl_players_timelines_aggregate"
  aggregate?: Maybe<Dx_Intl_Players_Timelines_Aggregate_Fields>
  nodes: Array<Dx_Intl_Players_Timelines>
}

/** aggregate fields of "dx_intl_players_timelines" */
export type Dx_Intl_Players_Timelines_Aggregate_Fields = {
  __typename?: "dx_intl_players_timelines_aggregate_fields"
  avg?: Maybe<Dx_Intl_Players_Timelines_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Players_Timelines_Max_Fields>
  min?: Maybe<Dx_Intl_Players_Timelines_Min_Fields>
  stddev?: Maybe<Dx_Intl_Players_Timelines_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Players_Timelines_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Players_Timelines_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Players_Timelines_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Players_Timelines_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Players_Timelines_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Players_Timelines_Variance_Fields>
}

/** aggregate fields of "dx_intl_players_timelines" */
export type Dx_Intl_Players_Timelines_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Players_Timelines_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Dx_Intl_Players_Timelines_Avg_Fields = {
  __typename?: "dx_intl_players_timelines_avg_fields"
  id?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "dx_intl_players_timelines". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Players_Timelines_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Players_Timelines_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Players_Timelines_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Players_Timelines_Bool_Exp>>
  id?: InputMaybe<Int_Comparison_Exp>
  nickname?: InputMaybe<String_Comparison_Exp>
  player?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  timelines?: InputMaybe<_Timestamptz_Comparison_Exp>
}

/** input type for inserting data into table "dx_intl_players_timelines" */
export type Dx_Intl_Players_Timelines_Insert_Input = {
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  player?: InputMaybe<Dx_Intl_Players_Obj_Rel_Insert_Input>
  timelines?: InputMaybe<Scalars["_timestamptz"]>
}

/** aggregate max on columns */
export type Dx_Intl_Players_Timelines_Max_Fields = {
  __typename?: "dx_intl_players_timelines_max_fields"
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Dx_Intl_Players_Timelines_Min_Fields = {
  __typename?: "dx_intl_players_timelines_min_fields"
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
}

/** input type for inserting object relation for remote table "dx_intl_players_timelines" */
export type Dx_Intl_Players_Timelines_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Players_Timelines_Insert_Input
}

/** Ordering options when selecting data from "dx_intl_players_timelines". */
export type Dx_Intl_Players_Timelines_Order_By = {
  id?: InputMaybe<Order_By>
  nickname?: InputMaybe<Order_By>
  player?: InputMaybe<Dx_Intl_Players_Order_By>
  timelines?: InputMaybe<Order_By>
}

/** select columns of table "dx_intl_players_timelines" */
export enum Dx_Intl_Players_Timelines_Select_Column {
  /** column name */
  Id = "id",
  /** column name */
  Nickname = "nickname",
  /** column name */
  Timelines = "timelines",
}

/** aggregate stddev on columns */
export type Dx_Intl_Players_Timelines_Stddev_Fields = {
  __typename?: "dx_intl_players_timelines_stddev_fields"
  id?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Players_Timelines_Stddev_Pop_Fields = {
  __typename?: "dx_intl_players_timelines_stddev_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Players_Timelines_Stddev_Samp_Fields = {
  __typename?: "dx_intl_players_timelines_stddev_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "dx_intl_players_timelines" */
export type Dx_Intl_Players_Timelines_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Players_Timelines_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Players_Timelines_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  timelines?: InputMaybe<Scalars["_timestamptz"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Players_Timelines_Sum_Fields = {
  __typename?: "dx_intl_players_timelines_sum_fields"
  id?: Maybe<Scalars["Int"]>
}

/** aggregate var_pop on columns */
export type Dx_Intl_Players_Timelines_Var_Pop_Fields = {
  __typename?: "dx_intl_players_timelines_var_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Players_Timelines_Var_Samp_Fields = {
  __typename?: "dx_intl_players_timelines_var_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Dx_Intl_Players_Timelines_Variance_Fields = {
  __typename?: "dx_intl_players_timelines_variance_fields"
  id?: Maybe<Scalars["Float"]>
}

/** update columns of table "dx_intl_players" */
export enum Dx_Intl_Players_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Nickname = "nickname",
  /** column name */
  Private = "private",
  /** column name */
  UserId = "user_id",
}

export type Dx_Intl_Players_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Dx_Intl_Players_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dx_Intl_Players_Set_Input>
  where: Dx_Intl_Players_Bool_Exp
}

/** aggregate var_pop on columns */
export type Dx_Intl_Players_Var_Pop_Fields = {
  __typename?: "dx_intl_players_var_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Players_Var_Samp_Fields = {
  __typename?: "dx_intl_players_var_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Dx_Intl_Players_Variance_Fields = {
  __typename?: "dx_intl_players_variance_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Variance_Order_By = {
  id?: InputMaybe<Order_By>
}

/** columns and relationships of "dx_intl_records" */
export type Dx_Intl_Records = {
  __typename?: "dx_intl_records"
  card_name: Scalars["String"]
  class_rank?: Maybe<Scalars["smallint"]>
  course_rank?: Maybe<Scalars["smallint"]>
  /** An object relationship */
  dx_intl_player: Dx_Intl_Players
  end: Scalars["timestamptz"]
  grade?: Maybe<Scalars["Int"]>
  id: Scalars["Int"]
  max_rating: Scalars["smallint"]
  player_id: Scalars["Int"]
  rating: Scalars["smallint"]
  rating_legacy: Scalars["Boolean"]
  start: Scalars["timestamptz"]
  title: Scalars["String"]
  trophy: Scalars["dx_intl_trophy"]
}

/** aggregated selection of "dx_intl_records" */
export type Dx_Intl_Records_Aggregate = {
  __typename?: "dx_intl_records_aggregate"
  aggregate?: Maybe<Dx_Intl_Records_Aggregate_Fields>
  nodes: Array<Dx_Intl_Records>
}

/** aggregate fields of "dx_intl_records" */
export type Dx_Intl_Records_Aggregate_Fields = {
  __typename?: "dx_intl_records_aggregate_fields"
  avg?: Maybe<Dx_Intl_Records_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Records_Max_Fields>
  min?: Maybe<Dx_Intl_Records_Min_Fields>
  stddev?: Maybe<Dx_Intl_Records_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Records_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Records_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Records_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Records_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Records_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Records_Variance_Fields>
}

/** aggregate fields of "dx_intl_records" */
export type Dx_Intl_Records_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Records_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Dx_Intl_Records_Avg_Fields = {
  __typename?: "dx_intl_records_avg_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "dx_intl_records". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Records_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Records_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Records_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Records_Bool_Exp>>
  card_name?: InputMaybe<String_Comparison_Exp>
  class_rank?: InputMaybe<Smallint_Comparison_Exp>
  course_rank?: InputMaybe<Smallint_Comparison_Exp>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  end?: InputMaybe<Timestamptz_Comparison_Exp>
  grade?: InputMaybe<Int_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  max_rating?: InputMaybe<Smallint_Comparison_Exp>
  player_id?: InputMaybe<Int_Comparison_Exp>
  rating?: InputMaybe<Smallint_Comparison_Exp>
  rating_legacy?: InputMaybe<Boolean_Comparison_Exp>
  start?: InputMaybe<Timestamptz_Comparison_Exp>
  title?: InputMaybe<String_Comparison_Exp>
  trophy?: InputMaybe<Dx_Intl_Trophy_Comparison_Exp>
}

/** unique or primary key constraints on table "dx_intl_records" */
export enum Dx_Intl_Records_Constraint {
  /** unique or primary key constraint on columns "id" */
  DxIntlRecordsPkey = "dx_intl_records_pkey",
  /** unique or primary key constraint on columns "player_id" */
  DxIntlRecordsPlayerIdKey = "dx_intl_records_player_id_key",
}

/** input type for incrementing numeric columns in table "dx_intl_records" */
export type Dx_Intl_Records_Inc_Input = {
  class_rank?: InputMaybe<Scalars["smallint"]>
  course_rank?: InputMaybe<Scalars["smallint"]>
  grade?: InputMaybe<Scalars["Int"]>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["smallint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["smallint"]>
}

/** input type for inserting data into table "dx_intl_records" */
export type Dx_Intl_Records_Insert_Input = {
  card_name?: InputMaybe<Scalars["String"]>
  class_rank?: InputMaybe<Scalars["smallint"]>
  course_rank?: InputMaybe<Scalars["smallint"]>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Obj_Rel_Insert_Input>
  end?: InputMaybe<Scalars["timestamptz"]>
  grade?: InputMaybe<Scalars["Int"]>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["smallint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["smallint"]>
  rating_legacy?: InputMaybe<Scalars["Boolean"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  title?: InputMaybe<Scalars["String"]>
  trophy?: InputMaybe<Scalars["dx_intl_trophy"]>
}

/** aggregate max on columns */
export type Dx_Intl_Records_Max_Fields = {
  __typename?: "dx_intl_records_max_fields"
  card_name?: Maybe<Scalars["String"]>
  class_rank?: Maybe<Scalars["smallint"]>
  course_rank?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  grade?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["smallint"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
  trophy?: Maybe<Scalars["dx_intl_trophy"]>
}

/** aggregate min on columns */
export type Dx_Intl_Records_Min_Fields = {
  __typename?: "dx_intl_records_min_fields"
  card_name?: Maybe<Scalars["String"]>
  class_rank?: Maybe<Scalars["smallint"]>
  course_rank?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  grade?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["smallint"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
  trophy?: Maybe<Scalars["dx_intl_trophy"]>
}

/** response of any mutation on the table "dx_intl_records" */
export type Dx_Intl_Records_Mutation_Response = {
  __typename?: "dx_intl_records_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Dx_Intl_Records>
}

/** input type for inserting object relation for remote table "dx_intl_records" */
export type Dx_Intl_Records_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Records_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Records_On_Conflict>
}

/** on_conflict condition type for table "dx_intl_records" */
export type Dx_Intl_Records_On_Conflict = {
  constraint: Dx_Intl_Records_Constraint
  update_columns?: Array<Dx_Intl_Records_Update_Column>
  where?: InputMaybe<Dx_Intl_Records_Bool_Exp>
}

/** Ordering options when selecting data from "dx_intl_records". */
export type Dx_Intl_Records_Order_By = {
  card_name?: InputMaybe<Order_By>
  class_rank?: InputMaybe<Order_By>
  course_rank?: InputMaybe<Order_By>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Order_By>
  end?: InputMaybe<Order_By>
  grade?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  max_rating?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  rating?: InputMaybe<Order_By>
  rating_legacy?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  trophy?: InputMaybe<Order_By>
}

/** primary key columns input for table: dx_intl_records */
export type Dx_Intl_Records_Pk_Columns_Input = {
  id: Scalars["Int"]
}

/** select columns of table "dx_intl_records" */
export enum Dx_Intl_Records_Select_Column {
  /** column name */
  CardName = "card_name",
  /** column name */
  ClassRank = "class_rank",
  /** column name */
  CourseRank = "course_rank",
  /** column name */
  End = "end",
  /** column name */
  Grade = "grade",
  /** column name */
  Id = "id",
  /** column name */
  MaxRating = "max_rating",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Rating = "rating",
  /** column name */
  RatingLegacy = "rating_legacy",
  /** column name */
  Start = "start",
  /** column name */
  Title = "title",
  /** column name */
  Trophy = "trophy",
}

/** input type for updating data in table "dx_intl_records" */
export type Dx_Intl_Records_Set_Input = {
  card_name?: InputMaybe<Scalars["String"]>
  class_rank?: InputMaybe<Scalars["smallint"]>
  course_rank?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  grade?: InputMaybe<Scalars["Int"]>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["smallint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["smallint"]>
  rating_legacy?: InputMaybe<Scalars["Boolean"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  title?: InputMaybe<Scalars["String"]>
  trophy?: InputMaybe<Scalars["dx_intl_trophy"]>
}

/** aggregate stddev on columns */
export type Dx_Intl_Records_Stddev_Fields = {
  __typename?: "dx_intl_records_stddev_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Records_Stddev_Pop_Fields = {
  __typename?: "dx_intl_records_stddev_pop_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Records_Stddev_Samp_Fields = {
  __typename?: "dx_intl_records_stddev_samp_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "dx_intl_records" */
export type Dx_Intl_Records_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Records_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Records_Stream_Cursor_Value_Input = {
  card_name?: InputMaybe<Scalars["String"]>
  class_rank?: InputMaybe<Scalars["smallint"]>
  course_rank?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  grade?: InputMaybe<Scalars["Int"]>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["smallint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["smallint"]>
  rating_legacy?: InputMaybe<Scalars["Boolean"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  title?: InputMaybe<Scalars["String"]>
  trophy?: InputMaybe<Scalars["dx_intl_trophy"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Records_Sum_Fields = {
  __typename?: "dx_intl_records_sum_fields"
  class_rank?: Maybe<Scalars["smallint"]>
  course_rank?: Maybe<Scalars["smallint"]>
  grade?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["smallint"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["smallint"]>
}

/** update columns of table "dx_intl_records" */
export enum Dx_Intl_Records_Update_Column {
  /** column name */
  CardName = "card_name",
  /** column name */
  ClassRank = "class_rank",
  /** column name */
  CourseRank = "course_rank",
  /** column name */
  End = "end",
  /** column name */
  Grade = "grade",
  /** column name */
  Id = "id",
  /** column name */
  MaxRating = "max_rating",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Rating = "rating",
  /** column name */
  RatingLegacy = "rating_legacy",
  /** column name */
  Start = "start",
  /** column name */
  Title = "title",
  /** column name */
  Trophy = "trophy",
}

export type Dx_Intl_Records_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Dx_Intl_Records_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dx_Intl_Records_Set_Input>
  where: Dx_Intl_Records_Bool_Exp
}

/** aggregate var_pop on columns */
export type Dx_Intl_Records_Var_Pop_Fields = {
  __typename?: "dx_intl_records_var_pop_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Records_Var_Samp_Fields = {
  __typename?: "dx_intl_records_var_samp_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Dx_Intl_Records_Variance_Fields = {
  __typename?: "dx_intl_records_variance_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** columns and relationships of "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History = {
  __typename?: "dx_intl_records_with_history"
  card_name?: Maybe<Scalars["String"]>
  class_rank?: Maybe<Scalars["smallint"]>
  course_rank?: Maybe<Scalars["smallint"]>
  /** An object relationship */
  dx_intl_player?: Maybe<Dx_Intl_Players>
  end?: Maybe<Scalars["timestamptz"]>
  grade?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["smallint"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["smallint"]>
  rating_legacy?: Maybe<Scalars["Boolean"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
  trophy?: Maybe<Scalars["dx_intl_trophy"]>
}

/** aggregated selection of "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Aggregate = {
  __typename?: "dx_intl_records_with_history_aggregate"
  aggregate?: Maybe<Dx_Intl_Records_With_History_Aggregate_Fields>
  nodes: Array<Dx_Intl_Records_With_History>
}

/** aggregate fields of "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Aggregate_Fields = {
  __typename?: "dx_intl_records_with_history_aggregate_fields"
  avg?: Maybe<Dx_Intl_Records_With_History_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Records_With_History_Max_Fields>
  min?: Maybe<Dx_Intl_Records_With_History_Min_Fields>
  stddev?: Maybe<Dx_Intl_Records_With_History_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Records_With_History_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Records_With_History_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Records_With_History_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Records_With_History_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Records_With_History_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Records_With_History_Variance_Fields>
}

/** aggregate fields of "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Records_With_History_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Dx_Intl_Records_With_History_Avg_Fields = {
  __typename?: "dx_intl_records_with_history_avg_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "dx_intl_records_with_history". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Records_With_History_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Records_With_History_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Records_With_History_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Records_With_History_Bool_Exp>>
  card_name?: InputMaybe<String_Comparison_Exp>
  class_rank?: InputMaybe<Smallint_Comparison_Exp>
  course_rank?: InputMaybe<Smallint_Comparison_Exp>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  end?: InputMaybe<Timestamptz_Comparison_Exp>
  grade?: InputMaybe<Int_Comparison_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  max_rating?: InputMaybe<Smallint_Comparison_Exp>
  player_id?: InputMaybe<Int_Comparison_Exp>
  rating?: InputMaybe<Smallint_Comparison_Exp>
  rating_legacy?: InputMaybe<Boolean_Comparison_Exp>
  start?: InputMaybe<Timestamptz_Comparison_Exp>
  title?: InputMaybe<String_Comparison_Exp>
  trophy?: InputMaybe<Dx_Intl_Trophy_Comparison_Exp>
}

/** aggregate max on columns */
export type Dx_Intl_Records_With_History_Max_Fields = {
  __typename?: "dx_intl_records_with_history_max_fields"
  card_name?: Maybe<Scalars["String"]>
  class_rank?: Maybe<Scalars["smallint"]>
  course_rank?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  grade?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["smallint"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
  trophy?: Maybe<Scalars["dx_intl_trophy"]>
}

/** aggregate min on columns */
export type Dx_Intl_Records_With_History_Min_Fields = {
  __typename?: "dx_intl_records_with_history_min_fields"
  card_name?: Maybe<Scalars["String"]>
  class_rank?: Maybe<Scalars["smallint"]>
  course_rank?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  grade?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["smallint"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
  trophy?: Maybe<Scalars["dx_intl_trophy"]>
}

/** Ordering options when selecting data from "dx_intl_records_with_history". */
export type Dx_Intl_Records_With_History_Order_By = {
  card_name?: InputMaybe<Order_By>
  class_rank?: InputMaybe<Order_By>
  course_rank?: InputMaybe<Order_By>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Order_By>
  end?: InputMaybe<Order_By>
  grade?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  max_rating?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  rating?: InputMaybe<Order_By>
  rating_legacy?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  trophy?: InputMaybe<Order_By>
}

/** select columns of table "dx_intl_records_with_history" */
export enum Dx_Intl_Records_With_History_Select_Column {
  /** column name */
  CardName = "card_name",
  /** column name */
  ClassRank = "class_rank",
  /** column name */
  CourseRank = "course_rank",
  /** column name */
  End = "end",
  /** column name */
  Grade = "grade",
  /** column name */
  Id = "id",
  /** column name */
  MaxRating = "max_rating",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Rating = "rating",
  /** column name */
  RatingLegacy = "rating_legacy",
  /** column name */
  Start = "start",
  /** column name */
  Title = "title",
  /** column name */
  Trophy = "trophy",
}

/** aggregate stddev on columns */
export type Dx_Intl_Records_With_History_Stddev_Fields = {
  __typename?: "dx_intl_records_with_history_stddev_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Records_With_History_Stddev_Pop_Fields = {
  __typename?: "dx_intl_records_with_history_stddev_pop_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Records_With_History_Stddev_Samp_Fields = {
  __typename?: "dx_intl_records_with_history_stddev_samp_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Records_With_History_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Records_With_History_Stream_Cursor_Value_Input = {
  card_name?: InputMaybe<Scalars["String"]>
  class_rank?: InputMaybe<Scalars["smallint"]>
  course_rank?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  grade?: InputMaybe<Scalars["Int"]>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["smallint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["smallint"]>
  rating_legacy?: InputMaybe<Scalars["Boolean"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  title?: InputMaybe<Scalars["String"]>
  trophy?: InputMaybe<Scalars["dx_intl_trophy"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Records_With_History_Sum_Fields = {
  __typename?: "dx_intl_records_with_history_sum_fields"
  class_rank?: Maybe<Scalars["smallint"]>
  course_rank?: Maybe<Scalars["smallint"]>
  grade?: Maybe<Scalars["Int"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["smallint"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["smallint"]>
}

/** aggregate var_pop on columns */
export type Dx_Intl_Records_With_History_Var_Pop_Fields = {
  __typename?: "dx_intl_records_with_history_var_pop_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Records_With_History_Var_Samp_Fields = {
  __typename?: "dx_intl_records_with_history_var_samp_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Dx_Intl_Records_With_History_Variance_Fields = {
  __typename?: "dx_intl_records_with_history_variance_fields"
  class_rank?: Maybe<Scalars["Float"]>
  course_rank?: Maybe<Scalars["Float"]>
  grade?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** columns and relationships of "dx_intl_scores" */
export type Dx_Intl_Scores = {
  __typename?: "dx_intl_scores"
  combo_flag: Scalars["dx_intl_combo_flag"]
  deluxe: Scalars["Boolean"]
  difficulty: Scalars["smallint"]
  /** An object relationship */
  dx_intl_note?: Maybe<Dx_Intl_Notes>
  /** An object relationship */
  dx_intl_player: Dx_Intl_Players
  end: Scalars["timestamptz"]
  id: Scalars["bigint"]
  player_id: Scalars["Int"]
  score: Scalars["numeric"]
  song_id: Scalars["String"]
  start: Scalars["timestamptz"]
  sync_flag: Scalars["dx_intl_sync_flag"]
}

/** aggregated selection of "dx_intl_scores" */
export type Dx_Intl_Scores_Aggregate = {
  __typename?: "dx_intl_scores_aggregate"
  aggregate?: Maybe<Dx_Intl_Scores_Aggregate_Fields>
  nodes: Array<Dx_Intl_Scores>
}

export type Dx_Intl_Scores_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Dx_Intl_Scores_Aggregate_Bool_Exp_Bool_And>
  bool_or?: InputMaybe<Dx_Intl_Scores_Aggregate_Bool_Exp_Bool_Or>
  count?: InputMaybe<Dx_Intl_Scores_Aggregate_Bool_Exp_Count>
}

export type Dx_Intl_Scores_Aggregate_Bool_Exp_Bool_And = {
  arguments: Dx_Intl_Scores_Select_Column_Dx_Intl_Scores_Aggregate_Bool_Exp_Bool_And_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Dx_Intl_Scores_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Dx_Intl_Scores_Select_Column_Dx_Intl_Scores_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Dx_Intl_Scores_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "dx_intl_scores" */
export type Dx_Intl_Scores_Aggregate_Fields = {
  __typename?: "dx_intl_scores_aggregate_fields"
  avg?: Maybe<Dx_Intl_Scores_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Scores_Max_Fields>
  min?: Maybe<Dx_Intl_Scores_Min_Fields>
  stddev?: Maybe<Dx_Intl_Scores_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Scores_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Scores_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Scores_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Scores_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Scores_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Scores_Variance_Fields>
}

/** aggregate fields of "dx_intl_scores" */
export type Dx_Intl_Scores_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "dx_intl_scores" */
export type Dx_Intl_Scores_Aggregate_Order_By = {
  avg?: InputMaybe<Dx_Intl_Scores_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Dx_Intl_Scores_Max_Order_By>
  min?: InputMaybe<Dx_Intl_Scores_Min_Order_By>
  stddev?: InputMaybe<Dx_Intl_Scores_Stddev_Order_By>
  stddev_pop?: InputMaybe<Dx_Intl_Scores_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Dx_Intl_Scores_Stddev_Samp_Order_By>
  sum?: InputMaybe<Dx_Intl_Scores_Sum_Order_By>
  var_pop?: InputMaybe<Dx_Intl_Scores_Var_Pop_Order_By>
  var_samp?: InputMaybe<Dx_Intl_Scores_Var_Samp_Order_By>
  variance?: InputMaybe<Dx_Intl_Scores_Variance_Order_By>
}

/** input type for inserting array relation for remote table "dx_intl_scores" */
export type Dx_Intl_Scores_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Scores_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Scores_On_Conflict>
}

/** aggregate avg on columns */
export type Dx_Intl_Scores_Avg_Fields = {
  __typename?: "dx_intl_scores_avg_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Avg_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "dx_intl_scores". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Scores_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Scores_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Scores_Bool_Exp>>
  combo_flag?: InputMaybe<Dx_Intl_Combo_Flag_Comparison_Exp>
  deluxe?: InputMaybe<Boolean_Comparison_Exp>
  difficulty?: InputMaybe<Smallint_Comparison_Exp>
  dx_intl_note?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  end?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Bigint_Comparison_Exp>
  player_id?: InputMaybe<Int_Comparison_Exp>
  score?: InputMaybe<Numeric_Comparison_Exp>
  song_id?: InputMaybe<String_Comparison_Exp>
  start?: InputMaybe<Timestamptz_Comparison_Exp>
  sync_flag?: InputMaybe<Dx_Intl_Sync_Flag_Comparison_Exp>
}

/** unique or primary key constraints on table "dx_intl_scores" */
export enum Dx_Intl_Scores_Constraint {
  /** unique or primary key constraint on columns "id" */
  DxIntlScoresPkey1 = "dx_intl_scores_pkey1",
  /** unique or primary key constraint on columns "deluxe", "song_id", "difficulty", "player_id" */
  DxIntlScoresPlayerIdSongIdDeluxeDifficultyKey = "dx_intl_scores_player_id_song_id_deluxe_difficulty_key",
}

/** input type for incrementing numeric columns in table "dx_intl_scores" */
export type Dx_Intl_Scores_Inc_Input = {
  difficulty?: InputMaybe<Scalars["smallint"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
}

/** input type for inserting data into table "dx_intl_scores" */
export type Dx_Intl_Scores_Insert_Input = {
  combo_flag?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  deluxe?: InputMaybe<Scalars["Boolean"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  dx_intl_note?: InputMaybe<Dx_Intl_Notes_Obj_Rel_Insert_Input>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Obj_Rel_Insert_Input>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["String"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  sync_flag?: InputMaybe<Scalars["dx_intl_sync_flag"]>
}

/** aggregate max on columns */
export type Dx_Intl_Scores_Max_Fields = {
  __typename?: "dx_intl_scores_max_fields"
  combo_flag?: Maybe<Scalars["dx_intl_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["String"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["dx_intl_sync_flag"]>
}

/** order by max() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Max_Order_By = {
  combo_flag?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  end?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  sync_flag?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Dx_Intl_Scores_Min_Fields = {
  __typename?: "dx_intl_scores_min_fields"
  combo_flag?: Maybe<Scalars["dx_intl_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["String"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["dx_intl_sync_flag"]>
}

/** order by min() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Min_Order_By = {
  combo_flag?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  end?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  sync_flag?: InputMaybe<Order_By>
}

/** response of any mutation on the table "dx_intl_scores" */
export type Dx_Intl_Scores_Mutation_Response = {
  __typename?: "dx_intl_scores_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Dx_Intl_Scores>
}

/** on_conflict condition type for table "dx_intl_scores" */
export type Dx_Intl_Scores_On_Conflict = {
  constraint: Dx_Intl_Scores_Constraint
  update_columns?: Array<Dx_Intl_Scores_Update_Column>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

/** Ordering options when selecting data from "dx_intl_scores". */
export type Dx_Intl_Scores_Order_By = {
  combo_flag?: InputMaybe<Order_By>
  deluxe?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  dx_intl_note?: InputMaybe<Dx_Intl_Notes_Order_By>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Order_By>
  end?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  sync_flag?: InputMaybe<Order_By>
}

/** primary key columns input for table: dx_intl_scores */
export type Dx_Intl_Scores_Pk_Columns_Input = {
  id: Scalars["bigint"]
}

/** select columns of table "dx_intl_scores" */
export enum Dx_Intl_Scores_Select_Column {
  /** column name */
  ComboFlag = "combo_flag",
  /** column name */
  Deluxe = "deluxe",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Score = "score",
  /** column name */
  SongId = "song_id",
  /** column name */
  Start = "start",
  /** column name */
  SyncFlag = "sync_flag",
}

/** select "dx_intl_scores_aggregate_bool_exp_bool_and_arguments_columns" columns of table "dx_intl_scores" */
export enum Dx_Intl_Scores_Select_Column_Dx_Intl_Scores_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Deluxe = "deluxe",
}

/** select "dx_intl_scores_aggregate_bool_exp_bool_or_arguments_columns" columns of table "dx_intl_scores" */
export enum Dx_Intl_Scores_Select_Column_Dx_Intl_Scores_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Deluxe = "deluxe",
}

/** input type for updating data in table "dx_intl_scores" */
export type Dx_Intl_Scores_Set_Input = {
  combo_flag?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  deluxe?: InputMaybe<Scalars["Boolean"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["String"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  sync_flag?: InputMaybe<Scalars["dx_intl_sync_flag"]>
}

/** columns and relationships of "dx_intl_scores_stats" */
export type Dx_Intl_Scores_Stats = {
  __typename?: "dx_intl_scores_stats"
  count?: Maybe<Scalars["bigint"]>
  deluxe?: Maybe<Scalars["Boolean"]>
  difficulty?: Maybe<Scalars["smallint"]>
  range?: Maybe<Scalars["String"]>
  song_id?: Maybe<Scalars["String"]>
}

/** aggregated selection of "dx_intl_scores_stats" */
export type Dx_Intl_Scores_Stats_Aggregate = {
  __typename?: "dx_intl_scores_stats_aggregate"
  aggregate?: Maybe<Dx_Intl_Scores_Stats_Aggregate_Fields>
  nodes: Array<Dx_Intl_Scores_Stats>
}

/** aggregate fields of "dx_intl_scores_stats" */
export type Dx_Intl_Scores_Stats_Aggregate_Fields = {
  __typename?: "dx_intl_scores_stats_aggregate_fields"
  avg?: Maybe<Dx_Intl_Scores_Stats_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Scores_Stats_Max_Fields>
  min?: Maybe<Dx_Intl_Scores_Stats_Min_Fields>
  stddev?: Maybe<Dx_Intl_Scores_Stats_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Scores_Stats_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Scores_Stats_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Scores_Stats_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Scores_Stats_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Scores_Stats_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Scores_Stats_Variance_Fields>
}

/** aggregate fields of "dx_intl_scores_stats" */
export type Dx_Intl_Scores_Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Scores_Stats_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Dx_Intl_Scores_Stats_Avg_Fields = {
  __typename?: "dx_intl_scores_stats_avg_fields"
  count?: Maybe<Scalars["Float"]>
  difficulty?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "dx_intl_scores_stats". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Scores_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Scores_Stats_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Scores_Stats_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Scores_Stats_Bool_Exp>>
  count?: InputMaybe<Bigint_Comparison_Exp>
  deluxe?: InputMaybe<Boolean_Comparison_Exp>
  difficulty?: InputMaybe<Smallint_Comparison_Exp>
  range?: InputMaybe<String_Comparison_Exp>
  song_id?: InputMaybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type Dx_Intl_Scores_Stats_Max_Fields = {
  __typename?: "dx_intl_scores_stats_max_fields"
  count?: Maybe<Scalars["bigint"]>
  difficulty?: Maybe<Scalars["smallint"]>
  range?: Maybe<Scalars["String"]>
  song_id?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Dx_Intl_Scores_Stats_Min_Fields = {
  __typename?: "dx_intl_scores_stats_min_fields"
  count?: Maybe<Scalars["bigint"]>
  difficulty?: Maybe<Scalars["smallint"]>
  range?: Maybe<Scalars["String"]>
  song_id?: Maybe<Scalars["String"]>
}

/** Ordering options when selecting data from "dx_intl_scores_stats". */
export type Dx_Intl_Scores_Stats_Order_By = {
  count?: InputMaybe<Order_By>
  deluxe?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  range?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** select columns of table "dx_intl_scores_stats" */
export enum Dx_Intl_Scores_Stats_Select_Column {
  /** column name */
  Count = "count",
  /** column name */
  Deluxe = "deluxe",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  Range = "range",
  /** column name */
  SongId = "song_id",
}

/** aggregate stddev on columns */
export type Dx_Intl_Scores_Stats_Stddev_Fields = {
  __typename?: "dx_intl_scores_stats_stddev_fields"
  count?: Maybe<Scalars["Float"]>
  difficulty?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Scores_Stats_Stddev_Pop_Fields = {
  __typename?: "dx_intl_scores_stats_stddev_pop_fields"
  count?: Maybe<Scalars["Float"]>
  difficulty?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Scores_Stats_Stddev_Samp_Fields = {
  __typename?: "dx_intl_scores_stats_stddev_samp_fields"
  count?: Maybe<Scalars["Float"]>
  difficulty?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "dx_intl_scores_stats" */
export type Dx_Intl_Scores_Stats_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Scores_Stats_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Scores_Stats_Stream_Cursor_Value_Input = {
  count?: InputMaybe<Scalars["bigint"]>
  deluxe?: InputMaybe<Scalars["Boolean"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  range?: InputMaybe<Scalars["String"]>
  song_id?: InputMaybe<Scalars["String"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Scores_Stats_Sum_Fields = {
  __typename?: "dx_intl_scores_stats_sum_fields"
  count?: Maybe<Scalars["bigint"]>
  difficulty?: Maybe<Scalars["smallint"]>
}

/** aggregate var_pop on columns */
export type Dx_Intl_Scores_Stats_Var_Pop_Fields = {
  __typename?: "dx_intl_scores_stats_var_pop_fields"
  count?: Maybe<Scalars["Float"]>
  difficulty?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Scores_Stats_Var_Samp_Fields = {
  __typename?: "dx_intl_scores_stats_var_samp_fields"
  count?: Maybe<Scalars["Float"]>
  difficulty?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Dx_Intl_Scores_Stats_Variance_Fields = {
  __typename?: "dx_intl_scores_stats_variance_fields"
  count?: Maybe<Scalars["Float"]>
  difficulty?: Maybe<Scalars["Float"]>
}

/** aggregate stddev on columns */
export type Dx_Intl_Scores_Stddev_Fields = {
  __typename?: "dx_intl_scores_stddev_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Stddev_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Scores_Stddev_Pop_Fields = {
  __typename?: "dx_intl_scores_stddev_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Stddev_Pop_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Scores_Stddev_Samp_Fields = {
  __typename?: "dx_intl_scores_stddev_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Stddev_Samp_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "dx_intl_scores" */
export type Dx_Intl_Scores_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Scores_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Scores_Stream_Cursor_Value_Input = {
  combo_flag?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  deluxe?: InputMaybe<Scalars["Boolean"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["String"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  sync_flag?: InputMaybe<Scalars["dx_intl_sync_flag"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Scores_Sum_Fields = {
  __typename?: "dx_intl_scores_sum_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
}

/** order by sum() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Sum_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
}

/** update columns of table "dx_intl_scores" */
export enum Dx_Intl_Scores_Update_Column {
  /** column name */
  ComboFlag = "combo_flag",
  /** column name */
  Deluxe = "deluxe",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Score = "score",
  /** column name */
  SongId = "song_id",
  /** column name */
  Start = "start",
  /** column name */
  SyncFlag = "sync_flag",
}

export type Dx_Intl_Scores_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Dx_Intl_Scores_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dx_Intl_Scores_Set_Input>
  where: Dx_Intl_Scores_Bool_Exp
}

/** aggregate var_pop on columns */
export type Dx_Intl_Scores_Var_Pop_Fields = {
  __typename?: "dx_intl_scores_var_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Var_Pop_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Scores_Var_Samp_Fields = {
  __typename?: "dx_intl_scores_var_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Var_Samp_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Dx_Intl_Scores_Variance_Fields = {
  __typename?: "dx_intl_scores_variance_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Variance_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
}

/** columns and relationships of "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History = {
  __typename?: "dx_intl_scores_with_history"
  combo_flag?: Maybe<Scalars["dx_intl_combo_flag"]>
  deluxe?: Maybe<Scalars["Boolean"]>
  difficulty?: Maybe<Scalars["smallint"]>
  /** An object relationship */
  dx_intl_note?: Maybe<Dx_Intl_Notes>
  /** An object relationship */
  dx_intl_player?: Maybe<Dx_Intl_Players>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["String"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["dx_intl_sync_flag"]>
}

/** aggregated selection of "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Aggregate = {
  __typename?: "dx_intl_scores_with_history_aggregate"
  aggregate?: Maybe<Dx_Intl_Scores_With_History_Aggregate_Fields>
  nodes: Array<Dx_Intl_Scores_With_History>
}

/** aggregate fields of "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Aggregate_Fields = {
  __typename?: "dx_intl_scores_with_history_aggregate_fields"
  avg?: Maybe<Dx_Intl_Scores_With_History_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Scores_With_History_Max_Fields>
  min?: Maybe<Dx_Intl_Scores_With_History_Min_Fields>
  stddev?: Maybe<Dx_Intl_Scores_With_History_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Scores_With_History_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Scores_With_History_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Scores_With_History_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Scores_With_History_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Scores_With_History_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Scores_With_History_Variance_Fields>
}

/** aggregate fields of "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Scores_With_History_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Dx_Intl_Scores_With_History_Avg_Fields = {
  __typename?: "dx_intl_scores_with_history_avg_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "dx_intl_scores_with_history". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Scores_With_History_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Scores_With_History_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Scores_With_History_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Scores_With_History_Bool_Exp>>
  combo_flag?: InputMaybe<Dx_Intl_Combo_Flag_Comparison_Exp>
  deluxe?: InputMaybe<Boolean_Comparison_Exp>
  difficulty?: InputMaybe<Smallint_Comparison_Exp>
  dx_intl_note?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  end?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Bigint_Comparison_Exp>
  player_id?: InputMaybe<Int_Comparison_Exp>
  score?: InputMaybe<Numeric_Comparison_Exp>
  song_id?: InputMaybe<String_Comparison_Exp>
  start?: InputMaybe<Timestamptz_Comparison_Exp>
  sync_flag?: InputMaybe<Dx_Intl_Sync_Flag_Comparison_Exp>
}

/** aggregate max on columns */
export type Dx_Intl_Scores_With_History_Max_Fields = {
  __typename?: "dx_intl_scores_with_history_max_fields"
  combo_flag?: Maybe<Scalars["dx_intl_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["String"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["dx_intl_sync_flag"]>
}

/** aggregate min on columns */
export type Dx_Intl_Scores_With_History_Min_Fields = {
  __typename?: "dx_intl_scores_with_history_min_fields"
  combo_flag?: Maybe<Scalars["dx_intl_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["String"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["dx_intl_sync_flag"]>
}

/** Ordering options when selecting data from "dx_intl_scores_with_history". */
export type Dx_Intl_Scores_With_History_Order_By = {
  combo_flag?: InputMaybe<Order_By>
  deluxe?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  dx_intl_note?: InputMaybe<Dx_Intl_Notes_Order_By>
  dx_intl_player?: InputMaybe<Dx_Intl_Players_Order_By>
  end?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  sync_flag?: InputMaybe<Order_By>
}

/** select columns of table "dx_intl_scores_with_history" */
export enum Dx_Intl_Scores_With_History_Select_Column {
  /** column name */
  ComboFlag = "combo_flag",
  /** column name */
  Deluxe = "deluxe",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Score = "score",
  /** column name */
  SongId = "song_id",
  /** column name */
  Start = "start",
  /** column name */
  SyncFlag = "sync_flag",
}

/** aggregate stddev on columns */
export type Dx_Intl_Scores_With_History_Stddev_Fields = {
  __typename?: "dx_intl_scores_with_history_stddev_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Scores_With_History_Stddev_Pop_Fields = {
  __typename?: "dx_intl_scores_with_history_stddev_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Scores_With_History_Stddev_Samp_Fields = {
  __typename?: "dx_intl_scores_with_history_stddev_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Scores_With_History_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Scores_With_History_Stream_Cursor_Value_Input = {
  combo_flag?: InputMaybe<Scalars["dx_intl_combo_flag"]>
  deluxe?: InputMaybe<Scalars["Boolean"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["String"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  sync_flag?: InputMaybe<Scalars["dx_intl_sync_flag"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Scores_With_History_Sum_Fields = {
  __typename?: "dx_intl_scores_with_history_sum_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
}

/** aggregate var_pop on columns */
export type Dx_Intl_Scores_With_History_Var_Pop_Fields = {
  __typename?: "dx_intl_scores_with_history_var_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Scores_With_History_Var_Samp_Fields = {
  __typename?: "dx_intl_scores_with_history_var_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Dx_Intl_Scores_With_History_Variance_Fields = {
  __typename?: "dx_intl_scores_with_history_variance_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
}

/** columns and relationships of "dx_intl_songs" */
export type Dx_Intl_Songs = {
  __typename?: "dx_intl_songs"
  category: Scalars["smallint"]
  /** An array relationship */
  dx_intl_variants: Array<Dx_Intl_Variants>
  /** An aggregate relationship */
  dx_intl_variants_aggregate: Dx_Intl_Variants_Aggregate
  id: Scalars["String"]
  order: Scalars["smallint"]
  title: Scalars["String"]
}

/** columns and relationships of "dx_intl_songs" */
export type Dx_Intl_SongsDx_Intl_VariantsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Variants_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Variants_Order_By>>
  where?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
}

/** columns and relationships of "dx_intl_songs" */
export type Dx_Intl_SongsDx_Intl_Variants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Variants_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Variants_Order_By>>
  where?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
}

/** aggregated selection of "dx_intl_songs" */
export type Dx_Intl_Songs_Aggregate = {
  __typename?: "dx_intl_songs_aggregate"
  aggregate?: Maybe<Dx_Intl_Songs_Aggregate_Fields>
  nodes: Array<Dx_Intl_Songs>
}

/** aggregate fields of "dx_intl_songs" */
export type Dx_Intl_Songs_Aggregate_Fields = {
  __typename?: "dx_intl_songs_aggregate_fields"
  avg?: Maybe<Dx_Intl_Songs_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Songs_Max_Fields>
  min?: Maybe<Dx_Intl_Songs_Min_Fields>
  stddev?: Maybe<Dx_Intl_Songs_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Songs_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Songs_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Songs_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Songs_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Songs_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Songs_Variance_Fields>
}

/** aggregate fields of "dx_intl_songs" */
export type Dx_Intl_Songs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Songs_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Dx_Intl_Songs_Avg_Fields = {
  __typename?: "dx_intl_songs_avg_fields"
  category?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "dx_intl_songs". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Songs_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Songs_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Songs_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Songs_Bool_Exp>>
  category?: InputMaybe<Smallint_Comparison_Exp>
  dx_intl_variants?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
  dx_intl_variants_aggregate?: InputMaybe<Dx_Intl_Variants_Aggregate_Bool_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  order?: InputMaybe<Smallint_Comparison_Exp>
  title?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "dx_intl_songs" */
export enum Dx_Intl_Songs_Constraint {
  /** unique or primary key constraint on columns "title", "category" */
  DxIntlSongsCategoryTitleKey1 = "dx_intl_songs_category_title_key1",
  /** unique or primary key constraint on columns "id" */
  DxIntlSongsPkey1 = "dx_intl_songs_pkey1",
}

/** input type for incrementing numeric columns in table "dx_intl_songs" */
export type Dx_Intl_Songs_Inc_Input = {
  category?: InputMaybe<Scalars["smallint"]>
  order?: InputMaybe<Scalars["smallint"]>
}

/** input type for inserting data into table "dx_intl_songs" */
export type Dx_Intl_Songs_Insert_Input = {
  category?: InputMaybe<Scalars["smallint"]>
  dx_intl_variants?: InputMaybe<Dx_Intl_Variants_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars["String"]>
  order?: InputMaybe<Scalars["smallint"]>
  title?: InputMaybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Dx_Intl_Songs_Max_Fields = {
  __typename?: "dx_intl_songs_max_fields"
  category?: Maybe<Scalars["smallint"]>
  id?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["smallint"]>
  title?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Dx_Intl_Songs_Min_Fields = {
  __typename?: "dx_intl_songs_min_fields"
  category?: Maybe<Scalars["smallint"]>
  id?: Maybe<Scalars["String"]>
  order?: Maybe<Scalars["smallint"]>
  title?: Maybe<Scalars["String"]>
}

/** response of any mutation on the table "dx_intl_songs" */
export type Dx_Intl_Songs_Mutation_Response = {
  __typename?: "dx_intl_songs_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Dx_Intl_Songs>
}

/** input type for inserting object relation for remote table "dx_intl_songs" */
export type Dx_Intl_Songs_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Songs_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Songs_On_Conflict>
}

/** on_conflict condition type for table "dx_intl_songs" */
export type Dx_Intl_Songs_On_Conflict = {
  constraint: Dx_Intl_Songs_Constraint
  update_columns?: Array<Dx_Intl_Songs_Update_Column>
  where?: InputMaybe<Dx_Intl_Songs_Bool_Exp>
}

/** Ordering options when selecting data from "dx_intl_songs". */
export type Dx_Intl_Songs_Order_By = {
  category?: InputMaybe<Order_By>
  dx_intl_variants_aggregate?: InputMaybe<Dx_Intl_Variants_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  order?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
}

/** primary key columns input for table: dx_intl_songs */
export type Dx_Intl_Songs_Pk_Columns_Input = {
  id: Scalars["String"]
}

/** select columns of table "dx_intl_songs" */
export enum Dx_Intl_Songs_Select_Column {
  /** column name */
  Category = "category",
  /** column name */
  Id = "id",
  /** column name */
  Order = "order",
  /** column name */
  Title = "title",
}

/** input type for updating data in table "dx_intl_songs" */
export type Dx_Intl_Songs_Set_Input = {
  category?: InputMaybe<Scalars["smallint"]>
  id?: InputMaybe<Scalars["String"]>
  order?: InputMaybe<Scalars["smallint"]>
  title?: InputMaybe<Scalars["String"]>
}

/** aggregate stddev on columns */
export type Dx_Intl_Songs_Stddev_Fields = {
  __typename?: "dx_intl_songs_stddev_fields"
  category?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Songs_Stddev_Pop_Fields = {
  __typename?: "dx_intl_songs_stddev_pop_fields"
  category?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Songs_Stddev_Samp_Fields = {
  __typename?: "dx_intl_songs_stddev_samp_fields"
  category?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "dx_intl_songs" */
export type Dx_Intl_Songs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Songs_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Songs_Stream_Cursor_Value_Input = {
  category?: InputMaybe<Scalars["smallint"]>
  id?: InputMaybe<Scalars["String"]>
  order?: InputMaybe<Scalars["smallint"]>
  title?: InputMaybe<Scalars["String"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Songs_Sum_Fields = {
  __typename?: "dx_intl_songs_sum_fields"
  category?: Maybe<Scalars["smallint"]>
  order?: Maybe<Scalars["smallint"]>
}

/** update columns of table "dx_intl_songs" */
export enum Dx_Intl_Songs_Update_Column {
  /** column name */
  Category = "category",
  /** column name */
  Id = "id",
  /** column name */
  Order = "order",
  /** column name */
  Title = "title",
}

export type Dx_Intl_Songs_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Dx_Intl_Songs_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dx_Intl_Songs_Set_Input>
  where: Dx_Intl_Songs_Bool_Exp
}

/** aggregate var_pop on columns */
export type Dx_Intl_Songs_Var_Pop_Fields = {
  __typename?: "dx_intl_songs_var_pop_fields"
  category?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Songs_Var_Samp_Fields = {
  __typename?: "dx_intl_songs_var_samp_fields"
  category?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Dx_Intl_Songs_Variance_Fields = {
  __typename?: "dx_intl_songs_variance_fields"
  category?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
}

/** Boolean expression to compare columns of type "dx_intl_sync_flag". All fields are combined with logical 'AND'. */
export type Dx_Intl_Sync_Flag_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["dx_intl_sync_flag"]>
  _gt?: InputMaybe<Scalars["dx_intl_sync_flag"]>
  _gte?: InputMaybe<Scalars["dx_intl_sync_flag"]>
  _in?: InputMaybe<Array<Scalars["dx_intl_sync_flag"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["dx_intl_sync_flag"]>
  _lte?: InputMaybe<Scalars["dx_intl_sync_flag"]>
  _neq?: InputMaybe<Scalars["dx_intl_sync_flag"]>
  _nin?: InputMaybe<Array<Scalars["dx_intl_sync_flag"]>>
}

/** Boolean expression to compare columns of type "dx_intl_trophy". All fields are combined with logical 'AND'. */
export type Dx_Intl_Trophy_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["dx_intl_trophy"]>
  _gt?: InputMaybe<Scalars["dx_intl_trophy"]>
  _gte?: InputMaybe<Scalars["dx_intl_trophy"]>
  _in?: InputMaybe<Array<Scalars["dx_intl_trophy"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["dx_intl_trophy"]>
  _lte?: InputMaybe<Scalars["dx_intl_trophy"]>
  _neq?: InputMaybe<Scalars["dx_intl_trophy"]>
  _nin?: InputMaybe<Array<Scalars["dx_intl_trophy"]>>
}

/** columns and relationships of "dx_intl_variants" */
export type Dx_Intl_Variants = {
  __typename?: "dx_intl_variants"
  active: Scalars["Boolean"]
  deluxe: Scalars["Boolean"]
  /** An array relationship */
  dx_intl_notes: Array<Dx_Intl_Notes>
  /** An aggregate relationship */
  dx_intl_notes_aggregate: Dx_Intl_Notes_Aggregate
  /** An object relationship */
  dx_intl_song: Dx_Intl_Songs
  song_id: Scalars["String"]
  version: Scalars["smallint"]
}

/** columns and relationships of "dx_intl_variants" */
export type Dx_Intl_VariantsDx_Intl_NotesArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Notes_Order_By>>
  where?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
}

/** columns and relationships of "dx_intl_variants" */
export type Dx_Intl_VariantsDx_Intl_Notes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Notes_Order_By>>
  where?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
}

/** aggregated selection of "dx_intl_variants" */
export type Dx_Intl_Variants_Aggregate = {
  __typename?: "dx_intl_variants_aggregate"
  aggregate?: Maybe<Dx_Intl_Variants_Aggregate_Fields>
  nodes: Array<Dx_Intl_Variants>
}

export type Dx_Intl_Variants_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Dx_Intl_Variants_Aggregate_Bool_Exp_Bool_And>
  bool_or?: InputMaybe<Dx_Intl_Variants_Aggregate_Bool_Exp_Bool_Or>
  count?: InputMaybe<Dx_Intl_Variants_Aggregate_Bool_Exp_Count>
}

export type Dx_Intl_Variants_Aggregate_Bool_Exp_Bool_And = {
  arguments: Dx_Intl_Variants_Select_Column_Dx_Intl_Variants_Aggregate_Bool_Exp_Bool_And_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Dx_Intl_Variants_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Dx_Intl_Variants_Select_Column_Dx_Intl_Variants_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Dx_Intl_Variants_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Dx_Intl_Variants_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "dx_intl_variants" */
export type Dx_Intl_Variants_Aggregate_Fields = {
  __typename?: "dx_intl_variants_aggregate_fields"
  avg?: Maybe<Dx_Intl_Variants_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Dx_Intl_Variants_Max_Fields>
  min?: Maybe<Dx_Intl_Variants_Min_Fields>
  stddev?: Maybe<Dx_Intl_Variants_Stddev_Fields>
  stddev_pop?: Maybe<Dx_Intl_Variants_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Dx_Intl_Variants_Stddev_Samp_Fields>
  sum?: Maybe<Dx_Intl_Variants_Sum_Fields>
  var_pop?: Maybe<Dx_Intl_Variants_Var_Pop_Fields>
  var_samp?: Maybe<Dx_Intl_Variants_Var_Samp_Fields>
  variance?: Maybe<Dx_Intl_Variants_Variance_Fields>
}

/** aggregate fields of "dx_intl_variants" */
export type Dx_Intl_Variants_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dx_Intl_Variants_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "dx_intl_variants" */
export type Dx_Intl_Variants_Aggregate_Order_By = {
  avg?: InputMaybe<Dx_Intl_Variants_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Dx_Intl_Variants_Max_Order_By>
  min?: InputMaybe<Dx_Intl_Variants_Min_Order_By>
  stddev?: InputMaybe<Dx_Intl_Variants_Stddev_Order_By>
  stddev_pop?: InputMaybe<Dx_Intl_Variants_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Dx_Intl_Variants_Stddev_Samp_Order_By>
  sum?: InputMaybe<Dx_Intl_Variants_Sum_Order_By>
  var_pop?: InputMaybe<Dx_Intl_Variants_Var_Pop_Order_By>
  var_samp?: InputMaybe<Dx_Intl_Variants_Var_Samp_Order_By>
  variance?: InputMaybe<Dx_Intl_Variants_Variance_Order_By>
}

/** input type for inserting array relation for remote table "dx_intl_variants" */
export type Dx_Intl_Variants_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Variants_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Variants_On_Conflict>
}

/** aggregate avg on columns */
export type Dx_Intl_Variants_Avg_Fields = {
  __typename?: "dx_intl_variants_avg_fields"
  version?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Avg_Order_By = {
  version?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "dx_intl_variants". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Variants_Bool_Exp = {
  _and?: InputMaybe<Array<Dx_Intl_Variants_Bool_Exp>>
  _not?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
  _or?: InputMaybe<Array<Dx_Intl_Variants_Bool_Exp>>
  active?: InputMaybe<Boolean_Comparison_Exp>
  deluxe?: InputMaybe<Boolean_Comparison_Exp>
  dx_intl_notes?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
  dx_intl_notes_aggregate?: InputMaybe<Dx_Intl_Notes_Aggregate_Bool_Exp>
  dx_intl_song?: InputMaybe<Dx_Intl_Songs_Bool_Exp>
  song_id?: InputMaybe<String_Comparison_Exp>
  version?: InputMaybe<Smallint_Comparison_Exp>
}

/** unique or primary key constraints on table "dx_intl_variants" */
export enum Dx_Intl_Variants_Constraint {
  /** unique or primary key constraint on columns "deluxe", "song_id" */
  DxIntlVariantsPkey1 = "dx_intl_variants_pkey1",
}

/** input type for incrementing numeric columns in table "dx_intl_variants" */
export type Dx_Intl_Variants_Inc_Input = {
  version?: InputMaybe<Scalars["smallint"]>
}

/** input type for inserting data into table "dx_intl_variants" */
export type Dx_Intl_Variants_Insert_Input = {
  active?: InputMaybe<Scalars["Boolean"]>
  deluxe?: InputMaybe<Scalars["Boolean"]>
  dx_intl_notes?: InputMaybe<Dx_Intl_Notes_Arr_Rel_Insert_Input>
  dx_intl_song?: InputMaybe<Dx_Intl_Songs_Obj_Rel_Insert_Input>
  song_id?: InputMaybe<Scalars["String"]>
  version?: InputMaybe<Scalars["smallint"]>
}

/** aggregate max on columns */
export type Dx_Intl_Variants_Max_Fields = {
  __typename?: "dx_intl_variants_max_fields"
  song_id?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["smallint"]>
}

/** order by max() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Max_Order_By = {
  song_id?: InputMaybe<Order_By>
  version?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Dx_Intl_Variants_Min_Fields = {
  __typename?: "dx_intl_variants_min_fields"
  song_id?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["smallint"]>
}

/** order by min() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Min_Order_By = {
  song_id?: InputMaybe<Order_By>
  version?: InputMaybe<Order_By>
}

/** response of any mutation on the table "dx_intl_variants" */
export type Dx_Intl_Variants_Mutation_Response = {
  __typename?: "dx_intl_variants_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Dx_Intl_Variants>
}

/** input type for inserting object relation for remote table "dx_intl_variants" */
export type Dx_Intl_Variants_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Variants_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Dx_Intl_Variants_On_Conflict>
}

/** on_conflict condition type for table "dx_intl_variants" */
export type Dx_Intl_Variants_On_Conflict = {
  constraint: Dx_Intl_Variants_Constraint
  update_columns?: Array<Dx_Intl_Variants_Update_Column>
  where?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
}

/** Ordering options when selecting data from "dx_intl_variants". */
export type Dx_Intl_Variants_Order_By = {
  active?: InputMaybe<Order_By>
  deluxe?: InputMaybe<Order_By>
  dx_intl_notes_aggregate?: InputMaybe<Dx_Intl_Notes_Aggregate_Order_By>
  dx_intl_song?: InputMaybe<Dx_Intl_Songs_Order_By>
  song_id?: InputMaybe<Order_By>
  version?: InputMaybe<Order_By>
}

/** primary key columns input for table: dx_intl_variants */
export type Dx_Intl_Variants_Pk_Columns_Input = {
  deluxe: Scalars["Boolean"]
  song_id: Scalars["String"]
}

/** select columns of table "dx_intl_variants" */
export enum Dx_Intl_Variants_Select_Column {
  /** column name */
  Active = "active",
  /** column name */
  Deluxe = "deluxe",
  /** column name */
  SongId = "song_id",
  /** column name */
  Version = "version",
}

/** select "dx_intl_variants_aggregate_bool_exp_bool_and_arguments_columns" columns of table "dx_intl_variants" */
export enum Dx_Intl_Variants_Select_Column_Dx_Intl_Variants_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Active = "active",
  /** column name */
  Deluxe = "deluxe",
}

/** select "dx_intl_variants_aggregate_bool_exp_bool_or_arguments_columns" columns of table "dx_intl_variants" */
export enum Dx_Intl_Variants_Select_Column_Dx_Intl_Variants_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Active = "active",
  /** column name */
  Deluxe = "deluxe",
}

/** input type for updating data in table "dx_intl_variants" */
export type Dx_Intl_Variants_Set_Input = {
  active?: InputMaybe<Scalars["Boolean"]>
  deluxe?: InputMaybe<Scalars["Boolean"]>
  song_id?: InputMaybe<Scalars["String"]>
  version?: InputMaybe<Scalars["smallint"]>
}

/** aggregate stddev on columns */
export type Dx_Intl_Variants_Stddev_Fields = {
  __typename?: "dx_intl_variants_stddev_fields"
  version?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Stddev_Order_By = {
  version?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Dx_Intl_Variants_Stddev_Pop_Fields = {
  __typename?: "dx_intl_variants_stddev_pop_fields"
  version?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Stddev_Pop_Order_By = {
  version?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Dx_Intl_Variants_Stddev_Samp_Fields = {
  __typename?: "dx_intl_variants_stddev_samp_fields"
  version?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Stddev_Samp_Order_By = {
  version?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "dx_intl_variants" */
export type Dx_Intl_Variants_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Dx_Intl_Variants_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Dx_Intl_Variants_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars["Boolean"]>
  deluxe?: InputMaybe<Scalars["Boolean"]>
  song_id?: InputMaybe<Scalars["String"]>
  version?: InputMaybe<Scalars["smallint"]>
}

/** aggregate sum on columns */
export type Dx_Intl_Variants_Sum_Fields = {
  __typename?: "dx_intl_variants_sum_fields"
  version?: Maybe<Scalars["smallint"]>
}

/** order by sum() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Sum_Order_By = {
  version?: InputMaybe<Order_By>
}

/** update columns of table "dx_intl_variants" */
export enum Dx_Intl_Variants_Update_Column {
  /** column name */
  Active = "active",
  /** column name */
  Deluxe = "deluxe",
  /** column name */
  SongId = "song_id",
  /** column name */
  Version = "version",
}

export type Dx_Intl_Variants_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Dx_Intl_Variants_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Dx_Intl_Variants_Set_Input>
  where: Dx_Intl_Variants_Bool_Exp
}

/** aggregate var_pop on columns */
export type Dx_Intl_Variants_Var_Pop_Fields = {
  __typename?: "dx_intl_variants_var_pop_fields"
  version?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Var_Pop_Order_By = {
  version?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Dx_Intl_Variants_Var_Samp_Fields = {
  __typename?: "dx_intl_variants_var_samp_fields"
  version?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Var_Samp_Order_By = {
  version?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Dx_Intl_Variants_Variance_Fields = {
  __typename?: "dx_intl_variants_variance_fields"
  version?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Variance_Order_By = {
  version?: InputMaybe<Order_By>
}

/** Boolean expression to compare columns of type "finale_combo_flag". All fields are combined with logical 'AND'. */
export type Finale_Combo_Flag_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["finale_combo_flag"]>
  _gt?: InputMaybe<Scalars["finale_combo_flag"]>
  _gte?: InputMaybe<Scalars["finale_combo_flag"]>
  _in?: InputMaybe<Array<Scalars["finale_combo_flag"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["finale_combo_flag"]>
  _lte?: InputMaybe<Scalars["finale_combo_flag"]>
  _neq?: InputMaybe<Scalars["finale_combo_flag"]>
  _nin?: InputMaybe<Array<Scalars["finale_combo_flag"]>>
}

/** Boolean expression to compare columns of type "finale_level". All fields are combined with logical 'AND'. */
export type Finale_Level_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["finale_level"]>
  _gt?: InputMaybe<Scalars["finale_level"]>
  _gte?: InputMaybe<Scalars["finale_level"]>
  _in?: InputMaybe<Array<Scalars["finale_level"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["finale_level"]>
  _lte?: InputMaybe<Scalars["finale_level"]>
  _neq?: InputMaybe<Scalars["finale_level"]>
  _nin?: InputMaybe<Array<Scalars["finale_level"]>>
}

/** columns and relationships of "finale_notes" */
export type Finale_Notes = {
  __typename?: "finale_notes"
  difficulty: Scalars["smallint"]
  /** An array relationship */
  finale_scores: Array<Finale_Scores>
  /** An aggregate relationship */
  finale_scores_aggregate: Finale_Scores_Aggregate
  /** An object relationship */
  finale_song: Finale_Songs
  level: Scalars["finale_level"]
  song_id: Scalars["smallint"]
}

/** columns and relationships of "finale_notes" */
export type Finale_NotesFinale_ScoresArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_Order_By>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

/** columns and relationships of "finale_notes" */
export type Finale_NotesFinale_Scores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_Order_By>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

/** aggregated selection of "finale_notes" */
export type Finale_Notes_Aggregate = {
  __typename?: "finale_notes_aggregate"
  aggregate?: Maybe<Finale_Notes_Aggregate_Fields>
  nodes: Array<Finale_Notes>
}

export type Finale_Notes_Aggregate_Bool_Exp = {
  count?: InputMaybe<Finale_Notes_Aggregate_Bool_Exp_Count>
}

export type Finale_Notes_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Finale_Notes_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Finale_Notes_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "finale_notes" */
export type Finale_Notes_Aggregate_Fields = {
  __typename?: "finale_notes_aggregate_fields"
  avg?: Maybe<Finale_Notes_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Finale_Notes_Max_Fields>
  min?: Maybe<Finale_Notes_Min_Fields>
  stddev?: Maybe<Finale_Notes_Stddev_Fields>
  stddev_pop?: Maybe<Finale_Notes_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Finale_Notes_Stddev_Samp_Fields>
  sum?: Maybe<Finale_Notes_Sum_Fields>
  var_pop?: Maybe<Finale_Notes_Var_Pop_Fields>
  var_samp?: Maybe<Finale_Notes_Var_Samp_Fields>
  variance?: Maybe<Finale_Notes_Variance_Fields>
}

/** aggregate fields of "finale_notes" */
export type Finale_Notes_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Finale_Notes_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "finale_notes" */
export type Finale_Notes_Aggregate_Order_By = {
  avg?: InputMaybe<Finale_Notes_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Finale_Notes_Max_Order_By>
  min?: InputMaybe<Finale_Notes_Min_Order_By>
  stddev?: InputMaybe<Finale_Notes_Stddev_Order_By>
  stddev_pop?: InputMaybe<Finale_Notes_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Finale_Notes_Stddev_Samp_Order_By>
  sum?: InputMaybe<Finale_Notes_Sum_Order_By>
  var_pop?: InputMaybe<Finale_Notes_Var_Pop_Order_By>
  var_samp?: InputMaybe<Finale_Notes_Var_Samp_Order_By>
  variance?: InputMaybe<Finale_Notes_Variance_Order_By>
}

/** input type for inserting array relation for remote table "finale_notes" */
export type Finale_Notes_Arr_Rel_Insert_Input = {
  data: Array<Finale_Notes_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Finale_Notes_On_Conflict>
}

/** aggregate avg on columns */
export type Finale_Notes_Avg_Fields = {
  __typename?: "finale_notes_avg_fields"
  difficulty?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "finale_notes" */
export type Finale_Notes_Avg_Order_By = {
  difficulty?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "finale_notes". All fields are combined with a logical 'AND'. */
export type Finale_Notes_Bool_Exp = {
  _and?: InputMaybe<Array<Finale_Notes_Bool_Exp>>
  _not?: InputMaybe<Finale_Notes_Bool_Exp>
  _or?: InputMaybe<Array<Finale_Notes_Bool_Exp>>
  difficulty?: InputMaybe<Smallint_Comparison_Exp>
  finale_scores?: InputMaybe<Finale_Scores_Bool_Exp>
  finale_scores_aggregate?: InputMaybe<Finale_Scores_Aggregate_Bool_Exp>
  finale_song?: InputMaybe<Finale_Songs_Bool_Exp>
  level?: InputMaybe<Finale_Level_Comparison_Exp>
  song_id?: InputMaybe<Smallint_Comparison_Exp>
}

/** unique or primary key constraints on table "finale_notes" */
export enum Finale_Notes_Constraint {
  /** unique or primary key constraint on columns "song_id", "difficulty" */
  FinaleNotesPkey = "finale_notes_pkey",
}

/** input type for incrementing numeric columns in table "finale_notes" */
export type Finale_Notes_Inc_Input = {
  difficulty?: InputMaybe<Scalars["smallint"]>
  song_id?: InputMaybe<Scalars["smallint"]>
}

/** input type for inserting data into table "finale_notes" */
export type Finale_Notes_Insert_Input = {
  difficulty?: InputMaybe<Scalars["smallint"]>
  finale_scores?: InputMaybe<Finale_Scores_Arr_Rel_Insert_Input>
  finale_song?: InputMaybe<Finale_Songs_Obj_Rel_Insert_Input>
  level?: InputMaybe<Scalars["finale_level"]>
  song_id?: InputMaybe<Scalars["smallint"]>
}

/** aggregate max on columns */
export type Finale_Notes_Max_Fields = {
  __typename?: "finale_notes_max_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  level?: Maybe<Scalars["finale_level"]>
  song_id?: Maybe<Scalars["smallint"]>
}

/** order by max() on columns of table "finale_notes" */
export type Finale_Notes_Max_Order_By = {
  difficulty?: InputMaybe<Order_By>
  level?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Finale_Notes_Min_Fields = {
  __typename?: "finale_notes_min_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  level?: Maybe<Scalars["finale_level"]>
  song_id?: Maybe<Scalars["smallint"]>
}

/** order by min() on columns of table "finale_notes" */
export type Finale_Notes_Min_Order_By = {
  difficulty?: InputMaybe<Order_By>
  level?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "finale_notes" */
export type Finale_Notes_Mutation_Response = {
  __typename?: "finale_notes_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Finale_Notes>
}

/** input type for inserting object relation for remote table "finale_notes" */
export type Finale_Notes_Obj_Rel_Insert_Input = {
  data: Finale_Notes_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Finale_Notes_On_Conflict>
}

/** on_conflict condition type for table "finale_notes" */
export type Finale_Notes_On_Conflict = {
  constraint: Finale_Notes_Constraint
  update_columns?: Array<Finale_Notes_Update_Column>
  where?: InputMaybe<Finale_Notes_Bool_Exp>
}

/** Ordering options when selecting data from "finale_notes". */
export type Finale_Notes_Order_By = {
  difficulty?: InputMaybe<Order_By>
  finale_scores_aggregate?: InputMaybe<Finale_Scores_Aggregate_Order_By>
  finale_song?: InputMaybe<Finale_Songs_Order_By>
  level?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: finale_notes */
export type Finale_Notes_Pk_Columns_Input = {
  difficulty: Scalars["smallint"]
  song_id: Scalars["smallint"]
}

/** select columns of table "finale_notes" */
export enum Finale_Notes_Select_Column {
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  Level = "level",
  /** column name */
  SongId = "song_id",
}

/** input type for updating data in table "finale_notes" */
export type Finale_Notes_Set_Input = {
  difficulty?: InputMaybe<Scalars["smallint"]>
  level?: InputMaybe<Scalars["finale_level"]>
  song_id?: InputMaybe<Scalars["smallint"]>
}

/** aggregate stddev on columns */
export type Finale_Notes_Stddev_Fields = {
  __typename?: "finale_notes_stddev_fields"
  difficulty?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "finale_notes" */
export type Finale_Notes_Stddev_Order_By = {
  difficulty?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Finale_Notes_Stddev_Pop_Fields = {
  __typename?: "finale_notes_stddev_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "finale_notes" */
export type Finale_Notes_Stddev_Pop_Order_By = {
  difficulty?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Finale_Notes_Stddev_Samp_Fields = {
  __typename?: "finale_notes_stddev_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "finale_notes" */
export type Finale_Notes_Stddev_Samp_Order_By = {
  difficulty?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "finale_notes" */
export type Finale_Notes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Finale_Notes_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Finale_Notes_Stream_Cursor_Value_Input = {
  difficulty?: InputMaybe<Scalars["smallint"]>
  level?: InputMaybe<Scalars["finale_level"]>
  song_id?: InputMaybe<Scalars["smallint"]>
}

/** aggregate sum on columns */
export type Finale_Notes_Sum_Fields = {
  __typename?: "finale_notes_sum_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  song_id?: Maybe<Scalars["smallint"]>
}

/** order by sum() on columns of table "finale_notes" */
export type Finale_Notes_Sum_Order_By = {
  difficulty?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** update columns of table "finale_notes" */
export enum Finale_Notes_Update_Column {
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  Level = "level",
  /** column name */
  SongId = "song_id",
}

export type Finale_Notes_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Finale_Notes_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Finale_Notes_Set_Input>
  where: Finale_Notes_Bool_Exp
}

/** aggregate var_pop on columns */
export type Finale_Notes_Var_Pop_Fields = {
  __typename?: "finale_notes_var_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "finale_notes" */
export type Finale_Notes_Var_Pop_Order_By = {
  difficulty?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Finale_Notes_Var_Samp_Fields = {
  __typename?: "finale_notes_var_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "finale_notes" */
export type Finale_Notes_Var_Samp_Order_By = {
  difficulty?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Finale_Notes_Variance_Fields = {
  __typename?: "finale_notes_variance_fields"
  difficulty?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "finale_notes" */
export type Finale_Notes_Variance_Order_By = {
  difficulty?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** columns and relationships of "finale_players" */
export type Finale_Players = {
  __typename?: "finale_players"
  created_at: Scalars["timestamptz"]
  /** An object relationship */
  finale_record?: Maybe<Finale_Records>
  /** An array relationship */
  finale_scores: Array<Finale_Scores>
  /** An aggregate relationship */
  finale_scores_aggregate: Finale_Scores_Aggregate
  id: Scalars["Int"]
  nickname: Scalars["String"]
  private: Scalars["Boolean"]
  /** A computed field, executes function "finale_players_updated_at" */
  updated_at?: Maybe<Scalars["timestamptz"]>
  /** An object relationship */
  user: Users
  user_id: Scalars["String"]
}

/** columns and relationships of "finale_players" */
export type Finale_PlayersFinale_ScoresArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_Order_By>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

/** columns and relationships of "finale_players" */
export type Finale_PlayersFinale_Scores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_Order_By>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

/** aggregated selection of "finale_players" */
export type Finale_Players_Aggregate = {
  __typename?: "finale_players_aggregate"
  aggregate?: Maybe<Finale_Players_Aggregate_Fields>
  nodes: Array<Finale_Players>
}

export type Finale_Players_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Finale_Players_Aggregate_Bool_Exp_Bool_And>
  bool_or?: InputMaybe<Finale_Players_Aggregate_Bool_Exp_Bool_Or>
  count?: InputMaybe<Finale_Players_Aggregate_Bool_Exp_Count>
}

export type Finale_Players_Aggregate_Bool_Exp_Bool_And = {
  arguments: Finale_Players_Select_Column_Finale_Players_Aggregate_Bool_Exp_Bool_And_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Finale_Players_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Finale_Players_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Finale_Players_Select_Column_Finale_Players_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Finale_Players_Bool_Exp>
  predicate: Boolean_Comparison_Exp
}

export type Finale_Players_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Finale_Players_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Finale_Players_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "finale_players" */
export type Finale_Players_Aggregate_Fields = {
  __typename?: "finale_players_aggregate_fields"
  avg?: Maybe<Finale_Players_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Finale_Players_Max_Fields>
  min?: Maybe<Finale_Players_Min_Fields>
  stddev?: Maybe<Finale_Players_Stddev_Fields>
  stddev_pop?: Maybe<Finale_Players_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Finale_Players_Stddev_Samp_Fields>
  sum?: Maybe<Finale_Players_Sum_Fields>
  var_pop?: Maybe<Finale_Players_Var_Pop_Fields>
  var_samp?: Maybe<Finale_Players_Var_Samp_Fields>
  variance?: Maybe<Finale_Players_Variance_Fields>
}

/** aggregate fields of "finale_players" */
export type Finale_Players_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Finale_Players_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "finale_players" */
export type Finale_Players_Aggregate_Order_By = {
  avg?: InputMaybe<Finale_Players_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Finale_Players_Max_Order_By>
  min?: InputMaybe<Finale_Players_Min_Order_By>
  stddev?: InputMaybe<Finale_Players_Stddev_Order_By>
  stddev_pop?: InputMaybe<Finale_Players_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Finale_Players_Stddev_Samp_Order_By>
  sum?: InputMaybe<Finale_Players_Sum_Order_By>
  var_pop?: InputMaybe<Finale_Players_Var_Pop_Order_By>
  var_samp?: InputMaybe<Finale_Players_Var_Samp_Order_By>
  variance?: InputMaybe<Finale_Players_Variance_Order_By>
}

/** input type for inserting array relation for remote table "finale_players" */
export type Finale_Players_Arr_Rel_Insert_Input = {
  data: Array<Finale_Players_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Finale_Players_On_Conflict>
}

/** aggregate avg on columns */
export type Finale_Players_Avg_Fields = {
  __typename?: "finale_players_avg_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "finale_players" */
export type Finale_Players_Avg_Order_By = {
  id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "finale_players". All fields are combined with a logical 'AND'. */
export type Finale_Players_Bool_Exp = {
  _and?: InputMaybe<Array<Finale_Players_Bool_Exp>>
  _not?: InputMaybe<Finale_Players_Bool_Exp>
  _or?: InputMaybe<Array<Finale_Players_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  finale_record?: InputMaybe<Finale_Records_Bool_Exp>
  finale_scores?: InputMaybe<Finale_Scores_Bool_Exp>
  finale_scores_aggregate?: InputMaybe<Finale_Scores_Aggregate_Bool_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  nickname?: InputMaybe<String_Comparison_Exp>
  private?: InputMaybe<Boolean_Comparison_Exp>
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>
  user?: InputMaybe<Users_Bool_Exp>
  user_id?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "finale_players" */
export enum Finale_Players_Constraint {
  /** unique or primary key constraint on columns "nickname" */
  FinalePlayersNicknameKey = "finale_players_nickname_key",
  /** unique or primary key constraint on columns "id" */
  FinalePlayersPkey = "finale_players_pkey",
}

/** input type for incrementing numeric columns in table "finale_players" */
export type Finale_Players_Inc_Input = {
  id?: InputMaybe<Scalars["Int"]>
}

/** input type for inserting data into table "finale_players" */
export type Finale_Players_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  finale_record?: InputMaybe<Finale_Records_Obj_Rel_Insert_Input>
  finale_scores?: InputMaybe<Finale_Scores_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  private?: InputMaybe<Scalars["Boolean"]>
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>
  user_id?: InputMaybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Finale_Players_Max_Fields = {
  __typename?: "finale_players_max_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
  user_id?: Maybe<Scalars["String"]>
}

/** order by max() on columns of table "finale_players" */
export type Finale_Players_Max_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  nickname?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Finale_Players_Min_Fields = {
  __typename?: "finale_players_min_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
  user_id?: Maybe<Scalars["String"]>
}

/** order by min() on columns of table "finale_players" */
export type Finale_Players_Min_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  nickname?: InputMaybe<Order_By>
  user_id?: InputMaybe<Order_By>
}

/** response of any mutation on the table "finale_players" */
export type Finale_Players_Mutation_Response = {
  __typename?: "finale_players_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Finale_Players>
}

/** input type for inserting object relation for remote table "finale_players" */
export type Finale_Players_Obj_Rel_Insert_Input = {
  data: Finale_Players_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Finale_Players_On_Conflict>
}

/** on_conflict condition type for table "finale_players" */
export type Finale_Players_On_Conflict = {
  constraint: Finale_Players_Constraint
  update_columns?: Array<Finale_Players_Update_Column>
  where?: InputMaybe<Finale_Players_Bool_Exp>
}

/** Ordering options when selecting data from "finale_players". */
export type Finale_Players_Order_By = {
  created_at?: InputMaybe<Order_By>
  finale_record?: InputMaybe<Finale_Records_Order_By>
  finale_scores_aggregate?: InputMaybe<Finale_Scores_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  nickname?: InputMaybe<Order_By>
  private?: InputMaybe<Order_By>
  updated_at?: InputMaybe<Order_By>
  user?: InputMaybe<Users_Order_By>
  user_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: finale_players */
export type Finale_Players_Pk_Columns_Input = {
  id: Scalars["Int"]
}

/** select columns of table "finale_players" */
export enum Finale_Players_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Nickname = "nickname",
  /** column name */
  Private = "private",
  /** column name */
  UserId = "user_id",
}

/** select "finale_players_aggregate_bool_exp_bool_and_arguments_columns" columns of table "finale_players" */
export enum Finale_Players_Select_Column_Finale_Players_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Private = "private",
}

/** select "finale_players_aggregate_bool_exp_bool_or_arguments_columns" columns of table "finale_players" */
export enum Finale_Players_Select_Column_Finale_Players_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Private = "private",
}

/** input type for updating data in table "finale_players" */
export type Finale_Players_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  private?: InputMaybe<Scalars["Boolean"]>
  user_id?: InputMaybe<Scalars["String"]>
}

/** aggregate stddev on columns */
export type Finale_Players_Stddev_Fields = {
  __typename?: "finale_players_stddev_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "finale_players" */
export type Finale_Players_Stddev_Order_By = {
  id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Finale_Players_Stddev_Pop_Fields = {
  __typename?: "finale_players_stddev_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "finale_players" */
export type Finale_Players_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Finale_Players_Stddev_Samp_Fields = {
  __typename?: "finale_players_stddev_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "finale_players" */
export type Finale_Players_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "finale_players" */
export type Finale_Players_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Finale_Players_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Finale_Players_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  private?: InputMaybe<Scalars["Boolean"]>
  user_id?: InputMaybe<Scalars["String"]>
}

/** aggregate sum on columns */
export type Finale_Players_Sum_Fields = {
  __typename?: "finale_players_sum_fields"
  id?: Maybe<Scalars["Int"]>
}

/** order by sum() on columns of table "finale_players" */
export type Finale_Players_Sum_Order_By = {
  id?: InputMaybe<Order_By>
}

/** columns and relationships of "finale_players_timelines" */
export type Finale_Players_Timelines = {
  __typename?: "finale_players_timelines"
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
  /** An object relationship */
  player?: Maybe<Finale_Players>
  timelines?: Maybe<Scalars["_timestamptz"]>
}

/** aggregated selection of "finale_players_timelines" */
export type Finale_Players_Timelines_Aggregate = {
  __typename?: "finale_players_timelines_aggregate"
  aggregate?: Maybe<Finale_Players_Timelines_Aggregate_Fields>
  nodes: Array<Finale_Players_Timelines>
}

/** aggregate fields of "finale_players_timelines" */
export type Finale_Players_Timelines_Aggregate_Fields = {
  __typename?: "finale_players_timelines_aggregate_fields"
  avg?: Maybe<Finale_Players_Timelines_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Finale_Players_Timelines_Max_Fields>
  min?: Maybe<Finale_Players_Timelines_Min_Fields>
  stddev?: Maybe<Finale_Players_Timelines_Stddev_Fields>
  stddev_pop?: Maybe<Finale_Players_Timelines_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Finale_Players_Timelines_Stddev_Samp_Fields>
  sum?: Maybe<Finale_Players_Timelines_Sum_Fields>
  var_pop?: Maybe<Finale_Players_Timelines_Var_Pop_Fields>
  var_samp?: Maybe<Finale_Players_Timelines_Var_Samp_Fields>
  variance?: Maybe<Finale_Players_Timelines_Variance_Fields>
}

/** aggregate fields of "finale_players_timelines" */
export type Finale_Players_Timelines_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Finale_Players_Timelines_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Finale_Players_Timelines_Avg_Fields = {
  __typename?: "finale_players_timelines_avg_fields"
  id?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "finale_players_timelines". All fields are combined with a logical 'AND'. */
export type Finale_Players_Timelines_Bool_Exp = {
  _and?: InputMaybe<Array<Finale_Players_Timelines_Bool_Exp>>
  _not?: InputMaybe<Finale_Players_Timelines_Bool_Exp>
  _or?: InputMaybe<Array<Finale_Players_Timelines_Bool_Exp>>
  id?: InputMaybe<Int_Comparison_Exp>
  nickname?: InputMaybe<String_Comparison_Exp>
  player?: InputMaybe<Finale_Players_Bool_Exp>
  timelines?: InputMaybe<_Timestamptz_Comparison_Exp>
}

/** aggregate max on columns */
export type Finale_Players_Timelines_Max_Fields = {
  __typename?: "finale_players_timelines_max_fields"
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Finale_Players_Timelines_Min_Fields = {
  __typename?: "finale_players_timelines_min_fields"
  id?: Maybe<Scalars["Int"]>
  nickname?: Maybe<Scalars["String"]>
}

/** Ordering options when selecting data from "finale_players_timelines". */
export type Finale_Players_Timelines_Order_By = {
  id?: InputMaybe<Order_By>
  nickname?: InputMaybe<Order_By>
  player?: InputMaybe<Finale_Players_Order_By>
  timelines?: InputMaybe<Order_By>
}

/** select columns of table "finale_players_timelines" */
export enum Finale_Players_Timelines_Select_Column {
  /** column name */
  Id = "id",
  /** column name */
  Nickname = "nickname",
  /** column name */
  Timelines = "timelines",
}

/** aggregate stddev on columns */
export type Finale_Players_Timelines_Stddev_Fields = {
  __typename?: "finale_players_timelines_stddev_fields"
  id?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Finale_Players_Timelines_Stddev_Pop_Fields = {
  __typename?: "finale_players_timelines_stddev_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Finale_Players_Timelines_Stddev_Samp_Fields = {
  __typename?: "finale_players_timelines_stddev_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "finale_players_timelines" */
export type Finale_Players_Timelines_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Finale_Players_Timelines_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Finale_Players_Timelines_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars["Int"]>
  nickname?: InputMaybe<Scalars["String"]>
  timelines?: InputMaybe<Scalars["_timestamptz"]>
}

/** aggregate sum on columns */
export type Finale_Players_Timelines_Sum_Fields = {
  __typename?: "finale_players_timelines_sum_fields"
  id?: Maybe<Scalars["Int"]>
}

/** aggregate var_pop on columns */
export type Finale_Players_Timelines_Var_Pop_Fields = {
  __typename?: "finale_players_timelines_var_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Finale_Players_Timelines_Var_Samp_Fields = {
  __typename?: "finale_players_timelines_var_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Finale_Players_Timelines_Variance_Fields = {
  __typename?: "finale_players_timelines_variance_fields"
  id?: Maybe<Scalars["Float"]>
}

/** update columns of table "finale_players" */
export enum Finale_Players_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  Nickname = "nickname",
  /** column name */
  Private = "private",
  /** column name */
  UserId = "user_id",
}

export type Finale_Players_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Finale_Players_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Finale_Players_Set_Input>
  where: Finale_Players_Bool_Exp
}

/** aggregate var_pop on columns */
export type Finale_Players_Var_Pop_Fields = {
  __typename?: "finale_players_var_pop_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "finale_players" */
export type Finale_Players_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Finale_Players_Var_Samp_Fields = {
  __typename?: "finale_players_var_samp_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "finale_players" */
export type Finale_Players_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Finale_Players_Variance_Fields = {
  __typename?: "finale_players_variance_fields"
  id?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "finale_players" */
export type Finale_Players_Variance_Order_By = {
  id?: InputMaybe<Order_By>
}

/** columns and relationships of "finale_records" */
export type Finale_Records = {
  __typename?: "finale_records"
  card_name: Scalars["String"]
  class: Scalars["String"]
  end: Scalars["timestamptz"]
  /** An object relationship */
  finale_player: Finale_Players
  id: Scalars["Int"]
  max_rating: Scalars["numeric"]
  player_id: Scalars["Int"]
  rating: Scalars["numeric"]
  start: Scalars["timestamptz"]
  title: Scalars["String"]
}

/** aggregated selection of "finale_records" */
export type Finale_Records_Aggregate = {
  __typename?: "finale_records_aggregate"
  aggregate?: Maybe<Finale_Records_Aggregate_Fields>
  nodes: Array<Finale_Records>
}

/** aggregate fields of "finale_records" */
export type Finale_Records_Aggregate_Fields = {
  __typename?: "finale_records_aggregate_fields"
  avg?: Maybe<Finale_Records_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Finale_Records_Max_Fields>
  min?: Maybe<Finale_Records_Min_Fields>
  stddev?: Maybe<Finale_Records_Stddev_Fields>
  stddev_pop?: Maybe<Finale_Records_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Finale_Records_Stddev_Samp_Fields>
  sum?: Maybe<Finale_Records_Sum_Fields>
  var_pop?: Maybe<Finale_Records_Var_Pop_Fields>
  var_samp?: Maybe<Finale_Records_Var_Samp_Fields>
  variance?: Maybe<Finale_Records_Variance_Fields>
}

/** aggregate fields of "finale_records" */
export type Finale_Records_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Finale_Records_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Finale_Records_Avg_Fields = {
  __typename?: "finale_records_avg_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "finale_records". All fields are combined with a logical 'AND'. */
export type Finale_Records_Bool_Exp = {
  _and?: InputMaybe<Array<Finale_Records_Bool_Exp>>
  _not?: InputMaybe<Finale_Records_Bool_Exp>
  _or?: InputMaybe<Array<Finale_Records_Bool_Exp>>
  card_name?: InputMaybe<String_Comparison_Exp>
  class?: InputMaybe<String_Comparison_Exp>
  end?: InputMaybe<Timestamptz_Comparison_Exp>
  finale_player?: InputMaybe<Finale_Players_Bool_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  max_rating?: InputMaybe<Numeric_Comparison_Exp>
  player_id?: InputMaybe<Int_Comparison_Exp>
  rating?: InputMaybe<Numeric_Comparison_Exp>
  start?: InputMaybe<Timestamptz_Comparison_Exp>
  title?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "finale_records" */
export enum Finale_Records_Constraint {
  /** unique or primary key constraint on columns "id" */
  FinaleRecordsPkey = "finale_records_pkey",
  /** unique or primary key constraint on columns "player_id" */
  FinaleRecordsPlayerIdKey = "finale_records_player_id_key",
}

/** input type for incrementing numeric columns in table "finale_records" */
export type Finale_Records_Inc_Input = {
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["numeric"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["numeric"]>
}

/** input type for inserting data into table "finale_records" */
export type Finale_Records_Insert_Input = {
  card_name?: InputMaybe<Scalars["String"]>
  class?: InputMaybe<Scalars["String"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  finale_player?: InputMaybe<Finale_Players_Obj_Rel_Insert_Input>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["numeric"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["numeric"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  title?: InputMaybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Finale_Records_Max_Fields = {
  __typename?: "finale_records_max_fields"
  card_name?: Maybe<Scalars["String"]>
  class?: Maybe<Scalars["String"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["numeric"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["numeric"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Finale_Records_Min_Fields = {
  __typename?: "finale_records_min_fields"
  card_name?: Maybe<Scalars["String"]>
  class?: Maybe<Scalars["String"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["numeric"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["numeric"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
}

/** response of any mutation on the table "finale_records" */
export type Finale_Records_Mutation_Response = {
  __typename?: "finale_records_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Finale_Records>
}

/** input type for inserting object relation for remote table "finale_records" */
export type Finale_Records_Obj_Rel_Insert_Input = {
  data: Finale_Records_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Finale_Records_On_Conflict>
}

/** on_conflict condition type for table "finale_records" */
export type Finale_Records_On_Conflict = {
  constraint: Finale_Records_Constraint
  update_columns?: Array<Finale_Records_Update_Column>
  where?: InputMaybe<Finale_Records_Bool_Exp>
}

/** Ordering options when selecting data from "finale_records". */
export type Finale_Records_Order_By = {
  card_name?: InputMaybe<Order_By>
  class?: InputMaybe<Order_By>
  end?: InputMaybe<Order_By>
  finale_player?: InputMaybe<Finale_Players_Order_By>
  id?: InputMaybe<Order_By>
  max_rating?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  rating?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
}

/** primary key columns input for table: finale_records */
export type Finale_Records_Pk_Columns_Input = {
  id: Scalars["Int"]
}

/** select columns of table "finale_records" */
export enum Finale_Records_Select_Column {
  /** column name */
  CardName = "card_name",
  /** column name */
  Class = "class",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  MaxRating = "max_rating",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Rating = "rating",
  /** column name */
  Start = "start",
  /** column name */
  Title = "title",
}

/** input type for updating data in table "finale_records" */
export type Finale_Records_Set_Input = {
  card_name?: InputMaybe<Scalars["String"]>
  class?: InputMaybe<Scalars["String"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["numeric"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["numeric"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  title?: InputMaybe<Scalars["String"]>
}

/** aggregate stddev on columns */
export type Finale_Records_Stddev_Fields = {
  __typename?: "finale_records_stddev_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Finale_Records_Stddev_Pop_Fields = {
  __typename?: "finale_records_stddev_pop_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Finale_Records_Stddev_Samp_Fields = {
  __typename?: "finale_records_stddev_samp_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "finale_records" */
export type Finale_Records_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Finale_Records_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Finale_Records_Stream_Cursor_Value_Input = {
  card_name?: InputMaybe<Scalars["String"]>
  class?: InputMaybe<Scalars["String"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["numeric"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["numeric"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  title?: InputMaybe<Scalars["String"]>
}

/** aggregate sum on columns */
export type Finale_Records_Sum_Fields = {
  __typename?: "finale_records_sum_fields"
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["numeric"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["numeric"]>
}

/** update columns of table "finale_records" */
export enum Finale_Records_Update_Column {
  /** column name */
  CardName = "card_name",
  /** column name */
  Class = "class",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  MaxRating = "max_rating",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Rating = "rating",
  /** column name */
  Start = "start",
  /** column name */
  Title = "title",
}

export type Finale_Records_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Finale_Records_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Finale_Records_Set_Input>
  where: Finale_Records_Bool_Exp
}

/** aggregate var_pop on columns */
export type Finale_Records_Var_Pop_Fields = {
  __typename?: "finale_records_var_pop_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Finale_Records_Var_Samp_Fields = {
  __typename?: "finale_records_var_samp_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Finale_Records_Variance_Fields = {
  __typename?: "finale_records_variance_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** columns and relationships of "finale_records_with_history" */
export type Finale_Records_With_History = {
  __typename?: "finale_records_with_history"
  card_name?: Maybe<Scalars["String"]>
  class?: Maybe<Scalars["String"]>
  end?: Maybe<Scalars["timestamptz"]>
  /** An object relationship */
  finale_player?: Maybe<Finale_Players>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["numeric"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["numeric"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
}

/** aggregated selection of "finale_records_with_history" */
export type Finale_Records_With_History_Aggregate = {
  __typename?: "finale_records_with_history_aggregate"
  aggregate?: Maybe<Finale_Records_With_History_Aggregate_Fields>
  nodes: Array<Finale_Records_With_History>
}

/** aggregate fields of "finale_records_with_history" */
export type Finale_Records_With_History_Aggregate_Fields = {
  __typename?: "finale_records_with_history_aggregate_fields"
  avg?: Maybe<Finale_Records_With_History_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Finale_Records_With_History_Max_Fields>
  min?: Maybe<Finale_Records_With_History_Min_Fields>
  stddev?: Maybe<Finale_Records_With_History_Stddev_Fields>
  stddev_pop?: Maybe<Finale_Records_With_History_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Finale_Records_With_History_Stddev_Samp_Fields>
  sum?: Maybe<Finale_Records_With_History_Sum_Fields>
  var_pop?: Maybe<Finale_Records_With_History_Var_Pop_Fields>
  var_samp?: Maybe<Finale_Records_With_History_Var_Samp_Fields>
  variance?: Maybe<Finale_Records_With_History_Variance_Fields>
}

/** aggregate fields of "finale_records_with_history" */
export type Finale_Records_With_History_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Finale_Records_With_History_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Finale_Records_With_History_Avg_Fields = {
  __typename?: "finale_records_with_history_avg_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "finale_records_with_history". All fields are combined with a logical 'AND'. */
export type Finale_Records_With_History_Bool_Exp = {
  _and?: InputMaybe<Array<Finale_Records_With_History_Bool_Exp>>
  _not?: InputMaybe<Finale_Records_With_History_Bool_Exp>
  _or?: InputMaybe<Array<Finale_Records_With_History_Bool_Exp>>
  card_name?: InputMaybe<String_Comparison_Exp>
  class?: InputMaybe<String_Comparison_Exp>
  end?: InputMaybe<Timestamptz_Comparison_Exp>
  finale_player?: InputMaybe<Finale_Players_Bool_Exp>
  id?: InputMaybe<Int_Comparison_Exp>
  max_rating?: InputMaybe<Numeric_Comparison_Exp>
  player_id?: InputMaybe<Int_Comparison_Exp>
  rating?: InputMaybe<Numeric_Comparison_Exp>
  start?: InputMaybe<Timestamptz_Comparison_Exp>
  title?: InputMaybe<String_Comparison_Exp>
}

/** aggregate max on columns */
export type Finale_Records_With_History_Max_Fields = {
  __typename?: "finale_records_with_history_max_fields"
  card_name?: Maybe<Scalars["String"]>
  class?: Maybe<Scalars["String"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["numeric"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["numeric"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Finale_Records_With_History_Min_Fields = {
  __typename?: "finale_records_with_history_min_fields"
  card_name?: Maybe<Scalars["String"]>
  class?: Maybe<Scalars["String"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["numeric"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["numeric"]>
  start?: Maybe<Scalars["timestamptz"]>
  title?: Maybe<Scalars["String"]>
}

/** Ordering options when selecting data from "finale_records_with_history". */
export type Finale_Records_With_History_Order_By = {
  card_name?: InputMaybe<Order_By>
  class?: InputMaybe<Order_By>
  end?: InputMaybe<Order_By>
  finale_player?: InputMaybe<Finale_Players_Order_By>
  id?: InputMaybe<Order_By>
  max_rating?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  rating?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
}

/** select columns of table "finale_records_with_history" */
export enum Finale_Records_With_History_Select_Column {
  /** column name */
  CardName = "card_name",
  /** column name */
  Class = "class",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  MaxRating = "max_rating",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  Rating = "rating",
  /** column name */
  Start = "start",
  /** column name */
  Title = "title",
}

/** aggregate stddev on columns */
export type Finale_Records_With_History_Stddev_Fields = {
  __typename?: "finale_records_with_history_stddev_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Finale_Records_With_History_Stddev_Pop_Fields = {
  __typename?: "finale_records_with_history_stddev_pop_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Finale_Records_With_History_Stddev_Samp_Fields = {
  __typename?: "finale_records_with_history_stddev_samp_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "finale_records_with_history" */
export type Finale_Records_With_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Finale_Records_With_History_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Finale_Records_With_History_Stream_Cursor_Value_Input = {
  card_name?: InputMaybe<Scalars["String"]>
  class?: InputMaybe<Scalars["String"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["Int"]>
  max_rating?: InputMaybe<Scalars["numeric"]>
  player_id?: InputMaybe<Scalars["Int"]>
  rating?: InputMaybe<Scalars["numeric"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  title?: InputMaybe<Scalars["String"]>
}

/** aggregate sum on columns */
export type Finale_Records_With_History_Sum_Fields = {
  __typename?: "finale_records_with_history_sum_fields"
  id?: Maybe<Scalars["Int"]>
  max_rating?: Maybe<Scalars["numeric"]>
  player_id?: Maybe<Scalars["Int"]>
  rating?: Maybe<Scalars["numeric"]>
}

/** aggregate var_pop on columns */
export type Finale_Records_With_History_Var_Pop_Fields = {
  __typename?: "finale_records_with_history_var_pop_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Finale_Records_With_History_Var_Samp_Fields = {
  __typename?: "finale_records_with_history_var_samp_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Finale_Records_With_History_Variance_Fields = {
  __typename?: "finale_records_with_history_variance_fields"
  id?: Maybe<Scalars["Float"]>
  max_rating?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  rating?: Maybe<Scalars["Float"]>
}

/** columns and relationships of "finale_scores" */
export type Finale_Scores = {
  __typename?: "finale_scores"
  combo_flag: Scalars["finale_combo_flag"]
  difficulty: Scalars["smallint"]
  end: Scalars["timestamptz"]
  /** An object relationship */
  finale_note?: Maybe<Finale_Notes>
  /** An object relationship */
  finale_player: Finale_Players
  id: Scalars["bigint"]
  player_id: Scalars["Int"]
  raw_score: Scalars["Int"]
  score: Scalars["numeric"]
  song_id: Scalars["smallint"]
  start: Scalars["timestamptz"]
  sync_flag: Scalars["finale_sync_flag"]
}

/** aggregated selection of "finale_scores" */
export type Finale_Scores_Aggregate = {
  __typename?: "finale_scores_aggregate"
  aggregate?: Maybe<Finale_Scores_Aggregate_Fields>
  nodes: Array<Finale_Scores>
}

export type Finale_Scores_Aggregate_Bool_Exp = {
  count?: InputMaybe<Finale_Scores_Aggregate_Bool_Exp_Count>
}

export type Finale_Scores_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Finale_Scores_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
  filter?: InputMaybe<Finale_Scores_Bool_Exp>
  predicate: Int_Comparison_Exp
}

/** aggregate fields of "finale_scores" */
export type Finale_Scores_Aggregate_Fields = {
  __typename?: "finale_scores_aggregate_fields"
  avg?: Maybe<Finale_Scores_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Finale_Scores_Max_Fields>
  min?: Maybe<Finale_Scores_Min_Fields>
  stddev?: Maybe<Finale_Scores_Stddev_Fields>
  stddev_pop?: Maybe<Finale_Scores_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Finale_Scores_Stddev_Samp_Fields>
  sum?: Maybe<Finale_Scores_Sum_Fields>
  var_pop?: Maybe<Finale_Scores_Var_Pop_Fields>
  var_samp?: Maybe<Finale_Scores_Var_Samp_Fields>
  variance?: Maybe<Finale_Scores_Variance_Fields>
}

/** aggregate fields of "finale_scores" */
export type Finale_Scores_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Finale_Scores_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** order by aggregate values of table "finale_scores" */
export type Finale_Scores_Aggregate_Order_By = {
  avg?: InputMaybe<Finale_Scores_Avg_Order_By>
  count?: InputMaybe<Order_By>
  max?: InputMaybe<Finale_Scores_Max_Order_By>
  min?: InputMaybe<Finale_Scores_Min_Order_By>
  stddev?: InputMaybe<Finale_Scores_Stddev_Order_By>
  stddev_pop?: InputMaybe<Finale_Scores_Stddev_Pop_Order_By>
  stddev_samp?: InputMaybe<Finale_Scores_Stddev_Samp_Order_By>
  sum?: InputMaybe<Finale_Scores_Sum_Order_By>
  var_pop?: InputMaybe<Finale_Scores_Var_Pop_Order_By>
  var_samp?: InputMaybe<Finale_Scores_Var_Samp_Order_By>
  variance?: InputMaybe<Finale_Scores_Variance_Order_By>
}

/** input type for inserting array relation for remote table "finale_scores" */
export type Finale_Scores_Arr_Rel_Insert_Input = {
  data: Array<Finale_Scores_Insert_Input>
  /** upsert condition */
  on_conflict?: InputMaybe<Finale_Scores_On_Conflict>
}

/** aggregate avg on columns */
export type Finale_Scores_Avg_Fields = {
  __typename?: "finale_scores_avg_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by avg() on columns of table "finale_scores" */
export type Finale_Scores_Avg_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** Boolean expression to filter rows from the table "finale_scores". All fields are combined with a logical 'AND'. */
export type Finale_Scores_Bool_Exp = {
  _and?: InputMaybe<Array<Finale_Scores_Bool_Exp>>
  _not?: InputMaybe<Finale_Scores_Bool_Exp>
  _or?: InputMaybe<Array<Finale_Scores_Bool_Exp>>
  combo_flag?: InputMaybe<Finale_Combo_Flag_Comparison_Exp>
  difficulty?: InputMaybe<Smallint_Comparison_Exp>
  end?: InputMaybe<Timestamptz_Comparison_Exp>
  finale_note?: InputMaybe<Finale_Notes_Bool_Exp>
  finale_player?: InputMaybe<Finale_Players_Bool_Exp>
  id?: InputMaybe<Bigint_Comparison_Exp>
  player_id?: InputMaybe<Int_Comparison_Exp>
  raw_score?: InputMaybe<Int_Comparison_Exp>
  score?: InputMaybe<Numeric_Comparison_Exp>
  song_id?: InputMaybe<Smallint_Comparison_Exp>
  start?: InputMaybe<Timestamptz_Comparison_Exp>
  sync_flag?: InputMaybe<Finale_Sync_Flag_Comparison_Exp>
}

/** unique or primary key constraints on table "finale_scores" */
export enum Finale_Scores_Constraint {
  /** unique or primary key constraint on columns "id" */
  FinaleScoresPkey = "finale_scores_pkey",
  /** unique or primary key constraint on columns "song_id", "difficulty", "player_id" */
  FinaleScoresPlayerIdSongIdDifficultyKey = "finale_scores_player_id_song_id_difficulty_key",
}

/** input type for incrementing numeric columns in table "finale_scores" */
export type Finale_Scores_Inc_Input = {
  difficulty?: InputMaybe<Scalars["smallint"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  raw_score?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["smallint"]>
}

/** input type for inserting data into table "finale_scores" */
export type Finale_Scores_Insert_Input = {
  combo_flag?: InputMaybe<Scalars["finale_combo_flag"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  finale_note?: InputMaybe<Finale_Notes_Obj_Rel_Insert_Input>
  finale_player?: InputMaybe<Finale_Players_Obj_Rel_Insert_Input>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  raw_score?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["smallint"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  sync_flag?: InputMaybe<Scalars["finale_sync_flag"]>
}

/** aggregate max on columns */
export type Finale_Scores_Max_Fields = {
  __typename?: "finale_scores_max_fields"
  combo_flag?: Maybe<Scalars["finale_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  raw_score?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["finale_sync_flag"]>
}

/** order by max() on columns of table "finale_scores" */
export type Finale_Scores_Max_Order_By = {
  combo_flag?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  end?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  sync_flag?: InputMaybe<Order_By>
}

/** aggregate min on columns */
export type Finale_Scores_Min_Fields = {
  __typename?: "finale_scores_min_fields"
  combo_flag?: Maybe<Scalars["finale_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  raw_score?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["finale_sync_flag"]>
}

/** order by min() on columns of table "finale_scores" */
export type Finale_Scores_Min_Order_By = {
  combo_flag?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  end?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  sync_flag?: InputMaybe<Order_By>
}

/** response of any mutation on the table "finale_scores" */
export type Finale_Scores_Mutation_Response = {
  __typename?: "finale_scores_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Finale_Scores>
}

/** on_conflict condition type for table "finale_scores" */
export type Finale_Scores_On_Conflict = {
  constraint: Finale_Scores_Constraint
  update_columns?: Array<Finale_Scores_Update_Column>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

/** Ordering options when selecting data from "finale_scores". */
export type Finale_Scores_Order_By = {
  combo_flag?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  end?: InputMaybe<Order_By>
  finale_note?: InputMaybe<Finale_Notes_Order_By>
  finale_player?: InputMaybe<Finale_Players_Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  sync_flag?: InputMaybe<Order_By>
}

/** primary key columns input for table: finale_scores */
export type Finale_Scores_Pk_Columns_Input = {
  id: Scalars["bigint"]
}

/** select columns of table "finale_scores" */
export enum Finale_Scores_Select_Column {
  /** column name */
  ComboFlag = "combo_flag",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  RawScore = "raw_score",
  /** column name */
  Score = "score",
  /** column name */
  SongId = "song_id",
  /** column name */
  Start = "start",
  /** column name */
  SyncFlag = "sync_flag",
}

/** input type for updating data in table "finale_scores" */
export type Finale_Scores_Set_Input = {
  combo_flag?: InputMaybe<Scalars["finale_combo_flag"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  raw_score?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["smallint"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  sync_flag?: InputMaybe<Scalars["finale_sync_flag"]>
}

/** aggregate stddev on columns */
export type Finale_Scores_Stddev_Fields = {
  __typename?: "finale_scores_stddev_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by stddev() on columns of table "finale_scores" */
export type Finale_Scores_Stddev_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Finale_Scores_Stddev_Pop_Fields = {
  __typename?: "finale_scores_stddev_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by stddev_pop() on columns of table "finale_scores" */
export type Finale_Scores_Stddev_Pop_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Finale_Scores_Stddev_Samp_Fields = {
  __typename?: "finale_scores_stddev_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by stddev_samp() on columns of table "finale_scores" */
export type Finale_Scores_Stddev_Samp_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** Streaming cursor of the table "finale_scores" */
export type Finale_Scores_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Finale_Scores_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Finale_Scores_Stream_Cursor_Value_Input = {
  combo_flag?: InputMaybe<Scalars["finale_combo_flag"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  raw_score?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["smallint"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  sync_flag?: InputMaybe<Scalars["finale_sync_flag"]>
}

/** aggregate sum on columns */
export type Finale_Scores_Sum_Fields = {
  __typename?: "finale_scores_sum_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  raw_score?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["smallint"]>
}

/** order by sum() on columns of table "finale_scores" */
export type Finale_Scores_Sum_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** update columns of table "finale_scores" */
export enum Finale_Scores_Update_Column {
  /** column name */
  ComboFlag = "combo_flag",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  RawScore = "raw_score",
  /** column name */
  Score = "score",
  /** column name */
  SongId = "song_id",
  /** column name */
  Start = "start",
  /** column name */
  SyncFlag = "sync_flag",
}

export type Finale_Scores_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Finale_Scores_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Finale_Scores_Set_Input>
  where: Finale_Scores_Bool_Exp
}

/** aggregate var_pop on columns */
export type Finale_Scores_Var_Pop_Fields = {
  __typename?: "finale_scores_var_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by var_pop() on columns of table "finale_scores" */
export type Finale_Scores_Var_Pop_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate var_samp on columns */
export type Finale_Scores_Var_Samp_Fields = {
  __typename?: "finale_scores_var_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by var_samp() on columns of table "finale_scores" */
export type Finale_Scores_Var_Samp_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** aggregate variance on columns */
export type Finale_Scores_Variance_Fields = {
  __typename?: "finale_scores_variance_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** order by variance() on columns of table "finale_scores" */
export type Finale_Scores_Variance_Order_By = {
  difficulty?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
}

/** columns and relationships of "finale_scores_with_history" */
export type Finale_Scores_With_History = {
  __typename?: "finale_scores_with_history"
  combo_flag?: Maybe<Scalars["finale_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  /** An object relationship */
  finale_note?: Maybe<Finale_Scores>
  /** An object relationship */
  finale_player?: Maybe<Finale_Players>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  raw_score?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["finale_sync_flag"]>
}

/** aggregated selection of "finale_scores_with_history" */
export type Finale_Scores_With_History_Aggregate = {
  __typename?: "finale_scores_with_history_aggregate"
  aggregate?: Maybe<Finale_Scores_With_History_Aggregate_Fields>
  nodes: Array<Finale_Scores_With_History>
}

/** aggregate fields of "finale_scores_with_history" */
export type Finale_Scores_With_History_Aggregate_Fields = {
  __typename?: "finale_scores_with_history_aggregate_fields"
  avg?: Maybe<Finale_Scores_With_History_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Finale_Scores_With_History_Max_Fields>
  min?: Maybe<Finale_Scores_With_History_Min_Fields>
  stddev?: Maybe<Finale_Scores_With_History_Stddev_Fields>
  stddev_pop?: Maybe<Finale_Scores_With_History_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Finale_Scores_With_History_Stddev_Samp_Fields>
  sum?: Maybe<Finale_Scores_With_History_Sum_Fields>
  var_pop?: Maybe<Finale_Scores_With_History_Var_Pop_Fields>
  var_samp?: Maybe<Finale_Scores_With_History_Var_Samp_Fields>
  variance?: Maybe<Finale_Scores_With_History_Variance_Fields>
}

/** aggregate fields of "finale_scores_with_history" */
export type Finale_Scores_With_History_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Finale_Scores_With_History_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Finale_Scores_With_History_Avg_Fields = {
  __typename?: "finale_scores_with_history_avg_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "finale_scores_with_history". All fields are combined with a logical 'AND'. */
export type Finale_Scores_With_History_Bool_Exp = {
  _and?: InputMaybe<Array<Finale_Scores_With_History_Bool_Exp>>
  _not?: InputMaybe<Finale_Scores_With_History_Bool_Exp>
  _or?: InputMaybe<Array<Finale_Scores_With_History_Bool_Exp>>
  combo_flag?: InputMaybe<Finale_Combo_Flag_Comparison_Exp>
  difficulty?: InputMaybe<Smallint_Comparison_Exp>
  end?: InputMaybe<Timestamptz_Comparison_Exp>
  finale_note?: InputMaybe<Finale_Scores_Bool_Exp>
  finale_player?: InputMaybe<Finale_Players_Bool_Exp>
  id?: InputMaybe<Bigint_Comparison_Exp>
  player_id?: InputMaybe<Int_Comparison_Exp>
  raw_score?: InputMaybe<Int_Comparison_Exp>
  score?: InputMaybe<Numeric_Comparison_Exp>
  song_id?: InputMaybe<Smallint_Comparison_Exp>
  start?: InputMaybe<Timestamptz_Comparison_Exp>
  sync_flag?: InputMaybe<Finale_Sync_Flag_Comparison_Exp>
}

/** aggregate max on columns */
export type Finale_Scores_With_History_Max_Fields = {
  __typename?: "finale_scores_with_history_max_fields"
  combo_flag?: Maybe<Scalars["finale_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  raw_score?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["finale_sync_flag"]>
}

/** aggregate min on columns */
export type Finale_Scores_With_History_Min_Fields = {
  __typename?: "finale_scores_with_history_min_fields"
  combo_flag?: Maybe<Scalars["finale_combo_flag"]>
  difficulty?: Maybe<Scalars["smallint"]>
  end?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  raw_score?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["smallint"]>
  start?: Maybe<Scalars["timestamptz"]>
  sync_flag?: Maybe<Scalars["finale_sync_flag"]>
}

/** Ordering options when selecting data from "finale_scores_with_history". */
export type Finale_Scores_With_History_Order_By = {
  combo_flag?: InputMaybe<Order_By>
  difficulty?: InputMaybe<Order_By>
  end?: InputMaybe<Order_By>
  finale_note?: InputMaybe<Finale_Scores_Order_By>
  finale_player?: InputMaybe<Finale_Players_Order_By>
  id?: InputMaybe<Order_By>
  player_id?: InputMaybe<Order_By>
  raw_score?: InputMaybe<Order_By>
  score?: InputMaybe<Order_By>
  song_id?: InputMaybe<Order_By>
  start?: InputMaybe<Order_By>
  sync_flag?: InputMaybe<Order_By>
}

/** select columns of table "finale_scores_with_history" */
export enum Finale_Scores_With_History_Select_Column {
  /** column name */
  ComboFlag = "combo_flag",
  /** column name */
  Difficulty = "difficulty",
  /** column name */
  End = "end",
  /** column name */
  Id = "id",
  /** column name */
  PlayerId = "player_id",
  /** column name */
  RawScore = "raw_score",
  /** column name */
  Score = "score",
  /** column name */
  SongId = "song_id",
  /** column name */
  Start = "start",
  /** column name */
  SyncFlag = "sync_flag",
}

/** aggregate stddev on columns */
export type Finale_Scores_With_History_Stddev_Fields = {
  __typename?: "finale_scores_with_history_stddev_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Finale_Scores_With_History_Stddev_Pop_Fields = {
  __typename?: "finale_scores_with_history_stddev_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Finale_Scores_With_History_Stddev_Samp_Fields = {
  __typename?: "finale_scores_with_history_stddev_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "finale_scores_with_history" */
export type Finale_Scores_With_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Finale_Scores_With_History_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Finale_Scores_With_History_Stream_Cursor_Value_Input = {
  combo_flag?: InputMaybe<Scalars["finale_combo_flag"]>
  difficulty?: InputMaybe<Scalars["smallint"]>
  end?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["bigint"]>
  player_id?: InputMaybe<Scalars["Int"]>
  raw_score?: InputMaybe<Scalars["Int"]>
  score?: InputMaybe<Scalars["numeric"]>
  song_id?: InputMaybe<Scalars["smallint"]>
  start?: InputMaybe<Scalars["timestamptz"]>
  sync_flag?: InputMaybe<Scalars["finale_sync_flag"]>
}

/** aggregate sum on columns */
export type Finale_Scores_With_History_Sum_Fields = {
  __typename?: "finale_scores_with_history_sum_fields"
  difficulty?: Maybe<Scalars["smallint"]>
  id?: Maybe<Scalars["bigint"]>
  player_id?: Maybe<Scalars["Int"]>
  raw_score?: Maybe<Scalars["Int"]>
  score?: Maybe<Scalars["numeric"]>
  song_id?: Maybe<Scalars["smallint"]>
}

/** aggregate var_pop on columns */
export type Finale_Scores_With_History_Var_Pop_Fields = {
  __typename?: "finale_scores_with_history_var_pop_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Finale_Scores_With_History_Var_Samp_Fields = {
  __typename?: "finale_scores_with_history_var_samp_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Finale_Scores_With_History_Variance_Fields = {
  __typename?: "finale_scores_with_history_variance_fields"
  difficulty?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  player_id?: Maybe<Scalars["Float"]>
  raw_score?: Maybe<Scalars["Float"]>
  score?: Maybe<Scalars["Float"]>
  song_id?: Maybe<Scalars["Float"]>
}

/** columns and relationships of "finale_songs" */
export type Finale_Songs = {
  __typename?: "finale_songs"
  active: Scalars["Boolean"]
  category: Scalars["smallint"]
  english_title?: Maybe<Scalars["String"]>
  /** An array relationship */
  finale_notes: Array<Finale_Notes>
  /** An aggregate relationship */
  finale_notes_aggregate: Finale_Notes_Aggregate
  id: Scalars["smallint"]
  japan_only: Scalars["Boolean"]
  order: Scalars["smallint"]
  title: Scalars["String"]
  version: Scalars["smallint"]
}

/** columns and relationships of "finale_songs" */
export type Finale_SongsFinale_NotesArgs = {
  distinct_on?: InputMaybe<Array<Finale_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Notes_Order_By>>
  where?: InputMaybe<Finale_Notes_Bool_Exp>
}

/** columns and relationships of "finale_songs" */
export type Finale_SongsFinale_Notes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Notes_Order_By>>
  where?: InputMaybe<Finale_Notes_Bool_Exp>
}

/** aggregated selection of "finale_songs" */
export type Finale_Songs_Aggregate = {
  __typename?: "finale_songs_aggregate"
  aggregate?: Maybe<Finale_Songs_Aggregate_Fields>
  nodes: Array<Finale_Songs>
}

/** aggregate fields of "finale_songs" */
export type Finale_Songs_Aggregate_Fields = {
  __typename?: "finale_songs_aggregate_fields"
  avg?: Maybe<Finale_Songs_Avg_Fields>
  count: Scalars["Int"]
  max?: Maybe<Finale_Songs_Max_Fields>
  min?: Maybe<Finale_Songs_Min_Fields>
  stddev?: Maybe<Finale_Songs_Stddev_Fields>
  stddev_pop?: Maybe<Finale_Songs_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Finale_Songs_Stddev_Samp_Fields>
  sum?: Maybe<Finale_Songs_Sum_Fields>
  var_pop?: Maybe<Finale_Songs_Var_Pop_Fields>
  var_samp?: Maybe<Finale_Songs_Var_Samp_Fields>
  variance?: Maybe<Finale_Songs_Variance_Fields>
}

/** aggregate fields of "finale_songs" */
export type Finale_Songs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Finale_Songs_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** aggregate avg on columns */
export type Finale_Songs_Avg_Fields = {
  __typename?: "finale_songs_avg_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
  version?: Maybe<Scalars["Float"]>
}

/** Boolean expression to filter rows from the table "finale_songs". All fields are combined with a logical 'AND'. */
export type Finale_Songs_Bool_Exp = {
  _and?: InputMaybe<Array<Finale_Songs_Bool_Exp>>
  _not?: InputMaybe<Finale_Songs_Bool_Exp>
  _or?: InputMaybe<Array<Finale_Songs_Bool_Exp>>
  active?: InputMaybe<Boolean_Comparison_Exp>
  category?: InputMaybe<Smallint_Comparison_Exp>
  english_title?: InputMaybe<String_Comparison_Exp>
  finale_notes?: InputMaybe<Finale_Notes_Bool_Exp>
  finale_notes_aggregate?: InputMaybe<Finale_Notes_Aggregate_Bool_Exp>
  id?: InputMaybe<Smallint_Comparison_Exp>
  japan_only?: InputMaybe<Boolean_Comparison_Exp>
  order?: InputMaybe<Smallint_Comparison_Exp>
  title?: InputMaybe<String_Comparison_Exp>
  version?: InputMaybe<Smallint_Comparison_Exp>
}

/** unique or primary key constraints on table "finale_songs" */
export enum Finale_Songs_Constraint {
  /** unique or primary key constraint on columns "id" */
  FinaleSongsPkey = "finale_songs_pkey",
}

/** input type for incrementing numeric columns in table "finale_songs" */
export type Finale_Songs_Inc_Input = {
  category?: InputMaybe<Scalars["smallint"]>
  id?: InputMaybe<Scalars["smallint"]>
  order?: InputMaybe<Scalars["smallint"]>
  version?: InputMaybe<Scalars["smallint"]>
}

/** input type for inserting data into table "finale_songs" */
export type Finale_Songs_Insert_Input = {
  active?: InputMaybe<Scalars["Boolean"]>
  category?: InputMaybe<Scalars["smallint"]>
  english_title?: InputMaybe<Scalars["String"]>
  finale_notes?: InputMaybe<Finale_Notes_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars["smallint"]>
  japan_only?: InputMaybe<Scalars["Boolean"]>
  order?: InputMaybe<Scalars["smallint"]>
  title?: InputMaybe<Scalars["String"]>
  version?: InputMaybe<Scalars["smallint"]>
}

/** aggregate max on columns */
export type Finale_Songs_Max_Fields = {
  __typename?: "finale_songs_max_fields"
  category?: Maybe<Scalars["smallint"]>
  english_title?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["smallint"]>
  order?: Maybe<Scalars["smallint"]>
  title?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["smallint"]>
}

/** aggregate min on columns */
export type Finale_Songs_Min_Fields = {
  __typename?: "finale_songs_min_fields"
  category?: Maybe<Scalars["smallint"]>
  english_title?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["smallint"]>
  order?: Maybe<Scalars["smallint"]>
  title?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["smallint"]>
}

/** response of any mutation on the table "finale_songs" */
export type Finale_Songs_Mutation_Response = {
  __typename?: "finale_songs_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Finale_Songs>
}

/** input type for inserting object relation for remote table "finale_songs" */
export type Finale_Songs_Obj_Rel_Insert_Input = {
  data: Finale_Songs_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Finale_Songs_On_Conflict>
}

/** on_conflict condition type for table "finale_songs" */
export type Finale_Songs_On_Conflict = {
  constraint: Finale_Songs_Constraint
  update_columns?: Array<Finale_Songs_Update_Column>
  where?: InputMaybe<Finale_Songs_Bool_Exp>
}

/** Ordering options when selecting data from "finale_songs". */
export type Finale_Songs_Order_By = {
  active?: InputMaybe<Order_By>
  category?: InputMaybe<Order_By>
  english_title?: InputMaybe<Order_By>
  finale_notes_aggregate?: InputMaybe<Finale_Notes_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  japan_only?: InputMaybe<Order_By>
  order?: InputMaybe<Order_By>
  title?: InputMaybe<Order_By>
  version?: InputMaybe<Order_By>
}

/** primary key columns input for table: finale_songs */
export type Finale_Songs_Pk_Columns_Input = {
  id: Scalars["smallint"]
}

/** select columns of table "finale_songs" */
export enum Finale_Songs_Select_Column {
  /** column name */
  Active = "active",
  /** column name */
  Category = "category",
  /** column name */
  EnglishTitle = "english_title",
  /** column name */
  Id = "id",
  /** column name */
  JapanOnly = "japan_only",
  /** column name */
  Order = "order",
  /** column name */
  Title = "title",
  /** column name */
  Version = "version",
}

/** input type for updating data in table "finale_songs" */
export type Finale_Songs_Set_Input = {
  active?: InputMaybe<Scalars["Boolean"]>
  category?: InputMaybe<Scalars["smallint"]>
  english_title?: InputMaybe<Scalars["String"]>
  id?: InputMaybe<Scalars["smallint"]>
  japan_only?: InputMaybe<Scalars["Boolean"]>
  order?: InputMaybe<Scalars["smallint"]>
  title?: InputMaybe<Scalars["String"]>
  version?: InputMaybe<Scalars["smallint"]>
}

/** aggregate stddev on columns */
export type Finale_Songs_Stddev_Fields = {
  __typename?: "finale_songs_stddev_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
  version?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_pop on columns */
export type Finale_Songs_Stddev_Pop_Fields = {
  __typename?: "finale_songs_stddev_pop_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
  version?: Maybe<Scalars["Float"]>
}

/** aggregate stddev_samp on columns */
export type Finale_Songs_Stddev_Samp_Fields = {
  __typename?: "finale_songs_stddev_samp_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
  version?: Maybe<Scalars["Float"]>
}

/** Streaming cursor of the table "finale_songs" */
export type Finale_Songs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Finale_Songs_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Finale_Songs_Stream_Cursor_Value_Input = {
  active?: InputMaybe<Scalars["Boolean"]>
  category?: InputMaybe<Scalars["smallint"]>
  english_title?: InputMaybe<Scalars["String"]>
  id?: InputMaybe<Scalars["smallint"]>
  japan_only?: InputMaybe<Scalars["Boolean"]>
  order?: InputMaybe<Scalars["smallint"]>
  title?: InputMaybe<Scalars["String"]>
  version?: InputMaybe<Scalars["smallint"]>
}

/** aggregate sum on columns */
export type Finale_Songs_Sum_Fields = {
  __typename?: "finale_songs_sum_fields"
  category?: Maybe<Scalars["smallint"]>
  id?: Maybe<Scalars["smallint"]>
  order?: Maybe<Scalars["smallint"]>
  version?: Maybe<Scalars["smallint"]>
}

/** update columns of table "finale_songs" */
export enum Finale_Songs_Update_Column {
  /** column name */
  Active = "active",
  /** column name */
  Category = "category",
  /** column name */
  EnglishTitle = "english_title",
  /** column name */
  Id = "id",
  /** column name */
  JapanOnly = "japan_only",
  /** column name */
  Order = "order",
  /** column name */
  Title = "title",
  /** column name */
  Version = "version",
}

export type Finale_Songs_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Finale_Songs_Inc_Input>
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Finale_Songs_Set_Input>
  where: Finale_Songs_Bool_Exp
}

/** aggregate var_pop on columns */
export type Finale_Songs_Var_Pop_Fields = {
  __typename?: "finale_songs_var_pop_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
  version?: Maybe<Scalars["Float"]>
}

/** aggregate var_samp on columns */
export type Finale_Songs_Var_Samp_Fields = {
  __typename?: "finale_songs_var_samp_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
  version?: Maybe<Scalars["Float"]>
}

/** aggregate variance on columns */
export type Finale_Songs_Variance_Fields = {
  __typename?: "finale_songs_variance_fields"
  category?: Maybe<Scalars["Float"]>
  id?: Maybe<Scalars["Float"]>
  order?: Maybe<Scalars["Float"]>
  version?: Maybe<Scalars["Float"]>
}

/** Boolean expression to compare columns of type "finale_sync_flag". All fields are combined with logical 'AND'. */
export type Finale_Sync_Flag_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["finale_sync_flag"]>
  _gt?: InputMaybe<Scalars["finale_sync_flag"]>
  _gte?: InputMaybe<Scalars["finale_sync_flag"]>
  _in?: InputMaybe<Array<Scalars["finale_sync_flag"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["finale_sync_flag"]>
  _lte?: InputMaybe<Scalars["finale_sync_flag"]>
  _neq?: InputMaybe<Scalars["finale_sync_flag"]>
  _nin?: InputMaybe<Array<Scalars["finale_sync_flag"]>>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: "mutation_root"
  /** delete data from the table: "dx_intl_notes" */
  delete_dx_intl_notes?: Maybe<Dx_Intl_Notes_Mutation_Response>
  /** delete single row from the table: "dx_intl_notes" */
  delete_dx_intl_notes_by_pk?: Maybe<Dx_Intl_Notes>
  /** delete data from the table: "dx_intl_players" */
  delete_dx_intl_players?: Maybe<Dx_Intl_Players_Mutation_Response>
  /** delete single row from the table: "dx_intl_players" */
  delete_dx_intl_players_by_pk?: Maybe<Dx_Intl_Players>
  /** delete data from the table: "dx_intl_records" */
  delete_dx_intl_records?: Maybe<Dx_Intl_Records_Mutation_Response>
  /** delete single row from the table: "dx_intl_records" */
  delete_dx_intl_records_by_pk?: Maybe<Dx_Intl_Records>
  /** delete data from the table: "dx_intl_scores" */
  delete_dx_intl_scores?: Maybe<Dx_Intl_Scores_Mutation_Response>
  /** delete single row from the table: "dx_intl_scores" */
  delete_dx_intl_scores_by_pk?: Maybe<Dx_Intl_Scores>
  /** delete data from the table: "dx_intl_songs" */
  delete_dx_intl_songs?: Maybe<Dx_Intl_Songs_Mutation_Response>
  /** delete single row from the table: "dx_intl_songs" */
  delete_dx_intl_songs_by_pk?: Maybe<Dx_Intl_Songs>
  /** delete data from the table: "dx_intl_variants" */
  delete_dx_intl_variants?: Maybe<Dx_Intl_Variants_Mutation_Response>
  /** delete single row from the table: "dx_intl_variants" */
  delete_dx_intl_variants_by_pk?: Maybe<Dx_Intl_Variants>
  /** delete data from the table: "finale_notes" */
  delete_finale_notes?: Maybe<Finale_Notes_Mutation_Response>
  /** delete single row from the table: "finale_notes" */
  delete_finale_notes_by_pk?: Maybe<Finale_Notes>
  /** delete data from the table: "finale_players" */
  delete_finale_players?: Maybe<Finale_Players_Mutation_Response>
  /** delete single row from the table: "finale_players" */
  delete_finale_players_by_pk?: Maybe<Finale_Players>
  /** delete data from the table: "finale_records" */
  delete_finale_records?: Maybe<Finale_Records_Mutation_Response>
  /** delete single row from the table: "finale_records" */
  delete_finale_records_by_pk?: Maybe<Finale_Records>
  /** delete data from the table: "finale_scores" */
  delete_finale_scores?: Maybe<Finale_Scores_Mutation_Response>
  /** delete single row from the table: "finale_scores" */
  delete_finale_scores_by_pk?: Maybe<Finale_Scores>
  /** delete data from the table: "finale_songs" */
  delete_finale_songs?: Maybe<Finale_Songs_Mutation_Response>
  /** delete single row from the table: "finale_songs" */
  delete_finale_songs_by_pk?: Maybe<Finale_Songs>
  /** delete data from the table: "tokens" */
  delete_tokens?: Maybe<Tokens_Mutation_Response>
  /** delete single row from the table: "tokens" */
  delete_tokens_by_pk?: Maybe<Tokens>
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>
  /** insert data into the table: "dx_intl_notes" */
  insert_dx_intl_notes?: Maybe<Dx_Intl_Notes_Mutation_Response>
  /** insert a single row into the table: "dx_intl_notes" */
  insert_dx_intl_notes_one?: Maybe<Dx_Intl_Notes>
  /** insert data into the table: "dx_intl_players" */
  insert_dx_intl_players?: Maybe<Dx_Intl_Players_Mutation_Response>
  /** insert a single row into the table: "dx_intl_players" */
  insert_dx_intl_players_one?: Maybe<Dx_Intl_Players>
  /** insert data into the table: "dx_intl_records" */
  insert_dx_intl_records?: Maybe<Dx_Intl_Records_Mutation_Response>
  /** insert a single row into the table: "dx_intl_records" */
  insert_dx_intl_records_one?: Maybe<Dx_Intl_Records>
  /** insert data into the table: "dx_intl_scores" */
  insert_dx_intl_scores?: Maybe<Dx_Intl_Scores_Mutation_Response>
  /** insert a single row into the table: "dx_intl_scores" */
  insert_dx_intl_scores_one?: Maybe<Dx_Intl_Scores>
  /** insert data into the table: "dx_intl_songs" */
  insert_dx_intl_songs?: Maybe<Dx_Intl_Songs_Mutation_Response>
  /** insert a single row into the table: "dx_intl_songs" */
  insert_dx_intl_songs_one?: Maybe<Dx_Intl_Songs>
  /** insert data into the table: "dx_intl_variants" */
  insert_dx_intl_variants?: Maybe<Dx_Intl_Variants_Mutation_Response>
  /** insert a single row into the table: "dx_intl_variants" */
  insert_dx_intl_variants_one?: Maybe<Dx_Intl_Variants>
  /** insert data into the table: "finale_notes" */
  insert_finale_notes?: Maybe<Finale_Notes_Mutation_Response>
  /** insert a single row into the table: "finale_notes" */
  insert_finale_notes_one?: Maybe<Finale_Notes>
  /** insert data into the table: "finale_players" */
  insert_finale_players?: Maybe<Finale_Players_Mutation_Response>
  /** insert a single row into the table: "finale_players" */
  insert_finale_players_one?: Maybe<Finale_Players>
  /** insert data into the table: "finale_records" */
  insert_finale_records?: Maybe<Finale_Records_Mutation_Response>
  /** insert a single row into the table: "finale_records" */
  insert_finale_records_one?: Maybe<Finale_Records>
  /** insert data into the table: "finale_scores" */
  insert_finale_scores?: Maybe<Finale_Scores_Mutation_Response>
  /** insert a single row into the table: "finale_scores" */
  insert_finale_scores_one?: Maybe<Finale_Scores>
  /** insert data into the table: "finale_songs" */
  insert_finale_songs?: Maybe<Finale_Songs_Mutation_Response>
  /** insert a single row into the table: "finale_songs" */
  insert_finale_songs_one?: Maybe<Finale_Songs>
  /** insert data into the table: "tokens" */
  insert_tokens?: Maybe<Tokens_Mutation_Response>
  /** insert a single row into the table: "tokens" */
  insert_tokens_one?: Maybe<Tokens>
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>
  /** update data of the table: "dx_intl_notes" */
  update_dx_intl_notes?: Maybe<Dx_Intl_Notes_Mutation_Response>
  /** update single row of the table: "dx_intl_notes" */
  update_dx_intl_notes_by_pk?: Maybe<Dx_Intl_Notes>
  /** update multiples rows of table: "dx_intl_notes" */
  update_dx_intl_notes_many?: Maybe<
    Array<Maybe<Dx_Intl_Notes_Mutation_Response>>
  >
  /** update data of the table: "dx_intl_players" */
  update_dx_intl_players?: Maybe<Dx_Intl_Players_Mutation_Response>
  /** update single row of the table: "dx_intl_players" */
  update_dx_intl_players_by_pk?: Maybe<Dx_Intl_Players>
  /** update multiples rows of table: "dx_intl_players" */
  update_dx_intl_players_many?: Maybe<
    Array<Maybe<Dx_Intl_Players_Mutation_Response>>
  >
  /** update data of the table: "dx_intl_records" */
  update_dx_intl_records?: Maybe<Dx_Intl_Records_Mutation_Response>
  /** update single row of the table: "dx_intl_records" */
  update_dx_intl_records_by_pk?: Maybe<Dx_Intl_Records>
  /** update multiples rows of table: "dx_intl_records" */
  update_dx_intl_records_many?: Maybe<
    Array<Maybe<Dx_Intl_Records_Mutation_Response>>
  >
  /** update data of the table: "dx_intl_scores" */
  update_dx_intl_scores?: Maybe<Dx_Intl_Scores_Mutation_Response>
  /** update single row of the table: "dx_intl_scores" */
  update_dx_intl_scores_by_pk?: Maybe<Dx_Intl_Scores>
  /** update multiples rows of table: "dx_intl_scores" */
  update_dx_intl_scores_many?: Maybe<
    Array<Maybe<Dx_Intl_Scores_Mutation_Response>>
  >
  /** update data of the table: "dx_intl_songs" */
  update_dx_intl_songs?: Maybe<Dx_Intl_Songs_Mutation_Response>
  /** update single row of the table: "dx_intl_songs" */
  update_dx_intl_songs_by_pk?: Maybe<Dx_Intl_Songs>
  /** update multiples rows of table: "dx_intl_songs" */
  update_dx_intl_songs_many?: Maybe<
    Array<Maybe<Dx_Intl_Songs_Mutation_Response>>
  >
  /** update data of the table: "dx_intl_variants" */
  update_dx_intl_variants?: Maybe<Dx_Intl_Variants_Mutation_Response>
  /** update single row of the table: "dx_intl_variants" */
  update_dx_intl_variants_by_pk?: Maybe<Dx_Intl_Variants>
  /** update multiples rows of table: "dx_intl_variants" */
  update_dx_intl_variants_many?: Maybe<
    Array<Maybe<Dx_Intl_Variants_Mutation_Response>>
  >
  /** update data of the table: "finale_notes" */
  update_finale_notes?: Maybe<Finale_Notes_Mutation_Response>
  /** update single row of the table: "finale_notes" */
  update_finale_notes_by_pk?: Maybe<Finale_Notes>
  /** update multiples rows of table: "finale_notes" */
  update_finale_notes_many?: Maybe<Array<Maybe<Finale_Notes_Mutation_Response>>>
  /** update data of the table: "finale_players" */
  update_finale_players?: Maybe<Finale_Players_Mutation_Response>
  /** update single row of the table: "finale_players" */
  update_finale_players_by_pk?: Maybe<Finale_Players>
  /** update multiples rows of table: "finale_players" */
  update_finale_players_many?: Maybe<
    Array<Maybe<Finale_Players_Mutation_Response>>
  >
  /** update data of the table: "finale_records" */
  update_finale_records?: Maybe<Finale_Records_Mutation_Response>
  /** update single row of the table: "finale_records" */
  update_finale_records_by_pk?: Maybe<Finale_Records>
  /** update multiples rows of table: "finale_records" */
  update_finale_records_many?: Maybe<
    Array<Maybe<Finale_Records_Mutation_Response>>
  >
  /** update data of the table: "finale_scores" */
  update_finale_scores?: Maybe<Finale_Scores_Mutation_Response>
  /** update single row of the table: "finale_scores" */
  update_finale_scores_by_pk?: Maybe<Finale_Scores>
  /** update multiples rows of table: "finale_scores" */
  update_finale_scores_many?: Maybe<
    Array<Maybe<Finale_Scores_Mutation_Response>>
  >
  /** update data of the table: "finale_songs" */
  update_finale_songs?: Maybe<Finale_Songs_Mutation_Response>
  /** update single row of the table: "finale_songs" */
  update_finale_songs_by_pk?: Maybe<Finale_Songs>
  /** update multiples rows of table: "finale_songs" */
  update_finale_songs_many?: Maybe<Array<Maybe<Finale_Songs_Mutation_Response>>>
  /** update data of the table: "tokens" */
  update_tokens?: Maybe<Tokens_Mutation_Response>
  /** update single row of the table: "tokens" */
  update_tokens_by_pk?: Maybe<Tokens>
  /** update multiples rows of table: "tokens" */
  update_tokens_many?: Maybe<Array<Maybe<Tokens_Mutation_Response>>>
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_NotesArgs = {
  where: Dx_Intl_Notes_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Notes_By_PkArgs = {
  deluxe: Scalars["Boolean"]
  difficulty: Scalars["smallint"]
  song_id: Scalars["String"]
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_PlayersArgs = {
  where: Dx_Intl_Players_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Players_By_PkArgs = {
  id: Scalars["Int"]
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_RecordsArgs = {
  where: Dx_Intl_Records_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Records_By_PkArgs = {
  id: Scalars["Int"]
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_ScoresArgs = {
  where: Dx_Intl_Scores_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Scores_By_PkArgs = {
  id: Scalars["bigint"]
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_SongsArgs = {
  where: Dx_Intl_Songs_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Songs_By_PkArgs = {
  id: Scalars["String"]
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_VariantsArgs = {
  where: Dx_Intl_Variants_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Variants_By_PkArgs = {
  deluxe: Scalars["Boolean"]
  song_id: Scalars["String"]
}

/** mutation root */
export type Mutation_RootDelete_Finale_NotesArgs = {
  where: Finale_Notes_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Finale_Notes_By_PkArgs = {
  difficulty: Scalars["smallint"]
  song_id: Scalars["smallint"]
}

/** mutation root */
export type Mutation_RootDelete_Finale_PlayersArgs = {
  where: Finale_Players_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Finale_Players_By_PkArgs = {
  id: Scalars["Int"]
}

/** mutation root */
export type Mutation_RootDelete_Finale_RecordsArgs = {
  where: Finale_Records_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Finale_Records_By_PkArgs = {
  id: Scalars["Int"]
}

/** mutation root */
export type Mutation_RootDelete_Finale_ScoresArgs = {
  where: Finale_Scores_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Finale_Scores_By_PkArgs = {
  id: Scalars["bigint"]
}

/** mutation root */
export type Mutation_RootDelete_Finale_SongsArgs = {
  where: Finale_Songs_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Finale_Songs_By_PkArgs = {
  id: Scalars["smallint"]
}

/** mutation root */
export type Mutation_RootDelete_TokensArgs = {
  where: Tokens_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Tokens_By_PkArgs = {
  id: Scalars["uuid"]
}

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars["String"]
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_NotesArgs = {
  objects: Array<Dx_Intl_Notes_Insert_Input>
  on_conflict?: InputMaybe<Dx_Intl_Notes_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Notes_OneArgs = {
  object: Dx_Intl_Notes_Insert_Input
  on_conflict?: InputMaybe<Dx_Intl_Notes_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_PlayersArgs = {
  objects: Array<Dx_Intl_Players_Insert_Input>
  on_conflict?: InputMaybe<Dx_Intl_Players_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Players_OneArgs = {
  object: Dx_Intl_Players_Insert_Input
  on_conflict?: InputMaybe<Dx_Intl_Players_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_RecordsArgs = {
  objects: Array<Dx_Intl_Records_Insert_Input>
  on_conflict?: InputMaybe<Dx_Intl_Records_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Records_OneArgs = {
  object: Dx_Intl_Records_Insert_Input
  on_conflict?: InputMaybe<Dx_Intl_Records_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_ScoresArgs = {
  objects: Array<Dx_Intl_Scores_Insert_Input>
  on_conflict?: InputMaybe<Dx_Intl_Scores_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Scores_OneArgs = {
  object: Dx_Intl_Scores_Insert_Input
  on_conflict?: InputMaybe<Dx_Intl_Scores_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_SongsArgs = {
  objects: Array<Dx_Intl_Songs_Insert_Input>
  on_conflict?: InputMaybe<Dx_Intl_Songs_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Songs_OneArgs = {
  object: Dx_Intl_Songs_Insert_Input
  on_conflict?: InputMaybe<Dx_Intl_Songs_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_VariantsArgs = {
  objects: Array<Dx_Intl_Variants_Insert_Input>
  on_conflict?: InputMaybe<Dx_Intl_Variants_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Variants_OneArgs = {
  object: Dx_Intl_Variants_Insert_Input
  on_conflict?: InputMaybe<Dx_Intl_Variants_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_NotesArgs = {
  objects: Array<Finale_Notes_Insert_Input>
  on_conflict?: InputMaybe<Finale_Notes_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_Notes_OneArgs = {
  object: Finale_Notes_Insert_Input
  on_conflict?: InputMaybe<Finale_Notes_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_PlayersArgs = {
  objects: Array<Finale_Players_Insert_Input>
  on_conflict?: InputMaybe<Finale_Players_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_Players_OneArgs = {
  object: Finale_Players_Insert_Input
  on_conflict?: InputMaybe<Finale_Players_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_RecordsArgs = {
  objects: Array<Finale_Records_Insert_Input>
  on_conflict?: InputMaybe<Finale_Records_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_Records_OneArgs = {
  object: Finale_Records_Insert_Input
  on_conflict?: InputMaybe<Finale_Records_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_ScoresArgs = {
  objects: Array<Finale_Scores_Insert_Input>
  on_conflict?: InputMaybe<Finale_Scores_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_Scores_OneArgs = {
  object: Finale_Scores_Insert_Input
  on_conflict?: InputMaybe<Finale_Scores_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_SongsArgs = {
  objects: Array<Finale_Songs_Insert_Input>
  on_conflict?: InputMaybe<Finale_Songs_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Finale_Songs_OneArgs = {
  object: Finale_Songs_Insert_Input
  on_conflict?: InputMaybe<Finale_Songs_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_TokensArgs = {
  objects: Array<Tokens_Insert_Input>
  on_conflict?: InputMaybe<Tokens_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Tokens_OneArgs = {
  object: Tokens_Insert_Input
  on_conflict?: InputMaybe<Tokens_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_NotesArgs = {
  _inc?: InputMaybe<Dx_Intl_Notes_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Notes_Set_Input>
  where: Dx_Intl_Notes_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Notes_By_PkArgs = {
  _inc?: InputMaybe<Dx_Intl_Notes_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Notes_Set_Input>
  pk_columns: Dx_Intl_Notes_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Notes_ManyArgs = {
  updates: Array<Dx_Intl_Notes_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_PlayersArgs = {
  _inc?: InputMaybe<Dx_Intl_Players_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Players_Set_Input>
  where: Dx_Intl_Players_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Players_By_PkArgs = {
  _inc?: InputMaybe<Dx_Intl_Players_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Players_Set_Input>
  pk_columns: Dx_Intl_Players_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Players_ManyArgs = {
  updates: Array<Dx_Intl_Players_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_RecordsArgs = {
  _inc?: InputMaybe<Dx_Intl_Records_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Records_Set_Input>
  where: Dx_Intl_Records_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Records_By_PkArgs = {
  _inc?: InputMaybe<Dx_Intl_Records_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Records_Set_Input>
  pk_columns: Dx_Intl_Records_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Records_ManyArgs = {
  updates: Array<Dx_Intl_Records_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_ScoresArgs = {
  _inc?: InputMaybe<Dx_Intl_Scores_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Scores_Set_Input>
  where: Dx_Intl_Scores_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Scores_By_PkArgs = {
  _inc?: InputMaybe<Dx_Intl_Scores_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Scores_Set_Input>
  pk_columns: Dx_Intl_Scores_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Scores_ManyArgs = {
  updates: Array<Dx_Intl_Scores_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_SongsArgs = {
  _inc?: InputMaybe<Dx_Intl_Songs_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Songs_Set_Input>
  where: Dx_Intl_Songs_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Songs_By_PkArgs = {
  _inc?: InputMaybe<Dx_Intl_Songs_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Songs_Set_Input>
  pk_columns: Dx_Intl_Songs_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Songs_ManyArgs = {
  updates: Array<Dx_Intl_Songs_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_VariantsArgs = {
  _inc?: InputMaybe<Dx_Intl_Variants_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Variants_Set_Input>
  where: Dx_Intl_Variants_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Variants_By_PkArgs = {
  _inc?: InputMaybe<Dx_Intl_Variants_Inc_Input>
  _set?: InputMaybe<Dx_Intl_Variants_Set_Input>
  pk_columns: Dx_Intl_Variants_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Variants_ManyArgs = {
  updates: Array<Dx_Intl_Variants_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Finale_NotesArgs = {
  _inc?: InputMaybe<Finale_Notes_Inc_Input>
  _set?: InputMaybe<Finale_Notes_Set_Input>
  where: Finale_Notes_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Notes_By_PkArgs = {
  _inc?: InputMaybe<Finale_Notes_Inc_Input>
  _set?: InputMaybe<Finale_Notes_Set_Input>
  pk_columns: Finale_Notes_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Notes_ManyArgs = {
  updates: Array<Finale_Notes_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Finale_PlayersArgs = {
  _inc?: InputMaybe<Finale_Players_Inc_Input>
  _set?: InputMaybe<Finale_Players_Set_Input>
  where: Finale_Players_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Players_By_PkArgs = {
  _inc?: InputMaybe<Finale_Players_Inc_Input>
  _set?: InputMaybe<Finale_Players_Set_Input>
  pk_columns: Finale_Players_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Players_ManyArgs = {
  updates: Array<Finale_Players_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Finale_RecordsArgs = {
  _inc?: InputMaybe<Finale_Records_Inc_Input>
  _set?: InputMaybe<Finale_Records_Set_Input>
  where: Finale_Records_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Records_By_PkArgs = {
  _inc?: InputMaybe<Finale_Records_Inc_Input>
  _set?: InputMaybe<Finale_Records_Set_Input>
  pk_columns: Finale_Records_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Records_ManyArgs = {
  updates: Array<Finale_Records_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Finale_ScoresArgs = {
  _inc?: InputMaybe<Finale_Scores_Inc_Input>
  _set?: InputMaybe<Finale_Scores_Set_Input>
  where: Finale_Scores_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Scores_By_PkArgs = {
  _inc?: InputMaybe<Finale_Scores_Inc_Input>
  _set?: InputMaybe<Finale_Scores_Set_Input>
  pk_columns: Finale_Scores_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Scores_ManyArgs = {
  updates: Array<Finale_Scores_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_Finale_SongsArgs = {
  _inc?: InputMaybe<Finale_Songs_Inc_Input>
  _set?: InputMaybe<Finale_Songs_Set_Input>
  where: Finale_Songs_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Songs_By_PkArgs = {
  _inc?: InputMaybe<Finale_Songs_Inc_Input>
  _set?: InputMaybe<Finale_Songs_Set_Input>
  pk_columns: Finale_Songs_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Finale_Songs_ManyArgs = {
  updates: Array<Finale_Songs_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_TokensArgs = {
  _set?: InputMaybe<Tokens_Set_Input>
  where: Tokens_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Tokens_By_PkArgs = {
  _set?: InputMaybe<Tokens_Set_Input>
  pk_columns: Tokens_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Tokens_ManyArgs = {
  updates: Array<Tokens_Updates>
}

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>
  pk_columns: Users_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>
}

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["numeric"]>
  _gt?: InputMaybe<Scalars["numeric"]>
  _gte?: InputMaybe<Scalars["numeric"]>
  _in?: InputMaybe<Array<Scalars["numeric"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["numeric"]>
  _lte?: InputMaybe<Scalars["numeric"]>
  _neq?: InputMaybe<Scalars["numeric"]>
  _nin?: InputMaybe<Array<Scalars["numeric"]>>
}

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

export type Query_Root = {
  __typename?: "query_root"
  /** fetch data from the table: "dx_intl_new_rating_stats" */
  dx_intl_new_rating_stats: Array<Dx_Intl_New_Rating_Stats>
  /** fetch aggregated fields from the table: "dx_intl_new_rating_stats" */
  dx_intl_new_rating_stats_aggregate: Dx_Intl_New_Rating_Stats_Aggregate
  /** An array relationship */
  dx_intl_notes: Array<Dx_Intl_Notes>
  /** An aggregate relationship */
  dx_intl_notes_aggregate: Dx_Intl_Notes_Aggregate
  /** fetch data from the table: "dx_intl_notes" using primary key columns */
  dx_intl_notes_by_pk?: Maybe<Dx_Intl_Notes>
  /** An array relationship */
  dx_intl_players: Array<Dx_Intl_Players>
  /** An aggregate relationship */
  dx_intl_players_aggregate: Dx_Intl_Players_Aggregate
  /** fetch data from the table: "dx_intl_players" using primary key columns */
  dx_intl_players_by_pk?: Maybe<Dx_Intl_Players>
  /** fetch data from the table: "dx_intl_players_timelines" */
  dx_intl_players_timelines: Array<Dx_Intl_Players_Timelines>
  /** fetch aggregated fields from the table: "dx_intl_players_timelines" */
  dx_intl_players_timelines_aggregate: Dx_Intl_Players_Timelines_Aggregate
  /** fetch data from the table: "dx_intl_records" */
  dx_intl_records: Array<Dx_Intl_Records>
  /** fetch aggregated fields from the table: "dx_intl_records" */
  dx_intl_records_aggregate: Dx_Intl_Records_Aggregate
  /** fetch data from the table: "dx_intl_records" using primary key columns */
  dx_intl_records_by_pk?: Maybe<Dx_Intl_Records>
  /** fetch data from the table: "dx_intl_records_with_history" */
  dx_intl_records_with_history: Array<Dx_Intl_Records_With_History>
  /** fetch aggregated fields from the table: "dx_intl_records_with_history" */
  dx_intl_records_with_history_aggregate: Dx_Intl_Records_With_History_Aggregate
  /** An array relationship */
  dx_intl_scores: Array<Dx_Intl_Scores>
  /** An aggregate relationship */
  dx_intl_scores_aggregate: Dx_Intl_Scores_Aggregate
  /** fetch data from the table: "dx_intl_scores" using primary key columns */
  dx_intl_scores_by_pk?: Maybe<Dx_Intl_Scores>
  /** fetch data from the table: "dx_intl_scores_stats" */
  dx_intl_scores_stats: Array<Dx_Intl_Scores_Stats>
  /** fetch aggregated fields from the table: "dx_intl_scores_stats" */
  dx_intl_scores_stats_aggregate: Dx_Intl_Scores_Stats_Aggregate
  /** fetch data from the table: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history: Array<Dx_Intl_Scores_With_History>
  /** fetch aggregated fields from the table: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history_aggregate: Dx_Intl_Scores_With_History_Aggregate
  /** fetch data from the table: "dx_intl_songs" */
  dx_intl_songs: Array<Dx_Intl_Songs>
  /** fetch aggregated fields from the table: "dx_intl_songs" */
  dx_intl_songs_aggregate: Dx_Intl_Songs_Aggregate
  /** fetch data from the table: "dx_intl_songs" using primary key columns */
  dx_intl_songs_by_pk?: Maybe<Dx_Intl_Songs>
  /** An array relationship */
  dx_intl_variants: Array<Dx_Intl_Variants>
  /** An aggregate relationship */
  dx_intl_variants_aggregate: Dx_Intl_Variants_Aggregate
  /** fetch data from the table: "dx_intl_variants" using primary key columns */
  dx_intl_variants_by_pk?: Maybe<Dx_Intl_Variants>
  /** An array relationship */
  finale_notes: Array<Finale_Notes>
  /** An aggregate relationship */
  finale_notes_aggregate: Finale_Notes_Aggregate
  /** fetch data from the table: "finale_notes" using primary key columns */
  finale_notes_by_pk?: Maybe<Finale_Notes>
  /** An array relationship */
  finale_players: Array<Finale_Players>
  /** An aggregate relationship */
  finale_players_aggregate: Finale_Players_Aggregate
  /** fetch data from the table: "finale_players" using primary key columns */
  finale_players_by_pk?: Maybe<Finale_Players>
  /** fetch data from the table: "finale_players_timelines" */
  finale_players_timelines: Array<Finale_Players_Timelines>
  /** fetch aggregated fields from the table: "finale_players_timelines" */
  finale_players_timelines_aggregate: Finale_Players_Timelines_Aggregate
  /** fetch data from the table: "finale_records" */
  finale_records: Array<Finale_Records>
  /** fetch aggregated fields from the table: "finale_records" */
  finale_records_aggregate: Finale_Records_Aggregate
  /** fetch data from the table: "finale_records" using primary key columns */
  finale_records_by_pk?: Maybe<Finale_Records>
  /** fetch data from the table: "finale_records_with_history" */
  finale_records_with_history: Array<Finale_Records_With_History>
  /** fetch aggregated fields from the table: "finale_records_with_history" */
  finale_records_with_history_aggregate: Finale_Records_With_History_Aggregate
  /** An array relationship */
  finale_scores: Array<Finale_Scores>
  /** An aggregate relationship */
  finale_scores_aggregate: Finale_Scores_Aggregate
  /** fetch data from the table: "finale_scores" using primary key columns */
  finale_scores_by_pk?: Maybe<Finale_Scores>
  /** fetch data from the table: "finale_scores_with_history" */
  finale_scores_with_history: Array<Finale_Scores_With_History>
  /** fetch aggregated fields from the table: "finale_scores_with_history" */
  finale_scores_with_history_aggregate: Finale_Scores_With_History_Aggregate
  /** fetch data from the table: "finale_songs" */
  finale_songs: Array<Finale_Songs>
  /** fetch aggregated fields from the table: "finale_songs" */
  finale_songs_aggregate: Finale_Songs_Aggregate
  /** fetch data from the table: "finale_songs" using primary key columns */
  finale_songs_by_pk?: Maybe<Finale_Songs>
  /** fetch data from the table: "tokens" */
  tokens: Array<Tokens>
  /** fetch aggregated fields from the table: "tokens" */
  tokens_aggregate: Tokens_Aggregate
  /** fetch data from the table: "tokens" using primary key columns */
  tokens_by_pk?: Maybe<Tokens>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

export type Query_RootDx_Intl_New_Rating_StatsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Order_By>>
  where?: InputMaybe<Dx_Intl_New_Rating_Stats_Bool_Exp>
}

export type Query_RootDx_Intl_New_Rating_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Order_By>>
  where?: InputMaybe<Dx_Intl_New_Rating_Stats_Bool_Exp>
}

export type Query_RootDx_Intl_NotesArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Notes_Order_By>>
  where?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
}

export type Query_RootDx_Intl_Notes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Notes_Order_By>>
  where?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
}

export type Query_RootDx_Intl_Notes_By_PkArgs = {
  deluxe: Scalars["Boolean"]
  difficulty: Scalars["smallint"]
  song_id: Scalars["String"]
}

export type Query_RootDx_Intl_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Bool_Exp>
}

export type Query_RootDx_Intl_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Bool_Exp>
}

export type Query_RootDx_Intl_Players_By_PkArgs = {
  id: Scalars["Int"]
}

export type Query_RootDx_Intl_Players_TimelinesArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Timelines_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Timelines_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Timelines_Bool_Exp>
}

export type Query_RootDx_Intl_Players_Timelines_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Timelines_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Timelines_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Timelines_Bool_Exp>
}

export type Query_RootDx_Intl_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Records_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Records_Order_By>>
  where?: InputMaybe<Dx_Intl_Records_Bool_Exp>
}

export type Query_RootDx_Intl_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Records_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Records_Order_By>>
  where?: InputMaybe<Dx_Intl_Records_Bool_Exp>
}

export type Query_RootDx_Intl_Records_By_PkArgs = {
  id: Scalars["Int"]
}

export type Query_RootDx_Intl_Records_With_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Records_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Records_With_History_Order_By>>
  where?: InputMaybe<Dx_Intl_Records_With_History_Bool_Exp>
}

export type Query_RootDx_Intl_Records_With_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Records_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Records_With_History_Order_By>>
  where?: InputMaybe<Dx_Intl_Records_With_History_Bool_Exp>
}

export type Query_RootDx_Intl_ScoresArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

export type Query_RootDx_Intl_Scores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

export type Query_RootDx_Intl_Scores_By_PkArgs = {
  id: Scalars["bigint"]
}

export type Query_RootDx_Intl_Scores_StatsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Stats_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Stats_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Stats_Bool_Exp>
}

export type Query_RootDx_Intl_Scores_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Stats_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Stats_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Stats_Bool_Exp>
}

export type Query_RootDx_Intl_Scores_With_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_With_History_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_With_History_Bool_Exp>
}

export type Query_RootDx_Intl_Scores_With_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_With_History_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_With_History_Bool_Exp>
}

export type Query_RootDx_Intl_SongsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Songs_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Songs_Order_By>>
  where?: InputMaybe<Dx_Intl_Songs_Bool_Exp>
}

export type Query_RootDx_Intl_Songs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Songs_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Songs_Order_By>>
  where?: InputMaybe<Dx_Intl_Songs_Bool_Exp>
}

export type Query_RootDx_Intl_Songs_By_PkArgs = {
  id: Scalars["String"]
}

export type Query_RootDx_Intl_VariantsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Variants_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Variants_Order_By>>
  where?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
}

export type Query_RootDx_Intl_Variants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Variants_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Variants_Order_By>>
  where?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
}

export type Query_RootDx_Intl_Variants_By_PkArgs = {
  deluxe: Scalars["Boolean"]
  song_id: Scalars["String"]
}

export type Query_RootFinale_NotesArgs = {
  distinct_on?: InputMaybe<Array<Finale_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Notes_Order_By>>
  where?: InputMaybe<Finale_Notes_Bool_Exp>
}

export type Query_RootFinale_Notes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Notes_Order_By>>
  where?: InputMaybe<Finale_Notes_Bool_Exp>
}

export type Query_RootFinale_Notes_By_PkArgs = {
  difficulty: Scalars["smallint"]
  song_id: Scalars["smallint"]
}

export type Query_RootFinale_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Order_By>>
  where?: InputMaybe<Finale_Players_Bool_Exp>
}

export type Query_RootFinale_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Order_By>>
  where?: InputMaybe<Finale_Players_Bool_Exp>
}

export type Query_RootFinale_Players_By_PkArgs = {
  id: Scalars["Int"]
}

export type Query_RootFinale_Players_TimelinesArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Timelines_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Timelines_Order_By>>
  where?: InputMaybe<Finale_Players_Timelines_Bool_Exp>
}

export type Query_RootFinale_Players_Timelines_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Timelines_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Timelines_Order_By>>
  where?: InputMaybe<Finale_Players_Timelines_Bool_Exp>
}

export type Query_RootFinale_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Finale_Records_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Records_Order_By>>
  where?: InputMaybe<Finale_Records_Bool_Exp>
}

export type Query_RootFinale_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Records_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Records_Order_By>>
  where?: InputMaybe<Finale_Records_Bool_Exp>
}

export type Query_RootFinale_Records_By_PkArgs = {
  id: Scalars["Int"]
}

export type Query_RootFinale_Records_With_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Finale_Records_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Records_With_History_Order_By>>
  where?: InputMaybe<Finale_Records_With_History_Bool_Exp>
}

export type Query_RootFinale_Records_With_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Records_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Records_With_History_Order_By>>
  where?: InputMaybe<Finale_Records_With_History_Bool_Exp>
}

export type Query_RootFinale_ScoresArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_Order_By>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

export type Query_RootFinale_Scores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_Order_By>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

export type Query_RootFinale_Scores_By_PkArgs = {
  id: Scalars["bigint"]
}

export type Query_RootFinale_Scores_With_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_With_History_Order_By>>
  where?: InputMaybe<Finale_Scores_With_History_Bool_Exp>
}

export type Query_RootFinale_Scores_With_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_With_History_Order_By>>
  where?: InputMaybe<Finale_Scores_With_History_Bool_Exp>
}

export type Query_RootFinale_SongsArgs = {
  distinct_on?: InputMaybe<Array<Finale_Songs_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Songs_Order_By>>
  where?: InputMaybe<Finale_Songs_Bool_Exp>
}

export type Query_RootFinale_Songs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Songs_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Songs_Order_By>>
  where?: InputMaybe<Finale_Songs_Bool_Exp>
}

export type Query_RootFinale_Songs_By_PkArgs = {
  id: Scalars["smallint"]
}

export type Query_RootTokensArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Tokens_Order_By>>
  where?: InputMaybe<Tokens_Bool_Exp>
}

export type Query_RootTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Tokens_Order_By>>
  where?: InputMaybe<Tokens_Bool_Exp>
}

export type Query_RootTokens_By_PkArgs = {
  id: Scalars["uuid"]
}

export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Query_RootUsers_By_PkArgs = {
  id: Scalars["String"]
}

/** Boolean expression to compare columns of type "smallint". All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["smallint"]>
  _gt?: InputMaybe<Scalars["smallint"]>
  _gte?: InputMaybe<Scalars["smallint"]>
  _in?: InputMaybe<Array<Scalars["smallint"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["smallint"]>
  _lte?: InputMaybe<Scalars["smallint"]>
  _neq?: InputMaybe<Scalars["smallint"]>
  _nin?: InputMaybe<Array<Scalars["smallint"]>>
}

export type Subscription_Root = {
  __typename?: "subscription_root"
  /** fetch data from the table: "dx_intl_new_rating_stats" */
  dx_intl_new_rating_stats: Array<Dx_Intl_New_Rating_Stats>
  /** fetch aggregated fields from the table: "dx_intl_new_rating_stats" */
  dx_intl_new_rating_stats_aggregate: Dx_Intl_New_Rating_Stats_Aggregate
  /** fetch data from the table in a streaming manner: "dx_intl_new_rating_stats" */
  dx_intl_new_rating_stats_stream: Array<Dx_Intl_New_Rating_Stats>
  /** An array relationship */
  dx_intl_notes: Array<Dx_Intl_Notes>
  /** An aggregate relationship */
  dx_intl_notes_aggregate: Dx_Intl_Notes_Aggregate
  /** fetch data from the table: "dx_intl_notes" using primary key columns */
  dx_intl_notes_by_pk?: Maybe<Dx_Intl_Notes>
  /** fetch data from the table in a streaming manner: "dx_intl_notes" */
  dx_intl_notes_stream: Array<Dx_Intl_Notes>
  /** An array relationship */
  dx_intl_players: Array<Dx_Intl_Players>
  /** An aggregate relationship */
  dx_intl_players_aggregate: Dx_Intl_Players_Aggregate
  /** fetch data from the table: "dx_intl_players" using primary key columns */
  dx_intl_players_by_pk?: Maybe<Dx_Intl_Players>
  /** fetch data from the table in a streaming manner: "dx_intl_players" */
  dx_intl_players_stream: Array<Dx_Intl_Players>
  /** fetch data from the table: "dx_intl_players_timelines" */
  dx_intl_players_timelines: Array<Dx_Intl_Players_Timelines>
  /** fetch aggregated fields from the table: "dx_intl_players_timelines" */
  dx_intl_players_timelines_aggregate: Dx_Intl_Players_Timelines_Aggregate
  /** fetch data from the table in a streaming manner: "dx_intl_players_timelines" */
  dx_intl_players_timelines_stream: Array<Dx_Intl_Players_Timelines>
  /** fetch data from the table: "dx_intl_records" */
  dx_intl_records: Array<Dx_Intl_Records>
  /** fetch aggregated fields from the table: "dx_intl_records" */
  dx_intl_records_aggregate: Dx_Intl_Records_Aggregate
  /** fetch data from the table: "dx_intl_records" using primary key columns */
  dx_intl_records_by_pk?: Maybe<Dx_Intl_Records>
  /** fetch data from the table in a streaming manner: "dx_intl_records" */
  dx_intl_records_stream: Array<Dx_Intl_Records>
  /** fetch data from the table: "dx_intl_records_with_history" */
  dx_intl_records_with_history: Array<Dx_Intl_Records_With_History>
  /** fetch aggregated fields from the table: "dx_intl_records_with_history" */
  dx_intl_records_with_history_aggregate: Dx_Intl_Records_With_History_Aggregate
  /** fetch data from the table in a streaming manner: "dx_intl_records_with_history" */
  dx_intl_records_with_history_stream: Array<Dx_Intl_Records_With_History>
  /** An array relationship */
  dx_intl_scores: Array<Dx_Intl_Scores>
  /** An aggregate relationship */
  dx_intl_scores_aggregate: Dx_Intl_Scores_Aggregate
  /** fetch data from the table: "dx_intl_scores" using primary key columns */
  dx_intl_scores_by_pk?: Maybe<Dx_Intl_Scores>
  /** fetch data from the table: "dx_intl_scores_stats" */
  dx_intl_scores_stats: Array<Dx_Intl_Scores_Stats>
  /** fetch aggregated fields from the table: "dx_intl_scores_stats" */
  dx_intl_scores_stats_aggregate: Dx_Intl_Scores_Stats_Aggregate
  /** fetch data from the table in a streaming manner: "dx_intl_scores_stats" */
  dx_intl_scores_stats_stream: Array<Dx_Intl_Scores_Stats>
  /** fetch data from the table in a streaming manner: "dx_intl_scores" */
  dx_intl_scores_stream: Array<Dx_Intl_Scores>
  /** fetch data from the table: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history: Array<Dx_Intl_Scores_With_History>
  /** fetch aggregated fields from the table: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history_aggregate: Dx_Intl_Scores_With_History_Aggregate
  /** fetch data from the table in a streaming manner: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history_stream: Array<Dx_Intl_Scores_With_History>
  /** fetch data from the table: "dx_intl_songs" */
  dx_intl_songs: Array<Dx_Intl_Songs>
  /** fetch aggregated fields from the table: "dx_intl_songs" */
  dx_intl_songs_aggregate: Dx_Intl_Songs_Aggregate
  /** fetch data from the table: "dx_intl_songs" using primary key columns */
  dx_intl_songs_by_pk?: Maybe<Dx_Intl_Songs>
  /** fetch data from the table in a streaming manner: "dx_intl_songs" */
  dx_intl_songs_stream: Array<Dx_Intl_Songs>
  /** An array relationship */
  dx_intl_variants: Array<Dx_Intl_Variants>
  /** An aggregate relationship */
  dx_intl_variants_aggregate: Dx_Intl_Variants_Aggregate
  /** fetch data from the table: "dx_intl_variants" using primary key columns */
  dx_intl_variants_by_pk?: Maybe<Dx_Intl_Variants>
  /** fetch data from the table in a streaming manner: "dx_intl_variants" */
  dx_intl_variants_stream: Array<Dx_Intl_Variants>
  /** An array relationship */
  finale_notes: Array<Finale_Notes>
  /** An aggregate relationship */
  finale_notes_aggregate: Finale_Notes_Aggregate
  /** fetch data from the table: "finale_notes" using primary key columns */
  finale_notes_by_pk?: Maybe<Finale_Notes>
  /** fetch data from the table in a streaming manner: "finale_notes" */
  finale_notes_stream: Array<Finale_Notes>
  /** An array relationship */
  finale_players: Array<Finale_Players>
  /** An aggregate relationship */
  finale_players_aggregate: Finale_Players_Aggregate
  /** fetch data from the table: "finale_players" using primary key columns */
  finale_players_by_pk?: Maybe<Finale_Players>
  /** fetch data from the table in a streaming manner: "finale_players" */
  finale_players_stream: Array<Finale_Players>
  /** fetch data from the table: "finale_players_timelines" */
  finale_players_timelines: Array<Finale_Players_Timelines>
  /** fetch aggregated fields from the table: "finale_players_timelines" */
  finale_players_timelines_aggregate: Finale_Players_Timelines_Aggregate
  /** fetch data from the table in a streaming manner: "finale_players_timelines" */
  finale_players_timelines_stream: Array<Finale_Players_Timelines>
  /** fetch data from the table: "finale_records" */
  finale_records: Array<Finale_Records>
  /** fetch aggregated fields from the table: "finale_records" */
  finale_records_aggregate: Finale_Records_Aggregate
  /** fetch data from the table: "finale_records" using primary key columns */
  finale_records_by_pk?: Maybe<Finale_Records>
  /** fetch data from the table in a streaming manner: "finale_records" */
  finale_records_stream: Array<Finale_Records>
  /** fetch data from the table: "finale_records_with_history" */
  finale_records_with_history: Array<Finale_Records_With_History>
  /** fetch aggregated fields from the table: "finale_records_with_history" */
  finale_records_with_history_aggregate: Finale_Records_With_History_Aggregate
  /** fetch data from the table in a streaming manner: "finale_records_with_history" */
  finale_records_with_history_stream: Array<Finale_Records_With_History>
  /** An array relationship */
  finale_scores: Array<Finale_Scores>
  /** An aggregate relationship */
  finale_scores_aggregate: Finale_Scores_Aggregate
  /** fetch data from the table: "finale_scores" using primary key columns */
  finale_scores_by_pk?: Maybe<Finale_Scores>
  /** fetch data from the table in a streaming manner: "finale_scores" */
  finale_scores_stream: Array<Finale_Scores>
  /** fetch data from the table: "finale_scores_with_history" */
  finale_scores_with_history: Array<Finale_Scores_With_History>
  /** fetch aggregated fields from the table: "finale_scores_with_history" */
  finale_scores_with_history_aggregate: Finale_Scores_With_History_Aggregate
  /** fetch data from the table in a streaming manner: "finale_scores_with_history" */
  finale_scores_with_history_stream: Array<Finale_Scores_With_History>
  /** fetch data from the table: "finale_songs" */
  finale_songs: Array<Finale_Songs>
  /** fetch aggregated fields from the table: "finale_songs" */
  finale_songs_aggregate: Finale_Songs_Aggregate
  /** fetch data from the table: "finale_songs" using primary key columns */
  finale_songs_by_pk?: Maybe<Finale_Songs>
  /** fetch data from the table in a streaming manner: "finale_songs" */
  finale_songs_stream: Array<Finale_Songs>
  /** fetch data from the table: "tokens" */
  tokens: Array<Tokens>
  /** fetch aggregated fields from the table: "tokens" */
  tokens_aggregate: Tokens_Aggregate
  /** fetch data from the table: "tokens" using primary key columns */
  tokens_by_pk?: Maybe<Tokens>
  /** fetch data from the table in a streaming manner: "tokens" */
  tokens_stream: Array<Tokens>
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>
}

export type Subscription_RootDx_Intl_New_Rating_StatsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Order_By>>
  where?: InputMaybe<Dx_Intl_New_Rating_Stats_Bool_Exp>
}

export type Subscription_RootDx_Intl_New_Rating_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_New_Rating_Stats_Order_By>>
  where?: InputMaybe<Dx_Intl_New_Rating_Stats_Bool_Exp>
}

export type Subscription_RootDx_Intl_New_Rating_Stats_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_New_Rating_Stats_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_New_Rating_Stats_Bool_Exp>
}

export type Subscription_RootDx_Intl_NotesArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Notes_Order_By>>
  where?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
}

export type Subscription_RootDx_Intl_Notes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Notes_Order_By>>
  where?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
}

export type Subscription_RootDx_Intl_Notes_By_PkArgs = {
  deluxe: Scalars["Boolean"]
  difficulty: Scalars["smallint"]
  song_id: Scalars["String"]
}

export type Subscription_RootDx_Intl_Notes_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Notes_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Notes_Bool_Exp>
}

export type Subscription_RootDx_Intl_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Bool_Exp>
}

export type Subscription_RootDx_Intl_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Bool_Exp>
}

export type Subscription_RootDx_Intl_Players_By_PkArgs = {
  id: Scalars["Int"]
}

export type Subscription_RootDx_Intl_Players_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Players_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Players_Bool_Exp>
}

export type Subscription_RootDx_Intl_Players_TimelinesArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Timelines_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Timelines_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Timelines_Bool_Exp>
}

export type Subscription_RootDx_Intl_Players_Timelines_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Timelines_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Timelines_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Timelines_Bool_Exp>
}

export type Subscription_RootDx_Intl_Players_Timelines_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Players_Timelines_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Players_Timelines_Bool_Exp>
}

export type Subscription_RootDx_Intl_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Records_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Records_Order_By>>
  where?: InputMaybe<Dx_Intl_Records_Bool_Exp>
}

export type Subscription_RootDx_Intl_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Records_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Records_Order_By>>
  where?: InputMaybe<Dx_Intl_Records_Bool_Exp>
}

export type Subscription_RootDx_Intl_Records_By_PkArgs = {
  id: Scalars["Int"]
}

export type Subscription_RootDx_Intl_Records_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Records_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Records_Bool_Exp>
}

export type Subscription_RootDx_Intl_Records_With_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Records_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Records_With_History_Order_By>>
  where?: InputMaybe<Dx_Intl_Records_With_History_Bool_Exp>
}

export type Subscription_RootDx_Intl_Records_With_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Records_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Records_With_History_Order_By>>
  where?: InputMaybe<Dx_Intl_Records_With_History_Bool_Exp>
}

export type Subscription_RootDx_Intl_Records_With_History_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Records_With_History_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Records_With_History_Bool_Exp>
}

export type Subscription_RootDx_Intl_ScoresArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

export type Subscription_RootDx_Intl_Scores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

export type Subscription_RootDx_Intl_Scores_By_PkArgs = {
  id: Scalars["bigint"]
}

export type Subscription_RootDx_Intl_Scores_StatsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Stats_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Stats_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Stats_Bool_Exp>
}

export type Subscription_RootDx_Intl_Scores_Stats_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_Stats_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_Stats_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_Stats_Bool_Exp>
}

export type Subscription_RootDx_Intl_Scores_Stats_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Scores_Stats_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Scores_Stats_Bool_Exp>
}

export type Subscription_RootDx_Intl_Scores_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Scores_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Scores_Bool_Exp>
}

export type Subscription_RootDx_Intl_Scores_With_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_With_History_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_With_History_Bool_Exp>
}

export type Subscription_RootDx_Intl_Scores_With_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Scores_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Scores_With_History_Order_By>>
  where?: InputMaybe<Dx_Intl_Scores_With_History_Bool_Exp>
}

export type Subscription_RootDx_Intl_Scores_With_History_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Scores_With_History_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Scores_With_History_Bool_Exp>
}

export type Subscription_RootDx_Intl_SongsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Songs_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Songs_Order_By>>
  where?: InputMaybe<Dx_Intl_Songs_Bool_Exp>
}

export type Subscription_RootDx_Intl_Songs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Songs_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Songs_Order_By>>
  where?: InputMaybe<Dx_Intl_Songs_Bool_Exp>
}

export type Subscription_RootDx_Intl_Songs_By_PkArgs = {
  id: Scalars["String"]
}

export type Subscription_RootDx_Intl_Songs_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Songs_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Songs_Bool_Exp>
}

export type Subscription_RootDx_Intl_VariantsArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Variants_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Variants_Order_By>>
  where?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
}

export type Subscription_RootDx_Intl_Variants_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Variants_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Variants_Order_By>>
  where?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
}

export type Subscription_RootDx_Intl_Variants_By_PkArgs = {
  deluxe: Scalars["Boolean"]
  song_id: Scalars["String"]
}

export type Subscription_RootDx_Intl_Variants_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Dx_Intl_Variants_Stream_Cursor_Input>>
  where?: InputMaybe<Dx_Intl_Variants_Bool_Exp>
}

export type Subscription_RootFinale_NotesArgs = {
  distinct_on?: InputMaybe<Array<Finale_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Notes_Order_By>>
  where?: InputMaybe<Finale_Notes_Bool_Exp>
}

export type Subscription_RootFinale_Notes_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Notes_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Notes_Order_By>>
  where?: InputMaybe<Finale_Notes_Bool_Exp>
}

export type Subscription_RootFinale_Notes_By_PkArgs = {
  difficulty: Scalars["smallint"]
  song_id: Scalars["smallint"]
}

export type Subscription_RootFinale_Notes_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Finale_Notes_Stream_Cursor_Input>>
  where?: InputMaybe<Finale_Notes_Bool_Exp>
}

export type Subscription_RootFinale_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Order_By>>
  where?: InputMaybe<Finale_Players_Bool_Exp>
}

export type Subscription_RootFinale_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Order_By>>
  where?: InputMaybe<Finale_Players_Bool_Exp>
}

export type Subscription_RootFinale_Players_By_PkArgs = {
  id: Scalars["Int"]
}

export type Subscription_RootFinale_Players_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Finale_Players_Stream_Cursor_Input>>
  where?: InputMaybe<Finale_Players_Bool_Exp>
}

export type Subscription_RootFinale_Players_TimelinesArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Timelines_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Timelines_Order_By>>
  where?: InputMaybe<Finale_Players_Timelines_Bool_Exp>
}

export type Subscription_RootFinale_Players_Timelines_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Timelines_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Timelines_Order_By>>
  where?: InputMaybe<Finale_Players_Timelines_Bool_Exp>
}

export type Subscription_RootFinale_Players_Timelines_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Finale_Players_Timelines_Stream_Cursor_Input>>
  where?: InputMaybe<Finale_Players_Timelines_Bool_Exp>
}

export type Subscription_RootFinale_RecordsArgs = {
  distinct_on?: InputMaybe<Array<Finale_Records_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Records_Order_By>>
  where?: InputMaybe<Finale_Records_Bool_Exp>
}

export type Subscription_RootFinale_Records_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Records_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Records_Order_By>>
  where?: InputMaybe<Finale_Records_Bool_Exp>
}

export type Subscription_RootFinale_Records_By_PkArgs = {
  id: Scalars["Int"]
}

export type Subscription_RootFinale_Records_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Finale_Records_Stream_Cursor_Input>>
  where?: InputMaybe<Finale_Records_Bool_Exp>
}

export type Subscription_RootFinale_Records_With_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Finale_Records_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Records_With_History_Order_By>>
  where?: InputMaybe<Finale_Records_With_History_Bool_Exp>
}

export type Subscription_RootFinale_Records_With_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Records_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Records_With_History_Order_By>>
  where?: InputMaybe<Finale_Records_With_History_Bool_Exp>
}

export type Subscription_RootFinale_Records_With_History_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Finale_Records_With_History_Stream_Cursor_Input>>
  where?: InputMaybe<Finale_Records_With_History_Bool_Exp>
}

export type Subscription_RootFinale_ScoresArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_Order_By>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

export type Subscription_RootFinale_Scores_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_Order_By>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

export type Subscription_RootFinale_Scores_By_PkArgs = {
  id: Scalars["bigint"]
}

export type Subscription_RootFinale_Scores_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Finale_Scores_Stream_Cursor_Input>>
  where?: InputMaybe<Finale_Scores_Bool_Exp>
}

export type Subscription_RootFinale_Scores_With_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_With_History_Order_By>>
  where?: InputMaybe<Finale_Scores_With_History_Bool_Exp>
}

export type Subscription_RootFinale_Scores_With_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Scores_With_History_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Scores_With_History_Order_By>>
  where?: InputMaybe<Finale_Scores_With_History_Bool_Exp>
}

export type Subscription_RootFinale_Scores_With_History_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Finale_Scores_With_History_Stream_Cursor_Input>>
  where?: InputMaybe<Finale_Scores_With_History_Bool_Exp>
}

export type Subscription_RootFinale_SongsArgs = {
  distinct_on?: InputMaybe<Array<Finale_Songs_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Songs_Order_By>>
  where?: InputMaybe<Finale_Songs_Bool_Exp>
}

export type Subscription_RootFinale_Songs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Songs_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Songs_Order_By>>
  where?: InputMaybe<Finale_Songs_Bool_Exp>
}

export type Subscription_RootFinale_Songs_By_PkArgs = {
  id: Scalars["smallint"]
}

export type Subscription_RootFinale_Songs_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Finale_Songs_Stream_Cursor_Input>>
  where?: InputMaybe<Finale_Songs_Bool_Exp>
}

export type Subscription_RootTokensArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Tokens_Order_By>>
  where?: InputMaybe<Tokens_Bool_Exp>
}

export type Subscription_RootTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Tokens_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Tokens_Order_By>>
  where?: InputMaybe<Tokens_Bool_Exp>
}

export type Subscription_RootTokens_By_PkArgs = {
  id: Scalars["uuid"]
}

export type Subscription_RootTokens_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Tokens_Stream_Cursor_Input>>
  where?: InputMaybe<Tokens_Bool_Exp>
}

export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Users_Order_By>>
  where?: InputMaybe<Users_Bool_Exp>
}

export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars["String"]
}

export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars["Int"]
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>
  where?: InputMaybe<Users_Bool_Exp>
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["timestamptz"]>
  _gt?: InputMaybe<Scalars["timestamptz"]>
  _gte?: InputMaybe<Scalars["timestamptz"]>
  _in?: InputMaybe<Array<Scalars["timestamptz"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["timestamptz"]>
  _lte?: InputMaybe<Scalars["timestamptz"]>
  _neq?: InputMaybe<Scalars["timestamptz"]>
  _nin?: InputMaybe<Array<Scalars["timestamptz"]>>
}

/** columns and relationships of "tokens" */
export type Tokens = {
  __typename?: "tokens"
  created_at: Scalars["timestamptz"]
  id: Scalars["uuid"]
  /** An object relationship */
  user: Users
  user_id: Scalars["String"]
}

/** aggregated selection of "tokens" */
export type Tokens_Aggregate = {
  __typename?: "tokens_aggregate"
  aggregate?: Maybe<Tokens_Aggregate_Fields>
  nodes: Array<Tokens>
}

/** aggregate fields of "tokens" */
export type Tokens_Aggregate_Fields = {
  __typename?: "tokens_aggregate_fields"
  count: Scalars["Int"]
  max?: Maybe<Tokens_Max_Fields>
  min?: Maybe<Tokens_Min_Fields>
}

/** aggregate fields of "tokens" */
export type Tokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Tokens_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** Boolean expression to filter rows from the table "tokens". All fields are combined with a logical 'AND'. */
export type Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<Tokens_Bool_Exp>>
  _not?: InputMaybe<Tokens_Bool_Exp>
  _or?: InputMaybe<Array<Tokens_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  id?: InputMaybe<Uuid_Comparison_Exp>
  user?: InputMaybe<Users_Bool_Exp>
  user_id?: InputMaybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "tokens" */
export enum Tokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  TokensPkey = "tokens_pkey",
  /** unique or primary key constraint on columns "user_id" */
  TokensUserIdKey = "tokens_user_id_key",
}

/** input type for inserting data into table "tokens" */
export type Tokens_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["uuid"]>
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>
  user_id?: InputMaybe<Scalars["String"]>
}

/** aggregate max on columns */
export type Tokens_Max_Fields = {
  __typename?: "tokens_max_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["uuid"]>
  user_id?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Tokens_Min_Fields = {
  __typename?: "tokens_min_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["uuid"]>
  user_id?: Maybe<Scalars["String"]>
}

/** response of any mutation on the table "tokens" */
export type Tokens_Mutation_Response = {
  __typename?: "tokens_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Tokens>
}

/** input type for inserting object relation for remote table "tokens" */
export type Tokens_Obj_Rel_Insert_Input = {
  data: Tokens_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Tokens_On_Conflict>
}

/** on_conflict condition type for table "tokens" */
export type Tokens_On_Conflict = {
  constraint: Tokens_Constraint
  update_columns?: Array<Tokens_Update_Column>
  where?: InputMaybe<Tokens_Bool_Exp>
}

/** Ordering options when selecting data from "tokens". */
export type Tokens_Order_By = {
  created_at?: InputMaybe<Order_By>
  id?: InputMaybe<Order_By>
  user?: InputMaybe<Users_Order_By>
  user_id?: InputMaybe<Order_By>
}

/** primary key columns input for table: tokens */
export type Tokens_Pk_Columns_Input = {
  id: Scalars["uuid"]
}

/** select columns of table "tokens" */
export enum Tokens_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  UserId = "user_id",
}

/** input type for updating data in table "tokens" */
export type Tokens_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["uuid"]>
  user_id?: InputMaybe<Scalars["String"]>
}

/** Streaming cursor of the table "tokens" */
export type Tokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Tokens_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Tokens_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["uuid"]>
  user_id?: InputMaybe<Scalars["String"]>
}

/** update columns of table "tokens" */
export enum Tokens_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
  /** column name */
  UserId = "user_id",
}

export type Tokens_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Tokens_Set_Input>
  where: Tokens_Bool_Exp
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: "users"
  created_at: Scalars["timestamptz"]
  /** An array relationship */
  dx_intl_players: Array<Dx_Intl_Players>
  /** An aggregate relationship */
  dx_intl_players_aggregate: Dx_Intl_Players_Aggregate
  /** An array relationship */
  finale_players: Array<Finale_Players>
  /** An aggregate relationship */
  finale_players_aggregate: Finale_Players_Aggregate
  id: Scalars["String"]
  /** An object relationship */
  token?: Maybe<Tokens>
}

/** columns and relationships of "users" */
export type UsersDx_Intl_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersDx_Intl_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dx_Intl_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Dx_Intl_Players_Order_By>>
  where?: InputMaybe<Dx_Intl_Players_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersFinale_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Order_By>>
  where?: InputMaybe<Finale_Players_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersFinale_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Finale_Players_Select_Column>>
  limit?: InputMaybe<Scalars["Int"]>
  offset?: InputMaybe<Scalars["Int"]>
  order_by?: InputMaybe<Array<Finale_Players_Order_By>>
  where?: InputMaybe<Finale_Players_Bool_Exp>
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: "users_aggregate"
  aggregate?: Maybe<Users_Aggregate_Fields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: "users_aggregate_fields"
  count: Scalars["Int"]
  max?: Maybe<Users_Max_Fields>
  min?: Maybe<Users_Min_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>
  distinct?: InputMaybe<Scalars["Boolean"]>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>
  _not?: InputMaybe<Users_Bool_Exp>
  _or?: InputMaybe<Array<Users_Bool_Exp>>
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>
  dx_intl_players?: InputMaybe<Dx_Intl_Players_Bool_Exp>
  dx_intl_players_aggregate?: InputMaybe<Dx_Intl_Players_Aggregate_Bool_Exp>
  finale_players?: InputMaybe<Finale_Players_Bool_Exp>
  finale_players_aggregate?: InputMaybe<Finale_Players_Aggregate_Bool_Exp>
  id?: InputMaybe<String_Comparison_Exp>
  token?: InputMaybe<Tokens_Bool_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "id" */
  UsersPkey = "users_pkey",
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  dx_intl_players?: InputMaybe<Dx_Intl_Players_Arr_Rel_Insert_Input>
  finale_players?: InputMaybe<Finale_Players_Arr_Rel_Insert_Input>
  id?: InputMaybe<Scalars["String"]>
  token?: InputMaybe<Tokens_Obj_Rel_Insert_Input>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: "users_max_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["String"]>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: "users_min_fields"
  created_at?: Maybe<Scalars["timestamptz"]>
  id?: Maybe<Scalars["String"]>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: "users_mutation_response"
  /** number of rows affected by the mutation */
  affected_rows: Scalars["Int"]
  /** data from the rows affected by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>
}

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns?: Array<Users_Update_Column>
  where?: InputMaybe<Users_Bool_Exp>
}

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: InputMaybe<Order_By>
  dx_intl_players_aggregate?: InputMaybe<Dx_Intl_Players_Aggregate_Order_By>
  finale_players_aggregate?: InputMaybe<Finale_Players_Aggregate_Order_By>
  id?: InputMaybe<Order_By>
  token?: InputMaybe<Tokens_Order_By>
}

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars["String"]
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["String"]>
}

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>
}

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars["timestamptz"]>
  id?: InputMaybe<Scalars["String"]>
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = "created_at",
  /** column name */
  Id = "id",
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["uuid"]>
  _gt?: InputMaybe<Scalars["uuid"]>
  _gte?: InputMaybe<Scalars["uuid"]>
  _in?: InputMaybe<Array<Scalars["uuid"]>>
  _is_null?: InputMaybe<Scalars["Boolean"]>
  _lt?: InputMaybe<Scalars["uuid"]>
  _lte?: InputMaybe<Scalars["uuid"]>
  _neq?: InputMaybe<Scalars["uuid"]>
  _nin?: InputMaybe<Array<Scalars["uuid"]>>
}

export type DxIntlPlayersFieldsFragment = {
  __typename?: "dx_intl_players"
  id: number
  nickname: string
  private: boolean
  created_at: string
  updated_at?: string | null
  dx_intl_record?: {
    __typename?: "dx_intl_records"
    card_name: string
    rating: number
    grade?: number | null
    course_rank?: number | null
    class_rank?: number | null
  } | null
}

export type DxIntlPlayersForUserQueryVariables = Exact<{
  userId: Scalars["String"]
}>

export type DxIntlPlayersForUserQuery = {
  __typename?: "query_root"
  dx_intl_players: Array<{
    __typename?: "dx_intl_players"
    id: number
    nickname: string
    private: boolean
    created_at: string
    updated_at?: string | null
    dx_intl_record?: {
      __typename?: "dx_intl_records"
      card_name: string
      rating: number
      grade?: number | null
      course_rank?: number | null
      class_rank?: number | null
    } | null
  }>
}

export type DxIntlPlayersWithKeywordAnonymousQueryVariables = Exact<{
  nickname_like: Scalars["String"]
}>

export type DxIntlPlayersWithKeywordAnonymousQuery = {
  __typename?: "query_root"
  other_players: Array<{
    __typename?: "dx_intl_players"
    id: number
    nickname: string
    private: boolean
    created_at: string
    updated_at?: string | null
    dx_intl_record?: {
      __typename?: "dx_intl_records"
      card_name: string
      rating: number
      grade?: number | null
      course_rank?: number | null
      class_rank?: number | null
    } | null
  }>
}

export type DxIntlPlayersWithKeywordUserQueryVariables = Exact<{
  userId: Scalars["String"]
  nickname_like: Scalars["String"]
}>

export type DxIntlPlayersWithKeywordUserQuery = {
  __typename?: "query_root"
  user_players: Array<{
    __typename?: "dx_intl_players"
    id: number
    nickname: string
    private: boolean
    created_at: string
    updated_at?: string | null
    dx_intl_record?: {
      __typename?: "dx_intl_records"
      card_name: string
      rating: number
      grade?: number | null
      course_rank?: number | null
      class_rank?: number | null
    } | null
  }>
  other_players: Array<{
    __typename?: "dx_intl_players"
    id: number
    nickname: string
    private: boolean
    created_at: string
    updated_at?: string | null
    dx_intl_record?: {
      __typename?: "dx_intl_records"
      card_name: string
      rating: number
      grade?: number | null
      course_rank?: number | null
      class_rank?: number | null
    } | null
  }>
}

export type InsertDxIntlPlayerMutationVariables = Exact<{
  nickname: Scalars["String"]
  private: Scalars["Boolean"]
}>

export type InsertDxIntlPlayerMutation = {
  __typename?: "mutation_root"
  insert_dx_intl_players_one?: {
    __typename?: "dx_intl_players"
    id: number
  } | null
}

export type UpdateDxIntlPlayerMutationVariables = Exact<{
  pk: Scalars["Int"]
  nickname: Scalars["String"]
  private: Scalars["Boolean"]
}>

export type UpdateDxIntlPlayerMutation = {
  __typename?: "mutation_root"
  update_dx_intl_players_by_pk?: {
    __typename?: "dx_intl_players"
    id: number
  } | null
}

export type DeleteDxIntlPlayerMutationVariables = Exact<{
  pk: Scalars["Int"]
}>

export type DeleteDxIntlPlayerMutation = {
  __typename?: "mutation_root"
  delete_dx_intl_players_by_pk?: {
    __typename?: "dx_intl_players"
    id: number
  } | null
}

export type DxIntlSongsFieldsFragment = {
  __typename?: "dx_intl_songs"
  id: string
  category: number
  title: string
  order: number
  dx_intl_variants: Array<{
    __typename?: "dx_intl_variants"
    deluxe: boolean
    version: number
    active: boolean
    dx_intl_notes: Array<{
      __typename?: "dx_intl_notes"
      internal_lv?: number | null
      difficulty: number
      level:
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "7+"
        | "8"
        | "8+"
        | "9"
        | "9+"
        | "10"
        | "10+"
        | "11"
        | "11+"
        | "12"
        | "12+"
        | "13"
        | "13+"
        | "14"
        | "14+"
        | "15"
    }>
  }>
}

export type DxIntlSongsQueryVariables = Exact<{ [key: string]: never }>

export type DxIntlSongsQuery = {
  __typename?: "query_root"
  dx_intl_songs: Array<{
    __typename?: "dx_intl_songs"
    id: string
    category: number
    title: string
    order: number
    dx_intl_variants: Array<{
      __typename?: "dx_intl_variants"
      deluxe: boolean
      version: number
      active: boolean
      dx_intl_notes: Array<{
        __typename?: "dx_intl_notes"
        internal_lv?: number | null
        difficulty: number
        level:
          | "1"
          | "2"
          | "3"
          | "4"
          | "5"
          | "6"
          | "7"
          | "7+"
          | "8"
          | "8+"
          | "9"
          | "9+"
          | "10"
          | "10+"
          | "11"
          | "11+"
          | "12"
          | "12+"
          | "13"
          | "13+"
          | "14"
          | "14+"
          | "15"
      }>
    }>
  }>
}

export type DxIntlSongsByIdQueryVariables = Exact<{
  idLike: Scalars["String"]
}>

export type DxIntlSongsByIdQuery = {
  __typename?: "query_root"
  dx_intl_songs: Array<{
    __typename?: "dx_intl_songs"
    id: string
    category: number
    title: string
    order: number
    dx_intl_variants: Array<{
      __typename?: "dx_intl_variants"
      deluxe: boolean
      version: number
      active: boolean
      dx_intl_notes: Array<{
        __typename?: "dx_intl_notes"
        internal_lv?: number | null
        difficulty: number
        level:
          | "1"
          | "2"
          | "3"
          | "4"
          | "5"
          | "6"
          | "7"
          | "7+"
          | "8"
          | "8+"
          | "9"
          | "9+"
          | "10"
          | "10+"
          | "11"
          | "11+"
          | "12"
          | "12+"
          | "13"
          | "13+"
          | "14"
          | "14+"
          | "15"
      }>
    }>
  }>
}

export type DxIntlRecordWithScoresQueryVariables = Exact<{
  nickname: Scalars["String"]
}>

export type DxIntlRecordWithScoresQuery = {
  __typename?: "query_root"
  dx_intl_players: Array<{
    __typename?: "dx_intl_players"
    updated_at?: string | null
    private: boolean
    dx_intl_record?: {
      __typename?: "dx_intl_records"
      card_name: string
      title: string
      trophy: "normal" | "bronze" | "silver" | "gold" | "rainbow"
      rating: number
      max_rating: number
      rating_legacy: boolean
      grade?: number | null
      course_rank?: number | null
      class_rank?: number | null
    } | null
    dx_intl_scores: Array<{
      __typename?: "dx_intl_scores"
      song_id: string
      deluxe: boolean
      difficulty: number
      score: number
      combo_flag: "" | "fc" | "fc+" | "ap" | "ap+"
      sync_flag: "" | "fs" | "fs+" | "fdx" | "fdx+"
      start: string
    }>
  }>
}

export type DxIntlPlayerScoreTimelineQueryVariables = Exact<{
  nickname: Scalars["String"]
  songId: Scalars["String"]
  deluxe: Scalars["Boolean"]
  difficulty: Scalars["smallint"]
}>

export type DxIntlPlayerScoreTimelineQuery = {
  __typename?: "query_root"
  dx_intl_scores_with_history: Array<{
    __typename?: "dx_intl_scores_with_history"
    start?: string | null
    score?: number | null
    combo_flag?: "" | "fc" | "fc+" | "ap" | "ap+" | null
    sync_flag?: "" | "fs" | "fs+" | "fdx" | "fdx+" | null
  }>
}

export type DxIntlPlayersTimelinesQueryVariables = Exact<{
  nickname: Scalars["String"]
}>

export type DxIntlPlayersTimelinesQuery = {
  __typename?: "query_root"
  dx_intl_players_timelines: Array<{
    __typename?: "dx_intl_players_timelines"
    timelines?: string[] | null
  }>
}

export type DxIntlPlayerWithTimelineQueryVariables = Exact<{
  nickname: Scalars["String"]
  time: Scalars["timestamptz"]
}>

export type DxIntlPlayerWithTimelineQuery = {
  __typename?: "query_root"
  beforeRecord: Array<{
    __typename?: "dx_intl_records_with_history"
    card_name?: string | null
    title?: string | null
    trophy?: "normal" | "bronze" | "silver" | "gold" | "rainbow" | null
    rating?: number | null
    max_rating?: number | null
    grade?: number | null
    course_rank?: number | null
    class_rank?: number | null
  }>
  afterRecord: Array<{
    __typename?: "dx_intl_records_with_history"
    card_name?: string | null
    title?: string | null
    trophy?: "normal" | "bronze" | "silver" | "gold" | "rainbow" | null
    rating?: number | null
    max_rating?: number | null
    grade?: number | null
    course_rank?: number | null
    class_rank?: number | null
  }>
  beforeScores: Array<{
    __typename?: "dx_intl_scores_with_history"
    song_id?: string | null
    deluxe?: boolean | null
    difficulty?: number | null
    score?: number | null
    combo_flag?: "" | "fc" | "fc+" | "ap" | "ap+" | null
    sync_flag?: "" | "fs" | "fs+" | "fdx" | "fdx+" | null
  }>
  afterScores: Array<{
    __typename?: "dx_intl_scores_with_history"
    song_id?: string | null
    deluxe?: boolean | null
    difficulty?: number | null
    score?: number | null
    combo_flag?: "" | "fc" | "fc+" | "ap" | "ap+" | null
    sync_flag?: "" | "fs" | "fs+" | "fdx" | "fdx+" | null
  }>
}

export type DxIntlPlayersEditableQueryVariables = Exact<{
  userId: Scalars["String"]
  nickname: Scalars["String"]
}>

export type DxIntlPlayersEditableQuery = {
  __typename?: "query_root"
  dx_intl_players: Array<{
    __typename?: "dx_intl_players"
    id: number
    nickname: string
    private: boolean
  }>
}

export type FinalePlayersFieldsFragment = {
  __typename?: "finale_players"
  id: number
  nickname: string
  private: boolean
  created_at: string
  updated_at?: string | null
  finale_record?: {
    __typename?: "finale_records"
    card_name: string
    rating: number
    max_rating: number
    class: string
  } | null
}

export type FinalePlayersQueryVariables = Exact<{ [key: string]: never }>

export type FinalePlayersQuery = {
  __typename?: "query_root"
  finale_players: Array<{
    __typename?: "finale_players"
    id: number
    nickname: string
    private: boolean
    created_at: string
    updated_at?: string | null
    finale_record?: {
      __typename?: "finale_records"
      card_name: string
      rating: number
      max_rating: number
      class: string
    } | null
  }>
}

export type FinalePlayersForUserQueryVariables = Exact<{
  userId: Scalars["String"]
}>

export type FinalePlayersForUserQuery = {
  __typename?: "query_root"
  finale_players: Array<{
    __typename?: "finale_players"
    id: number
    nickname: string
    private: boolean
    created_at: string
    updated_at?: string | null
    finale_record?: {
      __typename?: "finale_records"
      card_name: string
      rating: number
      max_rating: number
      class: string
    } | null
  }>
}

export type FinaleSongsFieldsFragment = {
  __typename?: "finale_songs"
  id: number
  category: number
  title: string
  english_title?: string | null
  order: number
  version: number
  active: boolean
  japan_only: boolean
  finale_notes: Array<{
    __typename?: "finale_notes"
    difficulty: number
    level:
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "7+"
      | "8"
      | "8+"
      | "9"
      | "9+"
      | "10"
      | "10+"
      | "11"
      | "11+"
      | "12"
      | "12+"
      | "13"
      | "13+"
      | "14"
  }>
}

export type FinaleSongsQueryVariables = Exact<{ [key: string]: never }>

export type FinaleSongsQuery = {
  __typename?: "query_root"
  finale_songs: Array<{
    __typename?: "finale_songs"
    id: number
    category: number
    title: string
    english_title?: string | null
    order: number
    version: number
    active: boolean
    japan_only: boolean
    finale_notes: Array<{
      __typename?: "finale_notes"
      difficulty: number
      level:
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "7+"
        | "8"
        | "8+"
        | "9"
        | "9+"
        | "10"
        | "10+"
        | "11"
        | "11+"
        | "12"
        | "12+"
        | "13"
        | "13+"
        | "14"
    }>
  }>
}

export type FinaleSongsByIdQueryVariables = Exact<{
  id: Scalars["smallint"]
}>

export type FinaleSongsByIdQuery = {
  __typename?: "query_root"
  finale_songs: Array<{
    __typename?: "finale_songs"
    id: number
    category: number
    title: string
    english_title?: string | null
    order: number
    version: number
    active: boolean
    japan_only: boolean
    finale_notes: Array<{
      __typename?: "finale_notes"
      difficulty: number
      level:
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "7+"
        | "8"
        | "8+"
        | "9"
        | "9+"
        | "10"
        | "10+"
        | "11"
        | "11+"
        | "12"
        | "12+"
        | "13"
        | "13+"
        | "14"
    }>
  }>
}

export type FinaleRecordWithScoresQueryVariables = Exact<{
  nickname: Scalars["String"]
}>

export type FinaleRecordWithScoresQuery = {
  __typename?: "query_root"
  finale_players: Array<{
    __typename?: "finale_players"
    updated_at?: string | null
    private: boolean
    finale_record?: {
      __typename?: "finale_records"
      card_name: string
      title: string
      rating: number
      max_rating: number
      class: string
    } | null
    finale_scores: Array<{
      __typename?: "finale_scores"
      song_id: number
      difficulty: number
      score: number
      raw_score: number
      combo_flag: "" | "fc_silver" | "fc_gold" | "ap" | "ap_plus"
      sync_flag: any
      start: string
    }>
  }>
}

export type FinalePlayerScoreTimelineQueryVariables = Exact<{
  nickname: Scalars["String"]
  songId: Scalars["smallint"]
  difficulty: Scalars["smallint"]
}>

export type FinalePlayerScoreTimelineQuery = {
  __typename?: "query_root"
  finale_scores_with_history: Array<{
    __typename?: "finale_scores_with_history"
    start?: string | null
    score?: number | null
    combo_flag?: "" | "fc_silver" | "fc_gold" | "ap" | "ap_plus" | null
    sync_flag?: any | null
  }>
}

export type FinalePlayersTimelinesQueryVariables = Exact<{
  nickname: Scalars["String"]
}>

export type FinalePlayersTimelinesQuery = {
  __typename?: "query_root"
  finale_players_timelines: Array<{
    __typename?: "finale_players_timelines"
    timelines?: string[] | null
  }>
}

export type FinalePlayerWithTimelineQueryVariables = Exact<{
  nickname: Scalars["String"]
  time: Scalars["timestamptz"]
}>

export type FinalePlayerWithTimelineQuery = {
  __typename?: "query_root"
  beforeRecord: Array<{
    __typename?: "finale_records_with_history"
    card_name?: string | null
    title?: string | null
    rating?: number | null
    max_rating?: number | null
    class?: string | null
  }>
  afterRecord: Array<{
    __typename?: "finale_records_with_history"
    card_name?: string | null
    title?: string | null
    rating?: number | null
    max_rating?: number | null
    class?: string | null
  }>
  beforeScores: Array<{
    __typename?: "finale_scores_with_history"
    song_id?: number | null
    difficulty?: number | null
    score?: number | null
    combo_flag?: "" | "fc_silver" | "fc_gold" | "ap" | "ap_plus" | null
    sync_flag?: any | null
  }>
  afterScores: Array<{
    __typename?: "finale_scores_with_history"
    song_id?: number | null
    difficulty?: number | null
    score?: number | null
    combo_flag?: "" | "fc_silver" | "fc_gold" | "ap" | "ap_plus" | null
    sync_flag?: any | null
  }>
}

export const DxIntlPlayersFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dxIntlPlayersFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "dx_intl_players" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "private" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_record" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "grade" } },
                { kind: "Field", name: { kind: "Name", value: "course_rank" } },
                { kind: "Field", name: { kind: "Name", value: "class_rank" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DxIntlPlayersFieldsFragment, unknown>
export const DxIntlSongsFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dxIntlSongsFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "dx_intl_songs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "category" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_variants" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "deluxe" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deluxe" } },
                { kind: "Field", name: { kind: "Name", value: "version" } },
                { kind: "Field", name: { kind: "Name", value: "active" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dx_intl_notes" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "order_by" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "difficulty" },
                            value: { kind: "EnumValue", value: "asc" },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "internal_lv" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "difficulty" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "level" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DxIntlSongsFieldsFragment, unknown>
export const FinalePlayersFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "finalePlayersFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "finale_players" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "private" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_record" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "max_rating" } },
                { kind: "Field", name: { kind: "Name", value: "class" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FinalePlayersFieldsFragment, unknown>
export const FinaleSongsFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "finaleSongsFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "finale_songs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "category" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "english_title" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "japan_only" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_notes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "difficulty" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "difficulty" } },
                { kind: "Field", name: { kind: "Name", value: "level" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FinaleSongsFieldsFragment, unknown>
export const DxIntlPlayersForUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlPlayersForUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "user_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "userId" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "dxIntlPlayersFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dxIntlPlayersFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "dx_intl_players" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "private" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_record" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "grade" } },
                { kind: "Field", name: { kind: "Name", value: "course_rank" } },
                { kind: "Field", name: { kind: "Name", value: "class_rank" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlPlayersForUserQuery,
  DxIntlPlayersForUserQueryVariables
>
export const DxIntlPlayersWithKeywordAnonymousDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlPlayersWithKeywordAnonymous" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname_like" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "other_players" },
            name: { kind: "Name", value: "dx_intl_players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_ilike" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "nickname_like" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dx_intl_record" },
                      value: { kind: "ObjectValue", fields: [] },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: { kind: "IntValue", value: "10" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "dxIntlPlayersFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dxIntlPlayersFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "dx_intl_players" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "private" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_record" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "grade" } },
                { kind: "Field", name: { kind: "Name", value: "course_rank" } },
                { kind: "Field", name: { kind: "Name", value: "class_rank" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlPlayersWithKeywordAnonymousQuery,
  DxIntlPlayersWithKeywordAnonymousQueryVariables
>
export const DxIntlPlayersWithKeywordUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlPlayersWithKeywordUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname_like" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "user_players" },
            name: { kind: "Name", value: "dx_intl_players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "user_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "userId" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_ilike" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "nickname_like" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dx_intl_record" },
                      value: { kind: "ObjectValue", fields: [] },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "dxIntlPlayersFields" },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "other_players" },
            name: { kind: "Name", value: "dx_intl_players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "user_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_neq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "userId" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_ilike" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "nickname_like" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dx_intl_record" },
                      value: { kind: "ObjectValue", fields: [] },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: { kind: "IntValue", value: "10" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "dxIntlPlayersFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dxIntlPlayersFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "dx_intl_players" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "private" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_record" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "grade" } },
                { kind: "Field", name: { kind: "Name", value: "course_rank" } },
                { kind: "Field", name: { kind: "Name", value: "class_rank" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlPlayersWithKeywordUserQuery,
  DxIntlPlayersWithKeywordUserQueryVariables
>
export const InsertDxIntlPlayerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "insertDxIntlPlayer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "private" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "insert_dx_intl_players_one" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "object" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "nickname" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "private" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "private" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  InsertDxIntlPlayerMutation,
  InsertDxIntlPlayerMutationVariables
>
export const UpdateDxIntlPlayerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "updateDxIntlPlayer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "pk" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "private" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "update_dx_intl_players_by_pk" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "pk_columns" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "pk" },
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "_set" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "nickname" },
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "private" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "private" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateDxIntlPlayerMutation,
  UpdateDxIntlPlayerMutationVariables
>
export const DeleteDxIntlPlayerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "deleteDxIntlPlayer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "pk" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "delete_dx_intl_players_by_pk" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "pk" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteDxIntlPlayerMutation,
  DeleteDxIntlPlayerMutationVariables
>
export const DxIntlSongsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlSongs" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_songs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "category" },
                          value: { kind: "EnumValue", value: "asc" },
                        },
                      ],
                    },
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "order" },
                          value: { kind: "EnumValue", value: "asc" },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "dxIntlSongsFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dxIntlSongsFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "dx_intl_songs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "category" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_variants" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "deluxe" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deluxe" } },
                { kind: "Field", name: { kind: "Name", value: "version" } },
                { kind: "Field", name: { kind: "Name", value: "active" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dx_intl_notes" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "order_by" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "difficulty" },
                            value: { kind: "EnumValue", value: "asc" },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "internal_lv" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "difficulty" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "level" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DxIntlSongsQuery, DxIntlSongsQueryVariables>
export const DxIntlSongsByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlSongsById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "idLike" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_songs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "category" },
                          value: { kind: "EnumValue", value: "asc" },
                        },
                      ],
                    },
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "order" },
                          value: { kind: "EnumValue", value: "asc" },
                        },
                      ],
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_like" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "idLike" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "dxIntlSongsFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "dxIntlSongsFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "dx_intl_songs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "category" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_variants" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "deluxe" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "deluxe" } },
                { kind: "Field", name: { kind: "Name", value: "version" } },
                { kind: "Field", name: { kind: "Name", value: "active" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dx_intl_notes" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "order_by" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "difficulty" },
                            value: { kind: "EnumValue", value: "asc" },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "internal_lv" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "difficulty" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "level" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlSongsByIdQuery,
  DxIntlSongsByIdQueryVariables
>
export const DxIntlRecordWithScoresDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlRecordWithScores" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "nickname" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "updated_at" } },
                { kind: "Field", name: { kind: "Name", value: "private" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dx_intl_record" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "card_name" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "trophy" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rating" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "max_rating" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rating_legacy" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "grade" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "course_rank" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "class_rank" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "dx_intl_scores" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "song_id" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "deluxe" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "difficulty" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "score" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "combo_flag" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sync_flag" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "start" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlRecordWithScoresQuery,
  DxIntlRecordWithScoresQueryVariables
>
export const DxIntlPlayerScoreTimelineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlPlayerScoreTimeline" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "songId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "deluxe" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Boolean" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "difficulty" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "smallint" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_scores_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "song_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "songId" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "deluxe" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "deluxe" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "difficulty" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "difficulty" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dx_intl_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "start" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "start" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "combo_flag" } },
                { kind: "Field", name: { kind: "Name", value: "sync_flag" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlPlayerScoreTimelineQuery,
  DxIntlPlayerScoreTimelineQueryVariables
>
export const DxIntlPlayersTimelinesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlPlayersTimelines" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_players_timelines" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "nickname" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "timelines" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlPlayersTimelinesQuery,
  DxIntlPlayersTimelinesQueryVariables
>
export const DxIntlPlayerWithTimelineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlPlayerWithTimeline" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "time" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "timestamptz" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "beforeRecord" },
            name: { kind: "Name", value: "dx_intl_records_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dx_intl_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "end" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "time" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "trophy" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "max_rating" } },
                { kind: "Field", name: { kind: "Name", value: "grade" } },
                { kind: "Field", name: { kind: "Name", value: "course_rank" } },
                { kind: "Field", name: { kind: "Name", value: "class_rank" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "afterRecord" },
            name: { kind: "Name", value: "dx_intl_records_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dx_intl_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "start" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "time" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "trophy" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "max_rating" } },
                { kind: "Field", name: { kind: "Name", value: "grade" } },
                { kind: "Field", name: { kind: "Name", value: "course_rank" } },
                { kind: "Field", name: { kind: "Name", value: "class_rank" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "beforeScores" },
            name: { kind: "Name", value: "dx_intl_scores_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dx_intl_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "end" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "time" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "song_id" } },
                { kind: "Field", name: { kind: "Name", value: "deluxe" } },
                { kind: "Field", name: { kind: "Name", value: "difficulty" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "combo_flag" } },
                { kind: "Field", name: { kind: "Name", value: "sync_flag" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "afterScores" },
            name: { kind: "Name", value: "dx_intl_scores_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "dx_intl_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "start" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "time" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "song_id" } },
                { kind: "Field", name: { kind: "Name", value: "deluxe" } },
                { kind: "Field", name: { kind: "Name", value: "difficulty" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "combo_flag" } },
                { kind: "Field", name: { kind: "Name", value: "sync_flag" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlPlayerWithTimelineQuery,
  DxIntlPlayerWithTimelineQueryVariables
>
export const DxIntlPlayersEditableDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "dxIntlPlayersEditable" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "dx_intl_players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "user_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "userId" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "nickname" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "nickname" } },
                { kind: "Field", name: { kind: "Name", value: "private" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DxIntlPlayersEditableQuery,
  DxIntlPlayersEditableQueryVariables
>
export const FinalePlayersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "finalePlayers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_players" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "finalePlayersFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "finalePlayersFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "finale_players" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "private" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_record" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "max_rating" } },
                { kind: "Field", name: { kind: "Name", value: "class" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FinalePlayersQuery, FinalePlayersQueryVariables>
export const FinalePlayersForUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "finalePlayersForUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "userId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "user_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "userId" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "finalePlayersFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "finalePlayersFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "finale_players" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "nickname" } },
          { kind: "Field", name: { kind: "Name", value: "private" } },
          { kind: "Field", name: { kind: "Name", value: "created_at" } },
          { kind: "Field", name: { kind: "Name", value: "updated_at" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_record" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "max_rating" } },
                { kind: "Field", name: { kind: "Name", value: "class" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FinalePlayersForUserQuery,
  FinalePlayersForUserQueryVariables
>
export const FinaleSongsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "finaleSongs" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_songs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "category" },
                          value: { kind: "EnumValue", value: "asc" },
                        },
                      ],
                    },
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "order" },
                          value: { kind: "EnumValue", value: "asc" },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "finaleSongsFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "finaleSongsFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "finale_songs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "category" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "english_title" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "japan_only" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_notes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "difficulty" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "difficulty" } },
                { kind: "Field", name: { kind: "Name", value: "level" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FinaleSongsQuery, FinaleSongsQueryVariables>
export const FinaleSongsByIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "finaleSongsById" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "smallint" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_songs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ListValue",
                  values: [
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "category" },
                          value: { kind: "EnumValue", value: "asc" },
                        },
                      ],
                    },
                    {
                      kind: "ObjectValue",
                      fields: [
                        {
                          kind: "ObjectField",
                          name: { kind: "Name", value: "order" },
                          value: { kind: "EnumValue", value: "asc" },
                        },
                      ],
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "id" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "finaleSongsFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "finaleSongsFields" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "finale_songs" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "category" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "english_title" } },
          { kind: "Field", name: { kind: "Name", value: "order" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "active" } },
          { kind: "Field", name: { kind: "Name", value: "japan_only" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_notes" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "difficulty" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "difficulty" } },
                { kind: "Field", name: { kind: "Name", value: "level" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FinaleSongsByIdQuery,
  FinaleSongsByIdQueryVariables
>
export const FinaleRecordWithScoresDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "finaleRecordWithScores" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_players" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "nickname" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "updated_at" } },
                { kind: "Field", name: { kind: "Name", value: "private" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "finale_record" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "card_name" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "rating" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "max_rating" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "class" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "finale_scores" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "song_id" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "difficulty" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "score" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "raw_score" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "combo_flag" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "sync_flag" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "start" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FinaleRecordWithScoresQuery,
  FinaleRecordWithScoresQueryVariables
>
export const FinalePlayerScoreTimelineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "finalePlayerScoreTimeline" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "songId" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "smallint" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "difficulty" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "smallint" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_scores_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "song_id" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "songId" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "difficulty" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "difficulty" },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "finale_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "order_by" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "start" },
                      value: { kind: "EnumValue", value: "asc" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "start" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "combo_flag" } },
                { kind: "Field", name: { kind: "Name", value: "sync_flag" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FinalePlayerScoreTimelineQuery,
  FinalePlayerScoreTimelineQueryVariables
>
export const FinalePlayersTimelinesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "finalePlayersTimelines" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "finale_players_timelines" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "nickname" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "nickname" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "timelines" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FinalePlayersTimelinesQuery,
  FinalePlayersTimelinesQueryVariables
>
export const FinalePlayerWithTimelineDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "finalePlayerWithTimeline" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "nickname" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "time" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "timestamptz" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            alias: { kind: "Name", value: "beforeRecord" },
            name: { kind: "Name", value: "finale_records_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "finale_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "end" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "time" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "max_rating" } },
                { kind: "Field", name: { kind: "Name", value: "class" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "afterRecord" },
            name: { kind: "Name", value: "finale_records_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "finale_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "start" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "time" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "card_name" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "rating" } },
                { kind: "Field", name: { kind: "Name", value: "max_rating" } },
                { kind: "Field", name: { kind: "Name", value: "class" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "beforeScores" },
            name: { kind: "Name", value: "finale_scores_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "finale_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "end" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "time" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "song_id" } },
                { kind: "Field", name: { kind: "Name", value: "difficulty" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "combo_flag" } },
                { kind: "Field", name: { kind: "Name", value: "sync_flag" } },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "afterScores" },
            name: { kind: "Name", value: "finale_scores_with_history" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "finale_player" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "nickname" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "nickname" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "start" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "time" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "song_id" } },
                { kind: "Field", name: { kind: "Name", value: "difficulty" } },
                { kind: "Field", name: { kind: "Name", value: "score" } },
                { kind: "Field", name: { kind: "Name", value: "combo_flag" } },
                { kind: "Field", name: { kind: "Name", value: "sync_flag" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FinalePlayerWithTimelineQuery,
  FinalePlayerWithTimelineQueryVariables
>
