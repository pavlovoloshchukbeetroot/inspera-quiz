import React from "react"
import { Blocks } from "../../components"
import { Link } from "react-router-dom"
import { 
  Heading, 
  Box,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react"
import type { FC } from "react"

export const Results: FC<any> = ({ questions, answers, grade, map }) => {
  const right = map.filter(a => a).length
  return (
    <Box>
      <Flex marginY={8} direction="column" alignItems="center">
        <Heading as="h3">Congratulations 🤓</Heading>
        <Text fontSize={50} fontWeight="bold" color="coral">
          {grade.toUpperCase()}
        </Text>
        <Text>{right}/{questions.length}</Text>
      </Flex>

      {map.map((isCorrect, index) => {
        const { options, description } = questions[index]
        return (
          <Box key={index} 
            marginY={2} 
            padding={4}
            borderLeftColor={isCorrect ? "darkgreen" : "coral"} 
            borderLeftWidth={3}>
            <Blocks content={description} />
            Answer: 
            <Blocks content={options[answers[index]].description} />
          </Box>
        )
      })}
      <Link to={{ pathname: '/quizes', state: { reset: true }}}>
        <Button variant="solid" colorScheme="blue">
          Back to list
        </Button>
      </Link>
    </Box>
  )
}
