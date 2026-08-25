import * as Plot from "@observablehq/plot"

import { ObservablePlot } from "./ObservablePlot"

interface RatingHistoryPoint {
  date: Date
  rating: number
}

interface RatingHistoryPlotProps {
  className?: string
  data: RatingHistoryPoint[]
  maxRating: number
}

// Shared by the DX International and Finale player-history pages.
const RatingHistoryPlot = ({
  className,
  data,
  maxRating,
}: RatingHistoryPlotProps) => (
  <ObservablePlot
    ariaLabel="Rating 歷史走勢圖"
    className={className}
    options={(width) => ({
      height: Math.min(420, Math.max(280, Math.round(width * 0.45))),
      marginLeft: 56,
      x: {
        label: null,
        tickFormat: "%Y-%m",
        type: "time",
      },
      y: {
        domain: [0, maxRating],
        grid: true,
        label: "Rating",
        nice: false,
        tickFormat: maxRating > 100 ? ",d" : undefined,
      },
      marks: [
        Plot.lineY(data, {
          x: "date",
          y: "rating",
          stroke: "#1f77b4",
          strokeWidth: 2,
        }),
        Plot.dot(data, {
          x: "date",
          y: "rating",
          fill: "#1f77b4",
          r: 3,
          tip: {
            format: {
              x: "%Y-%m-%d",
              y: maxRating > 100 ? ",d" : undefined,
            },
          },
        }),
        Plot.ruleY([0]),
      ],
    })}
  />
)

export { RatingHistoryPlot }
export type { RatingHistoryPoint }
