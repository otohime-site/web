import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import saveAs from "file-saver"
import { Suspense, lazy, useCallback, useRef, useState } from "react"
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

// The Rating 圖片 dialog: canvas preview with display toggles and download.
const PlayerRatingImage = ({
  open,
  onOpenChange,
  scoreTable,
  cardName,
  title,
  trophy,
  nickname,
  isPrivate,
  courseRank,
  classRank,
  updatedDate,
  maxVersion,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  scoreTable: ScoreTableEntry[]
  cardName: string
  title: string
  trophy: "normal" | "bronze" | "silver" | "gold" | "rainbow"
  nickname: string
  isPrivate: boolean
  courseRank?: number | null
  classRank?: number | null
  updatedDate?: string
  maxVersion?: string
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  // Scale the intrinsic 2100px-wide canvas to fit the dialog: cap at 25% on
  // wide screens, shrink to the available width on narrow ones so it never
  // overflows horizontally. Driven off the scroll container's own width.
  const scaleObserverRef = useRef<ResizeObserver | null>(null)
  const scaleBoxRef = useCallback((box: HTMLDivElement | null) => {
    contentRef.current = box
    scaleObserverRef.current?.disconnect()
    scaleObserverRef.current = null
    if (box == null) return
    const observer = new ResizeObserver(() => {
      const scale = Math.min(0.25, box.clientWidth / 2100)
      box.style.setProperty("--rating-scale", `${scale}`)
    })
    observer.observe(box)
    scaleObserverRef.current = observer
  }, [])
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
              <div className={classes["toolbar-header"]}>
                <Dialog.Title>Rating 組成圖片</Dialog.Title>
                <button onClick={handleDownload}>
                  <IconFileDownload /> 下載圖片
                </button>
                <Dialog.CloseTrigger asChild>
                  <button aria-label="關閉">
                    <IconClose />
                  </button>
                </Dialog.CloseTrigger>
              </div>
              <div className={classes["toolbar-switches"]}>
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
              </div>
            </div>
            <div ref={scaleBoxRef} className={classes.canvas}>
              {open ? (
                <Suspense fallback={<p>產生圖片中…</p>}>
                  {/* The canvas renders at its intrinsic 2100x3750; the
                      wrapper scales it down for display while keeping the
                      full-resolution bitmap for download. */}
                  <div className={classes["canvas-scale"]}>
                    <PlayerRatingCanvas
                      scoreTable={scoreTable}
                      cardName={cardName}
                      title={title}
                      trophy={trophy}
                      courseRank={courseRank}
                      classRank={classRank}
                      updatedDate={updatedDate}
                      maxVersion={maxVersion}
                      scoreUrl={scoreUrl}
                      showRating={showRating}
                      showRanks={showRanks}
                      showUrl={showUrl && !isPrivate}
                    />
                  </div>
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
