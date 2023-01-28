// This is a dual-usage bookmarklet entry
// Which should work with Vite dev server and
// production build (which will be copied to dist/)

const HEAD_LOCAL = `
<script type="module">
  import RefreshRuntime from "https://localhost:8080/@react-refresh"
  RefreshRuntime.injectIntoGlobalHook(window)
  window.$RefreshReg$ = () => {}
  window.$RefreshSig$ = () => (type) => type
  window.__vite_plugin_react_preamble_installed__ = true
</script>
<script type="module" src="https://localhost:8080/@vite/client"></script>
<script type="module" src="https://localhost:8080/src/bookmarklet/entry.tsx"></script>
`
const HEAD_PROD = `
<script type="module" src="https://otohi.me/ryugujo.js"></script>
`
;(() => {
  const injected = document
    .querySelector("script[src$='go.js']")
    .getAttribute("src")
  const token = (
    document.body.getAttribute("data-otohime-token") ?? ""
  ).replace(/[^0-9a-z]/g, "")
  const frame = document.createElement("iframe")
  frame.style.position = "fixed"
  frame.style.top = "0"
  frame.style.left = "0"
  frame.style.width = "100vw"
  frame.style.height = "100vh"
  frame.style.border = "0"
  const head = injected.includes("localhost") ? HEAD_LOCAL : HEAD_PROD
  frame.srcdoc = `
<html>
  <head>${head}</head>
  <body data-otohime-token="${token}"></body>
</html>
`
  document.body.appendChild(frame)
})()
