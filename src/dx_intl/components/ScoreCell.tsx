import {
  comboFlags,
  difficulties,
  levels,
  syncFlags,
} from "../models/constants"
import { ComboFlag, SyncFlag } from "./Flags"

export const ScoreCell = ({
  data: { difficulty, level, score, combo_flag, sync_flag },
}: {
  data: {
    difficulty: number
    level: (typeof levels)[number]
    score?: number
    combo_flag?: (typeof comboFlags)[number]
    sync_flag?: (typeof syncFlags)[number]
  }
}) => (
  <>
    {difficulties[difficulty].substring(0, 3).toUpperCase()}
    {level}
    {score}
    <ComboFlag flag={combo_flag ?? ""} /> <SyncFlag flag={sync_flag ?? ""} />
  </>
)
