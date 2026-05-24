import {
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
  Tooltip,
} from "chart.js"
import "chartjs-adapter-date-fns"

// Register the Chart.js parts used by the rating line charts. Importing this
// module for its side effects is enough; do it once before rendering a <Line>.
ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip)
