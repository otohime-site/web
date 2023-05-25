import { Titled } from "react-titled"
import DxUserPlayers from "../../dx_intl/components/UserPlayers"
import Token from "../components/Token"
import { useAuth } from "../contexts"

const HomeComponent = () => {
  const [user, loading] = useAuth()
  if (loading) {
    return <></>
  }
  if (user == null) {
    return (
      <>
        <Titled title="Otohime: 音 Game 成績單網站" />
        <div></div>
      </>
    )
  }
  return (
    <div>
      <Titled title={(title) => `首頁 - ${title}`} />
      <div>
        <DxUserPlayers />
      </div>
      <div>
        <h4>Bookmarklet</h4>
        <p>
          新增好成績單後，您需要透過書籤從瀏覽器將成績匯入到 Otohime。
          <a
            href="https://littlebtc.gitbook.io/otohime-docs/bookmarklet-help"
            target="_blank"
            rel="noreferrer"
          >
            詳細圖文說明
          </a>
          。
        </p>
        <Token />
      </div>
    </div>
  )
}
export default HomeComponent
