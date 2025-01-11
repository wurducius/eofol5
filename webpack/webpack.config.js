const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const EofolPlugin = require("./webpack-plugin")
const { getConfig } = require("../src/config")

const config = getConfig()

const MODE = "development"

const entry = { index: "./assets/js/index.js" }

const DIRNAME_ASSETS = "assets"
const DIRNAME_JS = "js"

const PATH_BUILD = config.PATH.PATH_BUILD

const ANALYZE = false

const getWebpackConfig = () => {
  return {
    mode: MODE ?? "development",
    entry,
    output: {
      filename: `${DIRNAME_ASSETS}/${DIRNAME_JS}/[name].js`,
      path: PATH_BUILD,
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
  }
}

module.exports = getWebpackConfig
