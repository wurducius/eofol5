const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const EofolPlugin = require("./webpack-plugin")
const { getConfig, join } = require("../compile")
const fs = require("node:fs")
const compileJsx = require("../src/extract/jsx-compiler")

// @TODO: read params

const config = getConfig()

const MODE = "development"

const ANALYZE = false

const getViewPathSource = (next) => join(config.PATH.PROJECT_SRC, `${next}.tsx`)
const getViewPathTarget = (next) => join(config.PATH.PROJECT_SRC, `${next}.js`)

const getEntry = (views) => {
  // touch(join(config.PATH.CWD, "derived"))
  views.forEach((view) => {
    fs.writeFileSync(getViewPathTarget(view), compileJsx(fs.readFileSync(getViewPathSource(view)).toString()))
  })
  return views.reduce((acc, next) => ({ ...acc, [next]: getViewPathTarget(next) }), {})
}

const getWebpackConfig = (views) => ({
  mode: MODE ?? "development",
  entry: getEntry(views),
  output: {
    filename: `${config.FILENAME.DIRNAME_ASSETS}/${config.FILENAME.DIRNAME_JS}/[name].js`,
    path: config.PATH.PATH_BUILD,
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new EofolPlugin(), ANALYZE && new BundleAnalyzerPlugin()].filter(Boolean),
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        dependencies: {
          test: /[\\/]node_modules[\\/]/,
          name: "dependencies",
          chunks: "all",
          reuseExistingChunk: true,
          idHint: "dependencies",
        },
      },
    },
  },
  devtool: MODE === "development" ? "source-map" : false,
})

module.exports = getWebpackConfig
