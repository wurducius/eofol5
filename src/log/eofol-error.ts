import { eofolError } from "../component/logger"

export const eofolErrorDefNotFound = (def: string) => {
  eofolError(`Def not found for name = "${def}".`)
}
