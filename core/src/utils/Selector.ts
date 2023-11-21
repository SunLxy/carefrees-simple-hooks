


import { useRef, useEffect, useState, } from "react"
import { Utils_isEqual } from "./isEqual"

interface Utils_SelectorListItemType<T = any, TState = unknown, Selected = unknown,> {
  /**上一次值*/
  preValue: TState
  /**更新组件方法*/
  updateData: (value: Selected) => void
  /**获取最新数据的 执行方法*/
  selector: (instance: T) => Selected,
  /**新老数据对比方法*/
  equalityFn?: (a: TState, b: TState) => boolean
}

//-------------------------- Selector 选择器部分--------------------------------------
export class Utils_Selector {
  /**数据*/
  selectorMaps: Map<Symbol | Object, Utils_SelectorListItemType> = new Map([])
  /**
    * 基础创建方法=====>注册 选择器函数，存储状态中提取数据以供此组件
    * @param selectorMapField  执行器方法集合存储 字段
    * @param key  map集合 设置值的唯一key值
    * @param selectorFn  获取最新数据的 执行方法
    * @param updateData  组件更新方法
    * @param equalityFn  新老数据对比方法
   */
  _Utils_create_registerSelector = <Selected = unknown, T = any>(
    key: Object | Symbol,
    selectorFn: (instance: T) => Selected,
    updateData: (value: Selected) => void,
    equalityFn?: (a: any, b: any) => boolean,
  ) => {
    const preValue = selectorFn(this as unknown as T);
    this.selectorMaps.set(key, { preValue, selector: selectorFn, updateData, equalityFn })
    return {
      data: preValue,
      unMount: () => {
        this.selectorMaps.delete(key)
      }
    }
  }
  /**
   * 基础创建方法=====> 数据更新,执行选择器
   * @param selectorMapField  执行器方法集合存储 字段
   * @param storeField  操作数据存储 字段
   * 
  */
  _Utils_create_bathRunSelector = () => {
    this.selectorMaps.forEach((item) => {
      const newValue = item.selector(this)
      let isNoUpdate = false
      if (typeof item.equalityFn === "function") {
        isNoUpdate = item.equalityFn?.(item.preValue, newValue)
      }
      item.preValue = newValue;
      if (!isNoUpdate) {
        item.updateData(newValue)
      }
    })
  }

  /**
   * 基础创建方法=====>选择器 获取值
   * @param selectorMapField  执行器方法集合存储 字段
   * @param storeField  操作数据存储 字段
   * @param key   从 map集合 取值唯一key值
   * */
  _Utils_create_getSelectorValue = (key: Object | Symbol) => {
    const selectorData = this.selectorMaps.get(key)
    if (selectorData) {
      const preValue = selectorData?.selector(this)
      selectorData.preValue = preValue;
      this.selectorMaps.set(key, selectorData);
    }
    return this.selectorMaps.get(key)?.preValue
  }
}

/**创建 useSelector*/
export const Utils_createSelectorHook = <K extends Function = any, T = any>(instance: K) => {
  return function useSelector<TStore = T, Selected = any>(
    selector: (state: TStore) => Selected,
    equalityFn: (a: any, b: any) => boolean = Utils_isEqual
  ): Selected {
    const [simple] = instance()
    const [, _update] = useState({})
    const refUpdate = useRef<(value: Selected) => void>();
    /**为了解决闭包照成的值不是最新问题*/
    const refSelector = useRef(selector)
    refSelector.current = selector
    /**key值*/
    const refKey = useRef(Symbol("useSelector"))
    refUpdate.current = () => _update({})
    const storeRef = useRef(simple._Utils_create_registerSelector(refKey.current, refSelector.current, refUpdate.current, equalityFn))

    useEffect(() => {
      return () => storeRef.current?.unMount()
    }, [])

    return simple._Utils_create_getSelectorValue(refKey.current) as Selected
  }
}
