import { Tabs } from "@ark-ui/react/tabs"
import { Suspense, lazy, useCallback, useRef, useState } from "react"
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
import IconLock from "~icons/mdi/lock"
import IconPencil from "~icons/mdi/pencil"
import IconPublic from "~icons/mdi/public"
import { PageMeta } from "../../common/components/PageMeta"
import { Alert } from "../../common/components/ui/Alert"
import { useUser } from "../../common/contexts"
import { graphql, readFragment } from "../../graphql"
import Record from "../components/Record"
import { dxIntlRecordsFields } from "../models/fragments"
import { dxIntlPlayersEditableDocument } from "../models/queries"
import classes from "./Player.module.css"
import PlayerForm from "./PlayerForm"
import PlayerScores from "./PlayerScores"

// History pulls in Chart.js; keep it in its own chunk like before.
const PlayerHistory = lazy(async () => await import("./PlayerHistory"))

const playerTabRoutes = {
  scores: "/",
  history: "/history",
} as const
type PlayerTab = keyof typeof playerTabRoutes

// Keep the lightweight record query in the shared player layout. PlayerScores
// owns the heavier song/score queries and aggregation.
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
const Player = ({ params }: { params: Params }) => {
  const user = useUser()
  const nickname = params.nickname ?? ""
  const playerPath = `/dxi/p/${encodeURIComponent(nickname)}`
  // Tab routes nested under /p/:nickname. Editing is a dialog over the
  // scores view, so /edit keeps the scores tab active underneath it.
  const [location, navigate] = useLocation()
  const editing = location === "/edit"
  const activeTab: PlayerTab = location.startsWith("/history")
    ? "history"
    : "scores"
  const [editableResult] = useQuery({
    query: dxIntlPlayersEditableDocument,
    variables: { userId: user?.uid ?? "", nickname },
    pause: user == null,
  })
  const [recordResult] = useQuery({
    query: dxIntlRecordDocument,
    variables: { nickname },
  })

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
  if (recordResult.error != null) {
    return (
      <>
        <PageMeta
          canonicalPath={playerPath}
          description={`查看 ${nickname} 的 maimai DX 國際版成績單。`}
          title={`${nickname} - maimai DX 成績單 - Otohime`}
        />
        <Alert severity="error">發生錯誤，請重試。</Alert>
      </>
    )
  }
  if (recordResult.data == null) {
    return (
      <PageMeta
        canonicalPath={playerPath}
        description={`查看 ${nickname} 的 maimai DX 國際版成績單。`}
        title={`${nickname} - maimai DX 成績單 - Otohime`}
      />
    )
  }
  if (recordResult.data.dx_intl_players.length === 0) {
    return (
      <>
        <PageMeta
          canonicalPath={playerPath}
          description="這個 Otohime 成績單不存在或未公開。"
          noIndex
          title="成績單不存在 - Otohime"
        />
        <Alert severity="warning">成績單不存在或為私人成績單。</Alert>
      </>
    )
  }

  const player = recordResult.data.dx_intl_players[0]
  // A player without uploads has no record yet; the layout (tabs, edit)
  // still renders and the scores tab shows the explanation instead.
  const record = readFragment(dxIntlRecordsFields, player.dx_intl_record)
  const cardName = record?.card_name ?? nickname
  const onHistory = activeTab === "history"
  // While the editable query is in flight we cannot tell an owner from a
  // visitor yet, so the owner-only routes hold off their redirect.
  const ownershipPending = editableResult.fetching

  const ownsScoreTable =
    editableResult.error == null &&
    (editableResult.data?.dx_intl_players?.length ?? 0) > 0
  const scoresContent =
    record == null ? (
      <Alert severity="warning">沒有成績可以顯示。可能是還沒有上傳成績。</Alert>
    ) : (
      <PlayerScores
        nickname={params.nickname ?? ""}
        updatedAt={player.updated_at}
        toolbarContainer={scoresToolbar}
        ownsScoreTable={ownsScoreTable}
        rating={record.rating}
        ratingLegacy={record.rating_legacy}
        ratingImage={{
          cardName: record.card_name,
          title: record.title,
          trophy: record.trophy,
          rating: record.rating,
          isPrivate: player.private,
          courseRank: record.course_rank,
          classRank: record.class_rank,
        }}
      />
    )

  return (
    <>
      <PageMeta
        canonicalPath={onHistory ? `${playerPath}/history` : playerPath}
        description={
          onHistory
            ? `查看 ${cardName} 的 maimai DX 成績單歷史紀錄。`
            : `查看 ${cardName} 的 maimai DX 國際版成績單、Rating 與 Best 50 組成。`
        }
        noIndex={editing || onHistory}
        title={
          onHistory
            ? `成績單歷史紀錄 - ${cardName} - maimai DX 成績單 - Otohime`
            : `${cardName} - maimai DX 成績單 - Otohime`
        }
      />
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
              {ownsScoreTable ? (
                <PlayerForm
                  params={{ nickname: params.nickname }}
                  open={editing}
                  onOpenChange={(open) =>
                    navigate(open ? "/edit" : "/", { replace: !open })
                  }
                  trigger={
                    <button className={classes["edit-button"]}>
                      <IconPencil /> 編輯
                    </button>
                  }
                />
              ) : null}
              <Tabs.List
                aria-label="成績單頁面"
                className={classes["tabs-list"]}
              >
                <Tabs.Trigger value="scores" className={classes["tab-trigger"]}>
                  <IconClipboardText /> 成績單
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="history"
                  className={classes["tab-trigger"]}
                >
                  <IconHistory /> 歷史紀錄
                </Tabs.Trigger>
                <Tabs.Indicator className={classes["tabs-indicator"]} />
              </Tabs.List>
            </div>
          </div>
          {activeTab === "scores" && record != null ? (
            <div
              ref={setScoresToolbar}
              aria-label="成績單選項"
              className={classes["top-bar-controls"]}
            />
          ) : null}
        </header>
        <Tabs.Content value={activeTab} className={classes["tab-content"]}>
          {activeTab === "scores" ? (
            scoresContent
          ) : (
            <RouteSwitch>
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
              <Route>
                <Redirect to="/" replace />
              </Route>
            </RouteSwitch>
          )}
          {editing && !ownsScoreTable && !ownershipPending ? (
            <Redirect to="/" replace />
          ) : null}
          {activeTab === "scores" && location !== "/" && !editing ? (
            <Redirect to="/" replace />
          ) : null}
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}
export default Player
