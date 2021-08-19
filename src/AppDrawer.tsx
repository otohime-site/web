import styled from "@emotion/styled"

import { FunctionComponent } from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import LaundryOutlinedIcon from "@material-ui/icons/LocalLaundryServiceOutlined"

import { Link as RouterLink } from "react-router-dom"

const StyledDrawer = styled(Drawer)`
  width: ${(props) => props.theme.spacing(7) + 1}px;
  flex-shrink: 0;
  white-space: nowrap;
  &.open {
    width: 240px;
    .paper {
      width: 240px;
    }
  }
  .paper {
    top: ${(props) => props.theme.spacing(6)}px;
    width: ${(props) => props.theme.spacing(7) + 1}px;
  }
`

/*
const StyledBadge = styled(Badge)`
  .badge {
    top: 50%;
    right: -${props => props.theme.spacing(3)}px;
  }
`
*/

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
