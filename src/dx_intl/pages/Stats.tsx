import { Link, Params, Redirect, Route, Switch, useRoute } from "wouter"
import NotFound from "../../common/pages/NotFound"
import classes from "./Stats.module.css"
import StatsOverview from "./StatsOverview"
import StatsRatingTarget from "./StatsRatingTarget"
import StatsSong from "./StatsSong"
import StatsSongs from "./StatsSongs"

const LegacySongStatsRedirect = ({ params }: { params: Params }) => (
  <Redirect
    to={`~/dxi/s/${params.songId ?? ""}/${params.variant ?? ""}`}
    replace
  />
)

const Stats = () => {
  const [overviewActive] = useRoute("/overview")
  const [ratingTargetActive] = useRoute("/rt/*?")
  // The song list is the root and song pages live at /:songId, so anything
  // else is the song section.
  const songStatsActive = !overviewActive && !ratingTargetActive

  return (
    <div className={classes.layout}>
      <aside className={classes.sidebar}>
        <h3>玩家統計</h3>
        <nav aria-label="統計頁面">
          <Link
            href="~/dxi/s/overview"
            className={overviewActive ? classes.active : undefined}
          >
            統計總覽
          </Link>
          <Link
            href="~/dxi/s"
            className={songStatsActive ? classes.active : undefined}
          >
            樂曲統計
          </Link>
          <Link
            href="~/dxi/s/rt/14000"
            className={ratingTargetActive ? classes.active : undefined}
          >
            Rating 目標
          </Link>
        </nav>
      </aside>
      <div className={classes.content}>
        <Switch>
          <Route path="/" component={StatsSongs} />
          <Route path="/overview" component={StatsOverview} />
          <Route path="/rt/:rating" component={StatsRatingTarget} />
          <Route
            path="/:songId/:variant/:difficulty"
            component={LegacySongStatsRedirect}
          />
          <Route path="/:songId/:variant" component={StatsSong} />
          <Route path="/:songId" component={StatsSong} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  )
}

export default Stats
