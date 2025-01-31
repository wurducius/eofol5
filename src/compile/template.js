const { join, parse, readAsync, writeAsync } = require("../util-compile/fs")
const { head } = require("eofol-head")
const minifyHtml = require("./minify-html")
const getErrorOverlay = require("./error-overlay")
const replaceRootElementId = require("./root-element-id")

const precompileTemplate = (buildPath, projectPath, stylesStatic) => async (viewName) => {
  const headData = {
    title: "Eofol5 app",
    description: "All inclusive web framework with zero configuration, batteries included!",
    keywords: "JS,Frontend framework",
    author: "Jakub Eliáš",
    favicon: "./assets/media/images/favicon.png",
    appleTouchIcon: "./assets/media/images/logo-sm.png",
    descriptionOg: "All inclusive web framework with zero configuration, batteries included!",
    imageOg: "./assets/media/images/logo-lg.png",
    imageTypeOg: "image/png",
    imageHeightOg: "512",
    imageWidthOg: "512",
    language: "en",
    manifest: "manifest.json",
    themeColor: "#09090b",
  }
  const content = await readAsync(join(projectPath, `${viewName}.html`))
  const rootedContent = replaceRootElementId(content)
  const { injectedContent, errorOverlayStyles } = getErrorOverlay(rootedContent)
  const stylesImpl = `${stylesStatic} ${errorOverlayStyles}`

  const compiled = await head(
    headData,
    injectedContent,
    [viewName, "runtime", "eofol", "dependencies"],
    ["base", "theme"],
    stylesImpl,
  )
  // @TODO avoid minifying twice
  const minified = await minifyHtml(compiled)
  const html = `<!DOCTYPE html>${minified}`
  await writeAsync(join(buildPath, `${viewName}.html`), html)
  return viewName
}

const compileTemplates = (buildPath, projectPath, publicDir) =>
  Promise.all(
    publicDir
      .filter((publicFile) => publicFile.endsWith(".html"))
      .map((publicView) => parse(publicView).name)
      .map(precompileTemplate(buildPath, projectPath)),
  )

module.exports = { compileTemplates }
