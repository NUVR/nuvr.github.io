const fs = require("fs")
const path = require("path")
const jade = require("jade")

const LAYOUTS = path.resolve(__dirname, "src", "views")
console.log(LAYOUTS)

const buildLayouts = () => {
  return new Promise((resolve) => {
    fs.readdir(LAYOUTS, (err, files) => {
      if (err) throw err
      resolve(files.filter((file) => file.includes(".jade")))
    })
  })
    .then((views) => views.map((view) => view.split(".jade")[0]))
    .then((views) =>
      views.map((view) => {
        const fileName = path.resolve(LAYOUTS, `${view}.jade`)
        return { name: view, html: jade.renderFile(fileName, { pretty: true }) }
      })
    )
    .then((html) =>
      Promise.all(
        html.map(({ name, html }) => {
          const fileName = path.resolve("dist", `${name}.html`)
          return new Promise((resolve) =>
            fs.writeFile(fileName, html, (err) => {
              if (err) throw err
              resolve(name)
            })
          )
        })
      )
    )
}

buildLayouts()
  .then((files) => console.log("Copied files", files))
  .catch(console.error)
