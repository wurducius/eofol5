const formFontSize = 16

const fontSize = {
  1: 2,
  2: 1.5,
  3: 1.17,
  4: 0.83,
  5: 0.75,
  6: 0.67,
}

const fontFamily = { fontFamily: "Roboto", path: "Roboto-Regular.ttf", format: "truetype" }

const typography = { fontFamily, fontSize, formFontSize }

const color = {
  colorx: "darkmagenta",
  colory: "#fafafa",
  colorz: "darkblue",
  colorw: "rgba(250, 250, 250, 0.55)",
  colorwx: "#1313a4",
  colorxy: "#a817a8",
}

const themeDefault = {
  color,
  typography,
}

const getTheme = () => themeDefault

module.exports = { getTheme }
