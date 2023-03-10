import { FunctionComponent } from "react"
import { Route, Routes } from "react-router-dom"
import Overview from "./pages/Overview"
import SongStats from "./pages/SongStats"
import Player from "./Player"
import PlayerForm from "./PlayerForm"
import PlayerHistory from "./PlayerHistory"

const DxIntl: FunctionComponent = () => (
  <Routes>
    <Route path="p/new" element={<PlayerForm />} />
    <Route path="p/:nickname/edit" element={<PlayerForm />} />
    <Route path="p/:nickname/history" element={<PlayerHistory />} />
    <Route path="p/:nickname/history/:hash" element={<PlayerHistory />} />
    <Route path="p/:nickname" element={<Player />} />
    <Route path="s/:songId" element={<SongStats />} />
    <Route path="s/:songId/:variant" element={<SongStats />} />
    <Route path="s/:songId/:variant/:difficulty" element={<SongStats />} />
    <Route path="/" element={<Overview />} />
  </Routes>
)
export default DxIntl
