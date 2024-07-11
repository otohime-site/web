import clsx from "clsx"
import { comboFlags, syncFlags } from "../models/constants"
import classes from "./Flag.module.css"

const comboFlagNames = {
  fc_silver: "FC",
  fc_gold: "FC",
  ap: "AP",
  ap_plus: "AP+",
} as const

export const ComboFlag = ({ flag }: { flag: (typeof comboFlags)[number] }) =>
  flag ? (
    <span
      className={clsx(
        classes.flag,
        flag === "fc_gold" && classes["flag-fc-gold"],
        flag === "ap" && classes["flag-ap"],
        flag === "ap_plus" && classes["flag-ap-plus"],
      )}
    >
      {comboFlagNames[flag]}
    </span>
  ) : (
    <></>
  )

export const SyncFlag = ({ flag }: { flag: (typeof syncFlags)[number] }) => (
  <span className={classes.flag}>{flag}</span>
)
