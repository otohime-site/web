import { Titled } from "react-titled"
import DxUserPlayers from "../../dx_intl/components/UserPlayers"
import Token from "../components/Token"
import { Alert } from "../components/ui/Alert"
import { LinkButton } from "../components/ui/Button"
import { useUser } from "../contexts"

const HomeComponent = () => {
  const user = useUser()
  if (user == null) {
    return (
      <>
        <Titled title="Otohime: 音 Game 成績單網站" />
        <p>
          Otohime
          可以把您遊戲機台的成績整理至單一的成績單頁面，將其設為公開或自己才能閱覽。
          目前支援 maimai DX 國際版。
        </p>

        <ul>
          <li>目前採用 Facebook 登入</li>
          <li>適用桌面與可使用 Bookmarklet 的手機瀏覽器</li>
        </ul>
        <LinkButton href="/dxi">DX 公開玩家統計</LinkButton>
      </>
    )
  }
  return (
    <div>
      <Titled title={(title) => `首頁 - ${title}`} />
      <Alert severity="warning">
        因應國際版更新，目前本站先將尚未完成潤飾的新版前端上架。
        <br />
        版面會在近幾天陸續更新，功能面如有問題請至交流區回報 QQ
      </Alert>
      <div>
        <h4>我的成績單</h4>
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
      <h4>暫時放這裡</h4>
      <LinkButton href="/dxi">DX 公開玩家統計</LinkButton>
    </div>
  )
}
export default HomeComponent
