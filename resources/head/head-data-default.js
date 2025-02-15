const { getEnvEofolName } = require("../../compile/config/env")

const defaultHeadData = {
  title: `${getEnvEofolName()} app`,
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
  manifest: "./manifest.json",
  themeColor: "#09090b",
}

module.exports = defaultHeadData
