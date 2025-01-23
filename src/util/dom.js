const nodeMapToObject = (attributeNodeMap) => {
  return Array.from(attributeNodeMap)
    .map((a) => [a.name, a.value])
    .reduce((acc, attr) => {
      // @ts-ignore
      acc[attr[0]] = attr[1]
      return acc
    }, {})
}

const htmlElementIndexOf = (element) => {
  let index = -1
  while (element) {
    element = element.previousSibling
    if (element.nodeType === 1) {
      index++
    }
  }
  return index
}

module.exports = { nodeMapToObject, htmlElementIndexOf }
