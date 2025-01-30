import { EOFOL_VERBOSITY_LEVEL } from "../constants"

const eofolLog = (levelName: string, level: number) => (msg: string) => {
  if (level === 0 || level >= EOFOL_VERBOSITY_LEVEL) {
    console.log(`Eofol${level ? ` ${levelName}` : ""}: ${msg}`)
  }
}
export const eofolInfo = eofolLog("info", 3)
export const eofolWarn = eofolLog("warning", 2)
export const eofolError = eofolLog("error", 1)
export const eofolFatal = eofolLog("fatal", 0)
