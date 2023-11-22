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

  /**
   * 更新值
   * @param data 更新数据
   * @param isUpdate 是否更新依赖数据的组件(默认：true)
   * @param updateAll 是否更新所有组件(默认：false)
   * 
  */
  update = (data: Partial<T>, isUpdate = true, updateAll = false) => {
    if (Object.prototype.toString.call(data) === "[object Object]") {
      Object.entries(data).forEach(([key, value]) => {
        this.store[key] = value
      })
      if (Object.keys(data).length && isUpdate && !updateAll)
        this._Utils_create_bathRunSelector()
    }
    if (updateAll) {
      this._Utils_create_bathRunSelector(updateAll)
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