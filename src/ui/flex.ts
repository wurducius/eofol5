import { defineSimple } from "./util"

const FLEX = "eofol-flex"
const ROW = "eofol-row"
const COL = "eofol-col"
const CENTER_FLEX = "eofol-center-flex"
const CENTER_FLEX_FULL = "eofol-center-flex-full"

export const flex = defineSimple(FLEX, "flex-base")
export const row = defineSimple(ROW, "flex-row")
export const col = defineSimple(COL, "flex-col")
export const centerFlex = defineSimple(CENTER_FLEX, "flex-center")
export const centerFlexFull = defineSimple(CENTER_FLEX_FULL, "flex-center-full")
