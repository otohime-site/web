import React, { FunctionComponent } from "react"
import Blank from "./flags/blank.svg"
import FC from "./flags/fc.svg"
import FCP from "./flags/fcp.svg"
import AP from "./flags/ap.svg"
import APP from "./flags/app.svg"
import FS from "./flags/fs.svg"
import FSP from "./flags/fsp.svg"
import FSD from "./flags/fsd.svg"
import FSDP from "./flags/fsdp.svg"
import { Scalars } from "../generated/graphql"
import styled from "../styled"

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
