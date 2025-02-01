const { join, parse, readAsync, writeAsync, read } = require("../util-compile")
const { head } = require("eofol-head")
const minifyHtml = require("./minify-html")
const getErrorOverlay = require("./error-overlay")
const replaceRootElementId = require("./root-element-id")
const { EOFOL_NAME } = require("../constants")

const injectDoctype = (content) => `<!DOCTYPE html>${content}`

const baseStyles = replaceRootElementId(read(join(process.cwd(), "resources", "styles", "base.css")).toString())
const themeStyles = read(join(process.cwd(), "resources", "styles", "theme.css")).toString()

const defaultHeadData = {
  title: `${EOFOL_NAME} app`,
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

const precompileTemplate = (buildPath, projectPath, stylesStatic) => async (viewName) => {
  const { injectedContent, errorOverlayStyles } = getErrorOverlay(
    replaceRootElementId(await readAsync(join(projectPath, `${viewName}.html`))),
  )
  const stylesImpl = await minifyHtml(
    [errorOverlayStyles, baseStyles, themeStyles, stylesStatic].filter(Boolean).join(" "),
  )
  const compiled = await head(
    defaultHeadData,
    injectedContent,
    [viewName, "runtime", "eofol", "dependencies"],
    [],
    stylesImpl,
  )
  // @TODO avoid minifying twice
  await writeAsync(join(buildPath, `${viewName}.html`), injectDoctype(await minifyHtml(compiled)))
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
