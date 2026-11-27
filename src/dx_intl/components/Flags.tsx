import clsx from "clsx"

import AP from "../images/flags/ap.svg"
import APP from "../images/flags/app.svg"
import Blank from "../images/flags/blank.svg"
import FC from "../images/flags/fc.svg"
import FCP from "../images/flags/fcp.svg"
import FS from "../images/flags/fs.svg"
import FSD from "../images/flags/fsd.svg"
import FSDP from "../images/flags/fsdp.svg"
import FSP from "../images/flags/fsp.svg"
import S from "../images/flags/s.svg"
import Star1 from "../images/stars/1.svg"
import Star2 from "../images/stars/2.svg"
import Star3 from "../images/stars/3.svg"
import Star4 from "../images/stars/4.svg"
import Star5 from "../images/stars/5.svg"
import { comboFlags, syncFlags } from "../models/constants"

import classes from "./Flags.module.css"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getComboImage = (flag: (typeof comboFlags)[number]): any => {
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSyncImage = (flag: (typeof syncFlags)[number]): any => {
  switch (flag) {
    case "s":
      return S
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

export const ComboFlag = ({ flag }: { flag: (typeof comboFlags)[number] }) => (
  <img className={classes.img} src={getComboImage(flag)} />
)

export const SyncFlag = ({ flag }: { flag: (typeof syncFlags)[number] }) => (
  <img className={classes.img} src={getSyncImage(flag)} />
)

// Indexed by star count. Zero stars (or no DX score) shows nothing, not even
// the blank circle, but keeps the flag's space.
const dxStarImages = [null, Star1, Star2, Star3, Star4, Star5]

export const getDxStarImage = (star: number): string | null =>
  dxStarImages[star] ?? null

export const DxStarFlag = ({ star }: { star: number }) => {
  const src = getDxStarImage(star)
  if (src == null) {
    return <span className={clsx(classes.img, classes.spacer)} aria-hidden />
  }
  return (
    <img
      className={classes.img}
      src={src}
      alt={`DX ★${star}`}
      title={`DX ★${star}`}
    />
  )
}
