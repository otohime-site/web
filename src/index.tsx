import { createRoot } from "react-dom/client"
import { IconContext } from "react-icons"
import { BrowserRouter } from "react-router-dom"
import { Titled } from "react-titled"
import App from "./App"
import GraphQLProvider from "./common/components/GraphQLProvider"
import { AuthProvider } from "./common/contexts"

const container = document.getElementById("root")
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(container!).render(
  <BrowserRouter>
    <Titled title="Otohime">
      <AuthProvider>
        <GraphQLProvider>
          <IconContext.Provider value={{ className: "react-icons" }}>
            <App />
          </IconContext.Provider>
        </GraphQLProvider>
      </AuthProvider>
    </Titled>
  </BrowserRouter>
)
