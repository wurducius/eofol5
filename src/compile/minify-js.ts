const { minify } = require("uglify-js")

const uglifyOptions = {
  parse: {},
  compress: true,
  mangle: true,
  output: {
    semicolons: false,
  },
}

export const minifyJs = (content) => minify(content, uglifyOptions).code
