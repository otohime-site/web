import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import "./global.css"

const Home = lazy(async () => await import("./common/pages/Home"))
const Forget = lazy(async () => await import("./common/pages/Forget"))
const DxIntl = lazy(async () => await import("./dx_intl/index"))
const Finale = lazy(async () => await import("./finale/index"))

const App = () => {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/dxi/*" element={<DxIntl />} />
          <Route path="/fin/*" element={<Finale />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
