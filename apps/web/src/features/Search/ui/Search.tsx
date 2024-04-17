import { useEffect, useState } from "react";

import { 
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Flex,
  IconButton,
  useDisclosure,
  ModalFooter,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons";

import { isNotEmpty, isNotVoid } from "@/shared";

import { Hit } from "./Hit";
import { MeilisearchResponse } from "../models";
import { SearchForm } from "./SearchForm";

interface Search {
  type: 'desktop' | 'mobile';
  onSidebarClose?: VoidFunction;
}

export const Search: React.FC<Search> = ({ type, onSidebarClose }) => {
  const { isOpen, onClose, onOpen} = useDisclosure();

  const [data, setData] = useState<MeilisearchResponse<any>["results"]>([]);

  useEffect(() => {
    return () => setData([]);
  }, [])

  function closeModal() {
    if (isNotVoid(onSidebarClose)) {
      onSidebarClose();
    }
    onClose();
    setData([]);
  }

  const exhibition_centers: MeilisearchResponse<"exhibition-center">["results"] =
    isNotVoid(data) ?
    data.filter((query) => query.indexUid === "exhibition-center") : 
    [];
  
  const events: MeilisearchResponse<"event">["results"] =
    isNotVoid(data) ?
    data.filter((query) => query.indexUid === "event") : 
    [];

  const visitors: MeilisearchResponse<"visitors">["results"] =
    isNotVoid(data) ?
    data.filter((query) => query.indexUid === "visitors") : 
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
            <SearchForm setData={setData} />
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
            {isNotEmpty(visitors) && (
                visitors.flatMap((page) => page.hits).map((page) => (
                  <Hit
                    key={`${page.title}-${page.id}`}
                    type='visitors'
                    title={page.title}
                    closeModal={closeModal}
                    link={`/visitors/${page.type_for_meilisearch}`}
                  />
                ))
              )}
              {isNotEmpty(exhibition_centers) && (
                exhibition_centers.flatMap((center) => center.hits).map((center) => (
                  <Hit
                    key={center.id}
                    type='exhibition_center'
                    title={center.name}
                    closeModal={closeModal}
                    link={`/exhibition-centers/${center.id}`}
                  />
                ))
              )}
              {isNotEmpty(events) && (
                events.flatMap((event) => event.hits).map((event) => (
                  <Hit
                    key={event.id}
                    type='news'
                    title={event.title}
                    closeModal={closeModal}
                    link={`/news/${event.id}`}
                  />
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