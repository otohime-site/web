import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  bigint: number;
  dx_intl_combo_flag: '' | 'fc' | 'fc+' | 'ap' | 'ap+';
  dx_intl_level: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '7+' | '8' | '8+' | '9' | '9+' | '10' | '10+' | '11' | '11+' | '12' | '12+' | '13' | '13+' | '14' | '14+' | '15'
;
  dx_intl_sync_flag: '' | 'fs' | 'fs+' | 'fdx' | 'fdx+';
  dx_intl_trophy: 'normal' | 'bronze' | 'silver' | 'gold' | 'rainbow';
  numeric: number;
  smallint: number;
  timestamptz: string;
  uuid: string;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};


/** expression to compare columns of type bigint. All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: Maybe<Scalars['bigint']>;
  _gt?: Maybe<Scalars['bigint']>;
  _gte?: Maybe<Scalars['bigint']>;
  _in?: Maybe<Array<Scalars['bigint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['bigint']>;
  _lte?: Maybe<Scalars['bigint']>;
  _neq?: Maybe<Scalars['bigint']>;
  _nin?: Maybe<Array<Scalars['bigint']>>;
};


/** expression to compare columns of type dx_intl_combo_flag. All fields are combined with logical 'AND'. */
export type Dx_Intl_Combo_Flag_Comparison_Exp = {
  _eq?: Maybe<Scalars['dx_intl_combo_flag']>;
  _gt?: Maybe<Scalars['dx_intl_combo_flag']>;
  _gte?: Maybe<Scalars['dx_intl_combo_flag']>;
  _in?: Maybe<Array<Scalars['dx_intl_combo_flag']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['dx_intl_combo_flag']>;
  _lte?: Maybe<Scalars['dx_intl_combo_flag']>;
  _neq?: Maybe<Scalars['dx_intl_combo_flag']>;
  _nin?: Maybe<Array<Scalars['dx_intl_combo_flag']>>;
};


/** expression to compare columns of type dx_intl_level. All fields are combined with logical 'AND'. */
export type Dx_Intl_Level_Comparison_Exp = {
  _eq?: Maybe<Scalars['dx_intl_level']>;
  _gt?: Maybe<Scalars['dx_intl_level']>;
  _gte?: Maybe<Scalars['dx_intl_level']>;
  _in?: Maybe<Array<Scalars['dx_intl_level']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['dx_intl_level']>;
  _lte?: Maybe<Scalars['dx_intl_level']>;
  _neq?: Maybe<Scalars['dx_intl_level']>;
  _nin?: Maybe<Array<Scalars['dx_intl_level']>>;
};

/** columns and relationships of "dx_intl_notes" */
export type Dx_Intl_Notes = {
  __typename?: 'dx_intl_notes';
  deluxe: Scalars['Boolean'];
  difficulty: Scalars['smallint'];
  /** An array relationship */
  dx_intl_scores: Array<Dx_Intl_Scores>;
  /** An aggregated array relationship */
  dx_intl_scores_aggregate: Dx_Intl_Scores_Aggregate;
  /** An object relationship */
  dx_intl_variant?: Maybe<Dx_Intl_Variants>;
  id: Scalars['Int'];
  level?: Maybe<Scalars['dx_intl_level']>;
  song_id?: Maybe<Scalars['Int']>;
};


/** columns and relationships of "dx_intl_notes" */
export type Dx_Intl_NotesDx_Intl_ScoresArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};


/** columns and relationships of "dx_intl_notes" */
export type Dx_Intl_NotesDx_Intl_Scores_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};

/** aggregated selection of "dx_intl_notes" */
export type Dx_Intl_Notes_Aggregate = {
  __typename?: 'dx_intl_notes_aggregate';
  aggregate?: Maybe<Dx_Intl_Notes_Aggregate_Fields>;
  nodes: Array<Dx_Intl_Notes>;
};

/** aggregate fields of "dx_intl_notes" */
export type Dx_Intl_Notes_Aggregate_Fields = {
  __typename?: 'dx_intl_notes_aggregate_fields';
  avg?: Maybe<Dx_Intl_Notes_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dx_Intl_Notes_Max_Fields>;
  min?: Maybe<Dx_Intl_Notes_Min_Fields>;
  stddev?: Maybe<Dx_Intl_Notes_Stddev_Fields>;
  stddev_pop?: Maybe<Dx_Intl_Notes_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dx_Intl_Notes_Stddev_Samp_Fields>;
  sum?: Maybe<Dx_Intl_Notes_Sum_Fields>;
  var_pop?: Maybe<Dx_Intl_Notes_Var_Pop_Fields>;
  var_samp?: Maybe<Dx_Intl_Notes_Var_Samp_Fields>;
  variance?: Maybe<Dx_Intl_Notes_Variance_Fields>;
};


/** aggregate fields of "dx_intl_notes" */
export type Dx_Intl_Notes_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dx_Intl_Notes_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dx_intl_notes" */
export type Dx_Intl_Notes_Aggregate_Order_By = {
  avg?: Maybe<Dx_Intl_Notes_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Dx_Intl_Notes_Max_Order_By>;
  min?: Maybe<Dx_Intl_Notes_Min_Order_By>;
  stddev?: Maybe<Dx_Intl_Notes_Stddev_Order_By>;
  stddev_pop?: Maybe<Dx_Intl_Notes_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Dx_Intl_Notes_Stddev_Samp_Order_By>;
  sum?: Maybe<Dx_Intl_Notes_Sum_Order_By>;
  var_pop?: Maybe<Dx_Intl_Notes_Var_Pop_Order_By>;
  var_samp?: Maybe<Dx_Intl_Notes_Var_Samp_Order_By>;
  variance?: Maybe<Dx_Intl_Notes_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "dx_intl_notes" */
export type Dx_Intl_Notes_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Notes_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Notes_On_Conflict>;
};

