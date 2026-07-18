import saveAs from "file-saver"
import { Suspense, lazy, useRef, useState } from "react"
import IconFileDownload from "~icons/mdi/file-download"
import { Switch } from "../../common/components/ui/Switch"
import host from "../../host"
import { ScoreTableEntry } from "../models/aggregation"
import classes from "./PlayerRatingImage.module.css"

// Konva is heavy; only pull it into a chunk that loads with this tab.
const PlayerRatingCanvas = lazy(
  async () => await import("./PlayerRatingCanvas"),
)

// The Rating 圖片 tab: canvas preview with display toggles and download.
const PlayerRatingImage = ({
  scoreTable,
  cardName,
  title,
  trophy,
  nickname,
  isPrivate,
  courseRank,
  classRank,
}: {
  scoreTable: ScoreTableEntry[]
  cardName: string
  title: string
  trophy: "normal" | "bronze" | "silver" | "gold" | "rainbow"
  nickname: string
  isPrivate: boolean
  courseRank?: number | null
  classRank?: number | null
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [showRating, setShowRating] = useState(true)
  const [showRanks, setShowRanks] = useState(true)
  // The URL is only meaningful for a public score, so the toggle defaults on
  // only when the score is public and can never be enabled while it is private.
  const [showUrl, setShowUrl] = useState(!isPrivate)
  const scoreUrl = `https://${host}/dxi/p/${nickname}`

  const handleDownload = () => {
    const canvas = contentRef.current?.querySelector("canvas")
    if (!canvas) return
    canvas.toBlob((blob) => {
      if (blob) saveAs(blob, `${cardName} - rating.png`)
    })
  }

  return (
    <div className={classes.content}>
      <div className={classes.toolbar}>
        <h2>Rating 組成</h2>
        <Switch
          checked={showRating}
          onCheckedChange={(e) => setShowRating(e.checked)}
        >
          Rating
        </Switch>
        <Switch
          checked={showRanks}
          onCheckedChange={(e) => setShowRanks(e.checked)}
        >
          段位／對戰階級
        </Switch>
        <Switch
          checked={showUrl}
          disabled={isPrivate}
          onCheckedChange={(e) => setShowUrl(e.checked)}
        >
          成績單網址
        </Switch>
        <button onClick={handleDownload}>
          <IconFileDownload /> 下載圖片
        </button>
      </div>
      <div ref={contentRef} className={classes.canvas}>
        <Suspense fallback={<p>產生圖片中…</p>}>
          <PlayerRatingCanvas
            scoreTable={scoreTable}
            cardName={cardName}
            title={title}
            trophy={trophy}
            courseRank={courseRank}
            classRank={classRank}
            scoreUrl={scoreUrl}
            showRating={showRating}
            showRanks={showRanks}
            showUrl={showUrl && !isPrivate}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default PlayerRatingImage
