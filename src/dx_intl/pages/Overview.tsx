import { SegmentGroup } from "@ark-ui/react/segment-group"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js"
import { useMemo, useState } from "react"
import { Bar } from "react-chartjs-2"
import { useQuery } from "urql"
import { Link } from "wouter"
import { QueryResult } from "../../common/components/QueryResult"
import { ScrollableSegmentGroupRoot } from "../../common/components/ui/ScrollableSegmentGroupRoot"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import { graphql } from "../../graphql"
import tableClasses from "../components/PlayerScoreTable.module.css"
import Variant from "../components/Variant"
import { flatSongsResult, getCoverUrl } from "../models/aggregation"
import { difficulties, versions } from "../models/constants"
import { dxIntlSongsDocument } from "../models/queries"
import { getDifficultyClassName } from "../utils/styling"
import classes from "./Overview.module.css"
import { RATING_TARGETS } from "./RatingTarget"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

// Solid colors representing each maimai DX rating frame tier. Mirrors the
// (non-legacy) thresholds in components/Rating.tsx so the rating distribution
// chart reads like the in-game rating frames (normal → rainbow).
const ratingTiers: Array<{ max: number; color: string }> = [
  { max: 1000, color: "#9aa0a6" }, // normal (white/grey)
  { max: 2000, color: "#4f8edc" }, // blue
  { max: 4000, color: "#4caf50" }, // green
  { max: 7000, color: "#ff9800" }, // orange
  { max: 10000, color: "#e53935" }, // red
  { max: 12000, color: "#9c27b0" }, // purple
  { max: 13000, color: "#cd7f5a" }, // bronze
  { max: 14000, color: "#9fb6c0" }, // silver
  { max: 14500, color: "#ffc107" }, // gold
  { max: 15000, color: "#b0c4de" }, // platinum
  { max: Infinity, color: "#e040fb" }, // rainbow
]

// Map a rating range string (e.g. "10000-10999") to its frame tier color by
// the numeric value parsed from the start of the label.
const rangeColor = (range?: string | null): string => {
  const value = parseInt(range ?? "", 10)
  if (Number.isNaN(value)) return ratingTiers[0].color
  return (ratingTiers.find((tier) => value < tier.max) ?? ratingTiers[0]).color
}

type RateKey = "sss" | "fc" | "ap"

const rateOptions: Record<
  RateKey,
  { label: string; field: "sss_rate" | "fc_rate" | "ap_rate" }
> = {
  sss: { label: "SSS", field: "sss_rate" },
  fc: { label: "FC", field: "fc_rate" },
  ap: { label: "AP", field: "ap_rate" },
}

const dxIntlNewRatingStatsDocument = graphql(`
  query dxIntlNewRatingStats {
    dx_intl_new_rating_stats {
      range
      count
    }
  }
`)

