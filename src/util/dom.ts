export const appendChild = (target: Element, child: Element | string) => {
  if (child) {
    if (typeof child === "string") {
      target.insertAdjacentHTML("beforeend", child)
    } else {
      target.appendChild(child)
    }
  }
}

export const domAppendChildren = (children: Array<Element | string>, target: Element) => {
  children.forEach((child) => {
    appendChild(target, child)
  })
}

export const domClearChildren = (domElement: Element) => {
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

export const nodeMapToObject = (attributeNodeMap: NamedNodeMap) => {
  return Array.from(attributeNodeMap)
    .map((a) => [a.name, a.value])
    .reduce((acc, attr) => {
      // @ts-ignore
      acc[attr[0]] = attr[1]
      return acc
    }, {})
}

export const htmlElementIndexOf = (element: HTMLElement) => {
  let index = -1
  // eslint-disable-next-line no-undef
  let elementImpl: ChildNode | null = element
  while (elementImpl) {
    elementImpl = elementImpl.previousSibling
    if (elementImpl && elementImpl.nodeType === 1) {
      index++
    }
  }
  return index
}
