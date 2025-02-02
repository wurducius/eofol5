import { DEF_TYPE_COMPONENT, DEF_TYPE_FLAT, PROP_NAME_DEF, PROP_NAME_ID, VDOM_TYPE } from "./eofol-constants"

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

export type DEF_TYPE = typeof DEF_TYPE_COMPONENT | typeof DEF_TYPE_FLAT

export type DefFlat = {
  // eslint-disable-next-line no-unused-vars
  render: (props: Props) => VDOMChildren
}

// @TODO finish
export type DefInternal<T> = (Def<T> | DefFlat) & {
  id: string
  type: DEF_TYPE
}

export type DefRenderArg<T> = {
  state: State<T>
  mergeState: SetState<Partial<T>>
  setState: SetState<T>
  resetState: () => void
  props: Props
  params: Props
  body: Props
}

export type Multi<T> = T | T[] | undefined

// eslint-disable-next-line no-unused-vars
export type Effect<T> = (arg: DefRenderArg<T>) => void

// eslint-disable-next-line no-unused-vars
export type DefRender<T> = (arg: DefRenderArg<T>) => EofolNode

// @TODO finish
export type Def<T> = {
  render: DefRender<T>
  initialState?: State<T>
  defaultProps?: Props
  defaultParams?: Props
  className?: Multi<string>
  // eslint-disable-next-line no-unused-vars
  constructor?: (defaultProps: Props) => Props
  effect?: Multi<Effect<T>>
  subscribe?: Multi<string>
  // eslint-disable-next-line no-unused-vars
  shouldUpdate?: (arg: DefRenderArg<T>) => boolean
  memo?: boolean
  // eslint-disable-next-line no-unused-vars
  getDerivedStateFromProps?: (arg: DefRenderArg<T>) => T
  // eslint-disable-next-line no-unused-vars
  onBeforeUpdate?: (arg: DefRenderArg<T>) => void
  // eslint-disable-next-line no-unused-vars
  onMounted?: (arg: DefRenderArg<T>) => void
  // eslint-disable-next-line no-unused-vars
  onUnmounted?: (arg: DefRenderArg<T>) => void
}

// @TODO finish
export interface Instance {
  id: string
  // @TODO state typing
  state: State<any>
  def: string
}

export type VDOMChildren = VDOM | VDOM[] | undefined

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

export type Props = Record<string | typeof PROP_NAME_ID | typeof PROP_NAME_DEF, any>

export type State<T> = T
// eslint-disable-next-line no-unused-vars
export type SetState<T> = (nextState: T) => void

export type EofolRenderHandler = () => VDOMChildren
