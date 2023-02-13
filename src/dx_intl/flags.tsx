import { styled } from "@mui/material/styles"
import { FunctionComponent } from "react"
import { Scalars } from "../generated/graphql"
import AP from "./images/flags/ap.svg"
import APP from "./images/flags/app.svg"
import Blank from "./images/flags/blank.svg"
import FC from "./images/flags/fc.svg"
import FCP from "./images/flags/fcp.svg"
import FS from "./images/flags/fs.svg"
import FSD from "./images/flags/fsd.svg"
import FSDP from "./images/flags/fsdp.svg"
import FSP from "./images/flags/fsp.svg"

const getComboImage = (flag: Scalars["dx_intl_combo_flag"]): any => {
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
const getSyncImage = (flag: Scalars["dx_intl_sync_flag"]): any => {
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

const FlagImage = styled("img")`
  height: 2em;
`

export const ComboFlag: FunctionComponent<{
  flag: Scalars["dx_intl_combo_flag"]
}> = ({ flag }) => <FlagImage src={getComboImage(flag)} />

export const SyncFlag: FunctionComponent<{
  flag: Scalars["dx_intl_sync_flag"]
}> = ({ flag }) => <FlagImage src={getSyncImage(flag)} />
