import { initGraphQLTada } from "gql.tada"
import type { introspection } from "./graphql-env"

export const graphql = initGraphQLTada<{
  introspection: introspection
  scalars: {
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
    dx_intl_combo_flag: "" | "fc" | "fc+" | "ap" | "ap+"
    dx_intl_sync_flag: "" | "s" | "fs" | "fs+" | "fdx" | "fdx+"
    dx_intl_trophy: "normal" | "bronze" | "silver" | "gold" | "rainbow"
    dx_intl_scores_stats_ranges:
      | "AP+"
      | "SSS+"
      | "SSS"
      | "SS+"
      | "SS"
      | "S+"
      | "S"
      | "AAA"
      | "AA"
      | "A"
      | "D～BBB"
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
    finale_combo_flag: "" | "fc_silver" | "fc_gold" | "ap" | "ap_plus"
    finale_synx_flag: "" | "100"
    bigint: number
    numeric: number
    smallint: number
    timestamptz: string
    _timestamptz: string[]
    uuid: string
  }
}>()

export { readFragment } from "gql.tada"
export type { FragmentOf, ResultOf, VariablesOf } from "gql.tada"
