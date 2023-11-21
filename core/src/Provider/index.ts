import React, { createContext, createElement, useContext, useMemo } from "react";
import { useSimpleProviderInstance, ProviderInstance } from "./utils"
import { Utils_createSelectorHook } from "../utils/Selector"

export type SimpleProviderType<T extends {} = any> = [ProviderInstance<T>]

interface CreateSimpleProviderProps<T = any> {
  /**创建的 Context */
  Context: React.Context<SimpleProviderType<T>>
}

export interface SimpleProviderProps<T = any> {
  /**初始值*/
  initalValue?: T
  /**内容*/
  children?: React.ReactNode
  /**实例*/
  instance?: ProviderInstance<T>
}

/**创建 Context  */
export const createSimpleContext = <T extends {} = any>(): CreateSimpleProviderProps<T>["Context"] => createContext([new ProviderInstance<T>()])

/**创建 Provider */
export const createSimpleProvider = <T extends {} = any>(Context: CreateSimpleProviderProps<T>["Context"]) => {
  return function SimpleProvider(props: SimpleProviderProps<T>) {
    const { initalValue, instance, children } = props
    const [Instances] = useSimpleProviderInstance(instance)
    useMemo(() => Instances.init(initalValue), [])
    return createElement(Context.Provider, {
      value: [Instances],
      children
    })
  }
}
/**创建 获取 Context 值*/
export const createSimpleHooksContext = <T extends {} = any>(Context: CreateSimpleProviderProps<T>["Context"]) => () => useContext<SimpleProviderType<T>>(Context)

/**创建 获取 Selector */
export const createSimpleHooksSelector = <T extends {} = any>(instance: (simple?: ProviderInstance<T>) => ProviderInstance<T>[]) => {
  return Utils_createSelectorHook<(simple?: ProviderInstance<T>) => ProviderInstance<T>[], T>(instance)
}
// ====================默认使用================================
const SimpleContext = createSimpleContext()
/**
 * Provider
 * @description 默认创建
*/
export const SimpleProvider = createSimpleProvider(SimpleContext)
/**
 * useContext 
 * @description 默认创建
**/
export const useSimpleContext = createSimpleHooksContext(SimpleContext)
/**
 * Selector  
 * @description 默认创建
*/
export const useSimpleSelector = createSimpleHooksSelector(useSimpleContext)

