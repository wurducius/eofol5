import { Instance, mergeDeep, VDOM, VDOM_COMPONENT, VDOM_TAG, VDOM_TEXT, VDOM_TYPE } from "../../src"

// eslint-disable-next-line no-undef
export const getInternals = () => INTERNALS

export const mergeInternals = (nextInternals: any) => {
  //@ts-ignore
  // eslint-disable-next-line no-undef
  INTERNALS = mergeDeep(INTERNALS, nextInternals)
}

export const getInstances = () => getInternals().instances

// @ts-ignore
export const getInstance = (id: string) => getInternals().instances[id]

export const mergeInstance = (id: string, nextInstance: Instance) => {
  const instances = getInstances()
  // @ts-ignore
  instances[id] = mergeDeep(instances[id] ?? {}, nextInstance)
}

export const getVDOM = () => getInternals().vdom.tree[0]

export const setVDOM = (nextVdom: VDOM) => mergeInternals({ vdom: { tree: [nextVdom] } })

export const isVDOMComponent = (vdomElement: VDOM): vdomElement is VDOM_COMPONENT =>
  typeof vdomElement === "object" && vdomElement.type === VDOM_TYPE.COMPONENT
export const isVDOMTag = (vdomElement: VDOM): vdomElement is VDOM_TAG =>
  typeof vdomElement === "object" && vdomElement.type === VDOM_TYPE.TAG
export const isVDOMText = (vdomElement: VDOM): vdomElement is VDOM_TEXT => typeof vdomElement === "string"

// @TODO TYPING
export const getViews = () => getInternals().views

export const setViews = (nextViews: any) => mergeInternals({ views: nextViews })

export const getAssets = () => getInternals().assets

export const setAssets = (nextAssets: any) => mergeInternals({ assets: nextAssets })

export const getConfig = () => getInternals().config

export const setConfig = (nextConfig: any) => mergeInternals({ config: nextConfig })

export const getENV = () => getInternals().env

export const setENV = (nextENV: any) => mergeInternals({ vdom: { env: nextENV } })
