const { ssyHtml, ssy } = require("../../extract/ssx")
const {
  mozFontSmoothing,
  webkitFontSmoothing,
  webkitAppereance,
  mozAppereance,
  webkitAnimation,
} = require("../constants")

const themed = (theme) => {
  const {
    color: { colorz, colorxy, colorx, colory, colorwx, colorw },
    typography: { fontFamily },
  } = theme

  ssyHtml("@font-face", {
    fontFamily: fontFamily.fontFamily,
    // @ts-ignore
    src: `url("./assets/media/fonts/${fontFamily.path}") format("${fontFamily.format}")`,
    fontDisplay: "swap",
  })

  ssyHtml("body", {
    backgroundColor: "#09090b",
    color: theme.color.colory,
    fontFamily: `${fontFamily.fontFamily}, sans-serif`,
    [webkitFontSmoothing]: "antialiased",
    [mozFontSmoothing]: "grayscale",
  })

  ssyHtml("button", { backgroundColor: colorx, color: colory, border: `1px solid ${colorz}` })
  ssyHtml("button", { backgroundColor: colorxy, color: colorw, border: `1px solid ${colorwx}` }, ":hover")

  ssyHtml("input", { backgroundColor: colorx, color: colory, border: `1px solid ${colorz}` })
  ssyHtml("input", { backgroundColor: colorxy, color: colorw, border: `1px solid ${colorwx}` })

  ssyHtml("input", { [webkitAppereance]: "none", margin: "0" }, "::-webkit-outer-spin-button")
  ssyHtml("input", { [webkitAppereance]: "none", margin: "0" }, "::-webkit-inner-spin-button")

  ssyHtml('input[type="number"]', { [mozAppereance]: "textfield" })

  ssy("input-number-arrow", {
    height: "24px",
    width: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: 700,
  })

  ssyHtml("code", { fontFamily: 'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace' })

  ssy("spinner", {
    border: "4px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "4px solid #3498db",
    width: "30px",
    height: "30px",
    animation: "spin 2s linear infinite",
    [webkitAnimation]: "spin 2s linear infinite",
  })

  ssy("m-md", { margin: "16px 16px 16px 16px" })
}

module.exports = themed
