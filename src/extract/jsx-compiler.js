const jsx = require("acorn-jsx")
const { fromJs } = require("esast-util-from-js")
const { buildJsx } = require("estree-util-build-jsx")
const { toJs } = require("estree-util-to-js")

const compileJsx = (doc) => {
  const tree = fromJs(doc, { module: true, plugins: [jsx()] })
  buildJsx(tree, { pragma: "j", pragmaFrag: "null" })
  return toJs(tree).value
}

module.exports = compileJsx
