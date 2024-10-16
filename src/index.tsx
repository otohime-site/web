import { createRoot } from "react-dom/client"
import { Titled } from "react-titled"
import App from "./App"
import { AppProvider } from "./common/contexts"

const container = document.getElementById("root")
createRoot(container!).render(
  <Titled title="Otohime">
    <AppProvider skeleton={<></>}>
      <App />
    </AppProvider>
  </Titled>,
)
