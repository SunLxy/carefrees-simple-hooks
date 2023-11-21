import { useMemo } from "react"
import { useSimpleReducerInstance, Instance } from "./reducer"
export * from "./reducer"

export type SimpleReducerType<T extends {} = any> = [Partial<T>, React.Dispatch<Partial<T>>, Instance<T>]

export const useSimpleReducer = <T extends {}>(initalValue: Partial<T> = {}, instance?: Instance<T>): SimpleReducerType<T> => {
  const [simple] = useSimpleReducerInstance<T>(instance)
  useMemo(() => simple.init(initalValue), [])
  return [simple.getValue(), simple.updateData, simple]
}