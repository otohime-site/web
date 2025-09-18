import { TabListProps, Tabs } from "@ark-ui/react/tabs"
import { useCallback, useState } from "react"
import classes from "./ScrollableTabList.module.css"

export const ScrollableTabList = ({
  children,
  ...props
}: TabListProps & React.RefAttributes<HTMLDivElement>) => {
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
      const buttonSize =
        node.parentNode?.querySelector("button")?.clientWidth ?? 0
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
            (m.target as HTMLButtonElement).getAttribute("aria-selected") ==
              "true",
        )[0].target as HTMLButtonElement

        const scrollLeft = node.scrollLeft
        if (selected.offsetLeft - buttonSize < scrollLeft) {
          node.scrollTo({
            left: selected.offsetLeft - buttonSize,
            top: 0,
            behavior: "smooth",
          })
        }
        if (
          selected.offsetLeft + selected.clientWidth + buttonSize >
          scrollLeft + node.clientWidth
        ) {
          node.scrollTo({
            left:
              selected.offsetLeft +
              selected.clientWidth -
              node.clientWidth -
              buttonSize,
            top: 0,
            behavior: "smooth",
          })
        }
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
      tabList.scrollTo({
        left: tabList.scrollLeft + amount,
        behavior: "smooth",
      })
    }
  }
  return (
    <div className={classes["scrollable-tab"]}>
      <button disabled={scrollDisabled[0]} onClick={scrollBy(-200)}>
        &lt;
      </button>
      <Tabs.List {...props} ref={scrollableTabRef}>
        {children}
      </Tabs.List>
      <button disabled={scrollDisabled[1]} onClick={scrollBy(200)}>
        &gt;
      </button>
    </div>
  )
}
