import { Classname } from "../types"

export const cx = (...styles: Array<Classname | false | undefined | null>) => styles.filter(Boolean).join(" ")
