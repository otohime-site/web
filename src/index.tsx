import { getRedirectResult } from "firebase/auth"
import { render } from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider as EMThemeProvider } from "@emotion/react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { ThemeProvider, StylesProvider } from "@material-ui/styles"
import { createTheme } from "@material-ui/core/styles"
import { pink, orange } from "@material-ui/core/colors"
import { HelmetProvider } from "react-helmet-async"
import App from "./App"
import GraphQLProvider from "./GraphQLProvider"
import { firebaseAuth, AuthProvider } from "./auth"

getRedirectResult(firebaseAuth).then(
  () => {},
  () => {}
)

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: orange,
  },
})

const root = document.getElementById("root")
render(
  <BrowserRouter>
    <HelmetProvider>
      <StylesProvider injectFirst={true}>
        <EMThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <GraphQLProvider>
                <CssBaseline />
                <App />
              </GraphQLProvider>
            </AuthProvider>
          </ThemeProvider>
        </EMThemeProvider>
      </StylesProvider>
    </HelmetProvider>
  </BrowserRouter>,
  root
)
