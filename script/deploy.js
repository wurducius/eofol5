const { execSync } = require("child_process")
const { primary, success, error } = require("@eofol/eofol-dev-utils")
const { spawnOptions, join, EOFOL_NAME } = require("../compile")

console.log(primary(`Deploying ${EOFOL_NAME} project...`))

const resultCode = execSync(join(process.cwd(), "script", "impl", "deploy.bat"), spawnOptions)

if (!resultCode) {
  console.log(success(`Successfully deployed ${EOFOL_NAME} project.`))
} else {
  console.log(error(`Deployment of ${EOFOL_NAME} project failed.`))
}
