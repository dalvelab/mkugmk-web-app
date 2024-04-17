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
  Tag
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons";
import { createMeilisearchRequest } from "../api";
import { debounce, isEmpty, isNotEmpty, isNotVoid } from "@/shared";
import { useCallback, useEffect, useState } from "react";
import { MeilisearchResponse } from "../models";
import Link from "next/link";

interface Search {
  type: 'desktop' | 'mobile';
}

export const Search: React.FC<Search> = ({ type }) => {
  const { isOpen, onClose, onOpen} = useDisclosure();

  const [data, setData] = useState<MeilisearchResponse<any>["results"]>([]);

  useEffect(() => {
    return () => setData([]);
  }, [])

  function closeModal() {
    onClose();
    setData([]);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTest = useCallback(
    debounce(async (args: string[]) => {
      const response = await createMeilisearchRequest({query: args[0]});

      if (isNotVoid(response.results)) {
        setData(response.results)
        
        return;
      }

      setData([]);
    }, 250), 
    []
  );

  function onChange(value: string) {
    if (isEmpty(value)) {
      setData([]);
      return;
    }

    getTest(value)
  }

  const exhibition_centers: MeilisearchResponse<"exhibition-center">["results"] =
    isNotVoid(data) ?
    data.filter((query) => query.indexUid === "exhibition-center") : 
    [];
  
  const events: MeilisearchResponse<"event">["results"] =
    isNotVoid(data) ?
    data.filter((query) => query.indexUid === "event") : 
    [];
  
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
        onClose={closeModal}
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
              <Input size="lg" placeholder='Введите поисковый запрос' onChange={(e) => onChange(e.target.value)} />
            </InputGroup>
            <Flex
              flexDir="column"
              gap={1}
              overflowY="auto"
              maxHeight="350px"
              sx={{
                "::-webkit-scrollbar": {
                  display: "none",
                }
              }}
            >
              {isNotEmpty(exhibition_centers) && (
                exhibition_centers.flatMap((center) => center.hits).map((center) => (
                  <Link key={center.id} href={`/exhibition-centers/${center.id}`} onClick={closeModal}>
                    <Flex
                      py={2}
                      px={5}
                      _hover={{bgColor: "#F4F4F5"}} 
                      borderRadius={4}
                      flexDir="column"
                      alignItems="flex-start"
                      gap={2}
                    >
                      <Tag size="sm" colorScheme="green">о комплексе</Tag>
                      <chakra.span fontSize="lg">{center.name}</chakra.span>
                    </Flex>
                  </Link>
                ))
              )}
              {isNotEmpty(events) && (
                events.flatMap((event) => event.hits).map((event) => (
                  <Link key={event.id} href={`/news/${event.id}`} onClick={closeModal}>
                    <Flex
                      py={2}
                      px={5}
                      _hover={{bgColor: "#F4F4F5"}} 
                      borderRadius={4}
                      flexDir="column"
                      alignItems="flex-start"
                      gap={2}
                    >
                      <Tag size="sm" colorScheme="blue">новости</Tag>
                      <chakra.span fontSize="lg">{event.title}</chakra.span>
                    </Flex>
                  </Link>
                ))
              )}
            </Flex>
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