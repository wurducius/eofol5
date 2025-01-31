import { defineSimple, renderSimple } from "./util"

export const FLEX = "eofol-flex"
export const ROW = "eofol-row"
export const COL = "eofol-col"
export const CENTER_FLEX = "eofol-center-flex"
export const CENTER_FLEX_FULL = "eofol-center-flex-full"

defineSimple(FLEX, "flex-base")
defineSimple(ROW, "flex-row")
defineSimple(COL, "flex-col")
defineSimple(CENTER_FLEX, "flex-center")
defineSimple(CENTER_FLEX_FULL, "flex-center-full")

export const flex = renderSimple(FLEX)
export const row = renderSimple(ROW)
export const col = renderSimple(COL)
export const centerFlex = renderSimple(CENTER_FLEX)
export const centerFlexFull = renderSimple(CENTER_FLEX_FULL)
