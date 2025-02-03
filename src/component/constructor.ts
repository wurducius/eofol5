import { DefInternal, Props } from "../types"

export const playConstructor = (def: DefInternal<any>, props: Props, isNew?: boolean) => {
  if (isNew && def.constructor) {
    const constructorArgs = {
      props,
      defaultProps: def.defaultProps ?? {},
      defaultParams: def.defaultParams ?? {},
      //  params: {},
    }
    return def.constructor(constructorArgs)
  }
}
