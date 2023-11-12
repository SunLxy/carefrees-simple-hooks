import React, { createContext, createElement, useContext } from "react";
import { useSimpleReducer, Instance, SimpleReducerType, SimpleReducerInstance } from "./../Reducer/index"

interface CreateSimpleProviderProps<T = any> {
  /**初始值*/
  initalValue?: T
  /**内容*/
  children?: React.ReactNode
  /**实例*/
  instance?: Instance<T>
  /**创建的 Context */
  Context: React.Context<SimpleReducerType<T>>
}

/**创建 Context  */
export const createSimpleContext = <T>(init: T) => createContext([init, () => void 0, new SimpleReducerInstance().instance])

/**创建 Provider */
export const createSimpleProvider = (props: CreateSimpleProviderProps) => {
  const { initalValue, instance, Context, children } = props
  const store = useSimpleReducer(initalValue, instance)
  return createElement(Context.Provider, {
    value: store,
    children
  })
}

/**创建 获取 Context 值*/
export const createSimpleHooksContext = <T extends {} = any>(Context: CreateSimpleProviderProps<T>["Context"]) =>
  () => useContext<SimpleReducerType<T>>(Context)
