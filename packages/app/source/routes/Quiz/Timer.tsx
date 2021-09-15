import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useInterval } from "@chakra-ui/react"
import { useThrottle } from "../utils"
import { getTime } from "../../store/selectors"
import { actions } from "../../store/time"
import { RepeatClockIcon } from "@chakra-ui/icons"
import { Flex, Box } from "@chakra-ui/react"
import type { FC } from "react"

const SYNC_TROTTLE = 3000
const REFRESH_INTERVAL = 1000

function countDown(totalMiliseconds: number) {
  const totalSeconds = Math.floor((totalMiliseconds || 0) / 1000)
  const hours   = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
  const seconds = totalSeconds - (hours * 3600) - (minutes * 60)
  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':')
}

export const Timer: FC = () => {
  const state = useSelector(getTime)
  const [localtimeLeft, setLocaltimeLeft] = useState(0)
  const dispatch = useDispatch()
  const getServerTime = useThrottle(dispatch.bind(0, actions.sync()), SYNC_TROTTLE, [])
  const time = countDown(localtimeLeft)
  useInterval(() => {
    setLocaltimeLeft(value => value - REFRESH_INTERVAL)
    getServerTime()
  }, REFRESH_INTERVAL)

  useEffect(() => void setLocaltimeLeft(state.timeLeft!), [state.timeLeft])

  return time !== '00:00:00' ? (
    <Flex alignItems="center">
      <Box marginRight={2} fontFamily="monospace" fontSize={20}>
        {countDown(localtimeLeft)}
      </Box>
      <RepeatClockIcon />
    </Flex>
  ) : null
}
