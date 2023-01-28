// This is a dual-usage bookmarklet entry
// Which should work with Vite dev server and
// production build (which will be copied to dist/)

;(() => {
  const injected = document
    .querySelector("script[src$='go.js']")
    .getAttribute("src")
  const scripts = injected.includes("localhost")
    ? "https://localhost:8080/@vite/client|https://localhost:8080/src/bookmarklet/entry.tsx"
    : "https://otohi.me/ryugujo.js"

  const frame = document.createElement("iframe")
  frame.style.position = "fixed"
  frame.style.top = "0"
  frame.style.left = "0"
  frame.style.width = "100vw"
  frame.style.height = "100vh"
  frame.style.border = "0"
  frame.innerHTML = `
<html>
  <head></head>
  <body></body>
</html>
`
  frame.addEventListener(
    "load",
    () => {
      scripts.split("|").map((url) => {
        frame.contentDocument.body.setAttribute(
          "data-otohime-token",
          document.body.getAttribute("data-otohime-token")
        )
        if (injected.includes("localhost")) {
          const srf = frame.contentDocument.createElement("script")
          srf.textContent = `
          import RefreshRuntime from "https://localhost:8080/@react-refresh"
          RefreshRuntime.injectIntoGlobalHook(window)
          window.$RefreshReg$ = () => {}
          window.$RefreshSig$ = () => (type) => type
          `
          srf.type = "module"
          frame.contentDocument.head.appendChild(srf)
        }
        frame.contentWindow.__vite_plugin_react_preamble_installed__ = true
        const s = frame.contentDocument.createElement("script")
        s.setAttribute("src", url)
        if (injected.includes("localhost")) {
          s.type = "module"
        }
        frame.contentDocument.head.appendChild(s)
      })
    },
    false
  )
  document.body.appendChild(frame)
})()
