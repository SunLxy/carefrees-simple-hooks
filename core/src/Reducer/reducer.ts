import { useRef, useState } from "react"

export interface Instance<T> {
  /**初始值*/
  init: (initalValue: Partial<T>) => void;
  /**获取值*/
  getValue: () => Partial<T>
  /**更新值并刷新页面*/
  updateData: (data: Partial<T>) => void;
  /**只更新值，不刷新页面*/
  update: (data: Partial<T>) => void
}

/**实例*/
export class SimpleReducerInstance<T extends {} = any> {
  private store: Partial<T> = {};
  constructor(public _update?: React.Dispatch<Partial<T>>) { }

  /**初始值*/
  private init = (initalValue: Partial<T>) => {
    this.store = initalValue || {}
  }

  /**只更新值，不刷新页面*/
  private update = (data: Partial<T>) => {
    if (Object.prototype.toString.call(data) === "[object Object]") {
      Object.entries(data).forEach(([key, value]) => {
        this.store[key] = value
      })
    }
  }

  /**更新值并刷新页面*/
  private updateData = (data: Partial<T>) => {
    this.update(data)
    this._update?.(data)
  }

  /**获取值*/
  private getValue = () => {
    return this.store
  }

  get instance() {
    return {
      getValue: this.getValue,
      updateData: this.updateData,
      update: this.update,
      init: this.init
    }
  }
}

export const useSimpleReducerInstance = <T>(simple?: Instance<T>) => {
  const refs = useRef<Instance<T>>(null)
  const [, _update] = useState({})
  const updateRef = useRef(_update)
  updateRef.current = _update;
  if (!refs.current) {
    if (simple) {
      refs.current = simple
    } else {
      refs.current = new SimpleReducerInstance<T>(updateRef.current).instance
    }
  }
  return [refs.current]
}
