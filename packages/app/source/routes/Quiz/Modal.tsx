import React from "react"
import { 
  ModalCloseButton, 
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Modal,
} from "@chakra-ui/react"
import type { FC } from "react"


interface Props {
  onStart(): void,
  onBack(): void,
  isOpen: boolean,
  title: string,
  // description: any,
}

export const TrigerModal: FC<Props> = ({ onBack, onStart, title, isOpen }) => (
  <Modal isOpen={isOpen} onClose={onBack}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Quiz "{title}"</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {/* <Blocks content={record.quiz.description} /> */}
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={onStart} mr={3}>
          Start
        </Button>
        <Button variant="ghost" onClick={onBack}>
          Return
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
)
