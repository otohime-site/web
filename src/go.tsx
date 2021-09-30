import ScopedCssBaseline from "@mui/material/ScopedCssBaseline"
import { pink, orange } from "@mui/material/colors"
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
  styled,
} from "@mui/material/styles"
import { render } from "react-dom"
import Book from "./Book"
import { GraphQLBookmarkletProvider } from "./GraphQLProvider"
import "./global.css"

const theme = createTheme({
  palette: {
    primary: {
      main: pink[400],
    },
    secondary: {
      main: orange[400],
    },
  },
})

const Container = styled("div")`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const token = document.body.getAttribute("data-otohime-token")
if (document.getElementById("otohime-root") != null) {
  alert("請不要重複觸發 Bookmarklet！如有需要請重新整理頁面。")
} else if (document.location.host !== "maimaidx-eng.com") {
  alert("請到支援的官方成績單網站觸發這個 Bookmarklet。")
} else if (token == null) {
  alert("缺乏權杖，請確定您的 Bookmarklet 正確。")
} else {
  const root = document.createElement("div")
  root.setAttribute("id", "otohime-root")
  document.body.appendChild(root)
  render(
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GraphQLBookmarkletProvider token={token}>
          <ScopedCssBaseline>
            <Container>
              <Book />
            </Container>
          </ScopedCssBaseline>
        </GraphQLBookmarkletProvider>
      </ThemeProvider>
    </StyledEngineProvider>,
    root
  )
}
