import { SegmentGroup } from "@ark-ui/react/segment-group"
import * as Plot from "@observablehq/plot"
import { useQuery } from "urql"
import { Params, Redirect } from "wouter"
import { navigate } from "wouter/use-browser-location"
import { ObservablePlot } from "../../common/components/ObservablePlot"
import { PageMeta } from "../../common/components/PageMeta"
import { QueryResult } from "../../common/components/QueryResult"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import { graphql } from "../../graphql"
import { flatSongsResult, getCoverUrl } from "../models/aggregation"
import { difficulties } from "../models/constants"
import { dxIntlSongsDocument } from "../models/queries"
import classes from "./StatsSong.module.css"

const dxIntlScoresHistogramDocument = graphql(`
  query dxIntlScoresHistogram($songId: String!) {
    dx_intl_scores_histogram(
      where: { song_id: { _eq: $songId } }
      order_by: [{ deluxe: asc }, { difficulty: asc }, { score_bucket: asc }]
    ) {
      deluxe
      difficulty
      score_bucket
      count
    }
  }
`)

const dxIntlScorePerRatingGroupDocument = graphql(`
  query dxIntlScorePerRatingGroup($songId: String!) {
    dx_intl_score_per_rating_group(
      where: { song_id: { _eq: $songId } }
      order_by: [{ deluxe: asc }, { difficulty: asc }, { rating_target: asc }]
    ) {
      deluxe
      difficulty
      rating_target
      average_score
    }
  }
`)

const difficultyColors = ["#43a047", "#f9a825", "#e53935", "#8e24aa", "#b388ff"]

const fineScoreBins = Array.from({ length: 43 }, (_, index) => 80 + index * 0.5)

