import { useEffect, useRef, useState } from "react";

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

  const inputRef = useRef<HTMLInputElement | null>(null);

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
  
  const faqPage: MeilisearchResponse<"faq-page">["results"] =  
    isNotVoid(data) ?
    data.filter((query) => query.indexUid === "faq-page") : 
    [];
  
  const partnersPage: MeilisearchResponse<"partners-page">["results"] =  
    isNotVoid(data) ?
    data.filter((query) => query.indexUid === "partners-page") : 
    [];
  
  const contactsPage: MeilisearchResponse<"contacts-page">["results"] =  
    isNotVoid(data) ?
    data.filter((query) => query.indexUid === "contacts-page") : 
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
        initialFocusRef={inputRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />          
          </ModalHeader>
          <ModalBody pb={4}>
            <Flex pt={4} flexDir="column" gap={5}>
              <SearchForm setData={setData} inputRef={inputRef}/>
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
                {isNotEmpty(faqPage) && (
                  faqPage
                    .flatMap((page) => page.hits)
                    .flatMap((page) => page.questions_with_answers)
                    .filter((faq) => 
                      isNotVoid(data) ? 
                      faq.topic.toLowerCase().includes(data[0].query.toLowerCase()) ||
                      faq.question.toLowerCase().includes(data[0].query.toLowerCase()) :
                      true
                    )
                    .map((faq) => (
                      <Hit
                        key={faq.id}
                        type='faq-page'
                        title={faq.question}
                        caption={faq.answer}
                        closeModal={closeModal}
                        link='/faq'
                      />
                    ))
                )}
                {isNotEmpty(contactsPage) && (
                  contactsPage
                    .flatMap((page) => page.hits)
                    .flatMap((page) => page.contacts)
                    .filter((contact) => 
                      isNotVoid(data) ? 
                      contact.department?.toLowerCase().includes(data[0].query.toLowerCase()) :
                      true)
                    .map((partner) => (
                      <Hit
                        key={partner.id}
                        type='contacts-page'
                        title={partner.department || ""}
                        closeModal={closeModal}
                        link='/contacts'
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
                {isNotEmpty(partnersPage) && (
                  partnersPage
                    .flatMap((page) => page.hits)
                    .flatMap((page) => page.partners)
                    .filter((partner) => 
                      isNotVoid(data) ? 
                      partner.name.toLowerCase().includes(data[0].query.toLowerCase()) :
                      true)
                    .map((partner) => (
                      <Hit
                        key={partner.id}
                        type='partners-page'
                        title={partner.name}
                        caption={partner.short_description}
                        closeModal={closeModal}
                        link='/partners'
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