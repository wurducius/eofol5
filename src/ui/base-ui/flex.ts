import { defineSimple } from "../util"
import { BASE } from "./components"

export const FLEX_STYLE = {
  flexBase: "flex-base",
  flexRow: "flex-row",
  flexCol: "flex-col",
  flexCenter: "flex-center",
  flexCenterFull: "flex-center-full",
}

export const flex = defineSimple(BASE.flex, FLEX_STYLE.flexBase)
export const row = defineSimple(BASE.row, FLEX_STYLE.flexRow)
export const col = defineSimple(BASE.col, FLEX_STYLE.flexCol)
export const centerFlex = defineSimple(BASE.centerFlex, FLEX_STYLE.flexCenter)
export const centerFlexFull = defineSimple(BASE.centerFlexFull, FLEX_STYLE.flexCenterFull)
