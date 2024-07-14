import { Titled } from "react-titled"
import MdiDeleteAlert from "~icons/mdi/delete-alert"
import DxUserPlayers from "../../dx_intl/components/UserPlayers"
import Token from "../components/Token"
import { LinkButton } from "../components/ui/Button"
import { useUser } from "../contexts"

import classes from "./Home.module.css"

const HomeComponent = () => {
  const user = useUser()
  if (user == null) {
    return (
      <>
        <Titled title="Otohime: 音 Game 成績單網站" />
        <p>
          Otohime
          可以把您遊戲機台的成績整理至單一的成績單頁面，將其設為公開或自己才能閱覽。
          目前支援 maimai DX 國際版，並將過去 Semiquaver 的 maimai
          舊版成績單整合到本站中。
        </p>

        <ul>
          <li>目前採用 Google 登入</li>
          <li>適用桌面與可使用 Bookmarklet 的手機瀏覽器</li>
        </ul>
        <LinkButton href="/dxi">DX 公開玩家統計</LinkButton>
      </>
    )
  }
  return (
    <div>
      <Titled title={(title) => `首頁 - ${title}`} />
      <div className={classes["home-container"]}>
        <div>
          <h4>我的帳號與成績單</h4>
          <DxUserPlayers />
          <h5>權杖與 Bookmarklet</h5>

          <Token />
          <h5>刪除帳號（忘記我）</h5>
          <p>
            您可以刪除在本網站儲存的所有帳號、第三方登入紀錄的個人資料與成績單。
          </p>
          <p>
            <LinkButton href="/forget">
              <MdiDeleteAlert />
              刪除帳號
            </LinkButton>
          </p>
        </div>
        <div>
          <h5>暫時放這裡</h5>
          <p>
            <LinkButton href="/dxi">DX 公開玩家統計</LinkButton>
          </p>
        </div>
      </div>
    </div>
  )
}
export default HomeComponent
