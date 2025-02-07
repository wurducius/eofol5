const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const EofolPlugin = require("./webpack-plugin")
const { getViewPathTarget } = require("../src/extract/jsx-compiler/jsx")
const { getConfig } = require("../compile/config")
const { getEnvMode, getEnvAnalyze, getEnvGenerateSourceMap } = require("../compile/config/env")

const config = getConfig()

const MODE = getEnvMode() === "production" ? "production" : "development"
const ANALYZE = getEnvAnalyze()
const GENERATE_SOURCEMAP = getEnvGenerateSourceMap()

const getEntry = (views) => views.reduce((acc, next) => ({ ...acc, [next]: getViewPathTarget(next) }), {})

const getWebpackConfig = (views) => ({
  mode: MODE,
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
  devtool: GENERATE_SOURCEMAP ? "source-map" : false,
})

module.exports = getWebpackConfig