const StatsSong = ({ params }: { params: Params }) => {
  const songId = params.songId ?? ""
  const { variant } = params
  const deluxe = variant === "dx"
  const [songsResult] = useQuery({
    query: dxIntlSongsDocument,
  })
  const songEntries = flatSongsResult(songsResult.data).filter((entry) =>
    entry.song_id.startsWith(songId),
  )
  const song = (songsResult.data?.dx_intl_songs || []).filter((song) =>
    song.id.startsWith(songId),
  )[0]
  const [histogramResult] = useQuery({
    query: dxIntlScoresHistogramDocument,
    variables: { songId: song?.id ?? "" },
    pause: song == null,
  })
  const [ratingGroupResult] = useQuery({
    query: dxIntlScorePerRatingGroupDocument,
    variables: { songId: song?.id ?? "" },
    pause: song == null,
  })
  const scoreHistogram = histogramResult.data?.dx_intl_scores_histogram ?? []
  const ratingGroupStats =
    ratingGroupResult.data?.dx_intl_score_per_rating_group ?? []
  const variants = [false, true].map((isDeluxe) =>
    songEntries.some((entry) => entry.deluxe === isDeluxe),
  )
  const variantValid =
    (variant === "std" && variants[0]) || (variant === "dx" && variants[1])
  const variantEntries = songEntries.filter((entry) => entry.deluxe === deluxe)
  const ratingGroupPoints = variantEntries.flatMap((entry) =>
    ratingGroupStats.flatMap((stat) =>
      stat.deluxe === entry.deluxe &&
      stat.difficulty === entry.difficulty &&
      stat.rating_target != null &&
      stat.average_score != null
        ? [
            {
              difficulty: difficulties[entry.difficulty],
              difficultyIndex: entry.difficulty,
              rating: stat.rating_target,
              score: Math.round(Number(stat.average_score) * 10000) / 10000,
            },
          ]
        : [],
    ),
  )
  const ratingGroupDifficulties = variantEntries.flatMap((entry) =>
    ratingGroupPoints.some(
      (point) => point.difficultyIndex === entry.difficulty,
    )
      ? [
          {
            color: difficultyColors[entry.difficulty] ?? "#607d8b",
            label: difficulties[entry.difficulty],
          },
        ]
      : [],
  )
  const minimumAverageScore = Math.min(
    ...ratingGroupPoints.map((point) => point.score),
  )
  const averageScoreDomainMinimum = Number.isFinite(minimumAverageScore)
    ? Math.max(0, Math.floor(minimumAverageScore - 1))
    : 0
  const scoreDistributionDifficulties = variantEntries.map(
    (entry) =>
      `${difficulties[entry.difficulty]} ${entry.internal_lv?.toFixed(1) ?? entry.level}`,
  )
  const fineScoreDistribution = variantEntries.flatMap((entry, entryIndex) => {
    const histogram = scoreHistogram.filter(
      (stat) => stat.deluxe === deluxe && stat.difficulty === entry.difficulty,
    )
    if (histogram.length === 0) return []

    const difficulty = scoreDistributionDifficulties[entryIndex]
    const total = histogram.reduce((sum, stat) => sum + (stat.count ?? 0), 0)
    if (total === 0) return []

    const difficultyLabel = `${difficulty} (${total.toLocaleString()} 人)`
    const countByScore = new Map(
      histogram.flatMap((stat) =>
        stat.score_bucket == null
          ? []
          : [[Number(stat.score_bucket), stat.count ?? 0] as const],
      ),
    )

    return fineScoreBins.map((score) => {
      const count = countByScore.get(score) ?? 0
      return {
        count,
        difficulty,
        difficultyLabel,
        score,
        share: count / total,
      }
    })
  })
  const fineScoreDistributionLabels = [
    ...new Set(fineScoreDistribution.map((point) => point.difficultyLabel)),
  ]
  const fineScoreMaximumShare = Math.max(
    0.01,
    ...fineScoreDistribution.map((point) => point.share),
  )
  if (song != null && songEntries.length > 0 && !variantValid) {
    return (
      <Redirect
        to={`~/dxi/s/${songId}/${variants[0] ? "std" : "dx"}`}
        replace
      />
    )
  }
  return (
    <QueryResult result={songsResult}>
      {song != null ? (
        <>
          <PageMeta
            canonicalPath={`/dxi/s/${songId}/${deluxe ? "dx" : "std"}`}
            description={`查看 ${song.title}（${song.artist}）在 Otohime 公開 maimai DX 成績單中的分數與 Rating 統計。`}
            title={`${song.title} - maimai DX 樂曲統計 - Otohime`}
          />
          <section className={classes.intro}>
            <img src={getCoverUrl(song.id)} />
            <div>
              <h4 className={classes.title}>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          </section>
          <ul>
            <li>數字來自 Otohime 系統中所有登錄且公開的成績單。</li>
            <li>每十分鐘更新。</li>
          </ul>
          <SegmentGroup.Root
            value={deluxe ? "dx" : "std"}
            onValueChange={({ value }) => {
              navigate(`/dxi/s/${songId}/${value}`)
            }}
          >
            {variants[0] ? (
              <SegmentGroupItem value="std">STANDARD</SegmentGroupItem>
            ) : null}
            {variants[1] ? (
              <SegmentGroupItem value="dx">DELUXE</SegmentGroupItem>
            ) : null}
          </SegmentGroup.Root>
          <h5>譜面統計</h5>
          <div className={classes["table-scroll"]}>
            <table>
              <thead>
                <tr>
                  <th scope="col">難度</th>
                  <th scope="col">Play</th>
                  <th scope="col">SSS Rate</th>
                  <th scope="col">FC Rate</th>
                  <th scope="col">AP Rate</th>
                </tr>
              </thead>
              <tbody>
                {variantEntries.map((entry) => (
                  <tr key={entry.difficulty}>
                    <th scope="row">
                      {difficulties[entry.difficulty]}{" "}
                      {entry.internal_lv
                        ? entry.internal_lv.toFixed(1)
                        : entry.level}
                    </th>
                    <td>{entry.play ?? 0}</td>
                    <td>{((entry.sss_rate ?? 0) * 100).toFixed(1)}%</td>
                    <td>{((entry.fc_rate ?? 0) * 100).toFixed(1)}%</td>
                    <td>{((entry.ap_rate ?? 0) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h5>Rating 別平均成績</h5>
          <QueryResult result={ratingGroupResult}>
            {ratingGroupPoints.length > 0 ? (
              <ObservablePlot
                ariaLabel="各難度 Rating 與平均成績折線圖"
                className={classes.chart}
                options={(width) => ({
                  color: {
                    domain: ratingGroupDifficulties.map(({ label }) => label),
                    label: "難度",
                    legend: true,
                    range: ratingGroupDifficulties.map(({ color }) => color),
                  },
                  height: Math.min(
                    380,
                    Math.max(280, Math.round(width * 0.52)),
                  ),
                  marginLeft: 64,
                  x: {
                    domain: [14000, 16750],
                    grid: true,
                    label: "Rating",
                    nice: false,
                    tickFormat: "d",
                    ticks: width < 600 ? 6 : 12,
                  },
                  y: {
                    domain: [averageScoreDomainMinimum, 101],
                    grid: true,
                    label: "平均成績 (%)",
                    nice: false,
                    tickFormat: (value) => `${Number(value).toFixed(1)}%`,
                  },
                  marks: [
                    Plot.lineY(ratingGroupPoints, {
                      x: "rating",
                      y: "score",
                      z: "difficulty",
                      stroke: "difficulty",
                      strokeWidth: 2,
                      curve: "monotone-x",
                    }),
                    Plot.dot(ratingGroupPoints, {
                      x: "rating",
                      y: "score",
                      fill: "difficulty",
                      r: 3.5,
                      stroke: "var(--surface-1)",
                      strokeWidth: 1,
                      tip: {
                        format: {
                          x: (value) => `Rating ${Number(value).toFixed(0)}`,
                          y: (value) => `${Number(value).toFixed(4)}%`,
                          fill: true,
                        },
                      },
                    }),
                    Plot.frame(),
                  ],
                })}
              />
            ) : (
              <p>目前沒有足夠的 Rating 別成績資料。</p>
            )}
          </QueryResult>
          <section className={classes["fine-distribution"]}>
            <h5>每 0.5% 達成率分布</h5>
            <p>顯示 80.0–101.0% 間的實際公開成績分布。</p>
            <QueryResult result={histogramResult}>
              {fineScoreDistribution.length > 0 ? (
                <ObservablePlot
                  ariaLabel="各難度每 0.5% 達成率分布圖"
                  className={classes["fine-distribution-chart"]}
                  options={(width) => ({
                    color: {
                      domain: scoreDistributionDifficulties,
                      range: variantEntries.map(
                        (entry) =>
                          difficultyColors[entry.difficulty] ?? "#607d8b",
                      ),
                    },
                    fy: {
                      domain: fineScoreDistributionLabels,
                      label: null,
                      padding: 0.16,
                    },
                    height: Math.max(
                      360,
                      fineScoreDistributionLabels.length * 88 + 56,
                    ),
                    marginLeft: width < 600 ? 132 : 156,
                    x: {
                      domain: [80, 101],
                      grid: true,
                      label: "達成率",
                      nice: false,
                      tickFormat: (value) => `${Number(value).toFixed(0)}%`,
                      ticks:
                        width < 600
                          ? [80, 90, 97, 100, 101]
                          : [80, 90, 94, 97, 98, 99, 100, 101],
                    },
                    y: {
                      axis: null,
                      domain: [0, fineScoreMaximumShare * 1.08],
                      nice: false,
                    },
                    marks: [
                      Plot.areaY(fineScoreDistribution, {
                        x: "score",
                        y: "share",
                        fy: "difficultyLabel",
                        fill: "difficulty",
                        fillOpacity: 0.24,
                        curve: "catmull-rom",
                      }),
                      Plot.lineY(fineScoreDistribution, {
                        x: "score",
                        y: "share",
                        fy: "difficultyLabel",
                        z: "difficulty",
                        stroke: "difficulty",
                        strokeWidth: 2,
                        curve: "catmull-rom",
                        title: (point) =>
                          `${point.difficulty}\n${point.score.toFixed(1)}%: ${point.count.toLocaleString()} 人 (${(point.share * 100).toFixed(1)}%)`,
                        tip: "x",
                      }),
                      Plot.frame({ strokeOpacity: 0.18 }),
                    ],
                  })}
                />
              ) : (
                <p>目前沒有足夠的每 0.5% 成績資料。</p>
              )}
            </QueryResult>
          </section>
        </>
      ) : null}
    </QueryResult>
  )
}

export default StatsSong
