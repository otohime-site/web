import { Tabs } from "@ark-ui/react/tabs"
import { Suspense, lazy, useCallback, useMemo, useRef, useState } from "react"
import { Titled } from "react-titled"
import { useQuery } from "urql"
import {
  Params,
  Redirect,
  Route,
  Switch as RouteSwitch,
  useLocation,
} from "wouter"
import IconClipboardText from "~icons/mdi/clipboard-text-outline"
import IconHistory from "~icons/mdi/history"
import IconImage from "~icons/mdi/image"
import IconLock from "~icons/mdi/lock"
import IconPencil from "~icons/mdi/pencil"
import IconPublic from "~icons/mdi/public"
import { Alert } from "../../common/components/ui/Alert"
import { useUser } from "../../common/contexts"
import { graphql, readFragment } from "../../graphql"
import PlayerRatingImage from "../components/PlayerRatingImage"
import Record from "../components/Record"
import {
  ESTIMATED_INTERNAL_LV,
  ScoreTableEntry,
  flatSongsResult,
  getNoteHash,
  getRating,
} from "../models/aggregation"
import {
  RATING_NEW_COUNT,
  RATING_OLD_COUNT,
  comboFlags,
  syncFlags,
  versions,
} from "../models/constants"
import { dxIntlRecordsFields, dxIntlScoresFields } from "../models/fragments"
import {
  dxIntlPlayersEditableDocument,
  dxIntlSongsDocument,
} from "../models/queries"
import classes from "./Player.module.css"
import PlayerForm from "./PlayerForm"
import PlayerScores from "./PlayerScores"

// History pulls in Chart.js; keep it in its own chunk like before.
const PlayerHistory = lazy(async () => await import("./PlayerHistory"))

const playerTabRoutes = {
  scores: "/",
  edit: "/edit",
  history: "/history",
  image: "/image",
} as const
type PlayerTab = keyof typeof playerTabRoutes

