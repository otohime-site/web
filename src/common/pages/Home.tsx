import { useState } from "react"
import { Titled } from "react-titled"
import IconAdd from "~icons/mdi/add"
import DxUserPlayers from "../../dx_intl/components/UserPlayers"
import PlayerForm from "../../dx_intl/pages/PlayerForm"
import Token from "../components/Token"
import { LinkButton } from "../components/ui/Button"
import { useUser } from "../contexts"

import classes from "./Home.module.css"

const HomeComponent = () => {
  const user = useUser()
  const [playersRevision, setPlayersRevision] = useState(0)
  if (user == null) {
    return (
      <>
        <Titled title="Otohime: 音 Game 成績單網站" />
        <div className={classes.hero}>
          <h2>Otohime 是適用於 maimai 國際版的成績單系統。</h2>
          <p>
            完整方便的成績瀏覽介面、豐富的統計資訊，紀錄遊玩點滴、思考進步途徑。
          </p>
          <p>期望能成為您遊玩的好夥伴。</p>
          <p className={classes.actions}>
            <LinkButton href="~/dxi/p/koinu" className="primary">
              成績單範例
            </LinkButton>
            <LinkButton href="~/dxi/s">玩家統計</LinkButton>
          </p>
        </div>
        <div className={classes.features}>
          <section>
            <h5>方便更新</h5>
            <p>
              Otohime 的書籤連結可在電腦與手機、平板瀏覽器上使用，隨時更新。
            </p>
          </section>
          <section>
            <h5>紀錄點滴</h5>
            <p>
              提供完整的成績單資料夾篩選、B50
              圖片匯出、歷史成績等功能，一路陪伴你的遊玩歷程。
            </p>
          </section>
          <section>
            <h5>完整統計</h5>
            <p>
              提供各曲目的 Clear 狀況統計、各 Rating
              的熱門採計曲、各版本難易度別的最難達成排名等項目，方便攻略特定成就。
            </p>
          </section>
        </div>
        <section className={classes["getting-started"]}>
          <h5>如何開始？</h5>
          <ol>
            <li>以 Google 帳號登入。</li>
            <li>建立成績單後，產生書籤並加入到手機或電腦等裝置。</li>
            <li>登入官方 DXNET、點一下書籤，成績就會同步到 Otohime。</li>
          </ol>
        </section>
      </>
    )
  }
  return (
    <div className={classes.my}>
      <Titled title={(title) => `首頁 - ${title}`} />
      <article className={classes["my-players"]}>
        <h4>我的成績單</h4>
        <DxUserPlayers key={playersRevision} />
        <PlayerForm
          params={{}}
          onSaved={() => setPlayersRevision((revision) => revision + 1)}
          trigger={
            <button className="primary">
              <IconAdd />
              新增成績單
            </button>
          }
        />
      </article>
      <aside className={classes["update-link"]}>
        <h4>更新書籤</h4>
        <Token />
      </aside>
    </div>
  )
}
export default HomeComponent
