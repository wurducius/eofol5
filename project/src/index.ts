const container = document.createElement("div")
container.style = "display:flex; justify-content:center; align-items: center; height: 100%; font-size: 24px"
container.innerHTML = "HELLO WORLD FROM EOFOL!!!"

const domClearChildren = (domElement) => {
  const childrenToDelete = []
  for (let i = 0; i < domElement.childNodes.length; i++) {
    childrenToDelete.push(domElement.childNodes.item(i))
  }
  childrenToDelete.forEach((childToDelete) => {
    if (childToDelete) {
      domElement.removeChild(childToDelete)
    }
  })
}

const eofolRender = (element: Element) => {
  domClearChildren(element)
  element.append(container)
}

const render = () => {
  const root = document.getElementById("root")
  if (root) {
    eofolRender(root)
  }
}

render()
