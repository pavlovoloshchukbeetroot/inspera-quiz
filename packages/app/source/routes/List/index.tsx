import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { securedRoute } from "../utils"
import { FunnyLoader } from "../../components"
import { getQuiz } from "../../store/selectors"
import { actions } from "../../store/quiz"
import { Record } from "./Record"
import {
  Heading, 
  Table,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
} from "@chakra-ui/react"


export const List = securedRoute(() => {
  const { state = {} } = useLocation<{ reset?: boolean }>()
  const { loading, list } = useSelector(getQuiz)
  const dispatch = useDispatch()

  useEffect(() => { 
    !loading && !list && dispatch(actions.import())
  }, [loading, list])


  useEffect(() => {
    if (state.reset) {
      dispatch(actions.reset())
      dispatch(actions.import())
    }
  }, [state.reset])

  if (loading) return <FunnyLoader />

  if (list) return (
    <Box padding={4}>
      <Heading as="h2" marginY={8}>
        List of available quizes
      </Heading>
      {list.length ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Assigned on</Th>
              <Th>Expiration date</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {list.map((quiz, index) => (
              <Record {...quiz} 
                key={quiz.id} 
                no={index} />
            ))}
          </Tbody>
        </Table>
      ) : (
        'No records!'
      )}
    </Box>
  )

  return null
})
