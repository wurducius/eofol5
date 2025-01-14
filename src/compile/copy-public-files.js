const { cp, isDirectory, join } = require("../util/fs")

const copyPublicFiles = (buildPath, projectPath, publicDir) =>
  publicDir
    .filter((publicFile) => !publicFile.endsWith(".html") && !isDirectory(join(projectPath, publicFile)))
    .forEach((publicFile) => {
      cp(join(projectPath, publicFile), join(buildPath, publicFile))
    })

module.exports = { copyPublicFiles }
