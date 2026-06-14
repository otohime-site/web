import { Dialog } from "@ark-ui/react/dialog"
import { Portal } from "@ark-ui/react/portal"
import saveAs from "file-saver"
import { Suspense, lazy, useRef } from "react"
import IconClose from "~icons/mdi/close"
import IconFileDownload from "~icons/mdi/file-download"
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
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  scoreTable: ScoreTableEntry[]
  cardName: string
}) => {
  const contentRef = useRef<HTMLDivElement>(null)

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
