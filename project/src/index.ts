// import x from "eofol-dev-server"
//console.log(x && "DEPENDENCIES PRESENT")

const SNACKBAR_SHOW_INTERVAL = 3000

const showSnackbar = (msg: string) => {
  const snackbarElement = document.getElementById("snackbar")
  if (snackbarElement) {
    snackbarElement.innerHTML = msg
    snackbarElement.className = "show"
    setTimeout(() => {
      snackbarElement.className = snackbarElement.className.replace("show", "")
    }, SNACKBAR_SHOW_INTERVAL)
  }
}

export const appendChild = (target, child) => {
  if (child) {
    if (typeof child === "string") {
      target.insertAdjacentHTML("beforeend", child)
    } else {
      target.appendChild(child)
    }
  }
}

export const domAppendChildren = (children, target) => {
  children.forEach((child) => {
    appendChild(target, child)
  })
}

const domClearChildren = (domElement: Element) => {
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

// @TODO typing
type Classname = string | undefined
type Attributes = any
type Properties = any

type EofolElement = HTMLElement | string | undefined | false | null
type EofolNode = HTMLElement[] | EofolElement

const e = (
  tagName: string,
  className?: Classname,
  children?: EofolNode,
  attributes?: Attributes,
  properties?: Properties,
) => {
  const element = document.createElement(tagName)
  if (className) {
    element.className = className
  }
  if (attributes) {
    Object.keys(attributes).forEach((attributeName) => {
      const attributeValue = attributes[attributeName]
      if (attributeValue) {
        element.setAttribute(attributeName, attributeValue)
      }
    })
  }
  if (properties) {
    Object.keys(properties).forEach((propertyName) => {
      const propertyValue = properties[propertyName]
      if (propertyValue) {
        // @ts-ignore
        element[propertyName] = propertyValue
      }
    })
  }
  const childrenImplRaw = Array.isArray(children) ? children : [children]
  const childrenImpl = childrenImplRaw.filter(Boolean)
  if (childrenImpl.length > 0) {
    domAppendChildren(childrenImpl, element)
  }
  return element
}

const simple =
  (tagName: string) =>
  (className?: Classname, children?: EofolNode, attributes?: Attributes, properties?: Properties) =>
    e(tagName, className, children, attributes, properties)

export const div = simple("div")
export const span = simple("span")
export const p = simple("p")
export const h1 = simple("h1")
export const h2 = simple("h2")
export const h3 = simple("h3")
export const h4 = simple("h4")
export const h5 = simple("h5")
export const button = simple("button")
export const input = simple("input")
export const textarea = simple("textarea")
export const select = simple("select")
export const a = simple("a")

const helloWorld = h1(undefined, "HELLO WORLD FROM EOFOL!!!")
const snackbarButton = button(undefined, "Show snackbar", undefined, { onclick: () => showSnackbar("TADA") })
const container = div(undefined, [helloWorld, snackbarButton], {
  style:
    "display:flex; flex-direction: column; justify-content:center; align-items: center; height: 100%; font-size: 36px",
})

const containerx = document.createElement("div")
containerx.style = "display:flex; justify-content:center; align-items: center; height: 100%; font-size: 36px"
containerx.innerHTML = "HELLO WORLD FROM EOFOL!!!"

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
