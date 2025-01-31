const { cpAsync, isDirectory, join } = require("../util-compile/fs")

const copyPublicFiles = (buildPath, projectPath, publicDir) =>
  Promise.all(
    publicDir
      .filter((publicFile) => !publicFile.endsWith(".html") && !isDirectory(join(projectPath, publicFile)))
      .map((publicFile) => cpAsync(join(projectPath, publicFile), join(buildPath, publicFile))),
  )

module.exports = { copyPublicFiles }
