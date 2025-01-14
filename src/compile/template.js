const { join, parse, read, write } = require("../util/fs")
const { head } = require("eofol-head")

const precompileTemplate = (buildPath, projectPath) => async (viewName) => {
  const headData = { title: "Eofol5 app" }
  const htmlContent = read(join(projectPath, `${viewName}.html`)).toString()
  const stylesStatic = ""
  const htmlResult = await head(
    headData,
    htmlContent,
    [viewName, "runtime", "eofol", "dependencies"],
    ["base", "theme"],
    stylesStatic,
  )
  write(join(buildPath, `${viewName}.html`), htmlResult)
}

const compileTemplates = (buildPath, projectPath, publicDir) =>
  Promise.all(
    publicDir
      .filter((publicFile) => publicFile.endsWith(".html"))
      .map((publicView) => parse(publicView).name)
      .map(precompileTemplate(buildPath, projectPath)),
  )

module.exports = { compileTemplates }
