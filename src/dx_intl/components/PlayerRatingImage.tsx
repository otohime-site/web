import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import saveAs from "file-saver"
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import IconClose from "~icons/mdi/close"
import IconFileDownload from "~icons/mdi/file-download"
import { Switch } from "../../common/components/ui/Switch"
import host from "../../host"
import { ScoreTableEntry } from "../models/aggregation"
import type { RatingImageInfo } from "./PlayerRatingCanvas"
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
  info,
  nickname,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  scoreTable: ScoreTableEntry[]
  info: RatingImageInfo
  nickname: string
}) => {
  const { cardName, title, isPrivate } = info
  // The Konva stage renders offscreen and reports a PNG; the dialog shows it as
  // a plain <img> so iOS Safari offers its long-press 拷貝／儲存影像 menu, which
  // it never does for a <canvas>. The canvas hands over a Blob and this
  // component owns the object URL, so creation and revocation stay in one place
  // — including on unmount, which a canvas-minted URL would leak.
  const [blob, setBlob] = useState<Blob | null>(null)
  const [showTitle, setShowTitle] = useState(true)
  const [showRanks, setShowRanks] = useState(true)
  // The URL is only meaningful for a public score, so the toggle defaults on
  // only when the score is public and can never be enabled while it is private.
  const [showUrl, setShowUrl] = useState(!isPrivate)
  const scoreUrl = `https://${host}/dxi/p/${nickname}`
  // Identity-stable: PlayerRatingCanvas is memoized, and a fresh callback each
  // render would re-run its export effect in a loop.
  const handleRender = useCallback((next: Blob) => setBlob(next), [])

  const imageUrl = useMemo(
    () => (blob == null ? null : URL.createObjectURL(blob)),
    [blob],
  )
  useEffect(() => {
    if (imageUrl == null) return
    return () => URL.revokeObjectURL(imageUrl)
  }, [imageUrl])

  // file-saver fetches the object URL, so the download keeps the canvas's full
  // 2100x3750 resolution regardless of how the <img> is displayed.
  const handleDownload = () => {
    if (imageUrl == null) return
    saveAs(imageUrl, `${cardName} - rating.png`)
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => {
        // Drop the bitmap on close so reopening shows the placeholder rather
        // than the previous render while the stage redraws.
        if (!e.open) setBlob(null)
        onOpenChange(e.open)
      }}
    >
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
                  checked={showTitle}
                  disabled={title.length === 0}
                  onCheckedChange={(e) => setShowTitle(e.checked)}
                >
                  稱號
                </Switch>
                <Switch
                  checked={showRanks}
                  onCheckedChange={(e) => setShowRanks(e.checked)}
                >
                  段位／對戰
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
            <div className={classes.canvas}>
              {imageUrl != null ? (
                <img
                  className={classes.image}
                  src={imageUrl}
                  alt={`${cardName} 的 Rating 組成圖片`}
                />
              ) : (
                <p>產生圖片中…</p>
              )}
              {open ? (
                <Suspense fallback={null}>
                  {/* Hidden: this only produces the bitmap shown above. */}
                  <div className={classes.offscreen} aria-hidden="true">
                    <PlayerRatingCanvas
                      scoreTable={scoreTable}
                      info={info}
                      scoreUrl={scoreUrl}
                      showTitle={showTitle}
                      showRanks={showRanks}
                      showUrl={showUrl && !isPrivate}
                      onRender={handleRender}
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
