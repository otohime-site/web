import { FunctionComponent } from "react"
import { Route, Routes } from "react-router-dom"
import Overview from "./Overview"
import Player from "./Player"
import PlayerForm from "./PlayerForm"
import PlayerHistory from "./PlayerHistory"
import Song from "./Song"
import SongStats from "./SongStats"

const DxIntl: FunctionComponent = () => (
  <Routes>
    <Route path="p/new" element={<PlayerForm />} />
    <Route path="p/:nickname/edit" element={<PlayerForm />} />
    <Route path="p/:nickname/history" element={<PlayerHistory />} />
    <Route path="p/:nickname/history/:hash" element={<PlayerHistory />} />
    <Route path="p/:nickname" element={<Player />}>
      <Route path="s/:songId" element={<Song />} />
    </Route>
    <Route path="s/:songId" element={<SongStats />} />
    <Route path="s/:songId/:variant" element={<SongStats />} />
    <Route path="s/:songId/:variant/:difficulty" element={<SongStats />} />
    <Route path="/" element={<Overview />} />
  </Routes>
)
export default DxIntl
