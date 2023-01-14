const scripts = [
  "https://localhost:8080/@vite/client",
  "https://localhost:8080/src/go.tsx",
]

const frame = document.createElement("iframe")
frame.style.position = "sticky"
frame.style.inset = "0"
frame.style.width = "100%"
frame.style.height = "100%"
frame.style.border = "0"
frame.innerHTML = `
<html>
  <head></head>
  <body></body>
</html>
`
frame.onload = () => {
  scripts.map((url) => {
    frame.contentDocument.body.setAttribute(
      "data-otohime-token",
      document.body.getAttribute("data-otohime-token")
    )
    frame.contentWindow.__vite_plugin_react_preamble_installed__ = true
    const s = frame.contentDocument.createElement("script")
    s.setAttribute("src", url)
    s.type = "module"
    frame.contentDocument.head.appendChild(s)
  })
}
document.body.appendChild(frame)
