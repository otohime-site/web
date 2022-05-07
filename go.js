// a workaround to make Bookmarklet work on dev server,
// while the HMR won't for now.
window.__vite_plugin_react_preamble_installed__ = true
const ss2 = document.createElement("script")
ss2.setAttribute("src", "https://localhost:8080/@vite/client")
ss2.type = "module"
document.body.appendChild(ss2)
const ss = document.createElement("script")
ss.setAttribute("src", "https://localhost:8080/src/go.tsx")
ss.type = "module"
document.body.appendChild(ss)
