import { useTranslations } from "next-intl";

import { 
  chakra,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  Input,
  IconButton,
  useDisclosure,
  ModalFooter,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons";

interface Search {
  type: 'desktop' | 'mobile';
}

export const Search: React.FC<Search> = ({ type }) => {
  const { isOpen, onClose, onOpen} = useDisclosure();

  return (
    <>
      <IconButton
        boxSize={type === "desktop" ? 10 : 12}
        icon={<SearchIcon boxSize={type === "desktop" ? 4 : 5} />} 
        aria-label="Открыть поиск" 
        bgColor={type === "desktop" ? "transparent" : "gray.100"} 
        _hover={{bg: "brand.border"}}
        onClick={onOpen}
      />
      <Modal
        size={["full", "full", "full", "xl", "xl"]}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />          
          </ModalHeader>
          <ModalBody pb={4}>
            <Flex pt={4} flexDir="column" gap={5}>
            <InputGroup size="lg">
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color="brand.gray" />
              </InputLeftElement>
              <Input size="lg" placeholder='Введите поисковый запрос' />
            </InputGroup>
            </Flex>
          </ModalBody>
          <ModalFooter>
          <Button onClick={onClose} variant='ghost'>Закрыть</Button>
        </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}