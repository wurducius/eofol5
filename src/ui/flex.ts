import { defineSimple } from "./util"

const FLEX = "eFlex"
const ROW = "eRow"
const COL = "eCol"
const CENTER_FLEX = "eCenterFlex"
const CENTER_FLEX_FULL = "eCenterFlexFull"

export const flex = defineSimple(FLEX, "flex-base")
export const row = defineSimple(ROW, "flex-row")
export const col = defineSimple(COL, "flex-col")
export const centerFlex = defineSimple(CENTER_FLEX, "flex-center")
export const centerFlexFull = defineSimple(CENTER_FLEX_FULL, "flex-center-full")
