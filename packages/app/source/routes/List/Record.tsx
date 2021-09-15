import React, { memo } from "react"
import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { Button, Tr, Td, Badge } from "@chakra-ui/react"
import type { Quiz } from "../../store/quiz"


interface Props extends Quiz {
  no: number
}

const DATE_TEMPLATE = 'MM/DD/YYYY'

export const Record = memo<Props>(({ id, no, quiz, results, createdAt }) => {
  const duration = Math.floor(quiz.duration / 60000)
  const date = {
    createdAt: dayjs(createdAt)
      .format(DATE_TEMPLATE),
    expiredAt: dayjs(createdAt)
      .add(quiz.expiredIn, 'days')
      .format(DATE_TEMPLATE),
  }
  return (
    <Tr key={id}>
      <Td>{no + 1}</Td>
      <Td>{quiz.title}({duration}m)</Td>
      <Td>{date.createdAt}</Td>
      <Td>{date.expiredAt}</Td>
      <Td>
        {results.length ? (
          <Badge colorScheme="green">
            Completed
          </Badge>
        ): (
          <Link to={`/quiz/${id}`}>
            <Button>
              Fill it
            </Button>
          </Link>
        )}
      </Td>
    </Tr>
  )
})
