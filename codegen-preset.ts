import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: {
    "http://localhost:8580/v1/graphql": {
      headers: {
        "X-Hasura-Admin-Secret": "development-hasura-secret",
      },
    },
  },
  ignoreNoDocuments: true,
  documents: ["src/**/graphql.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
  config: {
    scalars: {
      dx_intl_level:
        "'1' | '2' | '3' | '4' | '5' | '6' | '7' | '7+' | '8' | '8+' | '9' | '9+' | '10' | '10+' | '11' | '11+' | '12' | '12+' | '13' | '13+' | '14' | '14+' | '15'",
      dx_intl_combo_flag: "'' | 'fc' | 'fc+' | 'ap' | 'ap+'",
      dx_intl_sync_flag: "'' | 'fs' | 'fs+' | 'fdx' | 'fdx+'",
      dx_intl_trophy: "'normal' | 'bronze' | 'silver' | 'gold' | 'rainbow'",
      finale_level:
        "'1' | '2' | '3' | '4' | '5' | '6' | '7' | '7+' | '8' | '8+' | '9' | '9+' | '10' | '10+' | '11' | '11+' | '12' | '12+' | '13' | '13+' | '14'",
      finale_combo_flag: "'' | 'fc_silver' | 'fc_gold' | 'ap' | 'ap_plus'",
      finale_synx_flag: "'' | '100'",
      bigint: "number",
      numeric: "number",
      smallint: "number",
      timestamptz: "string",
      _timestamptz: "string[]",
      uuid: "string",
    },
  },
  hooks: { afterAllFileWrite: ["prettier --write"] },
}

export default config
