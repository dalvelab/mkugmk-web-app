import { useRouter } from "next/router";
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
  useDisclosure, 
  Heading,
  Flex,
  FormLabel,
  FormControl,
  Input,
  Textarea
} from "@chakra-ui/react";

export const OrderCall = () => {
  const { locale } = useRouter();

  const t = useTranslations('Footer');

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        variant='link'
        fontWeight="regular"
        color="brand.black"
      >
        {t('order_call')}
      </Button>
      <Modal
        size={["full", "lg", "lg", "lg", "lg"]}
        autoFocus={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading color="brand.black" pt={4} as="h6" fontSize="3xl" fontWeight="medium">
              {t('order_call')}
            </Heading>
            <ModalCloseButton />          
          </ModalHeader>
          <ModalBody pb={4}>
            <Flex flexDir="column" gap={5}>
              <FormControl isRequired>
                <FormLabel>{t('order_call_modal_form_name')}</FormLabel>
                <Input placeholder={t('order_call_modal_form_name')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('order_call_modal_form_phone')}</FormLabel>
                <Input placeholder={t('order_call_modal_form_phone')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{t('order_call_modal_form_message')}</FormLabel>
                <Textarea />
              </FormControl>
              <Button
                bgColor="brand.black"
                color="white"
                _hover={{bgColor: "brand.black"}}
              >
                {t('order_call')}
              </Button>
              {locale === 'ru' && (
                <chakra.span fontSize="xs" color="brand.gray">
                  Нажимая кнопку вы соглашаетесь с <chakra.a textDecor="underline" href="/">политикой конфиденциальности</chakra.a>
                </chakra.span>
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}