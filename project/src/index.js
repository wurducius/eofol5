const eofolRender = (element) => {
  element.innerHTML = "HELLO WORLD FROM EOFOL!!!"
}

const render = () => {
  const root = document.getElementById("root")
  if (root) {
    eofolRender(root)
  }
}

render()
