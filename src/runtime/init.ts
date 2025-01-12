import { getInternals } from "./internals"

export const init = () => {
  console.log("EOFOL INIT")
  const internals = getInternals()

  console.log(internals)
}
