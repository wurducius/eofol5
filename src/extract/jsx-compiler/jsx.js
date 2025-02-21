const { join, exists, read, write, getConfig } = require("../../../compile")
const compileJsx = require("./jsx-compiler")

const injectImportPragma = (content) => `import { j } from "../../src"\n${content}`

const config = getConfig()

const getViewPathSource = (next) => join(config.PATH.PROJECT_SRC, `${next}.tsx`)

const getViewPathTarget = (next) => join(config.PATH.PROJECT_SRC, `${next}.js`)

const compileViewJsx = (view) => {
  const viewPath = getViewPathTarget(view)
  let content
  if (exists(viewPath)) {
    content = read(getViewPathSource(view)).toString()
  } else {
    content = ""
  }
  const result = injectImportPragma(compileJsx(content))
  write(viewPath, result)
}

const compileViewsJsx = (views) => {
  views.forEach(compileViewJsx)
}

module.exports = { compileViewsJsx, getViewPathTarget }
