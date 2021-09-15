import React, { useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { SunglassesIcon, FlashlightIcon } from "./icons"
import { actions } from "../../store/user"
import { ChevronDownIcon } from "@chakra-ui/icons"
import { getUser } from "../../store/selectors"
import { 
  useColorMode,
  IconButton, 
  MenuButton,
  MenuItem,
  MenuList,
  Heading, 
  Divider,
  Center, 
  Button,
  Avatar,
  Flex, 
  Menu,
  Text,
  Box, 
} from "@chakra-ui/react"
import type { FC } from "react"


export const ToolBar: FC = () => {
  const { id } = useSelector(getUser)
  const { colorMode, toggleColorMode } = useColorMode()
  const dispatch = useDispatch()
  const isDarkMode = colorMode === 'dark'

  return (
    <Box boxShadow="lg">
      <Flex justify="space-between" height={100} paddingX={4}>
        <Center>
          <Heading as="h1" size="md">
            Inspera quiz app
          </Heading>
        </Center>
        <Center>
          <Flex>
            <IconButton 
              marginRight={2}
              aria-label={`Set ${isDarkMode ? 'light' : 'dark'} color scheme`} 
              icon={isDarkMode ? <FlashlightIcon /> : <SunglassesIcon />} 
              onClick={toggleColorMode} />
            {id && (
              <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                  Applicant
                </MenuButton>
                <MenuList>
                  <Flex padding={3} align="center" justify="center" direction="column">
                    <Avatar marginBottom={2} />
                    <Text fontSize="sm">{id}</Text>
                  </Flex>
                  <Divider />
                  <MenuItem
                    onClick={dispatch.bind(0, actions.logout())}>
                    LogOut
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Center>
      </Flex>
    </Box>
  )
}
