import { useState } from "react";
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
  Textarea,
  FormErrorMessage,
  useToast
} from "@chakra-ui/react";
import { z } from "zod";
import { isNotVoid } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { sendEmailRequest } from "../SendEmail";

const FormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(1, "Телефон должен быть указан"),
  message: z.string().min(1, "Сообщение не может быть пустым"),
})

const initalForm = {
  name: "",
  phone: "",
  message: "",
}

export const OrderCall = () => {
  const { locale } = useRouter();
  const toast = useToast();

  const t = useTranslations('Footer');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState(initalForm);
  const [errors, setErrors] = useState<z.ZodError<z.infer<typeof FormSchema>> | null>(null);

  const mutation = useMutation({
    mutationFn: sendEmailRequest,
    onSuccess: () => {
      toast({
        title: 'Успешно!',
        description: "С вами свяжутся в ближайшее время",
        status: 'success',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      });
      setForm(initalForm);
      onClose();
    },
    onError: () => {
      setForm(initalForm);

      toast({
        title: 'Произошла ошибка.',
        description: "Попробуйте позже",
        status: 'error',
        duration: 2500,
        position: 'top-right',
        isClosable: true,
      })
    },
  });

  function onClick() {
    const result = FormSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error);

      return;
    }

    mutation.mutate({message: `Заказ звонка с сайта. \n Имя: ${form.name}\n Телефон: ${form.phone}\n Сообщение: ${form.message}`})
  }

  const nameError = errors?.issues.find((issue) => issue.path.includes('name'));
  const phoneError = errors?.issues.find((issue) => issue.path.includes('phone'));
  const messageError = errors?.issues.find((issue) => issue.path.includes('message'));

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
              <FormControl isRequired isInvalid={isNotVoid(nameError)}>
                <FormLabel>{t('order_call_modal_form_name')}</FormLabel>
                <Input
                  isInvalid={isNotVoid(nameError)}
                  placeholder={t('order_call_modal_form_name')}
                  value={form.name}
                  onChange={(event) => setForm({
                    ...form,
                    name: event.target.value
                  })}
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(nameError) && (
                  <FormErrorMessage>{nameError.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={isNotVoid(phoneError)}>
                <FormLabel>{t('order_call_modal_form_phone')}</FormLabel>
                <Input
                  isInvalid={isNotVoid(phoneError)}
                  placeholder={t('order_call_modal_form_phone')}
                  value={form.phone}
                  maxLength={12}
                  onChange={(event) => setForm({
                    ...form,
                    phone: event.target.value.replace(/[^\d.+]+/g, "")
                  })}
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(phoneError) && (
                  <FormErrorMessage>{phoneError.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={isNotVoid(messageError)}>
                <FormLabel>{t('order_call_modal_form_message')}</FormLabel>
                <Textarea
                  isInvalid={isNotVoid(messageError)}
                  placeholder={t('order_call_modal_form_message')}
                  value={form.message}
                  onChange={(event) => setForm({
                    ...form,
                    message: event.target.value
                  })}
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(messageError) && (
                  <FormErrorMessage>{messageError.message}</FormErrorMessage>
                )}
              </FormControl>
              <Button
                bgColor="brand.black"
                color="white"
                _hover={{bgColor: "brand.black"}}
                _focus={{bgColor: "brand.black"}}
                onClick={onClick}
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