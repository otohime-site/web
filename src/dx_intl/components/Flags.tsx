import { Scalars } from "../../generated/graphql"
import AP from "../images/flags/ap.svg"
import APP from "../images/flags/app.svg"
import Blank from "../images/flags/blank.svg"
import FC from "../images/flags/fc.svg"
import FCP from "../images/flags/fcp.svg"
import FS from "../images/flags/fs.svg"
import FSD from "../images/flags/fsd.svg"
import FSDP from "../images/flags/fsdp.svg"
import FSP from "../images/flags/fsp.svg"
import classes from "./Flags.module.css"

const getComboImage = (flag: Scalars["dx_intl_combo_flag"]["output"]): any => {
  switch (flag) {
    case "fc":
      return FC
    case "fc+":
      return FCP
    case "ap":
      return AP
    case "ap+":
      return APP
  }
  return Blank
}
const getSyncImage = (flag: Scalars["dx_intl_sync_flag"]["output"]): any => {
  switch (flag) {
    case "fs":
      return FS
    case "fs+":
      return FSP
    case "fdx":
      return FSD
    case "fdx+":
      return FSDP
  }
  return Blank
}

export const ComboFlag = ({
  flag,
}: {
  flag: Scalars["dx_intl_combo_flag"]["output"]
}) => <img className={classes.img} src={getComboImage(flag)} />

export const SyncFlag = ({
  flag,
}: {
  flag: Scalars["dx_intl_sync_flag"]["output"]
}) => <img className={classes.img} src={getSyncImage(flag)} />
