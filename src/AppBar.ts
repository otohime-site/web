import styled from "@emotion/styled"
import { AppBar } from "@material-ui/core"

export default styled(AppBar)`
  z-index: ${(props) => props.theme.zIndex.drawer + 1};

  .MuiToolbar-regular {
    height: ${(props) => props.theme.spacing(6)}px;
    min-height: ${(props) => props.theme.spacing(6)}px;
  }
`
