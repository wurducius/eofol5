import { DEF_TYPE_COMPONENT, ERROR, LOADING, PROP_NAME_DEF, PROP_NAME_ID, READY, VDOM_TYPE } from "./eofol-constants"
import CSSType from "csstype"

export type Classname = string | undefined
export type Attributes = Record<string, any> | undefined
export type Properties = Record<string, any> | undefined

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

export type DEF_TYPE = typeof DEF_TYPE_COMPONENT

// @TODO finish
export type DefInternal<T> = Def<T> & {
  id: string
  type: DEF_TYPE
}

export type DefRenderArg<T> = {
  state: State<T>
  mergeState: SetState<Partial<T>>
  setState: SetState<T>
  resetState: () => void
  props: Props
}

export type Multi<T> = T | T[] | undefined

export type ComponentRender<T> = {
  render: DefRender<T>
}

export type ConstructorArg = { props?: Props; defaultProps?: Props }

export type ComponentLifecycle<T> = ComponentRender<T> & {
  // eslint-disable-next-line no-unused-vars
  constructor?: (arg: ConstructorArg) => void
  // eslint-disable-next-line no-unused-vars
  shouldUpdate?: (arg: DefRenderArg<T>) => boolean
  // eslint-disable-next-line no-unused-vars
  getDerivedStateFromProps?: (arg: DefRenderArg<T>) => T
  // eslint-disable-next-line no-unused-vars
  onBeforeUpdate?: (arg: DefRenderArg<T>) => void
  // eslint-disable-next-line no-unused-vars
  onUpdated?: (arg: DefRenderArg<T>) => void
  // eslint-disable-next-line no-unused-vars
  beforeMount?: (arg: DefRenderArg<T>) => void
  // eslint-disable-next-line no-unused-vars
  onMounted?: (arg: DefRenderArg<T>) => void
  // eslint-disable-next-line no-unused-vars
  beforeUnmount?: (arg: DefRenderArg<T>) => void
  // eslint-disable-next-line no-unused-vars
  onUnmounted?: (arg: DefRenderArg<T>) => void
}

// eslint-disable-next-line no-unused-vars
export type Effect<T> = (arg: DefRenderArg<T>) => void

// eslint-disable-next-line no-unused-vars
export type DefRender<T> = (arg: DefRenderArg<T>) => VDOMChildren

// @TODO finish
export type Def<T> = ComponentLifecycle<T> & {
  initialState?: State<T>
  defaultProps?: Props
  className?: Multi<string>
  effect?: Multi<Effect<T>>
  subscribe?: Multi<string>
  memo?: boolean
}

// @TODO finish
export interface Instance {
  id: string
  // @TODO state typing
  state: State<any>
  def: string
}

export type VDOMChildren = VDOM | VDOM[] | undefined

export type VDOMChildrenSaved = { id: string | undefined }

export type VDOM_TAG = {
  type: typeof VDOM_TYPE.TAG
  id: string
  class?: string
  attributes?: Attributes
  properties: Properties
  tag: string
  children?: VDOMChildren
  vdomChildren: VDOMChildrenSaved[]
}

export type VDOM_COMPONENT = {
  type: typeof VDOM_TYPE.COMPONENT
  id: string
  props?: Props
  children?: VDOMChildren
  def: string
  vdomChildren: VDOMChildrenSaved[]
}

export type VDOM_TEXT = string

export type VDOM = VDOM_TAG | VDOM_COMPONENT | VDOM_TEXT

export type Props = Record<string | typeof PROP_NAME_ID | typeof PROP_NAME_DEF, any>

export type State<T> = T
// eslint-disable-next-line no-unused-vars
export type SetState<T> = (nextState: T) => void

export type EofolRenderHandler = () => VDOM

export type StatefulData<T> = typeof READY | typeof LOADING | typeof ERROR | T

export type StateTransform<T> = {
  state: T
  setState: SetState<T>
  mergeState: SetState<Partial<T>>
  resetState: () => void
}

export type LifecycleArg = {
  def: DefInternal<any>
  props: Props
  idInstance: string
  instance: Instance
  isNew?: boolean
  children?: VDOM[]
  stateTransforms: StateTransform<any>
}

export type Actions<T> = Record<string, ActionImpl<T, any>>

export type Selectors = Record<string, SelectorImpl<any>>

export type Store<T> = {
  id: string
  initialState: T
  state: T
  actions?: Actions<T>
  selectors?: Selectors
  resetState: () => void
}

// eslint-disable-next-line no-unused-vars
export type Action<T, V> = (state: T, payload?: V) => Partial<T>

// eslint-disable-next-line no-unused-vars
export type ActionImpl<T, V> = (payload?: V) => Partial<T>

// eslint-disable-next-line no-unused-vars
export type Selector<T, V> = (state: T) => V

export type SelectorImpl<V> = () => V

export type CreateStoreArg<T> = {
  initialState: T
  actions?: Record<string, Action<T, any>>
  selectors?: Record<string, Selector<T, any>>
}

export type EofolProps<T> = T & { children?: VDOMChildren; className?: Classname }

export type StyleObject = CSSType.Properties<string>

export type Theme = {
  color: { colorx: string; colory: string; colorz: string; colorw: string; colorwx: string; colorxy: string }
  typography: { fontSize: Record<number, number>; formFontSize: number }
}
