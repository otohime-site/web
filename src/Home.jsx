import host from './host';

export default function home() {
  return (
    <div>
      封測中！
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <p><a href={`javascript:s=document.createElement("script");s.src="https://${host}/go.js";document.body.appendChild(s);void(0);`} className="btn">Bookmarklet</a></p>
    </div>
  );
}
