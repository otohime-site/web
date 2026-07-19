import { SegmentGroup } from "@ark-ui/react/segment-group"
import { BarElement, CategoryScale, Chart as ChartJS } from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import { Params, Redirect } from "wouter"
import { navigate } from "wouter/use-browser-location"
import { QueryResult } from "../../common/components/QueryResult"
import { SegmentGroupItem } from "../../common/components/ui/SegmentGroupItem"
import "../../common/utils/chartSetup"
import { graphql } from "../../graphql"
import { flatSongsResult, getCoverUrl } from "../models/aggregation"
import { difficulties } from "../models/constants"
import { dxIntlSongsDocument } from "../models/queries"
import classes from "./StatsSong.module.css"

ChartJS.register(CategoryScale, BarElement)

const dxIntlScoresStatsDocument = graphql(`
  query dxIntlScoresStats($songId: String!) {
    dx_intl_scores_stats(
      where: { song_id: { _eq: $songId } }
      order_by: [{ deluxe: asc }, { difficulty: asc }, { range: asc }]
    ) {
      deluxe
      difficulty
      range
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

const difficultyColors = ["#43a047", "#f9a825", "#e53935", "#8e24aa", "#d81b60"]

const scoreRanges = [
  "AP+",
  "SSS+",
  "SSS",
  "SS+",
  "SS",
  "S+",
  "S",
  "AAA",
  "AA",
  "A",
  "D～BBB",
] as const

const scoreRangeColors = [
  "oklch(26.5% 0.11 298)",
  "oklch(33% 0.16 302)",
  "oklch(39% 0.2 306)",
  "oklch(44.5% 0.23 310)",
  "oklch(50.5% 0.245 314)",
  "oklch(57% 0.24 318)",
  "oklch(64% 0.22 322)",
  "oklch(71.5% 0.185 326)",
  "oklch(79% 0.14 330)",
  "oklch(86% 0.095 333)",
  "oklch(91.5% 0.055 336)",
]

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
  const [statsResult] = useQuery({
    query: dxIntlScoresStatsDocument,
    variables: { songId: song?.id ?? "" },
    pause: song == null,
  })
  const [ratingGroupResult] = useQuery({
    query: dxIntlScorePerRatingGroupDocument,
    variables: { songId: song?.id ?? "" },
    pause: song == null,
  })
  const scoreStats = statsResult.data?.dx_intl_scores_stats ?? []
  const ratingGroupStats =
    ratingGroupResult.data?.dx_intl_score_per_rating_group ?? []
  const variants = [false, true].map((isDeluxe) =>
    songEntries.some((entry) => entry.deluxe === isDeluxe),
  )
  const variantValid =
    (variant === "std" && variants[0]) || (variant === "dx" && variants[1])
  const variantEntries = songEntries.filter((entry) => entry.deluxe === deluxe)
  const ratingGroupDatasets = variantEntries.flatMap((entry) => {
    const data = ratingGroupStats.flatMap((stat) =>
      stat.deluxe === entry.deluxe &&
      stat.difficulty === entry.difficulty &&
      stat.rating_target != null &&
      stat.average_score != null
        ? [
            {
              x: stat.rating_target,
              y: Math.round(Number(stat.average_score) * 10000) / 10000,
            },
          ]
        : [],
    )
    if (data.length === 0) return []
    const color = difficultyColors[entry.difficulty] ?? "#607d8b"
    return [
      {
        label: difficulties[entry.difficulty],
        data,
        borderColor: color,
        backgroundColor: color,
        tension: 0.2,
      },
    ]
  })
  const scoreStatsDatasets = scoreRanges.map((range, index) => ({
    label: range,
    backgroundColor: scoreRangeColors[index],
    data: variantEntries.map(
      (entry) =>
        scoreStats.find(
          (stat) =>
            stat.deluxe === deluxe &&
            stat.difficulty === entry.difficulty &&
            stat.range === range,
        )?.count ?? 0,
    ),
  }))
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
          <Titled
            title={(title) => `${song.title} - maimai DX 樂曲統計 - ${title}`}
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
            {ratingGroupDatasets.length > 0 ? (
              <div className={classes.chart}>
                <Line
                  data={{
                    datasets: ratingGroupDatasets,
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (item) =>
                            `${item.dataset.label}: ${(item.parsed.y ?? 0).toFixed(4)}%`,
                        },
                      },
                    },
                    scales: {
                      x: {
                        type: "linear",
                        min: 14000,
                        max: 16750,
                        title: { display: true, text: "Rating" },
                        ticks: { precision: 0, stepSize: 250 },
                      },
                      y: {
                        max: 101,
                        title: { display: true, text: "平均成績 (%)" },
                        ticks: {
                          precision: 1,
                          callback: (value) => `${Number(value).toFixed(1)}%`,
                        },
                      },
                    },
                  }}
                />
              </div>
            ) : (
              <p>目前沒有足夠的 Rating 別成績資料。</p>
            )}
          </QueryResult>
          <h5>分數別玩家統計</h5>
          <QueryResult result={statsResult}>
            <div className={classes["distribution-chart"]}>
              <Bar
                data={{
                  labels: variantEntries.map(
                    (entry) =>
                      `${difficulties[entry.difficulty]} ${entry.internal_lv?.toFixed(1) ?? entry.level}`,
                  ),
                  datasets: scoreStatsDatasets,
                }}
                options={{
                  indexAxis: "y",
                  maintainAspectRatio: false,
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (item) =>
                          `${item.dataset.label}: ${item.parsed.x ?? 0}`,
                      },
                    },
                  },
                  scales: {
                    x: {
                      stacked: true,
                      beginAtZero: true,
                      title: { display: true, text: "玩家數" },
                      ticks: { precision: 0 },
                    },
                    y: { stacked: true },
                  },
                }}
              />
            </div>
          </QueryResult>
        </>
      ) : null}
    </QueryResult>
  )
}

export default StatsSong
