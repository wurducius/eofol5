const clean = require("./impl/clean")
const build = require("./impl/build")
const serve = require("./impl/serve")

/*
const config = getConfig()

const listOfFiles = []
const listOfNotExistingItems = []
const listOfDirectories = [config.FILENAME.DIRNAME_SRC, config.FILENAME.DIRNAME_PROJECT]

const ignored = "**" + "/.git"

const wp = new Watchpack({
  aggregateTimeout: 1000,
  poll: true,
  followSymlinks: true,
  ignored,
})

wp.watch({
  files: listOfFiles,
  directories: listOfDirectories,
  missing: listOfNotExistingItems,
  startTime: Date.now() - 10000,
})

const recompile = async () => {
  console.log(primary("Recompiling..."))
  await build()
}

const handleChange = async () => {
  await recompile()
}

const handleRemove = async () => {
  await recompile()
}

wp.on("change", handleChange)
wp.on("remove", handleRemove)
 */

console.clear()

clean()
build().then(() => {
  serve()
})
