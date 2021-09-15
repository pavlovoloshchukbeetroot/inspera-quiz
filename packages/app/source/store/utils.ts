import type { AnyAction } from "@reduxjs/toolkit"

type Rule = "endsWith" | "startsWith" | "includes"

export const typeCheck = (rule: Rule, ...markers: string[]) =>
  ({ type }: AnyAction) => markers.some(marker => type[rule](marker))

// export const debounce = (handler: (...args:any[]) => any, limit: number) => () => 
