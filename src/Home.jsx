import host from './host';

export default function home() {
  return (
    <div>
      <p>公測中！會不會刪檔視營運狀況而定。</p>
      <p>目前需使用 Facebook 登入，且只支援 maimai 的成績單喔。</p>
      <h3>暫時簡明使用說明</h3>
      <p>如果你使用其他一樣基於 Bookmarklet 的工具，原理跟使用方式是一樣的。</p>
      <p>將下面文字框的內容作為網址加入書籤，連上官方成績網站，點擊書籤以觸發更新程式。</p>
      <p>在 Android 手機瀏覽器中，您需要為書籤取一個好名字，連上官方成績網站後，點擊網址列，輸入您取的名字找到儲存的書籤以觸發程式。</p>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <p><textarea rows="3" style={{ width: '90%' }} onFocus={e => e.target.select()}>{`javascript:var s=document.createElement("script");s.src="https://${host}/go.js";document.body.appendChild(s);void(0);`}</textarea></p>
    </div>
  );
}
