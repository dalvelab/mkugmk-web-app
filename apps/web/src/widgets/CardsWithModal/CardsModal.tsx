import {
  chakra,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Heading,
  Flex,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import { Markdown, StrapiInfoCard, isNotVoid } from "@/shared";

import { Property } from "./Property";

interface CardsModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  data: StrapiInfoCard;
}

export const CardsModal: React.FC<CardsModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const {
    name,
    image,
    description,
    modal_image,
    type,
    reference_to_other_source,
    address,
    email,
    phone,
    tickets,
    working_hours,
  } = data;

  return (
    <Modal
      size={["full", "xl", "xl", "xl", "xl"]}
      autoFocus={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody pt={4}>
          <chakra.div pos="relative" w="full" h="260px">
            <Image
              fill
              src={
                isNotVoid(modal_image) ? `${modal_image.url}` : `${image.url}`
              }
              alt={isNotVoid(modal_image) ? modal_image.name : image.name}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </chakra.div>
          <Heading pt={4} as="h6" fontSize="3xl" fontWeight="medium">
            {name}
          </Heading>
          <Flex pt={3} flexDir="column" alignItems="flex-start" gap={2}>
            <Property text={address} variant="location" />
            {isNotVoid(working_hours) && (
              <Property text={working_hours} variant="schedule" />
            )}
            {isNotVoid(email) && <Property text={email} variant="email" />}
            {isNotVoid(phone) && <Property text={phone} variant="phone" />}
            {isNotVoid(tickets) && (
              <Property text={tickets} variant="tickets" />
            )}
          </Flex>
          <chakra.div fontSize="md" pt={5} textAlign="justify">
            <Markdown>{description}</Markdown>
          </chakra.div>
        </ModalBody>
        <ModalFooter gap={4}>
          <Button onClick={onClose} variant="ghost">
            Закрыть
          </Button>
          {type === "partners" && isNotVoid(reference_to_other_source) && (
            <Link
              href={reference_to_other_source}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              <Button
                bgColor="brand.black"
                color="white"
                _hover={{ bgColor: "brand.black" }}
              >
                Перейти
              </Button>
            </Link>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
