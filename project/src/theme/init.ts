import { base } from "./base"
import { themed } from "./themed"
import { getTheme } from "./theme"
import { baseUi } from "./base-ui"

export const stylesInit = () => {
  const theme = getTheme()
  base(theme)
  baseUi(theme)
  themed(theme)
}
