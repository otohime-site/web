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
import { Switch } from "../../common/components/ui/Switch"
import { graphql } from "../../graphql"
import { ChartBlock, chartBlockClasses } from "../components/ChartBlock"
import { flatSongsResult } from "../models/aggregation"
import { versionRewardTitle, versions } from "../models/constants"
import { dxIntlSongsDocument } from "../models/queries"
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
]

// The rainbow frame (>= 15000) covers a wide rating span up to the ~16000 cap.
// A single flat color makes adjacent buckets blur together in the stacked bar,
// so map each bucket to a distinct hue across the spectrum (a real rainbow).
const RAINBOW_MIN = 15000
const RAINBOW_MAX = 16000
const rainbowColor = (value: number): string => {
  const t = Math.min(
    1,
    Math.max(0, (value - RAINBOW_MIN) / (RAINBOW_MAX - RAINBOW_MIN)),
  )
  // 0 -> red (0deg) through to violet (~300deg).
  const hue = t * 300
  return `hsl(${hue.toFixed(0)}, 85%, 60%)`
}

// Map a rating range string (e.g. "10000-10999") to its frame tier color by
// the numeric value parsed from the start of the label.
const rangeColor = (range?: string | null): string => {
  const value = parseInt(range ?? "", 10)
  if (Number.isNaN(value)) return ratingTiers[0].color
  if (value >= RAINBOW_MIN) return rainbowColor(value)
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

const rateKeys = Object.keys(rateOptions) as RateKey[]
const baseAggregateDifficulties = [2, 3]
const reMasterDifficulty = 4

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
      if (
        entry.difficulty >= 2 &&
        entry.difficulty <= reMasterDifficulty &&
        entry.play != null &&
        entry.play > 0
      ) {
        set.add(entry.version)
      }
    }
    return [...set].sort((a, b) => a - b)
  }, [flattedEntries])

  const [selectedVersion, setSelectedVersion] = useState<number | null>(null)
  const [includeReMaster, setIncludeReMaster] = useState(false)
  const activeVersion =
    selectedVersion != null && availableVersions.includes(selectedVersion)
      ? selectedVersion
      : (availableVersions[availableVersions.length - 1] ?? null)

  const leastRateEntriesByRate = useMemo(() => {
    if (activeVersion == null) {
      return { sss: [], fc: [], ap: [] } as Record<
        RateKey,
        typeof flattedEntries
      >
    }
    const includedDifficulties = includeReMaster
      ? [...baseAggregateDifficulties, reMasterDifficulty]
      : baseAggregateDifficulties
    const activeVersionEntries = flattedEntries.filter(
      (entry) =>
        entry.version === activeVersion &&
        includedDifficulties.includes(entry.difficulty) &&
        entry.play != null &&
        entry.play > 0,
    )

    return Object.fromEntries(
      rateKeys.map((key) => {
        const field = rateOptions[key].field
        return [
          key,
          [...activeVersionEntries]
            .sort((a, b) => {
              const ra = a[field] ?? 0
              const rb = b[field] ?? 0
              if (ra !== rb) return ra - rb
              if (a.order !== b.order) return a.order - b.order
              return a.difficulty - b.difficulty
            })
            .slice(0, 15),
        ]
      }),
    ) as Record<RateKey, typeof flattedEntries>
  }, [flattedEntries, activeVersion, includeReMaster])

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
        <ol className={chartBlockClasses["chart-blocks"]}>
          {mostPlayedEntries.map((entry, index) => (
            <li key={entry.hash}>
              <ChartBlock
                entry={entry}
                rank={index + 1}
                value={entry.play ?? 0}
              />
            </li>
          ))}
        </ol>
      </QueryResult>
      <h5>各版本 SSS / FC / AP 率最低 15 譜面</h5>
      <p>
        僅統計 EXPERT 與 MASTER 難度,依照公開成績單中的對應達成率排序,
        僅計算有玩家遊玩過的譜面。可用開關加入 Re:MASTER。
      </p>
      <QueryResult result={songsResult}>
        <div>
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
          <Switch
            checked={includeReMaster}
            onCheckedChange={(event) => {
              setIncludeReMaster(event.checked)
            }}
          >
            包含 Re:MASTER
          </Switch>
        </div>
        <div className={classes["least-rate-grid"]}>
          {rateKeys.map((key) => {
            const reward =
              !includeReMaster && activeVersion != null
                ? versionRewardTitle(activeVersion, key)
                : null
            return (
              <section key={key} className={classes["least-rate-column"]}>
                <h6>
                  {rateOptions[key].label} Rate
                  {reward != null ? ` (${reward})` : null}
                </h6>
                <ol
                  className={`${chartBlockClasses["chart-blocks"]} ${chartBlockClasses["chart-blocks-single"]}`}
                >
                  {leastRateEntriesByRate[key].map((entry, index) => (
                    <li key={entry.hash}>
                      <ChartBlock
                        entry={entry}
                        rank={index + 1}
                        value={`${(
                          (entry[rateOptions[key].field] ?? 0) * 100
                        ).toFixed(1)}%`}
                      />
                    </li>
                  ))}
                </ol>
              </section>
            )
          })}
        </div>
      </QueryResult>
    </main>
  )
}

export default Overview
