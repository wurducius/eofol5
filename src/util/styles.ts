import { Classname } from "../types"

export const cx = (...styles: Classname[]) => styles.filter(Boolean).join(" ")
