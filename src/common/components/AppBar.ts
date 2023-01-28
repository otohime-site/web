import { AppBar } from "@mui/material"
import { styled } from "@mui/material/styles"

export default styled(AppBar)(
  ({ theme }) => `
  z-index: ${theme.zIndex.drawer + 1};

  .MuiToolbar-regular {
    height: ${theme.spacing(6)};
    min-height: ${theme.spacing(6)};
  }
`
)
