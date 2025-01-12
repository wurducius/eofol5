const { execSync } = require("child_process")
const { primary, success, error } = require("@eofol/eofol-dev-utils")
const { spawnOptions } = require("../src/util/spawn")
const { join } = require("../src/util/fs")

console.log(primary("Deploying Eofol5 project..."))

const resultCode = execSync(join(process.cwd(), "script", "impl", "deploy.bat"), spawnOptions)

if (!resultCode) {
  console.log(success("Successfully deployed Eofol5 project."))
} else {
  console.log(error("Deployment of Eofol5 project failed."))
}
