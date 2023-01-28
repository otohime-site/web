import CssBaseline from "@mui/material/CssBaseline"
import { pink, orange } from "@mui/material/colors"
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles"
import { SnackbarProvider } from "notistack"
import { createRoot } from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { AuthProvider } from "./auth"
import GraphQLProvider from "./common/components/GraphQLProvider"

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

const container = document.getElementById("root")
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(container!).render(
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
  </BrowserRouter>
)
