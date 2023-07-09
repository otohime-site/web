import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { Titled } from "react-titled"
import App from "./App"
import { AppProvider } from "./common/contexts"

const container = document.getElementById("root")
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(container!).render(
  <BrowserRouter>
    <Titled title="Otohime">
      <AppProvider skeleton={<>Loading...</>}>
        <App />
      </AppProvider>
    </Titled>
  </BrowserRouter>
)
