import { orange, pink } from "@mui/material/colors"
import CssBaseline from "@mui/material/CssBaseline"
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles"
import { SnackbarProvider } from "notistack"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Titled } from "react-titled"
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
    <Titled title="Otohime">
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
    </Titled>
  </BrowserRouter>
)
