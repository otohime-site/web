import React, { FunctionComponent } from 'react'
import host from './host'
import { TextArea, Form, Popup } from 'semantic-ui-react'

const HomeComponent: FunctionComponent = () => {
  const copyToClipboard = (e: React.MouseEvent) => {
    if (!e.target) { return }
    (e.target as HTMLTextAreaElement).select()
    document.execCommand('copy');
    (e.target as HTMLTextAreaElement).blur()
  }
  return (
    <div>
      <p>Semiquaver 是一個非官方的節奏遊戲成績單網站。</p>
      <p>需使用 Facebook 登入，目前支援 maimai 的成績匯入功能。</p>
      <h3>使用說明</h3>
      <ol>
        <li>請先以 Facebook 登入之後，到「我的成績單 &gt; 管理成績單」新增成績單。</li>
        <li>新增完成後回到此頁，將此頁（或任何頁面）加入書籤。</li>
        <li>
          編輯您剛剛加入的書籤，選一個方便識別的名稱，並將網址替換成以下 Bookmarklet 內容（點擊以複製到剪貼簿）：
          <Form>
            <Popup
              content='已複製'
              on='click'
              // tslint:disable-next-line:jsx-no-multiline-js
              trigger={(
              <TextArea
                style={{ cursor: 'pointer' }}
                rows={1}
                readOnly={true}
                onClick={copyToClipboard}
                value={`javascript:var s=document.createElement("script");s.src="https://${host}/go.js";document.body.appendChild(s);void(0);`}
              />)}
            />
          </Form>
        </li>
        <li>進到官方成績單網站，登入後以下列方式之一觸發成績更新方塊：
          <ol>
            <li>點擊書籤。</li>
            <li>（在 Android Chrome 中）點擊網址列，輸入指定的書籤名稱，找到 javascript 開頭的網址。</li>
          </ol>
        </li>
        <li>在更新方塊進行登入後，需要切換分頁回到官方成績網站繼續成績更新。</li>
        <li>接著就可以按照畫面進行成績更新了 :)。完成後請按「(檢視)」查看更新結果。</li>
      </ol>
    </div>
  )
}
export default HomeComponent
