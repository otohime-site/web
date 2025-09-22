import {
  SegmentGroup,
  SegmentGroupRootProps,
} from "@ark-ui/react/segment-group"
import { useCallback, useState } from "react"
import classes from "./ScrollableSegmentGroupRoot.module.css"

export const ScrollableSegmentGroupRoot = ({
  children,
  ...props
}: SegmentGroupRootProps & React.RefAttributes<HTMLDivElement>) => {
  const [rootElem, setRootElem] = useState<HTMLDivElement | null>(null)
  const [scrollDisabled, setScrollDisabled] = useState<[boolean, boolean]>([
    false,
    false,
  ])

  const updateScroll = useCallback(() => {
    if (!rootElem) {
      return
    }
    if (rootElem.scrollWidth <= rootElem.clientWidth) {
      setScrollDisabled([true, true])
      return
    }
    setScrollDisabled([false, false])
  }, [rootElem, setScrollDisabled])

  const rootElemRef: React.Ref<HTMLDivElement> = useCallback(
    (node: HTMLDivElement | null) => {
      setRootElem(node)
      if (node == null) {
        return
      }
      const rob = new ResizeObserver(() => {
        updateScroll()
      })
      const mob = new MutationObserver((mutations) => {
        console.log(mutations)
        if (mutations.find((m) => m.type == "childList")) {
          updateScroll()
          return
        }
        // TODO: As SegmentRoot is using radio,
        // the browser should auto-scroll during focus for most cases.
        // but it is far from perfect, maybe deal with that later.
      })
      rob.observe(node)
      mob.observe(node, {
        childList: true,
        subtree: true,
      })
      return () => {
        rob.disconnect()
        mob.disconnect()
      }
    },
    [updateScroll],
  )
  const scrollBy = (amount: number) => () => {
    if (rootElem) {
      rootElem.scrollTo({
        left: rootElem.scrollLeft + amount,
        behavior: "smooth",
      })
    }
  }
  return (
    <div className={classes["scrollable-tab"]}>
      <button disabled={scrollDisabled[0]} onClick={scrollBy(-200)}>
        &lt;
      </button>
      <SegmentGroup.Root {...props} ref={rootElemRef}>
        {children}
      </SegmentGroup.Root>
      <button disabled={scrollDisabled[1]} onClick={scrollBy(200)}>
        &gt;
      </button>
    </div>
  )
}
