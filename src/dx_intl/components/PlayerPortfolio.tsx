import { ScoreTableGroups } from "../models/aggregation"
import {
  RATING_NEW_COUNT,
  RATING_OLD_COUNT,
  comboFlags,
  syncFlags,
  versionTitleExcludes,
  versionTitles,
} from "../models/constants"

export const PlayerPortfolio = ({
  scoreTableGroups,
}: {
  scoreTableGroups: ScoreTableGroups
}) => {
  const ratingNew = (scoreTableGroups.get("current_version")?.get(true) ?? [])
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, RATING_NEW_COUNT)
    .reduce((prev, curr) => prev + (curr.rating ?? 0), 0)
  const ratingOld = (scoreTableGroups.get("current_version")?.get(false) ?? [])
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, RATING_OLD_COUNT)
    .reduce((prev, curr) => prev + (curr.rating ?? 0), 0)
  console.log(scoreTableGroups)

  const versionTitleResults: Record<"fc" | "sss" | "ap" | "fdx", number[]> = {
    fc: [],
    sss: [],
    ap: [],
    fdx: [],
  }
  const versionGroups = scoreTableGroups.get("version")
  for (let ver = 1; ver < versionTitles.length; ver++) {
    const versionTable =
      [
        ...(ver == 1 ? versionGroups?.get(0) ?? [] : []),
        ...(versionGroups?.get(ver) ?? []),
      ].filter(
        (entry) =>
          entry.difficulty <= 3 && !versionTitleExcludes.includes(entry.song_id)
      ) ?? []
    if (versionTable.every((entry) => !!entry.combo_flag)) {
      versionTitleResults.fc.push(ver)
    }
    if (
      versionTable.every(
        (entry) => entry.combo_flag >= comboFlags.indexOf("ap")
      )
    ) {
      versionTitleResults.ap.push(ver)
    }
    if (versionTable.every((entry) => (entry.score ?? 0) >= 100) && ver != 1) {
      versionTitleResults.sss.push(ver)
    }
    if (
      versionTable.every((entry) => entry.sync_flag >= syncFlags.indexOf("fdx"))
    ) {
      versionTitleResults.fdx.push(ver)
    }
  }
  return (
    <ul>
      <li>
        Rating 組成 新歌：{ratingNew} 舊歌：{ratingOld}
      </li>
      <li>極：{versionTitleResults.fc.map((ver) => versionTitles[ver])}</li>
      <li>將：{versionTitleResults.sss.map((ver) => versionTitles[ver])}</li>
      <li>神：{versionTitleResults.ap.map((ver) => versionTitles[ver])}</li>
      <li>舞舞：{versionTitleResults.fdx.map((ver) => versionTitles[ver])}</li>
    </ul>
  )
}