// The record (top bar) and the scores are fetched separately so the
// edit/history tabs don't block on (or transfer) the heavy score rows.
const dxIntlRecordDocument = graphql(
  `
    query dxIntlRecord($nickname: String!) {
      dx_intl_players(where: { nickname: { _eq: $nickname } }) {
        updated_at
        private
        dx_intl_record {
          ...dxIntlRecordsFields
        }
      }
    }
  `,
  [dxIntlRecordsFields],
)
const dxIntlScoresDocument = graphql(
  `
    query dxIntlScores($nickname: String!) {
      dx_intl_players(where: { nickname: { _eq: $nickname } }) {
        dx_intl_scores {
          ...dxIntlScoresFields
        }
      }
    }
  `,
  [dxIntlScoresFields],
)
const Player = ({ params }: { params: Params }) => {
  const user = useUser()
  // Tab routes nested under /p/:nickname. The nested location is the
  // single source of truth for the active tab; the RouteSwitch below
  // renders the matching content.
  const [location, navigate] = useLocation()
  const activeTab = (Object.entries(playerTabRoutes).find(
    ([, path]) =>
      path !== "/" && (location === path || location.startsWith(`${path}/`)),
  )?.[0] ?? "scores") as PlayerTab
  // The score rows are heavy; only the scores and image tabs need them.
  const needScores = activeTab === "scores" || activeTab === "image"
  const [editableResult] = useQuery({
    query: dxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname: params.nickname ?? "" },
    pause: user == null,
  })
  const [recordResult] = useQuery({
    query: dxIntlRecordDocument,
    variables: { nickname: params.nickname ?? "" },
  })
  const [scoresResult] = useQuery({
    query: dxIntlScoresDocument,
    variables: { nickname: params.nickname ?? "" },
    pause: !needScores,
  })
  const [songsResult] = useQuery({
    query: dxIntlSongsDocument,
    pause: !needScores,
  })
  const flattedEntries = useMemo(
    () => flatSongsResult(songsResult.data),
    [songsResult],
  )
  // Used to get rating in reliable way during major version updates
  const maxVersion = useMemo(
    () => Math.max(...flattedEntries.map((entry) => entry.version)),
    [flattedEntries],
  )
  // CiRCLE had two rating differences:
  // * "Latest songs" will include song in recent 2 versions instead of 1.
  // * All perfect will add 1 point to rating.
  const afterCircle = useMemo(() => maxVersion >= 25, [maxVersion])

  // PlayerScores owns the score-page state and portals its controls into
  // this shared sticky header.
  const [scoresToolbar, setScoresToolbar] = useState<HTMLDivElement | null>(
    null,
  )
  // The top bar condenses once the sentinel above it scrolls under the
  // sticky app header. Observing a separate sentinel (instead of
  // window scroll offsets) avoids feedback loops when the bar shrinks.
  const [condensed, setCondensed] = useState(false)
  const sentinelObserverRef = useRef<IntersectionObserver | null>(null)
  const sentinelRef = useCallback((sentinel: HTMLDivElement | null) => {
    sentinelObserverRef.current?.disconnect()
    sentinelObserverRef.current = null
    if (sentinel == null) return
    const headerHeight =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--app-header-height")
        .trim() || "48px"
    const observer = new IntersectionObserver(
      // Entries are delivered oldest-first; only the newest crossing
      // reflects the current state.
      (entries) => setCondensed(!entries[entries.length - 1].isIntersecting),
      { rootMargin: `-${headerHeight} 0px 0px 0px` },
    )
    observer.observe(sentinel)
    sentinelObserverRef.current = observer
  }, [])
  // Sticky descendants (difficulty header, stats column) offset below the
  // bar through this variable since the bar's height is dynamic.
  const topBarObserverRef = useRef<ResizeObserver | null>(null)
  const topBarRef = useCallback((bar: HTMLElement | null) => {
    topBarObserverRef.current?.disconnect()
    topBarObserverRef.current = null
    if (bar == null) {
      document.documentElement.style.removeProperty("--player-top-bar-height")
      return
    }
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        "--player-top-bar-height",
        `${bar.offsetHeight}px`,
      )
    })
    observer.observe(bar)
    topBarObserverRef.current = observer
  }, [])
  const { scoreTable, noteInconsistency } = useMemo(() => {
    if (!scoresResult.data) {
      return { scoreTable: [], noteInconsistency: false }
    }
    const maxVersion = Math.max(...flattedEntries.map((entry) => entry.version))
    const scores =
      readFragment(
        dxIntlScoresFields,
        scoresResult.data.dx_intl_players[0]?.dx_intl_scores ?? [],
      ) ?? []
    const scoresMap = new Map(
      scores.map((score) => [getNoteHash(score), score]),
    )
    const scoreTable = flattedEntries.map<ScoreTableEntry>((entry, index) => {
      const score = scoresMap.get(entry.hash)
      scoresMap.delete(entry.hash)
      return {
        index,
        ...entry,
        score: score?.score,
        combo_flag: comboFlags.indexOf(score?.combo_flag ?? ""),
        sync_flag: syncFlags.indexOf(score?.sync_flag ?? ""),
        updated_at: score?.start,
        rating_latest: afterCircle
          ? entry.version >= maxVersion - 1
          : entry.version == maxVersion,
        rating: score?.score
          ? getRating(
              entry.internal_lv ?? ESTIMATED_INTERNAL_LV[entry.level],
              score.score ?? 0,
              afterCircle &&
                (score.combo_flag === "ap" || score.combo_flag === "ap+"),
            )
          : 0,
        rating_listed: false,
        rating_used: false,
      }
    })
    const oldRanks = new Map(
      scoreTable
        .filter((entry) => !entry.rating_latest && entry.active)
        .sort((a, b) => b.rating - a.rating)
        .map((entry, index) => [entry.hash, index + 1]),
    )
    const newRanks = new Map(
      scoreTable
        .filter((entry) => entry.rating_latest && entry.active)
        .sort((a, b) => b.rating - a.rating)
        .map((entry, index) => [entry.hash, index + 1]),
    )
    scoreTable.forEach((entry) => {
      entry.old_rank = oldRanks.get(entry.hash)
      entry.new_rank = newRanks.get(entry.hash)
      entry.rating_listed =
        entry.rating > 0 &&
        ((entry.new_rank ?? Infinity) <= RATING_NEW_COUNT * 2 ||
          (entry.old_rank ?? Infinity) <= RATING_OLD_COUNT * 2)
      entry.rating_used =
        entry.rating > 0 &&
        ((entry.new_rank ?? Infinity) <= RATING_NEW_COUNT ||
          (entry.old_rank ?? Infinity) <= RATING_OLD_COUNT)
    })
    // It may be inconsistent if songs are added but song list not updated
    return { scoreTable, noteInconsistency: scoresMap.size > 0 }
  }, [flattedEntries, scoresResult, afterCircle])

  if (
    recordResult.error != null ||
    scoresResult.error != null ||
    songsResult.error != null
  ) {
    return <Alert severity="error">發生錯誤，請重試。</Alert>
  }
  if (recordResult.data == null) {
    return <></>
  }
  if (recordResult.data.dx_intl_players.length === 0) {
    return <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
  }

  const player = recordResult.data.dx_intl_players[0]
  // A player without uploads has no record yet; the layout (tabs, edit)
  // still renders and the scores tab shows the explanation instead.
  const record = readFragment(dxIntlRecordsFields, player.dx_intl_record)
  // The scores/songs queries are paused on the edit/history tabs and may
  // still be in flight right after switching back.
  const scoresReady = scoresResult.data != null && songsResult.data != null
  // While the editable query is in flight we cannot tell an owner from a
  // visitor yet, so the owner-only routes hold off their redirect.
  const ownershipPending = editableResult.fetching

  const ownsScoreTable =
    editableResult.error == null &&
    (editableResult.data?.dx_intl_players?.length ?? 0) > 0

  return (
    <>
      <Titled
        title={(title) =>
          `${record?.card_name ?? params.nickname} - maimai DX 成績單 - ${title}`
        }
      />
      {maxVersion > versions.length - 1 || noteInconsistency ? (
        <Alert severity="error">
          成績單目前有同步狀況，請試圖重新整理頁面。
        </Alert>
      ) : null}
      <Tabs.Root
        className={classes.tabs}
        value={activeTab}
        onValueChange={({ value }) =>
          navigate(playerTabRoutes[value as PlayerTab])
        }
      >
        <div
          ref={sentinelRef}
          aria-hidden
          className={classes["top-bar-sentinel"]}
        />
        <header
          ref={topBarRef}
          className={classes["top-bar"]}
          data-condensed={condensed ? "" : undefined}
        >
          <div className={classes["top-bar-info"]}>
            {record != null ? (
              <Record record={record} condensed={condensed} />
            ) : null}
            <div className={classes["player-toolbar"]}>
              <div
                className={`${classes["player-identity"]} ${classes["hide-condensed"]}`}
              >
                {player.private ? (
                  <IconLock
                    aria-label="私人成績單"
                    role="img"
                    title="私人成績單"
                  />
                ) : (
                  <IconPublic
                    aria-label="公開成績單"
                    role="img"
                    title="公開成績單"
                  />
                )}
                <span>{params.nickname}</span>
              </div>
              <Tabs.List
                aria-label="成績單頁面"
                className={classes["tabs-list"]}
              >
                <Tabs.Trigger value="scores" className={classes["tab-trigger"]}>
                  <IconClipboardText /> 成績單
                </Tabs.Trigger>
                {ownsScoreTable ? (
                  <Tabs.Trigger value="edit" className={classes["tab-trigger"]}>
                    <IconPencil /> 編輯
                  </Tabs.Trigger>
                ) : null}
                <Tabs.Trigger
                  value="history"
                  className={classes["tab-trigger"]}
                >
                  <IconHistory /> 歷史紀錄
                </Tabs.Trigger>
                {ownsScoreTable && record != null ? (
                  <Tabs.Trigger
                    value="image"
                    className={classes["tab-trigger"]}
                  >
                    <IconImage /> Rating 圖片
                  </Tabs.Trigger>
                ) : null}
                <Tabs.Indicator className={classes["tabs-indicator"]} />
              </Tabs.List>
            </div>
          </div>
          {activeTab === "scores" && record != null && scoresReady ? (
            <div
              ref={setScoresToolbar}
              aria-label="成績單選項"
              className={classes["top-bar-controls"]}
            />
          ) : null}
        </header>
        <Tabs.Content value={activeTab} className={classes["tab-content"]}>
          <RouteSwitch>
            <Route path="/edit">
              {ownsScoreTable ? (
                <PlayerForm params={{ nickname: params.nickname }} />
              ) : ownershipPending ? null : (
                <Redirect to="/" replace />
              )}
            </Route>
            <Route path="/history/:hash?">
              {(routeParams) => (
                <Suspense fallback={<></>}>
                  <PlayerHistory
                    params={{
                      nickname: params.nickname,
                      hash: routeParams.hash,
                    }}
                  />
                </Suspense>
              )}
            </Route>
            <Route path="/image">
              {ownsScoreTable && record != null ? (
                scoresReady ? (
                  <PlayerRatingImage
                    scoreTable={scoreTable}
                    cardName={record.card_name}
                    title={record.title}
                    trophy={record.trophy}
                    nickname={params.nickname ?? ""}
                    isPrivate={player.private}
                    courseRank={record.course_rank}
                    classRank={record.class_rank}
                  />
                ) : null
              ) : ownershipPending ? null : (
                <Redirect to="/" replace />
              )}
            </Route>
            <Route path="/">
              {record == null ? (
                <Alert severity="warning">
                  沒有成績可以顯示。可能是還沒有上傳成績。
                </Alert>
              ) : !scoresReady ? null : (
                <PlayerScores
                  allEntries={scoreTable}
                  afterCircle={afterCircle}
                  nickname={params.nickname ?? ""}
                  updatedAt={player.updated_at}
                  toolbarContainer={scoresToolbar}
                />
              )}
            </Route>
            <Route>
              <Redirect to="/" replace />
            </Route>
          </RouteSwitch>
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}
export default Player
