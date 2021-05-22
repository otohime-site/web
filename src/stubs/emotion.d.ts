import { Theme as MaterialUITheme } from "@material-ui/core/styles"

declare module "@emotion/react" {
  export interface Theme extends MaterialUITheme {}
}
