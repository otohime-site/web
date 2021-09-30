import CssBaseline from "@mui/material/CssBaseline"
import { pink, orange } from "@mui/material/colors"
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles"
import { SnackbarProvider } from "notistack"
import { render } from "react-dom"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import GraphQLProvider from "./GraphQLProvider"
import { AuthProvider } from "./auth"

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

const root = document.getElementById("root")
render(
  <BrowserRouter>
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
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
      </StyledEngineProvider>
    </HelmetProvider>
  </BrowserRouter>,
  root
)
