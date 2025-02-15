const { ssyHtml } = require("./sx")

const base = (theme) => {
  const {
    typography: { fontSize, formFontSize },
  } = theme

  const fontFamilyInherit = { fontFamily: "inherit" }

  const formStyle = { ...fontFamilyInherit, fontSize: `${formFontSize}px` }

  ssyHtml("button", { ...formStyle, fontWeight: 500, cursor: "pointer" })
  ssyHtml("input", { ...formStyle, height: "46px", padding: "0 16px" })
  ssyHtml("textarea", { ...formStyle })
  ssyHtml("select", { ...formStyle })

  ssyHtml("p", { margin: "0 0 0 0" })

  ssyHtml("h1", { ...fontFamilyInherit, fontSize: `${fontSize[1]}em` })
  ssyHtml("h2", { ...fontFamilyInherit, fontSize: `${fontSize[2]}em` })
  ssyHtml("h3", { ...fontFamilyInherit, fontSize: `${fontSize[3]}em` })
  ssyHtml("h4", { ...fontFamilyInherit, fontSize: `${fontSize[4]}em` })
  ssyHtml("h5", { ...fontFamilyInherit, fontSize: `${fontSize[5]}em` })
  ssyHtml("h6", { ...fontFamilyInherit, fontSize: `${fontSize[6]}em` })

  ssyHtml("a", { ...fontFamilyInherit, textDecoration: "none" })

  ssyHtml("button", {
    ...fontFamilyInherit,
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    padding: "0 16px",
    height: "48px",
  })

  ssyHtml("body", { width: "16px" }, "::-webkit-scrollbar")
  ssyHtml(
    "body",
    {
      height: "56px",
      borderRadius: "8px",
      border: "4px solid transparent",
      backgroundColor: "hsl(0, 0%, 67%)",
      backgroundClip: "content-box",
    },
    "::-webkit-scrollbar-thumb",
  )
}

module.exports = base
