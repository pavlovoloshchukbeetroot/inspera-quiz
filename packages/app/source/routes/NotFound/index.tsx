import React from "react"
import { Box, Heading, Text, List, ListItem } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import type { FC } from "react"


export const NotFound: FC = () => {

  return (
    <Box padding={8}>
      <Heading as="h2" marginY={8}>
        Bingo!
      </Heading>
      <Text marginY={4}>
        Well actually something have gone terribly wrong 
        and I hope that it's not me, but you. <br />
        Anyway here are the possible paths you can go:
      </Text>
      <List spacing={2}>
        <ListItem>
          <Link to="/">- Homepage</Link>
        </ListItem>
        <ListItem>
          <Link to="/quizes">- List of available quizes</Link>
        </ListItem>
      </List>
    </Box>
  )
}
