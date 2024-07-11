import { comboFlags, syncFlags } from "../models/constants"

export const ComboFlag = ({ flag }: { flag: (typeof comboFlags)[number] }) => (
  <>{flag} </>
)

export const SyncFlag = ({ flag }: { flag: (typeof syncFlags)[number] }) => (
  <>{flag}</>
)
