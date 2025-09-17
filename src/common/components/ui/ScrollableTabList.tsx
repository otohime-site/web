import { scrollIntoView } from "@react-aria/utils"
import { useCallback, useState } from "react"
import { TabList, TabListProps } from "react-aria-components"
import classes from "./ScrollableTabList.module.css"

export const ScrollableTabList = <T extends object>({
  children,
  ...props
}: TabListProps<T> & React.RefAttributes<HTMLDivElement>) => {
  const [tabList, setTabList] = useState<HTMLDivElement | null>(null)
  const [scrollDisabled, setScrollDisabled] = useState<[boolean, boolean]>([
    false,
    false,
  ])

  const updateScroll = useCallback(() => {
    if (!tabList) {
      return
    }
    if (tabList.scrollWidth <= tabList.clientWidth) {
      setScrollDisabled([true, true])
      return
    }
    setScrollDisabled([false, false])
  }, [tabList, setScrollDisabled])

  const scrollableTabRef: React.Ref<HTMLDivElement> = useCallback(
    (node: HTMLDivElement | null) => {
      setTabList(node)
      if (node == null) {
        return
      }
      const rob = new ResizeObserver(() => {
        updateScroll()
      })
      const mob = new MutationObserver((mutations) => {
        if (mutations.find((m) => m.type == "childList")) {
          updateScroll()
          return
        }
        const selected = mutations.filter(
          (m) =>
            m.type == "attributes" &&
            (m.target as HTMLDivElement).getAttribute("aria-selected") ==
              "true",
        )[0].target
        scrollIntoView(node, selected as HTMLDivElement)
      })
      rob.observe(node)
      mob.observe(node, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["aria-selected"],
      })
      return () => {
        rob.disconnect()
        mob.disconnect()
      }
    },
    [updateScroll],
  )
  const scrollBy = (amount: number) => () => {
    if (tabList) {
      tabList.scrollLeft += amount
    }
  }
  return (
    <div className={classes["scrollable-tab"]}>
      <button disabled={scrollDisabled[0]} onClick={scrollBy(-200)}>
        &lt;
      </button>
      <TabList {...props} ref={scrollableTabRef}>
        {children}
      </TabList>
      <button disabled={scrollDisabled[1]} onClick={scrollBy(200)}>
        &gt;
      </button>
    </div>
  )
}
