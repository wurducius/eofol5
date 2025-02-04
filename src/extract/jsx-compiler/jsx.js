const { join, parse, readDir } = require("../../../compile")
const fs = require("node:fs")
const compileJsx = require("./jsx-compiler")
const { getConfig } = require("../../../compile/config")

const injectImportPragma = (content) => `import { j } from "../../src"\n${content}`

const config = getConfig()

const getViewPathSource = (next) => join(config.PATH.PROJECT, `${next}`)

const getViewPathTarget = (next) => join(config.PATH.PROJECT, `${next}.js`)

const compileViewJsx = (view) => {
  fs.writeFileSync(
    getViewPathTarget(view),
    injectImportPragma(compileJsx(fs.readFileSync(getViewPathSource(view)).toString())),
  )
}

/*
const compileViewsJsx = (views) => {
  // touch(join(config.PATH.CWD, "derived"))
  views.forEach(compileViewJsx)
}
 */

const compileViewsJsx = (views) => {
  readDir(config.PATH.PROJECT, { recursive: true })
    .filter((filename) => parse(filename).ext === ".tsx")
    .forEach((filename) => {
      compileViewJsx(filename)
    })
}

module.exports = { compileViewsJsx, getViewPathTarget }
