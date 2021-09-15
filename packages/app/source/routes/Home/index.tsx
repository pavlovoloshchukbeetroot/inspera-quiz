import React from "react"
import { Box, Heading, Text, List, ListItem, ListIcon } from "@chakra-ui/react"
import { SettingsIcon, LinkIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import type { FC } from "react"


export const Home: FC = () => (
  <Box padding={4}>
    <Heading as="h2" marginY={8}>
      Greetings Inspera team
    </Heading>
    <Text marginY={4}>
      It's been a while since my last exam excercise, so I've decided to make
      fun of it.
    </Text>
    <Text marginY={4}>
      Basically I took general point and created this MVP quiz app using
      Typescript. Tech set is still React + Redux + steroids 😁. 
      Backend is done using KoaJS. Down bellow you may find a brief
      feature check:
    </Text>
    <List spacing={2} marginBottom={8}>
      <ListItem>
        <ListIcon as={SettingsIcon} color="green.500" />
        Quizes are being managed by backend instance.
      </ListItem>
      <ListItem>
        <ListIcon as={SettingsIcon} color="green.500" />
        Each question has it's time limits.
      </ListItem>
      <ListItem>
        <ListIcon as={SettingsIcon} color="green.500" />
        Results are than being stored(until you drop DB).
      </ListItem>
      <ListItem>
        <ListIcon as={SettingsIcon} color="green.500" />
        Every 10 sec(and this is configurable) client tries to check if local
        time is not being manipulated in any sort of way, and if so, corrects
        it badly 😱. <br />
      </ListItem>
      <ListItem>
        <ListIcon as={SettingsIcon} color="green.500" />
        Yeap. Binary theme mode is present. Go check it out. By default it
        takes your OS color scheme preferences.
      </ListItem>
    </List>
    <Text marginY={4}>
      To check how it works, I've predicated these credentials. Feel free.
    </Text>
    <List >
      <ListItem>
        <ListIcon as={LinkIcon}/>
        <Link to="/user/5fd924625fa675f843d5a10e0baacdb8">Frontend dev quizlist</Link>
      </ListItem>
      <ListItem>
        <ListIcon as={LinkIcon}/>
        <Link to="/user/9997c2f450f51e5c5402854899c42354">Backend dev quizlist</Link>
      </ListItem>
    </List>
  </Box>
)
