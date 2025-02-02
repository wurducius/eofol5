const { exists, join, mkdirAsync } = require("../util-compile")
const { getConfig } = require("../config")

const config = getConfig()

const touchBuildDirs = async (buildPath) => {
  if (!exists(buildPath)) {
    await mkdirAsync(buildPath)
      .then(() => mkdirAsync(join(buildPath, config.FILENAME.DIRNAME_ASSETS)))
      .then(() =>
        Promise.all([
          mkdirAsync(join(buildPath, config.FILENAME.DIRNAME_ASSETS, config.FILENAME.DIRNAME_JS)),
          mkdirAsync(join(buildPath, config.FILENAME.DIRNAME_ASSETS, config.FILENAME.DIRNAME_CSS)),
          mkdirAsync(join(buildPath, config.FILENAME.DIRNAME_ASSETS, config.FILENAME.DIRNAME_MEDIA)).then(() =>
            Promise.all([
              mkdirAsync(
                join(
                  buildPath,
                  config.FILENAME.DIRNAME_ASSETS,
                  config.FILENAME.DIRNAME_MEDIA,
                  config.FILENAME.DIRNAME_FONTS,
                ),
              ),
              mkdirAsync(
                join(
                  buildPath,
                  config.FILENAME.DIRNAME_ASSETS,
                  config.FILENAME.DIRNAME_MEDIA,
                  config.FILENAME.DIRNAME_IMAGES,
                ),
              ),
              mkdirAsync(
                join(
                  buildPath,
                  config.FILENAME.DIRNAME_ASSETS,
                  config.FILENAME.DIRNAME_MEDIA,
                  config.FILENAME.DIRNAME_ICONS,
                ),
              ),
            ]),
          ),
        ]),
      )
  }
}

module.exports = { touchBuildDirs }
