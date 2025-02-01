const { cpAsync, isDirectory, join } = require("../util-compile")
const { getConfig } = require("../config")

const config = getConfig()

const copyPublicFiles = (buildPath, projectPath, publicDir) =>
  Promise.all(
    publicDir
      .filter((publicFile) => !publicFile.endsWith(config.EXT.HTML) && !isDirectory(join(projectPath, publicFile)))
      .map((publicFile) => cpAsync(join(projectPath, publicFile), join(buildPath, publicFile))),
  )

module.exports = { copyPublicFiles }
