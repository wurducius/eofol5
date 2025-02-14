import { sy, syHtml, Theme } from "../../../../src"
import { mozAppereance, mozFontSmoothing, webkitAnimation, webkitAppereance, webkitFontSmoothing } from "../constants"

export const themed = (theme: Theme) => {
  const {
    color: { colorz, colorxy, colorx, colory, colorwx, colorw },
  } = theme

  syHtml("@font-face", {
    fontFamily: "Roboto",
    // @ts-ignore
    src: 'url("./assets/media/fonts/Roboto-Regular.ttf") format("truetype")',
    fontDisplay: "swap",
  })

  syHtml("body", {
    backgroundColor: "#09090b",
    color: theme.color.colory,
    fontFamily: "Roboto, sans-serif",
    [webkitFontSmoothing]: "antialiased",
    [mozFontSmoothing]: "grayscale",
  })

  syHtml("button", { backgroundColor: colorx, color: colory, border: `1px solid ${colorz}` })
  syHtml("button", { backgroundColor: colorxy, color: colorw, border: `1px solid ${colorwx}` }, ":hover")

  syHtml("input", { backgroundColor: colorx, color: colory, border: `1px solid ${colorz}` })
  syHtml("input", { backgroundColor: colorxy, color: colorw, border: `1px solid ${colorwx}` })

  syHtml("input", { [webkitAppereance]: "none", margin: "0" }, "::-webkit-outer-spin-button")
  syHtml("input", { [webkitAppereance]: "none", margin: "0" }, "::-webkit-inner-spin-button")

  syHtml('input[type="number"]', { [mozAppereance]: "textfield" })

  sy("input-number-arrow", {
    height: "24px",
    width: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: 700,
  })

  syHtml("code", { fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace' })

  sy("spinner", {
    border: "4px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "4px solid #3498db",
    width: "30px",
    height: "30px",
    animation: "spin 2s linear infinite",
    [webkitAnimation]: "spin 2s linear infinite",
  })

  sy("m-md", { margin: "16px 16px 16px 16px" })
}
