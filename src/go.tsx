import React from "react"
import { render } from "react-dom"
import { ThemeProvider as EMThemeProvider } from "@emotion/react"
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline"
import { ThemeProvider, StylesProvider } from "@material-ui/styles"
import { createTheme } from "@material-ui/core/styles"
import { pink, orange } from "@material-ui/core/colors"
import styled from "@emotion/styled"
import { GraphQLBookmarkletProvider } from "./GraphQLProvider"
import Book from "./Book"

import "./global.css"

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: orange,
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
    <Container>
      <StylesProvider injectFirst={true}>
        <EMThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <GraphQLBookmarkletProvider token={token}>
              <ScopedCssBaseline />
              <Book />
            </GraphQLBookmarkletProvider>
          </ThemeProvider>
        </EMThemeProvider>
      </StylesProvider>
    </Container>,
    root
  )
}
