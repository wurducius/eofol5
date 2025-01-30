import { domAppendChildren, domClearChildren } from "./children"
import {
  getInstance,
  getInternals,
  getVDOM,
  mergeInstance,
  setVDOM,
  isVDOMTag,
  isVDOMComponent,
} from "../../project/src/internals"
import { eDom, renderTagDom } from "./create-element"
import { generateId } from "../util/crypto"
import { eofolFatal } from "../component/logger"
import {
  DefInternal,
  EofolElement,
  EofolNode,
  Instance,
  Props,
  VDOM,
  VDOM_COMPONENT,
  VDOM_TAG,
  VDOM_TEXT,
  VDOMChildren,
} from "../types"
import { getDef } from "../runtime/defs"
import { eofolErrorDefNotFound } from "../log/eofol-error"

const mergeDeep = (...objects) => {
  const isObject = (obj) => obj && typeof obj === "object"

  return objects.reduce((prev, obj) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key]
      const oVal = obj[key]

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        prev[key] = oVal ?? pVal
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal)
      } else {
        prev[key] = oVal
      }
    })

    return prev
  }, {})
}

const deepCopyString = (str: string) => ` ${str}`.slice(1)

type EofolRenderHandler = () => VDOMChildren

const updateState = (idInstance: string, instance: Instance, nextState: any) => {
  const nextInstance = { ...instance, state: nextState }
  mergeInstance(idInstance, nextInstance)
  eofolUpdate(idInstance)
}

export function getStateSetter<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    updateState(idInstance, instance, nextState)
  }
}

export function getStateMerge<T>(idInstance: string, instance: Instance) {
  return function (nextState: T) {
    updateState(idInstance, instance, mergeDeep(instance.state, nextState))
  }
}

export const renderInstanceFromDef = (def: DefInternal<any>, props?: Props, children?: EofolNode, isNew?: boolean) => {
  const idInstance = isNew ? generateId() : (props?.id ?? generateId())
  const savedInstance = isNew ? undefined : getInstance(idInstance)
  const instance = savedInstance ?? {
    id: idInstance,
    def: def.id,
    state: def.initialState ? { ...def.initialState } : {},
  }
  const state = { ...instance.state }
  const setState = getStateSetter(idInstance, instance)
  const mergeState = getStateMerge(idInstance, instance)
  mergeInstance(idInstance, instance)
  const propsImpl = { ...props, id: idInstance, def: def.id, children }
  return def.render(state, setState, propsImpl, mergeState)
}

export const renderInstance = (idDef: string, props?: Props, children?: EofolNode, isNew?: boolean) => {
  const def = getDef(idDef)
  if (def) {
    return renderInstanceFromDef(def, props, children, isNew)
  } else {
    eofolErrorDefNotFound(idDef)
    return undefined
  }
}

export const vdomToDom = (tree: VDOM) => {
  if (typeof tree === "string") {
    return deepCopyString(tree)
  } else {
    const renderedChildren: EofolElement[] = []
    const childrenArr = Array.isArray(tree.children) ? tree.children : [tree.children]
    const childrenImpl = childrenArr.filter(Boolean) as Array<VDOM_TEXT | VDOM_TAG | VDOM_COMPONENT>
    if (childrenImpl && childrenImpl.length > 0) {
      childrenImpl.forEach((child) => {
        renderedChildren.push(vdomToDom(child))
      })
    }
    let thisNode
    const renderedChildrenImpl = renderedChildren.filter(Boolean)
    if (isVDOMTag(tree)) {
      const attributes = tree.attributes ?? {}
      thisNode = eDom(tree.tag, tree.class, renderedChildrenImpl, attributes, tree.properties)
    } else {
      const instance = getInstance(tree.id)
      thisNode = vdomToDom(
        renderInstance(tree.def, instance ? { ...tree.props, id: tree.id } : {}, renderedChildrenImpl, !instance),
      )
    }
    return thisNode
  }
}

export const renderVdomElement = (vdomElement: VDOM) => {
  let rendered
  if (isVDOMComponent(vdomElement)) {
    const instance = getInstance(vdomElement.id)
    if (instance) {
      // @TODO update
      rendered = renderInstance(vdomElement.def, instance.props, vdomElement.children?.map(renderVdomElement), false)
    } else {
      rendered = renderInstance(vdomElement.def, {}, vdomElement.children?.map(renderVdomElement), true)
    }
  } else if (isVDOMTag(vdomElement)) {
    rendered = renderTagDom(
      vdomElement.tag,
      vdomElement.class,
      vdomElement.children?.map(renderVdomElement),
      vdomElement.attributes,
      vdomElement.properties,
    )
  } else {
    rendered = deepCopyString(vdomElement)
  }
  return rendered
}

/*
export const traverseVdom = (
  tree: VDOM,
  matches: (vdomElement: VDOM) => boolean,
  handler: (vdomElement: VDOM) => any,
) => {
  if (matches(tree)) {
    return handler(tree)
  } else {
    if (
      "children" in tree &&
      tree.children &&
      ((Array.isArray(tree.children) && tree.children.length > 0) || !Array.isArray(tree.children))
    ) {
      if (Array.isArray(tree.children)) {
        tree.children.forEach((child) => {
          return traverseVdom(child, matches, handler)
        })
      } else {
        return traverseVdom(tree.children, matches, handler)
      }
    }
  }
}
*/

const eofolRender = (rootElement: Element, rendered: EofolNode) => {
  domClearChildren(rootElement)
  domAppendChildren(rendered, rootElement)
}

let ROOT_ELEMENT: HTMLElement | undefined = undefined

export const getRootElement = () => ROOT_ELEMENT

export const eofolInit = (rootElementId: string, handler: EofolRenderHandler) => {
  const root = document.getElementById(rootElementId)
  if (root) {
    ROOT_ELEMENT = root
    const rendered = handler()
    // @ts-ignore
    const vdom = rendered[0]
    setVDOM(vdom)
    const dom = vdomToDom(vdom)
    // @ts-ignore
    eofolRender(root, [dom])
  } else {
    eofolFatal(`Root element with id = "${rootElementId}" not found in DOM.`)
  }
}

// eslint-disable-next-line no-unused-vars
export const eofolUpdate = (id: string) => {
  // @ts-ignore
  const vdom = getVDOM()
  /*
  const vdomUpdate = traverseVdom(
    vdom,
    (vdomElement) => {
      if ("id" in vdomElement && vdomElement.id === id) {
        return true
      }
    },
    (vdomElement) => vdomElement,
  )*/
  const vdomUpdate = vdom
  if (vdomUpdate) {
    const domUpdate = vdomToDom(vdomUpdate)
    if (domUpdate) {
      // @ts-ignore
      // const parent = domUpdate.parentNode
      const root = getRootElement() as HTMLElement
      eofolRender(root, [domUpdate])
      /*
      if (parent) {
        parent.childNodes.item(htmlElementIndexOf(domUpdate)).replaceWith(domUpdate)
      } else {
        // efl err
      }
       */
    } else {
      // efl error
    }
  } else {
    // efl err
  }
}

export const forceRerender = () => {
  const root = getRootElement() as HTMLElement
  // @ts-ignore
  const vdomIndex = getInternals().vdom.tree[0]
  const rendered = renderVdomElement(vdomIndex)
  // @ts-ignore
  const dom = vdomToDom(rendered)
  eofolRender(root, [dom])
}
