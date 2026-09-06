import { UnheadProvider, createHead } from "@unhead/react/client"
import { createRoot } from "react-dom/client"
import App from "./App"
import { SiteMeta } from "./common/components/PageMeta"
import { AppProvider } from "./common/contexts"

const container = document.getElementById("root")
const head = createHead()
createRoot(container!).render(
  <UnheadProvider head={head}>
    <SiteMeta />
    <AppProvider>
      <App />
    </AppProvider>
  </UnheadProvider>,
)
