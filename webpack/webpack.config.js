const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const EofolPlugin = require("./webpack-plugin")
const { getConfig } = require("../compile/config")
const { join } = require("../compile")
const { parse } = require("../compile/util-compile/fs")

// @TODO: read params

const config = getConfig()

const MODE = "development"

const ANALYZE = false

const getEntry = (views) =>
  views.reduce((acc, next) => ({ ...acc, [next]: join(config.PATH.PROJECT_SRC, `${parse(next).base}.js`) }), {})

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
