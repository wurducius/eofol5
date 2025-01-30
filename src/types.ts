export type Classname = string | undefined
export type Attributes = any
export type Properties = any

export type EofolElement = HTMLElement | string | undefined | false | null
export type EofolNode = EofolElement[] | EofolElement

export interface Asset {
  url: string
  size: number
}

export type AssetMap = Record<string, Asset>

export interface Assets {
  pages: Asset[]
  images: AssetMap[]
  other: Asset[]
}

export type Views = string[]

export type InternalsConfig = Record<string, string>

export type InternalsEnv = Record<string, string>

export interface Internals {
  instances: Record<string, Instance>
  vdom: { tree: VDOM[] }
  views: Views
  assets: Assets
  config: InternalsConfig
  env: InternalsEnv
}

// @TODO finish
export type DefInternal<T> = Def<T> & {
  id: string
}

// @TODO finish
export type Def<T> = {
  // eslint-disable-next-line no-unused-vars
  render: (state: State<T>, setState: SetState<T>, props: Props, mergeState: SetState<T>) => EofolNode
  initialState: State<T>
}

// @TODO finish
export interface Instance {
  id: string
  // @TODO state typing
  state: State<any>
  def: string
}

export type VDOMChildren = VDOM[] | VDOM

export const VDOM_TYPE = {
  COMPONENT: "component",
  TAG: "tag",
  TEXT: "text",
}

export type VDOM_TAG = {
  type: typeof VDOM_TYPE.TAG
  id: string
  class?: string
  attributes?: Attributes
  properties: Properties
  tag: string
  children?: VDOMChildren
}

export type VDOM_COMPONENT = {
  type: typeof VDOM_TYPE.COMPONENT
  id: string
  props?: Props
  children?: VDOMChildren
  def: string
}

export type VDOM_TEXT = string

export type VDOM = VDOM_TAG | VDOM_COMPONENT | VDOM_TEXT

export type Props = Record<string | "id" | "def", any>

export type State<T> = T
// eslint-disable-next-line no-unused-vars
export type SetState<T> = (nextState: T) => void

export type EofolRenderHandler = () => [VDOM]
