import { createRoot } from "react-dom/client"
import Book from "./Book"
import GraphQLTokenProvider from "./GraphQLTokenProvider"
import classes from "./go.module.css"

const token = document.body.getAttribute("data-otohime-token")
if (document.getElementById("otohime-root") != null) {
  alert("請不要重複觸發 Bookmarklet！如有需要請重新整理頁面。")
} else if (window.parent.location.host !== "maimaidx-eng.com") {
  alert("請到支援的官方成績單網站觸發這個 Bookmarklet。")
} else if (token == null) {
  alert("缺乏權杖，請確定您的 Bookmarklet 正確。")
} else {
  const container = document.createElement("div")
  container.setAttribute("id", "otohime-root")
  container.setAttribute("lang", "zh-TW")
  container.className = classes.root
  document.body.appendChild(container)
  createRoot(container).render(
    <GraphQLTokenProvider token={token}>
      <Book />
    </GraphQLTokenProvider>
  )
}
