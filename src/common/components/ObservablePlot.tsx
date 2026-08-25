import * as Plot from "@observablehq/plot"
import { useLayoutEffect, useRef } from "react"

import classes from "./ObservablePlot.module.css"

interface ObservablePlotProps {
  ariaLabel: string
  className?: string
  options: (width: number) => Plot.PlotOptions
}

// Primarily a responsive wrapper: it rebuilds an Observable Plot whenever its
// container width changes, while page-specific plot options stay at call sites.
const ObservablePlot = ({
  ariaLabel,
  className,
  options,
}: ObservablePlotProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (container == null) return

    let renderedWidth = 0
    const render = () => {
      const width = Math.floor(container.getBoundingClientRect().width)
      if (width <= 0 || width === renderedWidth) return

      const plot = Plot.plot({
        ...options(width),
        ariaLabel,
        width,
        style:
          "background: transparent; color: var(--text-1); " +
          'font-family: "M PLUS 2", sans-serif; ' +
          "--plot-background: var(--surface-1);",
      })
      container.replaceChildren(plot)
      renderedWidth = width
    }

    render()
    const resizeObserver = new ResizeObserver(render)
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      container.replaceChildren()
    }
  }, [ariaLabel, options])

  return (
    <div
      ref={containerRef}
      className={[classes.plot, className].filter(Boolean).join(" ")}
    />
  )
}

export { ObservablePlot }
export type { ObservablePlotProps }