/** aggregate avg on columns */
export type Dx_Intl_Notes_Avg_Fields = {
  __typename?: 'dx_intl_notes_avg_fields';
  difficulty?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  song_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Avg_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dx_intl_notes". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Notes_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dx_Intl_Notes_Bool_Exp>>>;
  _not?: Maybe<Dx_Intl_Notes_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dx_Intl_Notes_Bool_Exp>>>;
  deluxe?: Maybe<Boolean_Comparison_Exp>;
  difficulty?: Maybe<Smallint_Comparison_Exp>;
  dx_intl_scores?: Maybe<Dx_Intl_Scores_Bool_Exp>;
  dx_intl_variant?: Maybe<Dx_Intl_Variants_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  level?: Maybe<Dx_Intl_Level_Comparison_Exp>;
  song_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "dx_intl_notes" */
export enum Dx_Intl_Notes_Constraint {
  /** unique or primary key constraint */
  DxIntlNotesPkey = 'dx_intl_notes_pkey',
  /** unique or primary key constraint */
  DxIntlNotesSongIdDeluxeDifficultyKey = 'dx_intl_notes_song_id_deluxe_difficulty_key'
}

/** input type for incrementing integer column in table "dx_intl_notes" */
export type Dx_Intl_Notes_Inc_Input = {
  difficulty?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  song_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "dx_intl_notes" */
export type Dx_Intl_Notes_Insert_Input = {
  deluxe?: Maybe<Scalars['Boolean']>;
  difficulty?: Maybe<Scalars['smallint']>;
  dx_intl_scores?: Maybe<Dx_Intl_Scores_Arr_Rel_Insert_Input>;
  dx_intl_variant?: Maybe<Dx_Intl_Variants_Obj_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['dx_intl_level']>;
  song_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Dx_Intl_Notes_Max_Fields = {
  __typename?: 'dx_intl_notes_max_fields';
  difficulty?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  song_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Max_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Dx_Intl_Notes_Min_Fields = {
  __typename?: 'dx_intl_notes_min_fields';
  difficulty?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  song_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Min_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "dx_intl_notes" */
export type Dx_Intl_Notes_Mutation_Response = {
  __typename?: 'dx_intl_notes_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dx_Intl_Notes>;
};

/** input type for inserting object relation for remote table "dx_intl_notes" */
export type Dx_Intl_Notes_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Notes_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Notes_On_Conflict>;
};

/** on conflict condition type for table "dx_intl_notes" */
export type Dx_Intl_Notes_On_Conflict = {
  constraint: Dx_Intl_Notes_Constraint;
  update_columns: Array<Dx_Intl_Notes_Update_Column>;
  where?: Maybe<Dx_Intl_Notes_Bool_Exp>;
};

/** ordering options when selecting data from "dx_intl_notes" */
export type Dx_Intl_Notes_Order_By = {
  deluxe?: Maybe<Order_By>;
  difficulty?: Maybe<Order_By>;
  dx_intl_scores_aggregate?: Maybe<Dx_Intl_Scores_Aggregate_Order_By>;
  dx_intl_variant?: Maybe<Dx_Intl_Variants_Order_By>;
  id?: Maybe<Order_By>;
  level?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "dx_intl_notes" */
export type Dx_Intl_Notes_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "dx_intl_notes" */
export enum Dx_Intl_Notes_Select_Column {
  /** column name */
  Deluxe = 'deluxe',
  /** column name */
  Difficulty = 'difficulty',
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  SongId = 'song_id'
}

/** input type for updating data in table "dx_intl_notes" */
export type Dx_Intl_Notes_Set_Input = {
  deluxe?: Maybe<Scalars['Boolean']>;
  difficulty?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['dx_intl_level']>;
  song_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Dx_Intl_Notes_Stddev_Fields = {
  __typename?: 'dx_intl_notes_stddev_fields';
  difficulty?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  song_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Stddev_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dx_Intl_Notes_Stddev_Pop_Fields = {
  __typename?: 'dx_intl_notes_stddev_pop_fields';
  difficulty?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  song_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Stddev_Pop_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dx_Intl_Notes_Stddev_Samp_Fields = {
  __typename?: 'dx_intl_notes_stddev_samp_fields';
  difficulty?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  song_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Stddev_Samp_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Dx_Intl_Notes_Sum_Fields = {
  __typename?: 'dx_intl_notes_sum_fields';
  difficulty?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  song_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Sum_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** update columns of table "dx_intl_notes" */
export enum Dx_Intl_Notes_Update_Column {
  /** column name */
  Deluxe = 'deluxe',
  /** column name */
  Difficulty = 'difficulty',
  /** column name */
  Id = 'id',
  /** column name */
  Level = 'level',
  /** column name */
  SongId = 'song_id'
}

/** aggregate var_pop on columns */
export type Dx_Intl_Notes_Var_Pop_Fields = {
  __typename?: 'dx_intl_notes_var_pop_fields';
  difficulty?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  song_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Var_Pop_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dx_Intl_Notes_Var_Samp_Fields = {
  __typename?: 'dx_intl_notes_var_samp_fields';
  difficulty?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  song_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Var_Samp_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Dx_Intl_Notes_Variance_Fields = {
  __typename?: 'dx_intl_notes_variance_fields';
  difficulty?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  song_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dx_intl_notes" */
export type Dx_Intl_Notes_Variance_Order_By = {
  difficulty?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  song_id?: Maybe<Order_By>;
};

/** columns and relationships of "dx_intl_players" */
export type Dx_Intl_Players = {
  __typename?: 'dx_intl_players';
  created_at: Scalars['timestamptz'];
  /** An object relationship */
  dx_intl_record?: Maybe<Dx_Intl_Records>;
  /** An array relationship */
  dx_intl_records: Array<Dx_Intl_Records>;
  /** An aggregated array relationship */
  dx_intl_records_aggregate: Dx_Intl_Records_Aggregate;
  /** An array relationship */
  dx_intl_scores: Array<Dx_Intl_Scores>;
  /** An aggregated array relationship */
  dx_intl_scores_aggregate: Dx_Intl_Scores_Aggregate;
  id: Scalars['Int'];
  nickname: Scalars['String'];
  private: Scalars['Boolean'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};


/** columns and relationships of "dx_intl_players" */
export type Dx_Intl_PlayersDx_Intl_RecordsArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_Order_By>>;
  where?: Maybe<Dx_Intl_Records_Bool_Exp>;
};


/** columns and relationships of "dx_intl_players" */
export type Dx_Intl_PlayersDx_Intl_Records_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_Order_By>>;
  where?: Maybe<Dx_Intl_Records_Bool_Exp>;
};


/** columns and relationships of "dx_intl_players" */
export type Dx_Intl_PlayersDx_Intl_ScoresArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};


/** columns and relationships of "dx_intl_players" */
export type Dx_Intl_PlayersDx_Intl_Scores_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};

/** aggregated selection of "dx_intl_players" */
export type Dx_Intl_Players_Aggregate = {
  __typename?: 'dx_intl_players_aggregate';
  aggregate?: Maybe<Dx_Intl_Players_Aggregate_Fields>;
  nodes: Array<Dx_Intl_Players>;
};

/** aggregate fields of "dx_intl_players" */
export type Dx_Intl_Players_Aggregate_Fields = {
  __typename?: 'dx_intl_players_aggregate_fields';
  avg?: Maybe<Dx_Intl_Players_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dx_Intl_Players_Max_Fields>;
  min?: Maybe<Dx_Intl_Players_Min_Fields>;
  stddev?: Maybe<Dx_Intl_Players_Stddev_Fields>;
  stddev_pop?: Maybe<Dx_Intl_Players_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dx_Intl_Players_Stddev_Samp_Fields>;
  sum?: Maybe<Dx_Intl_Players_Sum_Fields>;
  var_pop?: Maybe<Dx_Intl_Players_Var_Pop_Fields>;
  var_samp?: Maybe<Dx_Intl_Players_Var_Samp_Fields>;
  variance?: Maybe<Dx_Intl_Players_Variance_Fields>;
};


/** aggregate fields of "dx_intl_players" */
export type Dx_Intl_Players_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dx_Intl_Players_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dx_intl_players" */
export type Dx_Intl_Players_Aggregate_Order_By = {
  avg?: Maybe<Dx_Intl_Players_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Dx_Intl_Players_Max_Order_By>;
  min?: Maybe<Dx_Intl_Players_Min_Order_By>;
  stddev?: Maybe<Dx_Intl_Players_Stddev_Order_By>;
  stddev_pop?: Maybe<Dx_Intl_Players_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Dx_Intl_Players_Stddev_Samp_Order_By>;
  sum?: Maybe<Dx_Intl_Players_Sum_Order_By>;
  var_pop?: Maybe<Dx_Intl_Players_Var_Pop_Order_By>;
  var_samp?: Maybe<Dx_Intl_Players_Var_Samp_Order_By>;
  variance?: Maybe<Dx_Intl_Players_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "dx_intl_players" */
export type Dx_Intl_Players_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Players_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Players_On_Conflict>;
};

/** aggregate avg on columns */
export type Dx_Intl_Players_Avg_Fields = {
  __typename?: 'dx_intl_players_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dx_intl_players". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Players_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dx_Intl_Players_Bool_Exp>>>;
  _not?: Maybe<Dx_Intl_Players_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dx_Intl_Players_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  dx_intl_record?: Maybe<Dx_Intl_Records_Bool_Exp>;
  dx_intl_records?: Maybe<Dx_Intl_Records_Bool_Exp>;
  dx_intl_scores?: Maybe<Dx_Intl_Scores_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  nickname?: Maybe<String_Comparison_Exp>;
  private?: Maybe<Boolean_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "dx_intl_players" */
export enum Dx_Intl_Players_Constraint {
  /** unique or primary key constraint */
  DxIntlPlayersNicknameKey = 'dx_intl_players_nickname_key',
  /** unique or primary key constraint */
  DxIntlPlayersPkey = 'dx_intl_players_pkey'
}

/** input type for incrementing integer column in table "dx_intl_players" */
export type Dx_Intl_Players_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "dx_intl_players" */
export type Dx_Intl_Players_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  dx_intl_record?: Maybe<Dx_Intl_Records_Obj_Rel_Insert_Input>;
  dx_intl_records?: Maybe<Dx_Intl_Records_Arr_Rel_Insert_Input>;
  dx_intl_scores?: Maybe<Dx_Intl_Scores_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  nickname?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Dx_Intl_Players_Max_Fields = {
  __typename?: 'dx_intl_players_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  nickname?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Dx_Intl_Players_Min_Fields = {
  __typename?: 'dx_intl_players_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  nickname?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "dx_intl_players" */
export type Dx_Intl_Players_Mutation_Response = {
  __typename?: 'dx_intl_players_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dx_Intl_Players>;
};

/** input type for inserting object relation for remote table "dx_intl_players" */
export type Dx_Intl_Players_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Players_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Players_On_Conflict>;
};

/** on conflict condition type for table "dx_intl_players" */
export type Dx_Intl_Players_On_Conflict = {
  constraint: Dx_Intl_Players_Constraint;
  update_columns: Array<Dx_Intl_Players_Update_Column>;
  where?: Maybe<Dx_Intl_Players_Bool_Exp>;
};

/** ordering options when selecting data from "dx_intl_players" */
export type Dx_Intl_Players_Order_By = {
  created_at?: Maybe<Order_By>;
  dx_intl_record?: Maybe<Dx_Intl_Records_Order_By>;
  dx_intl_records_aggregate?: Maybe<Dx_Intl_Records_Aggregate_Order_By>;
  dx_intl_scores_aggregate?: Maybe<Dx_Intl_Scores_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  nickname?: Maybe<Order_By>;
  private?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "dx_intl_players" */
export type Dx_Intl_Players_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "dx_intl_players" */
export enum Dx_Intl_Players_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Private = 'private',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "dx_intl_players" */
export type Dx_Intl_Players_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  nickname?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Dx_Intl_Players_Stddev_Fields = {
  __typename?: 'dx_intl_players_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dx_Intl_Players_Stddev_Pop_Fields = {
  __typename?: 'dx_intl_players_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dx_Intl_Players_Stddev_Samp_Fields = {
  __typename?: 'dx_intl_players_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Dx_Intl_Players_Sum_Fields = {
  __typename?: 'dx_intl_players_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "dx_intl_players" */
export enum Dx_Intl_Players_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Private = 'private',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Dx_Intl_Players_Var_Pop_Fields = {
  __typename?: 'dx_intl_players_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dx_Intl_Players_Var_Samp_Fields = {
  __typename?: 'dx_intl_players_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Dx_Intl_Players_Variance_Fields = {
  __typename?: 'dx_intl_players_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dx_intl_players" */
export type Dx_Intl_Players_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "dx_intl_records" */
export type Dx_Intl_Records = {
  __typename?: 'dx_intl_records';
  card_name: Scalars['String'];
  /** An object relationship */
  dx_intl_player: Dx_Intl_Players;
  end: Scalars['timestamptz'];
  grade?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  max_rating?: Maybe<Scalars['smallint']>;
  player_id: Scalars['Int'];
  rating?: Maybe<Scalars['smallint']>;
  start: Scalars['timestamptz'];
  title: Scalars['String'];
  trophy: Scalars['dx_intl_trophy'];
};

/** aggregated selection of "dx_intl_records" */
export type Dx_Intl_Records_Aggregate = {
  __typename?: 'dx_intl_records_aggregate';
  aggregate?: Maybe<Dx_Intl_Records_Aggregate_Fields>;
  nodes: Array<Dx_Intl_Records>;
};

/** aggregate fields of "dx_intl_records" */
export type Dx_Intl_Records_Aggregate_Fields = {
  __typename?: 'dx_intl_records_aggregate_fields';
  avg?: Maybe<Dx_Intl_Records_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dx_Intl_Records_Max_Fields>;
  min?: Maybe<Dx_Intl_Records_Min_Fields>;
  stddev?: Maybe<Dx_Intl_Records_Stddev_Fields>;
  stddev_pop?: Maybe<Dx_Intl_Records_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dx_Intl_Records_Stddev_Samp_Fields>;
  sum?: Maybe<Dx_Intl_Records_Sum_Fields>;
  var_pop?: Maybe<Dx_Intl_Records_Var_Pop_Fields>;
  var_samp?: Maybe<Dx_Intl_Records_Var_Samp_Fields>;
  variance?: Maybe<Dx_Intl_Records_Variance_Fields>;
};


/** aggregate fields of "dx_intl_records" */
export type Dx_Intl_Records_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dx_Intl_Records_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dx_intl_records" */
export type Dx_Intl_Records_Aggregate_Order_By = {
  avg?: Maybe<Dx_Intl_Records_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Dx_Intl_Records_Max_Order_By>;
  min?: Maybe<Dx_Intl_Records_Min_Order_By>;
  stddev?: Maybe<Dx_Intl_Records_Stddev_Order_By>;
  stddev_pop?: Maybe<Dx_Intl_Records_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Dx_Intl_Records_Stddev_Samp_Order_By>;
  sum?: Maybe<Dx_Intl_Records_Sum_Order_By>;
  var_pop?: Maybe<Dx_Intl_Records_Var_Pop_Order_By>;
  var_samp?: Maybe<Dx_Intl_Records_Var_Samp_Order_By>;
  variance?: Maybe<Dx_Intl_Records_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "dx_intl_records" */
export type Dx_Intl_Records_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Records_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Records_On_Conflict>;
};

/** aggregate avg on columns */
export type Dx_Intl_Records_Avg_Fields = {
  __typename?: 'dx_intl_records_avg_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Avg_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dx_intl_records". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Records_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dx_Intl_Records_Bool_Exp>>>;
  _not?: Maybe<Dx_Intl_Records_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dx_Intl_Records_Bool_Exp>>>;
  card_name?: Maybe<String_Comparison_Exp>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Bool_Exp>;
  end?: Maybe<Timestamptz_Comparison_Exp>;
  grade?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  max_rating?: Maybe<Smallint_Comparison_Exp>;
  player_id?: Maybe<Int_Comparison_Exp>;
  rating?: Maybe<Smallint_Comparison_Exp>;
  start?: Maybe<Timestamptz_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  trophy?: Maybe<Dx_Intl_Trophy_Comparison_Exp>;
};

/** unique or primary key constraints on table "dx_intl_records" */
export enum Dx_Intl_Records_Constraint {
  /** unique or primary key constraint */
  DxIntlRecordsPkey = 'dx_intl_records_pkey',
  /** unique or primary key constraint */
  DxIntlRecordsPlayerIdKey = 'dx_intl_records_player_id_key'
}

/** input type for incrementing integer column in table "dx_intl_records" */
export type Dx_Intl_Records_Inc_Input = {
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
};

/** input type for inserting data into table "dx_intl_records" */
export type Dx_Intl_Records_Insert_Input = {
  card_name?: Maybe<Scalars['String']>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Obj_Rel_Insert_Input>;
  end?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
  start?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  trophy?: Maybe<Scalars['dx_intl_trophy']>;
};

/** aggregate max on columns */
export type Dx_Intl_Records_Max_Fields = {
  __typename?: 'dx_intl_records_max_fields';
  card_name?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
  start?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Max_Order_By = {
  card_name?: Maybe<Order_By>;
  end?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Dx_Intl_Records_Min_Fields = {
  __typename?: 'dx_intl_records_min_fields';
  card_name?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
  start?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Min_Order_By = {
  card_name?: Maybe<Order_By>;
  end?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** response of any mutation on the table "dx_intl_records" */
export type Dx_Intl_Records_Mutation_Response = {
  __typename?: 'dx_intl_records_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dx_Intl_Records>;
};

/** input type for inserting object relation for remote table "dx_intl_records" */
export type Dx_Intl_Records_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Records_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Records_On_Conflict>;
};

/** on conflict condition type for table "dx_intl_records" */
export type Dx_Intl_Records_On_Conflict = {
  constraint: Dx_Intl_Records_Constraint;
  update_columns: Array<Dx_Intl_Records_Update_Column>;
  where?: Maybe<Dx_Intl_Records_Bool_Exp>;
};

/** ordering options when selecting data from "dx_intl_records" */
export type Dx_Intl_Records_Order_By = {
  card_name?: Maybe<Order_By>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Order_By>;
  end?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  trophy?: Maybe<Order_By>;
};

/** primary key columns input for table: "dx_intl_records" */
export type Dx_Intl_Records_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "dx_intl_records" */
export enum Dx_Intl_Records_Select_Column {
  /** column name */
  CardName = 'card_name',
  /** column name */
  End = 'end',
  /** column name */
  Grade = 'grade',
  /** column name */
  Id = 'id',
  /** column name */
  MaxRating = 'max_rating',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rating = 'rating',
  /** column name */
  Start = 'start',
  /** column name */
  Title = 'title',
  /** column name */
  Trophy = 'trophy'
}

/** input type for updating data in table "dx_intl_records" */
export type Dx_Intl_Records_Set_Input = {
  card_name?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
  start?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  trophy?: Maybe<Scalars['dx_intl_trophy']>;
};

/** aggregate stddev on columns */
export type Dx_Intl_Records_Stddev_Fields = {
  __typename?: 'dx_intl_records_stddev_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Stddev_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dx_Intl_Records_Stddev_Pop_Fields = {
  __typename?: 'dx_intl_records_stddev_pop_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Stddev_Pop_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dx_Intl_Records_Stddev_Samp_Fields = {
  __typename?: 'dx_intl_records_stddev_samp_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Stddev_Samp_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Dx_Intl_Records_Sum_Fields = {
  __typename?: 'dx_intl_records_sum_fields';
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Sum_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** update columns of table "dx_intl_records" */
export enum Dx_Intl_Records_Update_Column {
  /** column name */
  CardName = 'card_name',
  /** column name */
  End = 'end',
  /** column name */
  Grade = 'grade',
  /** column name */
  Id = 'id',
  /** column name */
  MaxRating = 'max_rating',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rating = 'rating',
  /** column name */
  Start = 'start',
  /** column name */
  Title = 'title',
  /** column name */
  Trophy = 'trophy'
}

/** aggregate var_pop on columns */
export type Dx_Intl_Records_Var_Pop_Fields = {
  __typename?: 'dx_intl_records_var_pop_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Var_Pop_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dx_Intl_Records_Var_Samp_Fields = {
  __typename?: 'dx_intl_records_var_samp_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Var_Samp_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Dx_Intl_Records_Variance_Fields = {
  __typename?: 'dx_intl_records_variance_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dx_intl_records" */
export type Dx_Intl_Records_Variance_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** columns and relationships of "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History = {
  __typename?: 'dx_intl_records_with_history';
  card_name?: Maybe<Scalars['String']>;
  /** An object relationship */
  dx_intl_player?: Maybe<Dx_Intl_Players>;
  end?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
  start?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
  trophy?: Maybe<Scalars['dx_intl_trophy']>;
};

/** aggregated selection of "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Aggregate = {
  __typename?: 'dx_intl_records_with_history_aggregate';
  aggregate?: Maybe<Dx_Intl_Records_With_History_Aggregate_Fields>;
  nodes: Array<Dx_Intl_Records_With_History>;
};

/** aggregate fields of "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Aggregate_Fields = {
  __typename?: 'dx_intl_records_with_history_aggregate_fields';
  avg?: Maybe<Dx_Intl_Records_With_History_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dx_Intl_Records_With_History_Max_Fields>;
  min?: Maybe<Dx_Intl_Records_With_History_Min_Fields>;
  stddev?: Maybe<Dx_Intl_Records_With_History_Stddev_Fields>;
  stddev_pop?: Maybe<Dx_Intl_Records_With_History_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dx_Intl_Records_With_History_Stddev_Samp_Fields>;
  sum?: Maybe<Dx_Intl_Records_With_History_Sum_Fields>;
  var_pop?: Maybe<Dx_Intl_Records_With_History_Var_Pop_Fields>;
  var_samp?: Maybe<Dx_Intl_Records_With_History_Var_Samp_Fields>;
  variance?: Maybe<Dx_Intl_Records_With_History_Variance_Fields>;
};


/** aggregate fields of "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dx_Intl_Records_With_History_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Aggregate_Order_By = {
  avg?: Maybe<Dx_Intl_Records_With_History_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Dx_Intl_Records_With_History_Max_Order_By>;
  min?: Maybe<Dx_Intl_Records_With_History_Min_Order_By>;
  stddev?: Maybe<Dx_Intl_Records_With_History_Stddev_Order_By>;
  stddev_pop?: Maybe<Dx_Intl_Records_With_History_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Dx_Intl_Records_With_History_Stddev_Samp_Order_By>;
  sum?: Maybe<Dx_Intl_Records_With_History_Sum_Order_By>;
  var_pop?: Maybe<Dx_Intl_Records_With_History_Var_Pop_Order_By>;
  var_samp?: Maybe<Dx_Intl_Records_With_History_Var_Samp_Order_By>;
  variance?: Maybe<Dx_Intl_Records_With_History_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Dx_Intl_Records_With_History_Avg_Fields = {
  __typename?: 'dx_intl_records_with_history_avg_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Avg_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dx_intl_records_with_history". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Records_With_History_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dx_Intl_Records_With_History_Bool_Exp>>>;
  _not?: Maybe<Dx_Intl_Records_With_History_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dx_Intl_Records_With_History_Bool_Exp>>>;
  card_name?: Maybe<String_Comparison_Exp>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Bool_Exp>;
  end?: Maybe<Timestamptz_Comparison_Exp>;
  grade?: Maybe<Int_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  max_rating?: Maybe<Smallint_Comparison_Exp>;
  player_id?: Maybe<Int_Comparison_Exp>;
  rating?: Maybe<Smallint_Comparison_Exp>;
  start?: Maybe<Timestamptz_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  trophy?: Maybe<Dx_Intl_Trophy_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dx_Intl_Records_With_History_Max_Fields = {
  __typename?: 'dx_intl_records_with_history_max_fields';
  card_name?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
  start?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Max_Order_By = {
  card_name?: Maybe<Order_By>;
  end?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Dx_Intl_Records_With_History_Min_Fields = {
  __typename?: 'dx_intl_records_with_history_min_fields';
  card_name?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['timestamptz']>;
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
  start?: Maybe<Scalars['timestamptz']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Min_Order_By = {
  card_name?: Maybe<Order_By>;
  end?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** ordering options when selecting data from "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Order_By = {
  card_name?: Maybe<Order_By>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Order_By>;
  end?: Maybe<Order_By>;
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  trophy?: Maybe<Order_By>;
};

/** select columns of table "dx_intl_records_with_history" */
export enum Dx_Intl_Records_With_History_Select_Column {
  /** column name */
  CardName = 'card_name',
  /** column name */
  End = 'end',
  /** column name */
  Grade = 'grade',
  /** column name */
  Id = 'id',
  /** column name */
  MaxRating = 'max_rating',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rating = 'rating',
  /** column name */
  Start = 'start',
  /** column name */
  Title = 'title',
  /** column name */
  Trophy = 'trophy'
}

/** aggregate stddev on columns */
export type Dx_Intl_Records_With_History_Stddev_Fields = {
  __typename?: 'dx_intl_records_with_history_stddev_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Stddev_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dx_Intl_Records_With_History_Stddev_Pop_Fields = {
  __typename?: 'dx_intl_records_with_history_stddev_pop_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Stddev_Pop_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dx_Intl_Records_With_History_Stddev_Samp_Fields = {
  __typename?: 'dx_intl_records_with_history_stddev_samp_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Stddev_Samp_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Dx_Intl_Records_With_History_Sum_Fields = {
  __typename?: 'dx_intl_records_with_history_sum_fields';
  grade?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  max_rating?: Maybe<Scalars['smallint']>;
  player_id?: Maybe<Scalars['Int']>;
  rating?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Sum_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Dx_Intl_Records_With_History_Var_Pop_Fields = {
  __typename?: 'dx_intl_records_with_history_var_pop_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Var_Pop_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dx_Intl_Records_With_History_Var_Samp_Fields = {
  __typename?: 'dx_intl_records_with_history_var_samp_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Var_Samp_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Dx_Intl_Records_With_History_Variance_Fields = {
  __typename?: 'dx_intl_records_with_history_variance_fields';
  grade?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  max_rating?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dx_intl_records_with_history" */
export type Dx_Intl_Records_With_History_Variance_Order_By = {
  grade?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  max_rating?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  rating?: Maybe<Order_By>;
};

/** columns and relationships of "dx_intl_scores" */
export type Dx_Intl_Scores = {
  __typename?: 'dx_intl_scores';
  combo_flag: Scalars['dx_intl_combo_flag'];
  /** An object relationship */
  dx_intl_note: Dx_Intl_Notes;
  /** An object relationship */
  dx_intl_player: Dx_Intl_Players;
  end: Scalars['timestamptz'];
  id: Scalars['bigint'];
  note_id: Scalars['Int'];
  player_id: Scalars['Int'];
  score: Scalars['numeric'];
  start: Scalars['timestamptz'];
  sync_flag: Scalars['dx_intl_sync_flag'];
};

/** aggregated selection of "dx_intl_scores" */
export type Dx_Intl_Scores_Aggregate = {
  __typename?: 'dx_intl_scores_aggregate';
  aggregate?: Maybe<Dx_Intl_Scores_Aggregate_Fields>;
  nodes: Array<Dx_Intl_Scores>;
};

/** aggregate fields of "dx_intl_scores" */
export type Dx_Intl_Scores_Aggregate_Fields = {
  __typename?: 'dx_intl_scores_aggregate_fields';
  avg?: Maybe<Dx_Intl_Scores_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dx_Intl_Scores_Max_Fields>;
  min?: Maybe<Dx_Intl_Scores_Min_Fields>;
  stddev?: Maybe<Dx_Intl_Scores_Stddev_Fields>;
  stddev_pop?: Maybe<Dx_Intl_Scores_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dx_Intl_Scores_Stddev_Samp_Fields>;
  sum?: Maybe<Dx_Intl_Scores_Sum_Fields>;
  var_pop?: Maybe<Dx_Intl_Scores_Var_Pop_Fields>;
  var_samp?: Maybe<Dx_Intl_Scores_Var_Samp_Fields>;
  variance?: Maybe<Dx_Intl_Scores_Variance_Fields>;
};


/** aggregate fields of "dx_intl_scores" */
export type Dx_Intl_Scores_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dx_intl_scores" */
export type Dx_Intl_Scores_Aggregate_Order_By = {
  avg?: Maybe<Dx_Intl_Scores_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Dx_Intl_Scores_Max_Order_By>;
  min?: Maybe<Dx_Intl_Scores_Min_Order_By>;
  stddev?: Maybe<Dx_Intl_Scores_Stddev_Order_By>;
  stddev_pop?: Maybe<Dx_Intl_Scores_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Dx_Intl_Scores_Stddev_Samp_Order_By>;
  sum?: Maybe<Dx_Intl_Scores_Sum_Order_By>;
  var_pop?: Maybe<Dx_Intl_Scores_Var_Pop_Order_By>;
  var_samp?: Maybe<Dx_Intl_Scores_Var_Samp_Order_By>;
  variance?: Maybe<Dx_Intl_Scores_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "dx_intl_scores" */
export type Dx_Intl_Scores_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Scores_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Scores_On_Conflict>;
};

/** aggregate avg on columns */
export type Dx_Intl_Scores_Avg_Fields = {
  __typename?: 'dx_intl_scores_avg_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Avg_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dx_intl_scores". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Scores_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dx_Intl_Scores_Bool_Exp>>>;
  _not?: Maybe<Dx_Intl_Scores_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dx_Intl_Scores_Bool_Exp>>>;
  combo_flag?: Maybe<Dx_Intl_Combo_Flag_Comparison_Exp>;
  dx_intl_note?: Maybe<Dx_Intl_Notes_Bool_Exp>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Bool_Exp>;
  end?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Bigint_Comparison_Exp>;
  note_id?: Maybe<Int_Comparison_Exp>;
  player_id?: Maybe<Int_Comparison_Exp>;
  score?: Maybe<Numeric_Comparison_Exp>;
  start?: Maybe<Timestamptz_Comparison_Exp>;
  sync_flag?: Maybe<Dx_Intl_Sync_Flag_Comparison_Exp>;
};

/** unique or primary key constraints on table "dx_intl_scores" */
export enum Dx_Intl_Scores_Constraint {
  /** unique or primary key constraint */
  DxIntlScoresPkey = 'dx_intl_scores_pkey',
  /** unique or primary key constraint */
  DxIntlScoresPlayerIdNoteIdKey = 'dx_intl_scores_player_id_note_id_key'
}

/** input type for incrementing integer column in table "dx_intl_scores" */
export type Dx_Intl_Scores_Inc_Input = {
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "dx_intl_scores" */
export type Dx_Intl_Scores_Insert_Input = {
  combo_flag?: Maybe<Scalars['dx_intl_combo_flag']>;
  dx_intl_note?: Maybe<Dx_Intl_Notes_Obj_Rel_Insert_Input>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Obj_Rel_Insert_Input>;
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
  start?: Maybe<Scalars['timestamptz']>;
  sync_flag?: Maybe<Scalars['dx_intl_sync_flag']>;
};

/** aggregate max on columns */
export type Dx_Intl_Scores_Max_Fields = {
  __typename?: 'dx_intl_scores_max_fields';
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
  start?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Max_Order_By = {
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Dx_Intl_Scores_Min_Fields = {
  __typename?: 'dx_intl_scores_min_fields';
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
  start?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Min_Order_By = {
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
};

/** response of any mutation on the table "dx_intl_scores" */
export type Dx_Intl_Scores_Mutation_Response = {
  __typename?: 'dx_intl_scores_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dx_Intl_Scores>;
};

/** input type for inserting object relation for remote table "dx_intl_scores" */
export type Dx_Intl_Scores_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Scores_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Scores_On_Conflict>;
};

/** on conflict condition type for table "dx_intl_scores" */
export type Dx_Intl_Scores_On_Conflict = {
  constraint: Dx_Intl_Scores_Constraint;
  update_columns: Array<Dx_Intl_Scores_Update_Column>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};

/** ordering options when selecting data from "dx_intl_scores" */
export type Dx_Intl_Scores_Order_By = {
  combo_flag?: Maybe<Order_By>;
  dx_intl_note?: Maybe<Dx_Intl_Notes_Order_By>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Order_By>;
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  sync_flag?: Maybe<Order_By>;
};

/** primary key columns input for table: "dx_intl_scores" */
export type Dx_Intl_Scores_Pk_Columns_Input = {
  id: Scalars['bigint'];
};

/** select columns of table "dx_intl_scores" */
export enum Dx_Intl_Scores_Select_Column {
  /** column name */
  ComboFlag = 'combo_flag',
  /** column name */
  End = 'end',
  /** column name */
  Id = 'id',
  /** column name */
  NoteId = 'note_id',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Score = 'score',
  /** column name */
  Start = 'start',
  /** column name */
  SyncFlag = 'sync_flag'
}

/** input type for updating data in table "dx_intl_scores" */
export type Dx_Intl_Scores_Set_Input = {
  combo_flag?: Maybe<Scalars['dx_intl_combo_flag']>;
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
  start?: Maybe<Scalars['timestamptz']>;
  sync_flag?: Maybe<Scalars['dx_intl_sync_flag']>;
};

/** aggregate stddev on columns */
export type Dx_Intl_Scores_Stddev_Fields = {
  __typename?: 'dx_intl_scores_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dx_Intl_Scores_Stddev_Pop_Fields = {
  __typename?: 'dx_intl_scores_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dx_Intl_Scores_Stddev_Samp_Fields = {
  __typename?: 'dx_intl_scores_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Dx_Intl_Scores_Sum_Fields = {
  __typename?: 'dx_intl_scores_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Sum_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** update columns of table "dx_intl_scores" */
export enum Dx_Intl_Scores_Update_Column {
  /** column name */
  ComboFlag = 'combo_flag',
  /** column name */
  End = 'end',
  /** column name */
  Id = 'id',
  /** column name */
  NoteId = 'note_id',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Score = 'score',
  /** column name */
  Start = 'start',
  /** column name */
  SyncFlag = 'sync_flag'
}

/** aggregate var_pop on columns */
export type Dx_Intl_Scores_Var_Pop_Fields = {
  __typename?: 'dx_intl_scores_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dx_Intl_Scores_Var_Samp_Fields = {
  __typename?: 'dx_intl_scores_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Dx_Intl_Scores_Variance_Fields = {
  __typename?: 'dx_intl_scores_variance_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dx_intl_scores" */
export type Dx_Intl_Scores_Variance_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** columns and relationships of "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History = {
  __typename?: 'dx_intl_scores_with_history';
  combo_flag?: Maybe<Scalars['dx_intl_combo_flag']>;
  /** An object relationship */
  dx_intl_note?: Maybe<Dx_Intl_Notes>;
  /** An object relationship */
  dx_intl_player?: Maybe<Dx_Intl_Players>;
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
  start?: Maybe<Scalars['timestamptz']>;
  sync_flag?: Maybe<Scalars['dx_intl_sync_flag']>;
};

/** aggregated selection of "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Aggregate = {
  __typename?: 'dx_intl_scores_with_history_aggregate';
  aggregate?: Maybe<Dx_Intl_Scores_With_History_Aggregate_Fields>;
  nodes: Array<Dx_Intl_Scores_With_History>;
};

/** aggregate fields of "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Aggregate_Fields = {
  __typename?: 'dx_intl_scores_with_history_aggregate_fields';
  avg?: Maybe<Dx_Intl_Scores_With_History_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dx_Intl_Scores_With_History_Max_Fields>;
  min?: Maybe<Dx_Intl_Scores_With_History_Min_Fields>;
  stddev?: Maybe<Dx_Intl_Scores_With_History_Stddev_Fields>;
  stddev_pop?: Maybe<Dx_Intl_Scores_With_History_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dx_Intl_Scores_With_History_Stddev_Samp_Fields>;
  sum?: Maybe<Dx_Intl_Scores_With_History_Sum_Fields>;
  var_pop?: Maybe<Dx_Intl_Scores_With_History_Var_Pop_Fields>;
  var_samp?: Maybe<Dx_Intl_Scores_With_History_Var_Samp_Fields>;
  variance?: Maybe<Dx_Intl_Scores_With_History_Variance_Fields>;
};


/** aggregate fields of "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dx_Intl_Scores_With_History_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Aggregate_Order_By = {
  avg?: Maybe<Dx_Intl_Scores_With_History_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Dx_Intl_Scores_With_History_Max_Order_By>;
  min?: Maybe<Dx_Intl_Scores_With_History_Min_Order_By>;
  stddev?: Maybe<Dx_Intl_Scores_With_History_Stddev_Order_By>;
  stddev_pop?: Maybe<Dx_Intl_Scores_With_History_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Dx_Intl_Scores_With_History_Stddev_Samp_Order_By>;
  sum?: Maybe<Dx_Intl_Scores_With_History_Sum_Order_By>;
  var_pop?: Maybe<Dx_Intl_Scores_With_History_Var_Pop_Order_By>;
  var_samp?: Maybe<Dx_Intl_Scores_With_History_Var_Samp_Order_By>;
  variance?: Maybe<Dx_Intl_Scores_With_History_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Dx_Intl_Scores_With_History_Avg_Fields = {
  __typename?: 'dx_intl_scores_with_history_avg_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Avg_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dx_intl_scores_with_history". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Scores_With_History_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dx_Intl_Scores_With_History_Bool_Exp>>>;
  _not?: Maybe<Dx_Intl_Scores_With_History_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dx_Intl_Scores_With_History_Bool_Exp>>>;
  combo_flag?: Maybe<Dx_Intl_Combo_Flag_Comparison_Exp>;
  dx_intl_note?: Maybe<Dx_Intl_Notes_Bool_Exp>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Bool_Exp>;
  end?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Bigint_Comparison_Exp>;
  note_id?: Maybe<Int_Comparison_Exp>;
  player_id?: Maybe<Int_Comparison_Exp>;
  score?: Maybe<Numeric_Comparison_Exp>;
  start?: Maybe<Timestamptz_Comparison_Exp>;
  sync_flag?: Maybe<Dx_Intl_Sync_Flag_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dx_Intl_Scores_With_History_Max_Fields = {
  __typename?: 'dx_intl_scores_with_history_max_fields';
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
  start?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Max_Order_By = {
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Dx_Intl_Scores_With_History_Min_Fields = {
  __typename?: 'dx_intl_scores_with_history_min_fields';
  end?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
  start?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Min_Order_By = {
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
};

/** ordering options when selecting data from "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Order_By = {
  combo_flag?: Maybe<Order_By>;
  dx_intl_note?: Maybe<Dx_Intl_Notes_Order_By>;
  dx_intl_player?: Maybe<Dx_Intl_Players_Order_By>;
  end?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
  start?: Maybe<Order_By>;
  sync_flag?: Maybe<Order_By>;
};

/** select columns of table "dx_intl_scores_with_history" */
export enum Dx_Intl_Scores_With_History_Select_Column {
  /** column name */
  ComboFlag = 'combo_flag',
  /** column name */
  End = 'end',
  /** column name */
  Id = 'id',
  /** column name */
  NoteId = 'note_id',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Score = 'score',
  /** column name */
  Start = 'start',
  /** column name */
  SyncFlag = 'sync_flag'
}

/** aggregate stddev on columns */
export type Dx_Intl_Scores_With_History_Stddev_Fields = {
  __typename?: 'dx_intl_scores_with_history_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Stddev_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dx_Intl_Scores_With_History_Stddev_Pop_Fields = {
  __typename?: 'dx_intl_scores_with_history_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dx_Intl_Scores_With_History_Stddev_Samp_Fields = {
  __typename?: 'dx_intl_scores_with_history_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Dx_Intl_Scores_With_History_Sum_Fields = {
  __typename?: 'dx_intl_scores_with_history_sum_fields';
  id?: Maybe<Scalars['bigint']>;
  note_id?: Maybe<Scalars['Int']>;
  player_id?: Maybe<Scalars['Int']>;
  score?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Sum_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Dx_Intl_Scores_With_History_Var_Pop_Fields = {
  __typename?: 'dx_intl_scores_with_history_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dx_Intl_Scores_With_History_Var_Samp_Fields = {
  __typename?: 'dx_intl_scores_with_history_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Dx_Intl_Scores_With_History_Variance_Fields = {
  __typename?: 'dx_intl_scores_with_history_variance_fields';
  id?: Maybe<Scalars['Float']>;
  note_id?: Maybe<Scalars['Float']>;
  player_id?: Maybe<Scalars['Float']>;
  score?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dx_intl_scores_with_history" */
export type Dx_Intl_Scores_With_History_Variance_Order_By = {
  id?: Maybe<Order_By>;
  note_id?: Maybe<Order_By>;
  player_id?: Maybe<Order_By>;
  score?: Maybe<Order_By>;
};

/** columns and relationships of "dx_intl_songs" */
export type Dx_Intl_Songs = {
  __typename?: 'dx_intl_songs';
  category: Scalars['smallint'];
  /** An array relationship */
  dx_intl_variants: Array<Dx_Intl_Variants>;
  /** An aggregated array relationship */
  dx_intl_variants_aggregate: Dx_Intl_Variants_Aggregate;
  id: Scalars['Int'];
  order: Scalars['smallint'];
  title: Scalars['String'];
};


/** columns and relationships of "dx_intl_songs" */
export type Dx_Intl_SongsDx_Intl_VariantsArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Variants_Order_By>>;
  where?: Maybe<Dx_Intl_Variants_Bool_Exp>;
};


/** columns and relationships of "dx_intl_songs" */
export type Dx_Intl_SongsDx_Intl_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Variants_Order_By>>;
  where?: Maybe<Dx_Intl_Variants_Bool_Exp>;
};

/** aggregated selection of "dx_intl_songs" */
export type Dx_Intl_Songs_Aggregate = {
  __typename?: 'dx_intl_songs_aggregate';
  aggregate?: Maybe<Dx_Intl_Songs_Aggregate_Fields>;
  nodes: Array<Dx_Intl_Songs>;
};

/** aggregate fields of "dx_intl_songs" */
export type Dx_Intl_Songs_Aggregate_Fields = {
  __typename?: 'dx_intl_songs_aggregate_fields';
  avg?: Maybe<Dx_Intl_Songs_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dx_Intl_Songs_Max_Fields>;
  min?: Maybe<Dx_Intl_Songs_Min_Fields>;
  stddev?: Maybe<Dx_Intl_Songs_Stddev_Fields>;
  stddev_pop?: Maybe<Dx_Intl_Songs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dx_Intl_Songs_Stddev_Samp_Fields>;
  sum?: Maybe<Dx_Intl_Songs_Sum_Fields>;
  var_pop?: Maybe<Dx_Intl_Songs_Var_Pop_Fields>;
  var_samp?: Maybe<Dx_Intl_Songs_Var_Samp_Fields>;
  variance?: Maybe<Dx_Intl_Songs_Variance_Fields>;
};


/** aggregate fields of "dx_intl_songs" */
export type Dx_Intl_Songs_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dx_Intl_Songs_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dx_intl_songs" */
export type Dx_Intl_Songs_Aggregate_Order_By = {
  avg?: Maybe<Dx_Intl_Songs_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Dx_Intl_Songs_Max_Order_By>;
  min?: Maybe<Dx_Intl_Songs_Min_Order_By>;
  stddev?: Maybe<Dx_Intl_Songs_Stddev_Order_By>;
  stddev_pop?: Maybe<Dx_Intl_Songs_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Dx_Intl_Songs_Stddev_Samp_Order_By>;
  sum?: Maybe<Dx_Intl_Songs_Sum_Order_By>;
  var_pop?: Maybe<Dx_Intl_Songs_Var_Pop_Order_By>;
  var_samp?: Maybe<Dx_Intl_Songs_Var_Samp_Order_By>;
  variance?: Maybe<Dx_Intl_Songs_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "dx_intl_songs" */
export type Dx_Intl_Songs_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Songs_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Songs_On_Conflict>;
};

/** aggregate avg on columns */
export type Dx_Intl_Songs_Avg_Fields = {
  __typename?: 'dx_intl_songs_avg_fields';
  category?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Avg_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dx_intl_songs". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Songs_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dx_Intl_Songs_Bool_Exp>>>;
  _not?: Maybe<Dx_Intl_Songs_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dx_Intl_Songs_Bool_Exp>>>;
  category?: Maybe<Smallint_Comparison_Exp>;
  dx_intl_variants?: Maybe<Dx_Intl_Variants_Bool_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  order?: Maybe<Smallint_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "dx_intl_songs" */
export enum Dx_Intl_Songs_Constraint {
  /** unique or primary key constraint */
  DxIntlSongsCategoryTitleKey = 'dx_intl_songs_category_title_key',
  /** unique or primary key constraint */
  DxIntlSongsPkey = 'dx_intl_songs_pkey'
}

/** input type for incrementing integer column in table "dx_intl_songs" */
export type Dx_Intl_Songs_Inc_Input = {
  category?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['smallint']>;
};

/** input type for inserting data into table "dx_intl_songs" */
export type Dx_Intl_Songs_Insert_Input = {
  category?: Maybe<Scalars['smallint']>;
  dx_intl_variants?: Maybe<Dx_Intl_Variants_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['smallint']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Dx_Intl_Songs_Max_Fields = {
  __typename?: 'dx_intl_songs_max_fields';
  category?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['smallint']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Max_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Dx_Intl_Songs_Min_Fields = {
  __typename?: 'dx_intl_songs_min_fields';
  category?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['smallint']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Min_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** response of any mutation on the table "dx_intl_songs" */
export type Dx_Intl_Songs_Mutation_Response = {
  __typename?: 'dx_intl_songs_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dx_Intl_Songs>;
};

/** input type for inserting object relation for remote table "dx_intl_songs" */
export type Dx_Intl_Songs_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Songs_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Songs_On_Conflict>;
};

/** on conflict condition type for table "dx_intl_songs" */
export type Dx_Intl_Songs_On_Conflict = {
  constraint: Dx_Intl_Songs_Constraint;
  update_columns: Array<Dx_Intl_Songs_Update_Column>;
  where?: Maybe<Dx_Intl_Songs_Bool_Exp>;
};

/** ordering options when selecting data from "dx_intl_songs" */
export type Dx_Intl_Songs_Order_By = {
  category?: Maybe<Order_By>;
  dx_intl_variants_aggregate?: Maybe<Dx_Intl_Variants_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
};

/** primary key columns input for table: "dx_intl_songs" */
export type Dx_Intl_Songs_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "dx_intl_songs" */
export enum Dx_Intl_Songs_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "dx_intl_songs" */
export type Dx_Intl_Songs_Set_Input = {
  category?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['smallint']>;
  title?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Dx_Intl_Songs_Stddev_Fields = {
  __typename?: 'dx_intl_songs_stddev_fields';
  category?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Stddev_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dx_Intl_Songs_Stddev_Pop_Fields = {
  __typename?: 'dx_intl_songs_stddev_pop_fields';
  category?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Stddev_Pop_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dx_Intl_Songs_Stddev_Samp_Fields = {
  __typename?: 'dx_intl_songs_stddev_samp_fields';
  category?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Stddev_Samp_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Dx_Intl_Songs_Sum_Fields = {
  __typename?: 'dx_intl_songs_sum_fields';
  category?: Maybe<Scalars['smallint']>;
  id?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Sum_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
};

/** update columns of table "dx_intl_songs" */
export enum Dx_Intl_Songs_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Id = 'id',
  /** column name */
  Order = 'order',
  /** column name */
  Title = 'title'
}

/** aggregate var_pop on columns */
export type Dx_Intl_Songs_Var_Pop_Fields = {
  __typename?: 'dx_intl_songs_var_pop_fields';
  category?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Var_Pop_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dx_Intl_Songs_Var_Samp_Fields = {
  __typename?: 'dx_intl_songs_var_samp_fields';
  category?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Var_Samp_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Dx_Intl_Songs_Variance_Fields = {
  __typename?: 'dx_intl_songs_variance_fields';
  category?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dx_intl_songs" */
export type Dx_Intl_Songs_Variance_Order_By = {
  category?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  order?: Maybe<Order_By>;
};


/** expression to compare columns of type dx_intl_sync_flag. All fields are combined with logical 'AND'. */
export type Dx_Intl_Sync_Flag_Comparison_Exp = {
  _eq?: Maybe<Scalars['dx_intl_sync_flag']>;
  _gt?: Maybe<Scalars['dx_intl_sync_flag']>;
  _gte?: Maybe<Scalars['dx_intl_sync_flag']>;
  _in?: Maybe<Array<Scalars['dx_intl_sync_flag']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['dx_intl_sync_flag']>;
  _lte?: Maybe<Scalars['dx_intl_sync_flag']>;
  _neq?: Maybe<Scalars['dx_intl_sync_flag']>;
  _nin?: Maybe<Array<Scalars['dx_intl_sync_flag']>>;
};


/** expression to compare columns of type dx_intl_trophy. All fields are combined with logical 'AND'. */
export type Dx_Intl_Trophy_Comparison_Exp = {
  _eq?: Maybe<Scalars['dx_intl_trophy']>;
  _gt?: Maybe<Scalars['dx_intl_trophy']>;
  _gte?: Maybe<Scalars['dx_intl_trophy']>;
  _in?: Maybe<Array<Scalars['dx_intl_trophy']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['dx_intl_trophy']>;
  _lte?: Maybe<Scalars['dx_intl_trophy']>;
  _neq?: Maybe<Scalars['dx_intl_trophy']>;
  _nin?: Maybe<Array<Scalars['dx_intl_trophy']>>;
};

/** columns and relationships of "dx_intl_variants" */
export type Dx_Intl_Variants = {
  __typename?: 'dx_intl_variants';
  active: Scalars['Boolean'];
  deluxe: Scalars['Boolean'];
  /** An array relationship */
  dx_intl_notes: Array<Dx_Intl_Notes>;
  /** An aggregated array relationship */
  dx_intl_notes_aggregate: Dx_Intl_Notes_Aggregate;
  /** An object relationship */
  dx_intl_song: Dx_Intl_Songs;
  song_id: Scalars['Int'];
  version: Scalars['smallint'];
};


/** columns and relationships of "dx_intl_variants" */
export type Dx_Intl_VariantsDx_Intl_NotesArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Notes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Notes_Order_By>>;
  where?: Maybe<Dx_Intl_Notes_Bool_Exp>;
};


/** columns and relationships of "dx_intl_variants" */
export type Dx_Intl_VariantsDx_Intl_Notes_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Notes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Notes_Order_By>>;
  where?: Maybe<Dx_Intl_Notes_Bool_Exp>;
};

/** aggregated selection of "dx_intl_variants" */
export type Dx_Intl_Variants_Aggregate = {
  __typename?: 'dx_intl_variants_aggregate';
  aggregate?: Maybe<Dx_Intl_Variants_Aggregate_Fields>;
  nodes: Array<Dx_Intl_Variants>;
};

/** aggregate fields of "dx_intl_variants" */
export type Dx_Intl_Variants_Aggregate_Fields = {
  __typename?: 'dx_intl_variants_aggregate_fields';
  avg?: Maybe<Dx_Intl_Variants_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dx_Intl_Variants_Max_Fields>;
  min?: Maybe<Dx_Intl_Variants_Min_Fields>;
  stddev?: Maybe<Dx_Intl_Variants_Stddev_Fields>;
  stddev_pop?: Maybe<Dx_Intl_Variants_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dx_Intl_Variants_Stddev_Samp_Fields>;
  sum?: Maybe<Dx_Intl_Variants_Sum_Fields>;
  var_pop?: Maybe<Dx_Intl_Variants_Var_Pop_Fields>;
  var_samp?: Maybe<Dx_Intl_Variants_Var_Samp_Fields>;
  variance?: Maybe<Dx_Intl_Variants_Variance_Fields>;
};


/** aggregate fields of "dx_intl_variants" */
export type Dx_Intl_Variants_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Dx_Intl_Variants_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dx_intl_variants" */
export type Dx_Intl_Variants_Aggregate_Order_By = {
  avg?: Maybe<Dx_Intl_Variants_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Dx_Intl_Variants_Max_Order_By>;
  min?: Maybe<Dx_Intl_Variants_Min_Order_By>;
  stddev?: Maybe<Dx_Intl_Variants_Stddev_Order_By>;
  stddev_pop?: Maybe<Dx_Intl_Variants_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Dx_Intl_Variants_Stddev_Samp_Order_By>;
  sum?: Maybe<Dx_Intl_Variants_Sum_Order_By>;
  var_pop?: Maybe<Dx_Intl_Variants_Var_Pop_Order_By>;
  var_samp?: Maybe<Dx_Intl_Variants_Var_Samp_Order_By>;
  variance?: Maybe<Dx_Intl_Variants_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "dx_intl_variants" */
export type Dx_Intl_Variants_Arr_Rel_Insert_Input = {
  data: Array<Dx_Intl_Variants_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Variants_On_Conflict>;
};

/** aggregate avg on columns */
export type Dx_Intl_Variants_Avg_Fields = {
  __typename?: 'dx_intl_variants_avg_fields';
  song_id?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Avg_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "dx_intl_variants". All fields are combined with a logical 'AND'. */
export type Dx_Intl_Variants_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Dx_Intl_Variants_Bool_Exp>>>;
  _not?: Maybe<Dx_Intl_Variants_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Dx_Intl_Variants_Bool_Exp>>>;
  active?: Maybe<Boolean_Comparison_Exp>;
  deluxe?: Maybe<Boolean_Comparison_Exp>;
  dx_intl_notes?: Maybe<Dx_Intl_Notes_Bool_Exp>;
  dx_intl_song?: Maybe<Dx_Intl_Songs_Bool_Exp>;
  song_id?: Maybe<Int_Comparison_Exp>;
  version?: Maybe<Smallint_Comparison_Exp>;
};

/** unique or primary key constraints on table "dx_intl_variants" */
export enum Dx_Intl_Variants_Constraint {
  /** unique or primary key constraint */
  DxIntlVariantsPkey = 'dx_intl_variants_pkey'
}

/** input type for incrementing integer column in table "dx_intl_variants" */
export type Dx_Intl_Variants_Inc_Input = {
  song_id?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['smallint']>;
};

/** input type for inserting data into table "dx_intl_variants" */
export type Dx_Intl_Variants_Insert_Input = {
  active?: Maybe<Scalars['Boolean']>;
  deluxe?: Maybe<Scalars['Boolean']>;
  dx_intl_notes?: Maybe<Dx_Intl_Notes_Arr_Rel_Insert_Input>;
  dx_intl_song?: Maybe<Dx_Intl_Songs_Obj_Rel_Insert_Input>;
  song_id?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['smallint']>;
};

/** aggregate max on columns */
export type Dx_Intl_Variants_Max_Fields = {
  __typename?: 'dx_intl_variants_max_fields';
  song_id?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['smallint']>;
};

/** order by max() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Max_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Dx_Intl_Variants_Min_Fields = {
  __typename?: 'dx_intl_variants_min_fields';
  song_id?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['smallint']>;
};

/** order by min() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Min_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** response of any mutation on the table "dx_intl_variants" */
export type Dx_Intl_Variants_Mutation_Response = {
  __typename?: 'dx_intl_variants_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dx_Intl_Variants>;
};

/** input type for inserting object relation for remote table "dx_intl_variants" */
export type Dx_Intl_Variants_Obj_Rel_Insert_Input = {
  data: Dx_Intl_Variants_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Variants_On_Conflict>;
};

/** on conflict condition type for table "dx_intl_variants" */
export type Dx_Intl_Variants_On_Conflict = {
  constraint: Dx_Intl_Variants_Constraint;
  update_columns: Array<Dx_Intl_Variants_Update_Column>;
  where?: Maybe<Dx_Intl_Variants_Bool_Exp>;
};

/** ordering options when selecting data from "dx_intl_variants" */
export type Dx_Intl_Variants_Order_By = {
  active?: Maybe<Order_By>;
  deluxe?: Maybe<Order_By>;
  dx_intl_notes_aggregate?: Maybe<Dx_Intl_Notes_Aggregate_Order_By>;
  dx_intl_song?: Maybe<Dx_Intl_Songs_Order_By>;
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** primary key columns input for table: "dx_intl_variants" */
export type Dx_Intl_Variants_Pk_Columns_Input = {
  deluxe: Scalars['Boolean'];
  song_id: Scalars['Int'];
};

/** select columns of table "dx_intl_variants" */
export enum Dx_Intl_Variants_Select_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Deluxe = 'deluxe',
  /** column name */
  SongId = 'song_id',
  /** column name */
  Version = 'version'
}

/** input type for updating data in table "dx_intl_variants" */
export type Dx_Intl_Variants_Set_Input = {
  active?: Maybe<Scalars['Boolean']>;
  deluxe?: Maybe<Scalars['Boolean']>;
  song_id?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['smallint']>;
};

/** aggregate stddev on columns */
export type Dx_Intl_Variants_Stddev_Fields = {
  __typename?: 'dx_intl_variants_stddev_fields';
  song_id?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Stddev_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Dx_Intl_Variants_Stddev_Pop_Fields = {
  __typename?: 'dx_intl_variants_stddev_pop_fields';
  song_id?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Stddev_Pop_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Dx_Intl_Variants_Stddev_Samp_Fields = {
  __typename?: 'dx_intl_variants_stddev_samp_fields';
  song_id?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Stddev_Samp_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Dx_Intl_Variants_Sum_Fields = {
  __typename?: 'dx_intl_variants_sum_fields';
  song_id?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['smallint']>;
};

/** order by sum() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Sum_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** update columns of table "dx_intl_variants" */
export enum Dx_Intl_Variants_Update_Column {
  /** column name */
  Active = 'active',
  /** column name */
  Deluxe = 'deluxe',
  /** column name */
  SongId = 'song_id',
  /** column name */
  Version = 'version'
}

/** aggregate var_pop on columns */
export type Dx_Intl_Variants_Var_Pop_Fields = {
  __typename?: 'dx_intl_variants_var_pop_fields';
  song_id?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Var_Pop_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Dx_Intl_Variants_Var_Samp_Fields = {
  __typename?: 'dx_intl_variants_var_samp_fields';
  song_id?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Var_Samp_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Dx_Intl_Variants_Variance_Fields = {
  __typename?: 'dx_intl_variants_variance_fields';
  song_id?: Maybe<Scalars['Float']>;
  version?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "dx_intl_variants" */
export type Dx_Intl_Variants_Variance_Order_By = {
  song_id?: Maybe<Order_By>;
  version?: Maybe<Order_By>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "dx_intl_notes" */
  delete_dx_intl_notes?: Maybe<Dx_Intl_Notes_Mutation_Response>;
  /** delete single row from the table: "dx_intl_notes" */
  delete_dx_intl_notes_by_pk?: Maybe<Dx_Intl_Notes>;
  /** delete data from the table: "dx_intl_players" */
  delete_dx_intl_players?: Maybe<Dx_Intl_Players_Mutation_Response>;
  /** delete single row from the table: "dx_intl_players" */
  delete_dx_intl_players_by_pk?: Maybe<Dx_Intl_Players>;
  /** delete data from the table: "dx_intl_records" */
  delete_dx_intl_records?: Maybe<Dx_Intl_Records_Mutation_Response>;
  /** delete single row from the table: "dx_intl_records" */
  delete_dx_intl_records_by_pk?: Maybe<Dx_Intl_Records>;
  /** delete data from the table: "dx_intl_scores" */
  delete_dx_intl_scores?: Maybe<Dx_Intl_Scores_Mutation_Response>;
  /** delete single row from the table: "dx_intl_scores" */
  delete_dx_intl_scores_by_pk?: Maybe<Dx_Intl_Scores>;
  /** delete data from the table: "dx_intl_songs" */
  delete_dx_intl_songs?: Maybe<Dx_Intl_Songs_Mutation_Response>;
  /** delete single row from the table: "dx_intl_songs" */
  delete_dx_intl_songs_by_pk?: Maybe<Dx_Intl_Songs>;
  /** delete data from the table: "dx_intl_variants" */
  delete_dx_intl_variants?: Maybe<Dx_Intl_Variants_Mutation_Response>;
  /** delete single row from the table: "dx_intl_variants" */
  delete_dx_intl_variants_by_pk?: Maybe<Dx_Intl_Variants>;
  /** delete data from the table: "tokens" */
  delete_tokens?: Maybe<Tokens_Mutation_Response>;
  /** delete single row from the table: "tokens" */
  delete_tokens_by_pk?: Maybe<Tokens>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "dx_intl_notes" */
  insert_dx_intl_notes?: Maybe<Dx_Intl_Notes_Mutation_Response>;
  /** insert a single row into the table: "dx_intl_notes" */
  insert_dx_intl_notes_one?: Maybe<Dx_Intl_Notes>;
  /** insert data into the table: "dx_intl_players" */
  insert_dx_intl_players?: Maybe<Dx_Intl_Players_Mutation_Response>;
  /** insert a single row into the table: "dx_intl_players" */
  insert_dx_intl_players_one?: Maybe<Dx_Intl_Players>;
  /** insert data into the table: "dx_intl_records" */
  insert_dx_intl_records?: Maybe<Dx_Intl_Records_Mutation_Response>;
  /** insert a single row into the table: "dx_intl_records" */
  insert_dx_intl_records_one?: Maybe<Dx_Intl_Records>;
  /** insert data into the table: "dx_intl_scores" */
  insert_dx_intl_scores?: Maybe<Dx_Intl_Scores_Mutation_Response>;
  /** insert a single row into the table: "dx_intl_scores" */
  insert_dx_intl_scores_one?: Maybe<Dx_Intl_Scores>;
  /** insert data into the table: "dx_intl_songs" */
  insert_dx_intl_songs?: Maybe<Dx_Intl_Songs_Mutation_Response>;
  /** insert a single row into the table: "dx_intl_songs" */
  insert_dx_intl_songs_one?: Maybe<Dx_Intl_Songs>;
  /** insert data into the table: "dx_intl_variants" */
  insert_dx_intl_variants?: Maybe<Dx_Intl_Variants_Mutation_Response>;
  /** insert a single row into the table: "dx_intl_variants" */
  insert_dx_intl_variants_one?: Maybe<Dx_Intl_Variants>;
  /** insert data into the table: "tokens" */
  insert_tokens?: Maybe<Tokens_Mutation_Response>;
  /** insert a single row into the table: "tokens" */
  insert_tokens_one?: Maybe<Tokens>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "dx_intl_notes" */
  update_dx_intl_notes?: Maybe<Dx_Intl_Notes_Mutation_Response>;
  /** update single row of the table: "dx_intl_notes" */
  update_dx_intl_notes_by_pk?: Maybe<Dx_Intl_Notes>;
  /** update data of the table: "dx_intl_players" */
  update_dx_intl_players?: Maybe<Dx_Intl_Players_Mutation_Response>;
  /** update single row of the table: "dx_intl_players" */
  update_dx_intl_players_by_pk?: Maybe<Dx_Intl_Players>;
  /** update data of the table: "dx_intl_records" */
  update_dx_intl_records?: Maybe<Dx_Intl_Records_Mutation_Response>;
  /** update single row of the table: "dx_intl_records" */
  update_dx_intl_records_by_pk?: Maybe<Dx_Intl_Records>;
  /** update data of the table: "dx_intl_scores" */
  update_dx_intl_scores?: Maybe<Dx_Intl_Scores_Mutation_Response>;
  /** update single row of the table: "dx_intl_scores" */
  update_dx_intl_scores_by_pk?: Maybe<Dx_Intl_Scores>;
  /** update data of the table: "dx_intl_songs" */
  update_dx_intl_songs?: Maybe<Dx_Intl_Songs_Mutation_Response>;
  /** update single row of the table: "dx_intl_songs" */
  update_dx_intl_songs_by_pk?: Maybe<Dx_Intl_Songs>;
  /** update data of the table: "dx_intl_variants" */
  update_dx_intl_variants?: Maybe<Dx_Intl_Variants_Mutation_Response>;
  /** update single row of the table: "dx_intl_variants" */
  update_dx_intl_variants_by_pk?: Maybe<Dx_Intl_Variants>;
  /** update data of the table: "tokens" */
  update_tokens?: Maybe<Tokens_Mutation_Response>;
  /** update single row of the table: "tokens" */
  update_tokens_by_pk?: Maybe<Tokens>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_NotesArgs = {
  where: Dx_Intl_Notes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Notes_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_PlayersArgs = {
  where: Dx_Intl_Players_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Players_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_RecordsArgs = {
  where: Dx_Intl_Records_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Records_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_ScoresArgs = {
  where: Dx_Intl_Scores_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Scores_By_PkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_SongsArgs = {
  where: Dx_Intl_Songs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Songs_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_VariantsArgs = {
  where: Dx_Intl_Variants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Dx_Intl_Variants_By_PkArgs = {
  deluxe: Scalars['Boolean'];
  song_id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_TokensArgs = {
  where: Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Tokens_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_NotesArgs = {
  objects: Array<Dx_Intl_Notes_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Notes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Notes_OneArgs = {
  object: Dx_Intl_Notes_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Notes_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_PlayersArgs = {
  objects: Array<Dx_Intl_Players_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Players_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Players_OneArgs = {
  object: Dx_Intl_Players_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Players_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_RecordsArgs = {
  objects: Array<Dx_Intl_Records_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Records_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Records_OneArgs = {
  object: Dx_Intl_Records_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Records_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_ScoresArgs = {
  objects: Array<Dx_Intl_Scores_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Scores_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Scores_OneArgs = {
  object: Dx_Intl_Scores_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Scores_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_SongsArgs = {
  objects: Array<Dx_Intl_Songs_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Songs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Songs_OneArgs = {
  object: Dx_Intl_Songs_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Songs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_VariantsArgs = {
  objects: Array<Dx_Intl_Variants_Insert_Input>;
  on_conflict?: Maybe<Dx_Intl_Variants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dx_Intl_Variants_OneArgs = {
  object: Dx_Intl_Variants_Insert_Input;
  on_conflict?: Maybe<Dx_Intl_Variants_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TokensArgs = {
  objects: Array<Tokens_Insert_Input>;
  on_conflict?: Maybe<Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Tokens_OneArgs = {
  object: Tokens_Insert_Input;
  on_conflict?: Maybe<Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_NotesArgs = {
  _inc?: Maybe<Dx_Intl_Notes_Inc_Input>;
  _set?: Maybe<Dx_Intl_Notes_Set_Input>;
  where: Dx_Intl_Notes_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Notes_By_PkArgs = {
  _inc?: Maybe<Dx_Intl_Notes_Inc_Input>;
  _set?: Maybe<Dx_Intl_Notes_Set_Input>;
  pk_columns: Dx_Intl_Notes_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_PlayersArgs = {
  _inc?: Maybe<Dx_Intl_Players_Inc_Input>;
  _set?: Maybe<Dx_Intl_Players_Set_Input>;
  where: Dx_Intl_Players_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Players_By_PkArgs = {
  _inc?: Maybe<Dx_Intl_Players_Inc_Input>;
  _set?: Maybe<Dx_Intl_Players_Set_Input>;
  pk_columns: Dx_Intl_Players_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_RecordsArgs = {
  _inc?: Maybe<Dx_Intl_Records_Inc_Input>;
  _set?: Maybe<Dx_Intl_Records_Set_Input>;
  where: Dx_Intl_Records_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Records_By_PkArgs = {
  _inc?: Maybe<Dx_Intl_Records_Inc_Input>;
  _set?: Maybe<Dx_Intl_Records_Set_Input>;
  pk_columns: Dx_Intl_Records_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_ScoresArgs = {
  _inc?: Maybe<Dx_Intl_Scores_Inc_Input>;
  _set?: Maybe<Dx_Intl_Scores_Set_Input>;
  where: Dx_Intl_Scores_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Scores_By_PkArgs = {
  _inc?: Maybe<Dx_Intl_Scores_Inc_Input>;
  _set?: Maybe<Dx_Intl_Scores_Set_Input>;
  pk_columns: Dx_Intl_Scores_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_SongsArgs = {
  _inc?: Maybe<Dx_Intl_Songs_Inc_Input>;
  _set?: Maybe<Dx_Intl_Songs_Set_Input>;
  where: Dx_Intl_Songs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Songs_By_PkArgs = {
  _inc?: Maybe<Dx_Intl_Songs_Inc_Input>;
  _set?: Maybe<Dx_Intl_Songs_Set_Input>;
  pk_columns: Dx_Intl_Songs_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_VariantsArgs = {
  _inc?: Maybe<Dx_Intl_Variants_Inc_Input>;
  _set?: Maybe<Dx_Intl_Variants_Set_Input>;
  where: Dx_Intl_Variants_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Dx_Intl_Variants_By_PkArgs = {
  _inc?: Maybe<Dx_Intl_Variants_Inc_Input>;
  _set?: Maybe<Dx_Intl_Variants_Set_Input>;
  pk_columns: Dx_Intl_Variants_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_TokensArgs = {
  _set?: Maybe<Tokens_Set_Input>;
  where: Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Tokens_By_PkArgs = {
  _set?: Maybe<Tokens_Set_Input>;
  pk_columns: Tokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>;
  _gt?: Maybe<Scalars['numeric']>;
  _gte?: Maybe<Scalars['numeric']>;
  _in?: Maybe<Array<Scalars['numeric']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['numeric']>;
  _lte?: Maybe<Scalars['numeric']>;
  _neq?: Maybe<Scalars['numeric']>;
  _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "dx_intl_notes" */
  dx_intl_notes: Array<Dx_Intl_Notes>;
  /** fetch aggregated fields from the table: "dx_intl_notes" */
  dx_intl_notes_aggregate: Dx_Intl_Notes_Aggregate;
  /** fetch data from the table: "dx_intl_notes" using primary key columns */
  dx_intl_notes_by_pk?: Maybe<Dx_Intl_Notes>;
  /** fetch data from the table: "dx_intl_players" */
  dx_intl_players: Array<Dx_Intl_Players>;
  /** fetch aggregated fields from the table: "dx_intl_players" */
  dx_intl_players_aggregate: Dx_Intl_Players_Aggregate;
  /** fetch data from the table: "dx_intl_players" using primary key columns */
  dx_intl_players_by_pk?: Maybe<Dx_Intl_Players>;
  /** fetch data from the table: "dx_intl_records" */
  dx_intl_records: Array<Dx_Intl_Records>;
  /** fetch aggregated fields from the table: "dx_intl_records" */
  dx_intl_records_aggregate: Dx_Intl_Records_Aggregate;
  /** fetch data from the table: "dx_intl_records" using primary key columns */
  dx_intl_records_by_pk?: Maybe<Dx_Intl_Records>;
  /** fetch data from the table: "dx_intl_records_with_history" */
  dx_intl_records_with_history: Array<Dx_Intl_Records_With_History>;
  /** fetch aggregated fields from the table: "dx_intl_records_with_history" */
  dx_intl_records_with_history_aggregate: Dx_Intl_Records_With_History_Aggregate;
  /** fetch data from the table: "dx_intl_scores" */
  dx_intl_scores: Array<Dx_Intl_Scores>;
  /** fetch aggregated fields from the table: "dx_intl_scores" */
  dx_intl_scores_aggregate: Dx_Intl_Scores_Aggregate;
  /** fetch data from the table: "dx_intl_scores" using primary key columns */
  dx_intl_scores_by_pk?: Maybe<Dx_Intl_Scores>;
  /** fetch data from the table: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history: Array<Dx_Intl_Scores_With_History>;
  /** fetch aggregated fields from the table: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history_aggregate: Dx_Intl_Scores_With_History_Aggregate;
  /** fetch data from the table: "dx_intl_songs" */
  dx_intl_songs: Array<Dx_Intl_Songs>;
  /** fetch aggregated fields from the table: "dx_intl_songs" */
  dx_intl_songs_aggregate: Dx_Intl_Songs_Aggregate;
  /** fetch data from the table: "dx_intl_songs" using primary key columns */
  dx_intl_songs_by_pk?: Maybe<Dx_Intl_Songs>;
  /** fetch data from the table: "dx_intl_variants" */
  dx_intl_variants: Array<Dx_Intl_Variants>;
  /** fetch aggregated fields from the table: "dx_intl_variants" */
  dx_intl_variants_aggregate: Dx_Intl_Variants_Aggregate;
  /** fetch data from the table: "dx_intl_variants" using primary key columns */
  dx_intl_variants_by_pk?: Maybe<Dx_Intl_Variants>;
  /** fetch data from the table: "tokens" */
  tokens: Array<Tokens>;
  /** fetch aggregated fields from the table: "tokens" */
  tokens_aggregate: Tokens_Aggregate;
  /** fetch data from the table: "tokens" using primary key columns */
  tokens_by_pk?: Maybe<Tokens>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootDx_Intl_NotesArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Notes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Notes_Order_By>>;
  where?: Maybe<Dx_Intl_Notes_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Notes_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Notes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Notes_Order_By>>;
  where?: Maybe<Dx_Intl_Notes_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Notes_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootDx_Intl_PlayersArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Players_Order_By>>;
  where?: Maybe<Dx_Intl_Players_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Players_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Players_Order_By>>;
  where?: Maybe<Dx_Intl_Players_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Players_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootDx_Intl_RecordsArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_Order_By>>;
  where?: Maybe<Dx_Intl_Records_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Records_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_Order_By>>;
  where?: Maybe<Dx_Intl_Records_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Records_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootDx_Intl_Records_With_HistoryArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_With_History_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_With_History_Order_By>>;
  where?: Maybe<Dx_Intl_Records_With_History_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Records_With_History_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_With_History_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_With_History_Order_By>>;
  where?: Maybe<Dx_Intl_Records_With_History_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_ScoresArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Scores_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Scores_By_PkArgs = {
  id: Scalars['bigint'];
};


/** query root */
export type Query_RootDx_Intl_Scores_With_HistoryArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_With_History_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_With_History_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_With_History_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Scores_With_History_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_With_History_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_With_History_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_With_History_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_SongsArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Songs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Songs_Order_By>>;
  where?: Maybe<Dx_Intl_Songs_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Songs_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Songs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Songs_Order_By>>;
  where?: Maybe<Dx_Intl_Songs_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Songs_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootDx_Intl_VariantsArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Variants_Order_By>>;
  where?: Maybe<Dx_Intl_Variants_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Variants_Order_By>>;
  where?: Maybe<Dx_Intl_Variants_Bool_Exp>;
};


/** query root */
export type Query_RootDx_Intl_Variants_By_PkArgs = {
  deluxe: Scalars['Boolean'];
  song_id: Scalars['Int'];
};


/** query root */
export type Query_RootTokensArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** query root */
export type Query_RootTokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** query root */
export type Query_RootTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


/** expression to compare columns of type smallint. All fields are combined with logical 'AND'. */
export type Smallint_Comparison_Exp = {
  _eq?: Maybe<Scalars['smallint']>;
  _gt?: Maybe<Scalars['smallint']>;
  _gte?: Maybe<Scalars['smallint']>;
  _in?: Maybe<Array<Scalars['smallint']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['smallint']>;
  _lte?: Maybe<Scalars['smallint']>;
  _neq?: Maybe<Scalars['smallint']>;
  _nin?: Maybe<Array<Scalars['smallint']>>;
};

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "dx_intl_notes" */
  dx_intl_notes: Array<Dx_Intl_Notes>;
  /** fetch aggregated fields from the table: "dx_intl_notes" */
  dx_intl_notes_aggregate: Dx_Intl_Notes_Aggregate;
  /** fetch data from the table: "dx_intl_notes" using primary key columns */
  dx_intl_notes_by_pk?: Maybe<Dx_Intl_Notes>;
  /** fetch data from the table: "dx_intl_players" */
  dx_intl_players: Array<Dx_Intl_Players>;
  /** fetch aggregated fields from the table: "dx_intl_players" */
  dx_intl_players_aggregate: Dx_Intl_Players_Aggregate;
  /** fetch data from the table: "dx_intl_players" using primary key columns */
  dx_intl_players_by_pk?: Maybe<Dx_Intl_Players>;
  /** fetch data from the table: "dx_intl_records" */
  dx_intl_records: Array<Dx_Intl_Records>;
  /** fetch aggregated fields from the table: "dx_intl_records" */
  dx_intl_records_aggregate: Dx_Intl_Records_Aggregate;
  /** fetch data from the table: "dx_intl_records" using primary key columns */
  dx_intl_records_by_pk?: Maybe<Dx_Intl_Records>;
  /** fetch data from the table: "dx_intl_records_with_history" */
  dx_intl_records_with_history: Array<Dx_Intl_Records_With_History>;
  /** fetch aggregated fields from the table: "dx_intl_records_with_history" */
  dx_intl_records_with_history_aggregate: Dx_Intl_Records_With_History_Aggregate;
  /** fetch data from the table: "dx_intl_scores" */
  dx_intl_scores: Array<Dx_Intl_Scores>;
  /** fetch aggregated fields from the table: "dx_intl_scores" */
  dx_intl_scores_aggregate: Dx_Intl_Scores_Aggregate;
  /** fetch data from the table: "dx_intl_scores" using primary key columns */
  dx_intl_scores_by_pk?: Maybe<Dx_Intl_Scores>;
  /** fetch data from the table: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history: Array<Dx_Intl_Scores_With_History>;
  /** fetch aggregated fields from the table: "dx_intl_scores_with_history" */
  dx_intl_scores_with_history_aggregate: Dx_Intl_Scores_With_History_Aggregate;
  /** fetch data from the table: "dx_intl_songs" */
  dx_intl_songs: Array<Dx_Intl_Songs>;
  /** fetch aggregated fields from the table: "dx_intl_songs" */
  dx_intl_songs_aggregate: Dx_Intl_Songs_Aggregate;
  /** fetch data from the table: "dx_intl_songs" using primary key columns */
  dx_intl_songs_by_pk?: Maybe<Dx_Intl_Songs>;
  /** fetch data from the table: "dx_intl_variants" */
  dx_intl_variants: Array<Dx_Intl_Variants>;
  /** fetch aggregated fields from the table: "dx_intl_variants" */
  dx_intl_variants_aggregate: Dx_Intl_Variants_Aggregate;
  /** fetch data from the table: "dx_intl_variants" using primary key columns */
  dx_intl_variants_by_pk?: Maybe<Dx_Intl_Variants>;
  /** fetch data from the table: "tokens" */
  tokens: Array<Tokens>;
  /** fetch aggregated fields from the table: "tokens" */
  tokens_aggregate: Tokens_Aggregate;
  /** fetch data from the table: "tokens" using primary key columns */
  tokens_by_pk?: Maybe<Tokens>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootDx_Intl_NotesArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Notes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Notes_Order_By>>;
  where?: Maybe<Dx_Intl_Notes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Notes_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Notes_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Notes_Order_By>>;
  where?: Maybe<Dx_Intl_Notes_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Notes_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootDx_Intl_PlayersArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Players_Order_By>>;
  where?: Maybe<Dx_Intl_Players_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Players_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Players_Order_By>>;
  where?: Maybe<Dx_Intl_Players_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Players_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootDx_Intl_RecordsArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_Order_By>>;
  where?: Maybe<Dx_Intl_Records_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Records_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_Order_By>>;
  where?: Maybe<Dx_Intl_Records_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Records_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootDx_Intl_Records_With_HistoryArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_With_History_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_With_History_Order_By>>;
  where?: Maybe<Dx_Intl_Records_With_History_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Records_With_History_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Records_With_History_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Records_With_History_Order_By>>;
  where?: Maybe<Dx_Intl_Records_With_History_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_ScoresArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Scores_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Scores_By_PkArgs = {
  id: Scalars['bigint'];
};


/** subscription root */
export type Subscription_RootDx_Intl_Scores_With_HistoryArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_With_History_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_With_History_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_With_History_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Scores_With_History_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Scores_With_History_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Scores_With_History_Order_By>>;
  where?: Maybe<Dx_Intl_Scores_With_History_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_SongsArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Songs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Songs_Order_By>>;
  where?: Maybe<Dx_Intl_Songs_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Songs_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Songs_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Songs_Order_By>>;
  where?: Maybe<Dx_Intl_Songs_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Songs_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootDx_Intl_VariantsArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Variants_Order_By>>;
  where?: Maybe<Dx_Intl_Variants_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Variants_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Variants_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Variants_Order_By>>;
  where?: Maybe<Dx_Intl_Variants_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDx_Intl_Variants_By_PkArgs = {
  deluxe: Scalars['Boolean'];
  song_id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootTokensArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTokens_AggregateArgs = {
  distinct_on?: Maybe<Array<Tokens_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Tokens_Order_By>>;
  where?: Maybe<Tokens_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootTokens_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "tokens" */
export type Tokens = {
  __typename?: 'tokens';
  created_at: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "tokens" */
export type Tokens_Aggregate = {
  __typename?: 'tokens_aggregate';
  aggregate?: Maybe<Tokens_Aggregate_Fields>;
  nodes: Array<Tokens>;
};

/** aggregate fields of "tokens" */
export type Tokens_Aggregate_Fields = {
  __typename?: 'tokens_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Tokens_Max_Fields>;
  min?: Maybe<Tokens_Min_Fields>;
};


/** aggregate fields of "tokens" */
export type Tokens_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Tokens_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "tokens" */
export type Tokens_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Tokens_Max_Order_By>;
  min?: Maybe<Tokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "tokens" */
export type Tokens_Arr_Rel_Insert_Input = {
  data: Array<Tokens_Insert_Input>;
  on_conflict?: Maybe<Tokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "tokens". All fields are combined with a logical 'AND'. */
export type Tokens_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Tokens_Bool_Exp>>>;
  _not?: Maybe<Tokens_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Tokens_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "tokens" */
export enum Tokens_Constraint {
  /** unique or primary key constraint */
  TokensPkey = 'tokens_pkey',
  /** unique or primary key constraint */
  TokensUserIdKey = 'tokens_user_id_key'
}

/** input type for inserting data into table "tokens" */
export type Tokens_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Tokens_Max_Fields = {
  __typename?: 'tokens_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "tokens" */
export type Tokens_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Tokens_Min_Fields = {
  __typename?: 'tokens_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "tokens" */
export type Tokens_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "tokens" */
export type Tokens_Mutation_Response = {
  __typename?: 'tokens_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Tokens>;
};

/** input type for inserting object relation for remote table "tokens" */
export type Tokens_Obj_Rel_Insert_Input = {
  data: Tokens_Insert_Input;
  on_conflict?: Maybe<Tokens_On_Conflict>;
};

/** on conflict condition type for table "tokens" */
export type Tokens_On_Conflict = {
  constraint: Tokens_Constraint;
  update_columns: Array<Tokens_Update_Column>;
  where?: Maybe<Tokens_Bool_Exp>;
};

/** ordering options when selecting data from "tokens" */
export type Tokens_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "tokens" */
export type Tokens_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "tokens" */
export enum Tokens_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "tokens" */
export type Tokens_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['uuid']>;
  user_id?: Maybe<Scalars['String']>;
};

/** update columns of table "tokens" */
export enum Tokens_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  UserId = 'user_id'
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  dx_intl_players: Array<Dx_Intl_Players>;
  /** An aggregated array relationship */
  dx_intl_players_aggregate: Dx_Intl_Players_Aggregate;
  id: Scalars['String'];
  /** An object relationship */
  token?: Maybe<Tokens>;
};


/** columns and relationships of "users" */
export type UsersDx_Intl_PlayersArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Players_Order_By>>;
  where?: Maybe<Dx_Intl_Players_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersDx_Intl_Players_AggregateArgs = {
  distinct_on?: Maybe<Array<Dx_Intl_Players_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Dx_Intl_Players_Order_By>>;
  where?: Maybe<Dx_Intl_Players_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  dx_intl_players?: Maybe<Dx_Intl_Players_Bool_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  token?: Maybe<Tokens_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  dx_intl_players?: Maybe<Dx_Intl_Players_Arr_Rel_Insert_Input>;
  id?: Maybe<Scalars['String']>;
  token?: Maybe<Tokens_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  created_at?: Maybe<Order_By>;
  dx_intl_players_aggregate?: Maybe<Dx_Intl_Players_Aggregate_Order_By>;
  id?: Maybe<Order_By>;
  token?: Maybe<Tokens_Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type TokensQueryVariables = Exact<{ [key: string]: never; }>;


export type TokensQuery = (
  { __typename?: 'query_root' }
  & { tokens: Array<(
    { __typename?: 'tokens' }
    & Pick<Tokens, 'id' | 'created_at'>
  )> }
);

export type RegenerateTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RegenerateTokenMutation = (
  { __typename?: 'mutation_root' }
  & { delete_tokens?: Maybe<(
    { __typename?: 'tokens_mutation_response' }
    & Pick<Tokens_Mutation_Response, 'affected_rows'>
  )>, insert_tokens_one?: Maybe<(
    { __typename?: 'tokens' }
    & Pick<Tokens, 'id'>
  )> }
);

export type DxIntlPlayersQueryVariables = Exact<{
  userId?: Maybe<Scalars['String']>;
}>;


export type DxIntlPlayersQuery = (
  { __typename?: 'query_root' }
  & { dx_intl_players: Array<(
    { __typename?: 'dx_intl_players' }
    & Pick<Dx_Intl_Players, 'id' | 'nickname' | 'private' | 'created_at'>
    & { dx_intl_record?: Maybe<(
      { __typename?: 'dx_intl_records' }
      & Pick<Dx_Intl_Records, 'card_name'>
    )> }
  )> }
);

export type InsertDxIntlPlayerMutationVariables = Exact<{
  nickname?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
}>;


export type InsertDxIntlPlayerMutation = (
  { __typename?: 'mutation_root' }
  & { insert_dx_intl_players_one?: Maybe<(
    { __typename?: 'dx_intl_players' }
    & Pick<Dx_Intl_Players, 'id'>
  )> }
);

export type UpdateDxIntlPlayerMutationVariables = Exact<{
  pk: Scalars['Int'];
  nickname?: Maybe<Scalars['String']>;
  private?: Maybe<Scalars['Boolean']>;
}>;


export type UpdateDxIntlPlayerMutation = (
  { __typename?: 'mutation_root' }
  & { update_dx_intl_players_by_pk?: Maybe<(
    { __typename?: 'dx_intl_players' }
    & Pick<Dx_Intl_Players, 'id'>
  )> }
);

export type DeleteDxIntlPlayerMutationVariables = Exact<{
  pk: Scalars['Int'];
}>;


export type DeleteDxIntlPlayerMutation = (
  { __typename?: 'mutation_root' }
  & { delete_dx_intl_players_by_pk?: Maybe<(
    { __typename?: 'dx_intl_players' }
    & Pick<Dx_Intl_Players, 'id'>
  )> }
);

export type DxIntlSongsQueryVariables = Exact<{ [key: string]: never; }>;


export type DxIntlSongsQuery = (
  { __typename?: 'query_root' }
  & { dx_intl_songs: Array<(
    { __typename?: 'dx_intl_songs' }
    & Pick<Dx_Intl_Songs, 'category' | 'title' | 'order'>
    & { dx_intl_variants: Array<(
      { __typename?: 'dx_intl_variants' }
      & Pick<Dx_Intl_Variants, 'deluxe' | 'version' | 'active'>
      & { dx_intl_notes: Array<(
        { __typename?: 'dx_intl_notes' }
        & Pick<Dx_Intl_Notes, 'difficulty' | 'level'>
      )> }
    )> }
  )> }
);

export type DxIntlRecordWithScoresQueryVariables = Exact<{
  nickname: Scalars['String'];
}>;


export type DxIntlRecordWithScoresQuery = (
  { __typename?: 'query_root' }
  & { dx_intl_records: Array<(
    { __typename?: 'dx_intl_records' }
    & Pick<Dx_Intl_Records, 'card_name' | 'title' | 'trophy' | 'rating' | 'max_rating' | 'grade'>
  )>, dx_intl_scores: Array<(
    { __typename?: 'dx_intl_scores' }
    & Pick<Dx_Intl_Scores, 'note_id' | 'score' | 'combo_flag' | 'sync_flag'>
  )> }
);

export type InsertDxIntlRecordWithScoresMutationVariables = Exact<{
  record: Dx_Intl_Records_Insert_Input;
  scores: Array<Dx_Intl_Scores_Insert_Input>;
}>;


export type InsertDxIntlRecordWithScoresMutation = (
  { __typename?: 'mutation_root' }
  & { insert_dx_intl_records_one?: Maybe<(
    { __typename?: 'dx_intl_records' }
    & Pick<Dx_Intl_Records, 'id'>
  )>, insert_dx_intl_scores?: Maybe<(
    { __typename?: 'dx_intl_scores_mutation_response' }
    & { returning: Array<(
      { __typename?: 'dx_intl_scores' }
      & Pick<Dx_Intl_Scores, 'id'>
    )> }
  )> }
);


export const TokensDocument: DocumentNode<TokensQuery, TokensQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tokens"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokens"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created_at"},"arguments":[],"directives":[]}]}}]}}]};
export const RegenerateTokenDocument: DocumentNode<RegenerateTokenMutation, RegenerateTokenMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"regenerateToken"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_tokens_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};
export const DxIntlPlayersDocument: DocumentNode<DxIntlPlayersQuery, DxIntlPlayersQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dxIntlPlayers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dx_intl_players"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"nickname"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"private"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created_at"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"dx_intl_record"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_name"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const InsertDxIntlPlayerDocument: DocumentNode<InsertDxIntlPlayerMutation, InsertDxIntlPlayerMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"insertDxIntlPlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"private"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_dx_intl_players_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"private"},"value":{"kind":"Variable","name":{"kind":"Name","value":"private"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};
export const UpdateDxIntlPlayerDocument: DocumentNode<UpdateDxIntlPlayerMutation, UpdateDxIntlPlayerMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateDxIntlPlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"private"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_dx_intl_players_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pk"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"nickname"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"private"},"value":{"kind":"Variable","name":{"kind":"Name","value":"private"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};
export const DeleteDxIntlPlayerDocument: DocumentNode<DeleteDxIntlPlayerMutation, DeleteDxIntlPlayerMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteDxIntlPlayer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_dx_intl_players_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pk"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};
export const DxIntlSongsDocument: DocumentNode<DxIntlSongsQuery, DxIntlSongsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dxIntlSongs"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dx_intl_songs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"order_by"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"category"},"value":{"kind":"EnumValue","value":"asc"}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"order"},"value":{"kind":"EnumValue","value":"asc"}}]}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"order"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"dx_intl_variants"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deluxe"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"version"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"active"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"dx_intl_notes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"difficulty"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"level"},"arguments":[],"directives":[]}]}}]}}]}}]}}]};
export const DxIntlRecordWithScoresDocument: DocumentNode<DxIntlRecordWithScoresQuery, DxIntlRecordWithScoresQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"dxIntlRecordWithScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dx_intl_records"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"dx_intl_player"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"nickname"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}}]}}]}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"trophy"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"rating"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"max_rating"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"grade"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"dx_intl_scores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"dx_intl_player"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"nickname"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nickname"}}}]}}]}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note_id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"score"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"combo_flag"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"sync_flag"},"arguments":[],"directives":[]}]}}]}}]};
export const InsertDxIntlRecordWithScoresDocument: DocumentNode<InsertDxIntlRecordWithScoresMutation, InsertDxIntlRecordWithScoresMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertDxIntlRecordWithScores"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"record"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"dx_intl_records_insert_input"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scores"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"dx_intl_scores_insert_input"}}}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_dx_intl_records_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"record"}}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"dx_intl_records_player_id_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"card_name"},{"kind":"EnumValue","value":"title"},{"kind":"EnumValue","value":"trophy"},{"kind":"EnumValue","value":"rating"},{"kind":"EnumValue","value":"max_rating"}]}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_dx_intl_scores"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scores"}}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"dx_intl_scores_player_id_note_id_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"score"},{"kind":"EnumValue","value":"combo_flag"},{"kind":"EnumValue","value":"sync_flag"}]}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]}}]};