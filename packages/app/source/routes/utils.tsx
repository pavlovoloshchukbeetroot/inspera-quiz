import React, { useRef, useCallback } from "react"
import { useSelector } from "react-redux"
import { getLoginStatus } from "../store/selectors"
import { NotFound } from "./NotFound"
import type { FC } from "react"

export const securedRoute = (Component: FC<any>) => (props: any) => {
  const isLoggedIn = useSelector(getLoginStatus)
  return isLoggedIn 
    ? <Component {...props} /> 
    : <NotFound />
}

export function useThrottle(
  functor: (...a: any[]) => void,
  limit: number,
  deps: any[],
) {
  const isDisabled = useRef(false)
  const callback = useCallback(functor, deps)
  return function (...args: any[]) {
    if (!isDisabled.current) {
      callback.apply(0, args)
      isDisabled.current = true
      setTimeout(() => isDisabled.current = false, limit)
    }
  }
}
