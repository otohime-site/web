import { Titled } from "react-titled"
import DxUserPlayers from "../../dx_intl/components/UserPlayers"
import { LinkButton } from "../components/ui/Button"
import { useUser } from "../contexts"

import classes from "./Home.module.css"

const HomeComponent = () => {
  const user = useUser()
  if (user == null) {
    return (
      <>
        <Titled title="Otohime: 音 Game 成績單網站" />
        <div className={classes.hero}>
          <h2>Otohime 是適用於 maimai 國際版的成績單系統。</h2>
          <p>
            打完機台之後，成績不必只留在官方網站。把成績匯入
            Otohime，整理成一份可以公開分享、也可以自己私藏的成績單，記下每一次的進步。
          </p>
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
              採用可複製的 Bookmarklet
              連結，可在電腦與手機、平板瀏覽器上使用，隨時更新。
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
              根據公開成績單分析，提供各曲目的 Clear 狀況統計、各 Rating
              的熱門採計曲、各版本難易度別的最難達成排名等項目，方便攻略特定成就。
            </p>
          </section>
        </div>
        <section className={classes["getting-started"]}>
          <h5>如何開始？</h5>
          <ol>
            <li>點右上角的「登入」，用 Google 帳號登入就完成註冊了。</li>
            <li>
              點上方的「取得更新連結」，照著說明把 Bookmarklet 加入瀏覽器書籤。
            </li>
            <li>
              之後每次打完機台，登入官方成績單網站、點一下書籤，成績就會同步到
              Otohime。
            </li>
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
        <DxUserPlayers />
      </article>
      <aside className={classes["my-tips"]}>
        <h6>小提醒</h6>
        <ul>
          <li>點右上角的「取得更新連結」設定 Bookmarklet，隨時同步成績。</li>
          <li>設為公開的成績單會納入玩家統計，也可以分享給朋友。</li>
          <li>帳號轉移與刪除帳號請到頭像選單中的「設定」。</li>
        </ul>
      </aside>
    </div>
  )
}
export default HomeComponent
