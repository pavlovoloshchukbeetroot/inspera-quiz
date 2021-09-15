import React from "react"
import type { FC } from "react"

import { Sinoption } from "./Sinoption"

const map = new Map()
  .set('sinoption', Sinoption)

export const Input: FC<any> = ({ type, ...props }) => {
  const Component = map.get(type)
  return <Component {...props} />
}
