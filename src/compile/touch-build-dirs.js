const { exists, join, mkdir } = require("../util/fs")

const touchBuildDirs = (buildPath) => {
  if (!exists(buildPath)) {
    mkdir(buildPath)
    mkdir(join(buildPath, "assets"))
    mkdir(join(buildPath, "assets", "js"))
    mkdir(join(buildPath, "assets", "css"))
    mkdir(join(buildPath, "assets", "media"))
    mkdir(join(buildPath, "assets", "media", "fonts"))
    mkdir(join(buildPath, "assets", "media", "images"))
    mkdir(join(buildPath, "assets", "media", "icons"))
  }
}

module.exports = { touchBuildDirs }
