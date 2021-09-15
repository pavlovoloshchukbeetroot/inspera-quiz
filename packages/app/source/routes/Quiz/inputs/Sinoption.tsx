import React from "react"
import { RadioGroup, Radio, Stack } from "@chakra-ui/react"
import { Blocks } from "../../../components"
import type { FC } from "react"


export const Sinoption: FC<any> = ({ options, value, onChange }) => {
  const changeHandler = (index: string) => onChange(options[index].value)
  const index = options.findIndex(option => option.value === value) 
  return (
    <RadioGroup onChange={changeHandler} value={index}>
      <Stack direction="column">
        {options.map((option: any, index: number) => (
          <Radio value={index} key={index}>
            <Blocks content={option.description} />
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  )
}
