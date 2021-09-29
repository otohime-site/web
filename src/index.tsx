import { ThemeProvider as EMThemeProvider } from "@emotion/react"
import CssBaseline from "@material-ui/core/CssBaseline"
import { pink, orange } from "@material-ui/core/colors"
import { createTheme } from "@material-ui/core/styles"
import { ThemeProvider, StylesProvider } from "@material-ui/styles"
import { SnackbarProvider } from "notistack"
import { render } from "react-dom"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import GraphQLProvider from "./GraphQLProvider"
import { AuthProvider } from "./auth"

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
            <SnackbarProvider maxSnack={3}>
              <AuthProvider>
                <GraphQLProvider>
                  <CssBaseline />
                  <App />
                </GraphQLProvider>
              </AuthProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </EMThemeProvider>
      </StylesProvider>
    </HelmetProvider>
  </BrowserRouter>,
  root
)
