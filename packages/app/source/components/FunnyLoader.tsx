import React, { useState } from "react"
import { Flex, Spinner, Text, useInterval } from "@chakra-ui/react"
import type { FC } from "react"


const tooltips = [
  'Waiting for astrological report on best quiz match',
  'Just holding you here for a while',
  'Beeting shit out of database',
  'Searching for your record',
  'Smoking Docker instance',
  'Calling Paul to aid',
  'Did you know that bats are the only mammal that can actually fly?',
  'It’s impossible to hum while holding your nose (just try it!)',
]

const randomTooltipIndex = () =>
  Math.floor(Math.random() * tooltips.length)

export const FunnyLoader: FC = () => {
  const [ index, setIndex ] = useState<number>(randomTooltipIndex())

  useInterval(() => setIndex(randomTooltipIndex()), 5000)

  return (
    <Flex direction="column" alignItems="center" padding={8}>
      <Spinner
        marginY={4}
        thickness="4px"
        speed="0.65s"
        color="blue.500"
        size="xl"
      />
      <Text fontWeight="bold">{tooltips[index]}...</Text>
    </Flex>
  )
}
