import { sources, Compiler } from "webpack"

export class BookmarkletPlugin {
  apply(compiler: Compiler): void {
    const production = compiler.options.mode === "production"
    const prefix = production ? "https://otohi.me/" : "https://localhost:8080/"
    compiler.hooks.emit.tap("BookmarkletPlugin", (compilation) => {
      const go = compilation.entrypoints.get("go")
      if (go === undefined) {
        return
      }
      const files = go.getFiles()
      const jsCommands = files
        .filter((name) => name.endsWith(".js"))
        .map(
          (name, index) => `
var s${index} = document.createElement("script");
s${index}.src = "${prefix}${name}";
document.body.appendChild(s${index})
      `
        )
        .join("\n")
      const cssCommands = files
        .filter((name) => name.endsWith(".css"))
        .map(
          (name, index) => `
var l${index} = document.createElement("link");
l${index}.rel = "stylesheet";
l${index}.href = "${prefix}${name}";
document.head.appendChild(l${index});
      `
        )
        .join("\n")
      compilation.emitAsset(
        "go.js",
        new sources.RawSource(`${jsCommands}\n\n${cssCommands}`, false)
      )
    })
  }
}