const Overview = () => {
  const [baseRatingResult] = useQuery({ query: dxIntlNewRatingStatsDocument })
  const [songsResult] = useQuery({ query: dxIntlSongsDocument })
  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult.data],
  )
  const mostPlayedEntries = useMemo(
    () =>
      [...flattedEntries]
        .filter((entry) => entry.play != null && entry.play > 0)
        .sort((a, b) =>
          (b.play ?? 0) !== (a.play ?? 0)
            ? (b.play ?? 0) - (a.play ?? 0)
            : a.order !== b.order
              ? a.order - b.order
              : a.difficulty - b.difficulty,
        )
        .slice(0, 50),
    [flattedEntries],
  )

  const availableVersions = useMemo(() => {
    const set = new Set<number>()
    for (const entry of flattedEntries) {
      if (entry.difficulty >= 3 && entry.play != null && entry.play > 0) {
        set.add(entry.version)
      }
    }
    return [...set].sort((a, b) => a - b)
  }, [flattedEntries])

  const [selectedVersion, setSelectedVersion] = useState<number | null>(null)
  const [selectedRate, setSelectedRate] = useState<RateKey>("sss")

  const activeVersion =
    selectedVersion != null && availableVersions.includes(selectedVersion)
      ? selectedVersion
      : (availableVersions[availableVersions.length - 1] ?? null)

  const leastRateEntries = useMemo(() => {
    if (activeVersion == null) return []
    const field = rateOptions[selectedRate].field
    return [...flattedEntries]
      .filter(
        (entry) =>
          entry.version === activeVersion &&
          entry.difficulty >= 3 &&
          entry.play != null &&
          entry.play > 0,
      )
      .sort((a, b) => {
        const ra = a[field] ?? 0
        const rb = b[field] ?? 0
        if (ra !== rb) return ra - rb
        if (a.order !== b.order) return a.order - b.order
        return a.difficulty - b.difficulty
      })
      .slice(0, 15)
  }, [flattedEntries, activeVersion, selectedRate])

  const baseRatingStats = baseRatingResult.data?.dx_intl_new_rating_stats ?? []
  const totalPlayers = baseRatingStats.reduce(
    (sum, curr) => sum + (curr.count ?? 0),
    0,
  )

  return (
    <main>
      <h4>maimai DX 國際版玩家統計</h4>
      <p>只計算公開成績單與遊玩過 Splash PLUS 以後版本的玩家。</p>
      <p>
        公開成績單玩家總數:<strong>{totalPlayers}</strong>
      </p>
      <h5>Rating</h5>
      <QueryResult result={baseRatingResult}>
        <div style={{ height: "8rem" }}>
          <Bar
            data={{
              labels: ["Rating"],
              datasets: baseRatingStats.map((stat) => ({
                label: stat.range ?? "",
                backgroundColor: rangeColor(stat.range),
                data: [stat.count ?? 0],
              })),
            }}
            options={{
              indexAxis: "y",
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (item) => `${item.dataset.label}: ${item.parsed.x}`,
                  },
                },
              },
              scales: {
                x: { stacked: true, beginAtZero: true },
                y: { stacked: true },
              },
            }}
          />
        </div>
        <p className={classes["rating-target-nav"]}>
          <span>各 Rating 目標的 Best 50 組成曲:</span>
          {RATING_TARGETS.map((target) => (
            <Link key={target} href={`~/dxi/rt/${target}`}>
              {target}
            </Link>
          ))}
        </p>
      </QueryResult>
      <h5>Most Played Charts</h5>
      <p>依照公開成績單中的遊玩人數排序。</p>
      <QueryResult result={songsResult}>
        <ol className={classes["chart-blocks"]}>
          {mostPlayedEntries.map((entry, index) => (
            <li key={entry.hash}>
              <Link
                className={classes["chart-block"]}
                href={`~/dxi/s/${entry.song_id.substring(0, 8)}/${
                  entry.deluxe ? "dx" : "std"
                }/${entry.difficulty}`}
              >
                <img
                  className={classes["chart-cover"]}
                  src={getCoverUrl(entry.song_id)}
                  alt=""
                />
                <span className={classes["chart-rank"]}>{index + 1}</span>
                <span className={classes["chart-info"]}>
                  <span className={classes["chart-title"]}>{entry.title}</span>
                  <span className={classes["chart-meta"]}>
                    <Variant deluxe={entry.deluxe} />
                    <span
                      className={
                        tableClasses[
                          `difficulty-${entry.difficulty}` as
                            | "difficulty-0"
                            | "difficulty-1"
                            | "difficulty-2"
                            | "difficulty-3"
                            | "difficulty-4"
                        ]
                      }
                    >
                      {difficulties[entry.difficulty]}{" "}
                      {entry.internal_lv
                        ? entry.internal_lv.toFixed(1)
                        : entry.level}
                    </span>
                  </span>
                </span>
                <span className={classes["chart-play"]}>{entry.play ?? 0}</span>
              </Link>
            </li>
          ))}
        </ol>
      </QueryResult>
      <h5>各版本 SSS / FC / AP 率最低 15 譜面</h5>
      <p>
        僅統計 MASTER 與 Re:MASTER 難度,依照公開成績單中的對應達成率排序,
        僅計算有玩家遊玩過的譜面。
      </p>
      <QueryResult result={songsResult}>
        <ScrollableSegmentGroupRoot
          value={activeVersion != null ? `${activeVersion}` : ""}
          onValueChange={({ value }) => {
            if (value) setSelectedVersion(parseInt(value, 10))
          }}
        >
          {availableVersions.map((ver) => (
            <SegmentGroupItem key={ver} value={`${ver}`}>
              {versions[ver] ?? `v${ver}`}
            </SegmentGroupItem>
          ))}
        </ScrollableSegmentGroupRoot>
        <SegmentGroup.Root
          value={selectedRate}
          onValueChange={({ value }) => {
            if (value) setSelectedRate(value as RateKey)
          }}
        >
          {(Object.keys(rateOptions) as RateKey[]).map((key) => (
            <SegmentGroupItem key={key} value={key}>
              {rateOptions[key].label}
            </SegmentGroupItem>
          ))}
        </SegmentGroup.Root>
        <table className={tableClasses.table}>
          <colgroup>
            <col className={tableClasses["col-ranking"]} />
            <col className={tableClasses["col-title"]} />
            <col className={tableClasses["col-deluxe"]} />
            <col className={tableClasses["col-difficulty"]} />
            <col className={tableClasses["col-stats"]} />
          </colgroup>
          <thead>
            <tr>
              <th className={tableClasses["col-ranking"]}>#</th>
              <th className={tableClasses["col-title"]}>曲目</th>
              <th className={tableClasses["col-deluxe"]}></th>
              <th className={tableClasses["col-difficulty"]}></th>
              <th className={tableClasses["col-stats"]}>
                {rateOptions[selectedRate].label} Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {leastRateEntries.map((entry, index) => (
              <tr key={entry.hash}>
                <td className={tableClasses["col-ranking"]}>{index + 1}</td>
                <td className={tableClasses["col-title"]}>
                  <Link
                    href={`~/dxi/s/${entry.song_id.substring(0, 8)}/${
                      entry.deluxe ? "dx" : "std"
                    }/${entry.difficulty}`}
                  >
                    {entry.title}
                  </Link>
                </td>
                <td className={tableClasses["col-deluxe"]}>
                  <Variant deluxe={entry.deluxe} />
                </td>
                <td className={getDifficultyClassName(tableClasses, entry)}>
                  {entry.internal_lv
                    ? entry.internal_lv.toFixed(1)
                    : entry.level}
                </td>
                <td className={tableClasses["col-stats"]}>
                  {(
                    (entry[rateOptions[selectedRate].field] ?? 0) * 100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </QueryResult>
    </main>
  )
}

export default Overview
