import { useRef } from "react"
import { Utils_Selector } from "./../utils/Selector"

export class ProviderInstance<T> extends Utils_Selector {

  store: Partial<T> = {};

  constructor() {
    super()
  }

  /**初始值*/
  init = (initalValue: Partial<T>) => {
    this.store = initalValue || {}
  }

  /**更新值*/
  update = (data: Partial<T>, isUpdate = true) => {
    if (Object.prototype.toString.call(data) === "[object Object]") {
      Object.entries(data).forEach(([key, value]) => {
        this.store[key] = value
      })
      if (Object.keys(data).length && isUpdate)
        this._Utils_create_bathRunSelector()
    }
  }
  /**获取值*/
  getValue = () => {
    return this.store
  }
}


export const useSimpleProviderInstance = <T>(simple?: ProviderInstance<T>) => {
  const refs = useRef<ProviderInstance<T>>(null)
  if (!refs.current) {
    if (simple) {
      refs.current = simple
    } else {
      refs.current = new ProviderInstance<T>()
    }
  }
  return [refs.current]
}