import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import saveAs from "file-saver"
import { Suspense, lazy, useRef, useState } from "react"
import IconClose from "~icons/mdi/close"
import IconFileDownload from "~icons/mdi/file-download"
import { Switch } from "../../common/components/ui/Switch"
import host from "../../host"
import { ScoreTableEntry } from "../models/aggregation"
import classes from "./PlayerRatingImage.module.css"

// Konva is heavy; only pull it into a chunk that loads when the dialog opens.
const PlayerRatingCanvas = lazy(
  async () => await import("./PlayerRatingCanvas"),
)

const PlayerRatingImage = ({
  open,
  onOpenChange,
  scoreTable,
  cardName,
  nickname,
  isPrivate,
  courseRank,
  classRank,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  scoreTable: ScoreTableEntry[]
  cardName: string
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
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className={classes.content}>
            <div className={classes.toolbar}>
              <Dialog.Title>Rating 組成</Dialog.Title>
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
                段位／課題
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
              <Dialog.CloseTrigger asChild>
                <button aria-label="關閉">
                  <IconClose />
                </button>
              </Dialog.CloseTrigger>
            </div>
            <div ref={contentRef} className={classes.canvas}>
              {open ? (
                <Suspense fallback={<p>產生圖片中…</p>}>
                  <PlayerRatingCanvas
                    scoreTable={scoreTable}
                    cardName={cardName}
                    courseRank={courseRank}
                    classRank={classRank}
                    scoreUrl={scoreUrl}
                    showRating={showRating}
                    showRanks={showRanks}
                    showUrl={showUrl && !isPrivate}
                  />
                </Suspense>
              ) : null}
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default PlayerRatingImage
