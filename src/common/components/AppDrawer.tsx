import HomeIcon from "@mui/icons-material/Home"
import LaundryOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import { FunctionComponent } from "react"
import { Link as RouterLink } from "react-router-dom"

const StyledDrawer = styled(Drawer)(
  ({ theme }) => `
  width: calc(${theme.spacing(7)} + 1px);
  flex-shrink: 0;
  white-space: nowrap;
  &.open {
    width: 240px;
    .paper {
      width: 240px;
    }
  }
  .paper {
    top: ${theme.spacing(6)};
    width: calc(${theme.spacing(7)} + 1px);
  }
`
)

const AppDrawer: FunctionComponent<{
  variant: "permanent" | "temporary"
  drawerOpen: boolean
  closeDrawer: () => void
}> = ({ variant, drawerOpen, closeDrawer }) => {
  function handleListClick(e: React.MouseEvent): void {
    closeDrawer()
  }
  return (
    <StyledDrawer
      anchor="left"
      variant={variant}
      open={drawerOpen}
      onClose={closeDrawer}
      className={drawerOpen ? "open" : ""}
      classes={{ paper: "paper" }}
    >
      <List onClick={handleListClick}>
        <ListItem button={true} component={RouterLink} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="首頁" />
        </ListItem>
        <ListItem button={true} component={RouterLink} to="/dxi/">
          <ListItemIcon>
            <LaundryOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="maimai DX 國際版" />
        </ListItem>
      </List>
    </StyledDrawer>
  )
}

export default AppDrawer
