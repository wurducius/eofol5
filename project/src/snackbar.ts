const SNACKBAR_SHOW_INTERVAL = 3000

export const showSnackbar = (msg: string) => {
  const snackbarElement = document.getElementById("snackbar")
  if (snackbarElement) {
    snackbarElement.innerHTML = msg
    snackbarElement.className = "show"
    setTimeout(() => {
      snackbarElement.className = snackbarElement.className.replace("show", "")
    }, SNACKBAR_SHOW_INTERVAL)
  }
}
