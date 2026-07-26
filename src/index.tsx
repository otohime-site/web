import { UnheadProvider, createHead } from "@unhead/react/client"
import { createRoot } from "react-dom/client"
import App, { Skeleton } from "./App"
import { SiteMeta } from "./common/components/PageMeta"
import { AppProvider } from "./common/contexts"

const container = document.getElementById("root")
const head = createHead()
createRoot(container!).render(
  <UnheadProvider head={head}>
    <SiteMeta />
    <AppProvider skeleton={<Skeleton />}>
      <App />
    </AppProvider>
  </UnheadProvider>,
)
