const { exists, join, mkdirAsync } = require("../util/fs")

const touchBuildDirs = async (buildPath) => {
  if (!exists(buildPath)) {
    await mkdirAsync(buildPath)
      .then(() => mkdirAsync(join(buildPath, "assets")))
      .then(() =>
        Promise.all([
          mkdirAsync(join(buildPath, "assets", "js")),
          mkdirAsync(join(buildPath, "assets", "css")),
          mkdirAsync(join(buildPath, "assets", "media")).then(() =>
            Promise.all([
              mkdirAsync(join(buildPath, "assets", "media", "fonts")),
              mkdirAsync(join(buildPath, "assets", "media", "images")),
              mkdirAsync(join(buildPath, "assets", "media", "icons")),
            ]),
          ),
        ]),
      )
  }
}

module.exports = { touchBuildDirs }
