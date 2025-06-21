import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { v4 as uuidv4 } from "uuid";

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
  useToast,
  ButtonProps,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
} from "@chakra-ui/react";
import { z } from "zod";
import { FileIcon, isNotEmpty, isNotVoid } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { sendEmailRequest } from "../SendEmail";
import { ChevronDownIcon } from "@chakra-ui/icons";

const FormSchema = z.object({
  name: z.string().min(2, "Наименование должно содержать минимум 2 символа"),
  year_manufactured: z
    .string()
    .max(4, "Год производства должен быть 4 значным"),
  price: z.string(),
  currency: z.string(),
  contact_info: z.string().min(1, "Поле должно быть заполнено"),
  email: z
    .string()
    .email("Невалидный Email")
    .min(1, "Email должен быть указан"),
  phone: z.string().min(6, "Телефон должен быть более 6 символов"),
  description: z.string(),
});

const initalForm = {
  name: "",
  year_manufactured: "",
  price: "",
  currency: "",
  contact_info: "",
  email: "",
  phone: "",
  description: "",
};

export const OfferToBuy: React.FC = () => {
  const { locale } = useRouter();
  const toast = useToast();

  const t = useTranslations("Footer");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState(initalForm);
  const [files, setFiles] = useState<File[] | null>(null);
  const [errors, setErrors] = useState<z.ZodError<
    z.infer<typeof FormSchema>
  > | null>(null);

  const mutation = useMutation({
    mutationFn: sendEmailRequest,
    onSuccess: () => {
      toast({
        title: "Успешно!",
        status: "success",
        duration: 2500,
        position: "top-right",
        isClosable: true,
      });
      setForm(initalForm);
      onClose();
    },
    onError: () => {
      setForm(initalForm);

      toast({
        title: "Произошла ошибка.",
        description: "Попробуйте позже",
        status: "error",
        duration: 2500,
        position: "top-right",
        isClosable: true,
      });
    },
  });

  function onClick() {
    const result = FormSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error);

      return;
    }

    mutation.mutate({
      message: `Заказ звонка с сайта. \n Имя: ${form.name}\n Телефон: ${form.phone}\n Сообщение: ${form.description}`,
    });
  }

  function onCloseModal() {
    onClose();
    setErrors(null);
    setForm(initalForm);
  }

  const nameError = errors?.issues.find((issue) => issue.path.includes("name"));
  const yearManufacturedError = errors?.issues.find((issue) =>
    issue.path.includes("year_manufactured")
  );
  const priceError = errors?.issues.find((issue) =>
    issue.path.includes("price")
  );
  const contactInfoError = errors?.issues.find((issue) =>
    issue.path.includes("contact_info")
  );
  const emailError = errors?.issues.find((issue) =>
    issue.path.includes("email")
  );
  const phoneError = errors?.issues.find((issue) =>
    issue.path.includes("phone")
  );
  const descriptionError = errors?.issues.find((issue) =>
    issue.path.includes("message")
  );

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor="brand.black"
        color="white"
        _hover={{ bgColor: "brand.black" }}
        justifySelf="flex-end"
      >
        Связаться
      </Button>
      <Modal
        size="2xl"
        autoFocus={false}
        isOpen={isOpen}
        onClose={onCloseModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Heading
              color="brand.black"
              pt={4}
              as="h6"
              fontSize="3xl"
              fontWeight="medium"
            >
              Предложение о покупке техники
            </Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody pb={4}>
            <Grid gridTemplateColumns="1fr" gap={5}>
              <FormControl isRequired isInvalid={isNotVoid(nameError)}>
                <FormLabel>Наименование</FormLabel>
                <Input
                  isInvalid={isNotVoid(nameError)}
                  placeholder="Наименование техники"
                  value={form.name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      name: event.target.value,
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(nameError) && (
                  <FormErrorMessage>{nameError.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isNotVoid(yearManufacturedError)}>
                <FormLabel>Год выпуска</FormLabel>
                <Input
                  isInvalid={isNotVoid(yearManufacturedError)}
                  placeholder="Год выпуска"
                  value={form.year_manufactured}
                  maxLength={4}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      year_manufactured: event.target.value.replace(
                        /[^\d]+/g,
                        ""
                      ),
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(yearManufacturedError) && (
                  <FormErrorMessage>
                    {yearManufacturedError.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isNotVoid(priceError)}>
                <FormLabel>Цена предложения</FormLabel>
                <Input
                  isInvalid={isNotVoid(priceError)}
                  placeholder="Цена"
                  value={form.price}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      price: event.target.value.replace(/[^\d.,]+/g, ""),
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(priceError) && (
                  <FormErrorMessage>{priceError.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Валюта предложения</FormLabel>
                <Select
                  value={form.currency}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      currency: e.target.value,
                    });
                  }}
                  placeholder="Выберите валюту"
                  _placeholder={{ color: "red", background: "red" }}
                >
                  <option value="РУБ">РУБ</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </Select>
              </FormControl>
              <FormControl isRequired isInvalid={isNotVoid(contactInfoError)}>
                <FormLabel>Контактные данные</FormLabel>
                <Input
                  isInvalid={isNotVoid(contactInfoError)}
                  placeholder="Адрес"
                  value={form.contact_info}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      contact_info: event.target.value,
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(contactInfoError) && (
                  <FormErrorMessage>
                    {contactInfoError.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={isNotVoid(emailError)}>
                <FormLabel>Email</FormLabel>
                <Input
                  isInvalid={isNotVoid(emailError)}
                  placeholder="Email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      email: event.target.value,
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(emailError) && (
                  <FormErrorMessage>{emailError.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={isNotVoid(phoneError)}>
                <FormLabel>Телефон</FormLabel>
                <Input
                  isInvalid={isNotVoid(phoneError)}
                  placeholder="Телефон"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      phone: event.target.value.replace(/[^\d+()\s]+/g, ""),
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(phoneError) && (
                  <FormErrorMessage>{phoneError.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isNotVoid(descriptionError)}>
                <FormLabel>Описание</FormLabel>
                <Textarea
                  isInvalid={isNotVoid(descriptionError)}
                  placeholder="Описание"
                  value={form.description}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      description: event.target.value,
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(descriptionError) && (
                  <FormErrorMessage>
                    {descriptionError.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isNotVoid(phoneError)}>
                <FormLabel>Файлы</FormLabel>

                <Input
                  type="file"
                  py={1}
                  multiple
                  isInvalid={isNotVoid(phoneError)}
                  onFocus={() => setErrors(null)}
                  onChange={(event) =>
                    // @ts-ignore
                    setFiles([...event.target.files] as File[])
                  }
                />
                {isNotVoid(phoneError) && (
                  <FormErrorMessage>{phoneError.message}</FormErrorMessage>
                )}
              </FormControl>
              {isNotVoid(files) && (
                <Grid
                  flexWrap="wrap"
                  pos="relative"
                  gridTemplateColumns="1fr 1fr"
                  gap={2}
                >
                  {files.map((file) => (
                    <Flex
                      maxW="300px"
                      key={uuidv4()}
                      alignItems="center"
                      gap={3}
                      px={4}
                      py={3}
                      border="1px solid rgb(226, 232, 240)"
                      borderRadius="6px"
                    >
                      <FileIcon />
                      <chakra.span
                        display="-webkit-box"
                        style={{
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: "1",
                        }}
                        overflow="hidden"
                      >
                        {file.name}
                      </chakra.span>
                    </Flex>
                  ))}
                </Grid>
              )}
              <Flex flexDir="column" gap={2}>
                <Button
                  size="lg"
                  bgColor="brand.black"
                  color="white"
                  _hover={{ bgColor: "brand.black" }}
                  _focus={{ bgColor: "brand.black" }}
                  onClick={onClick}
                >
                  Отправить
                </Button>
                {locale === "ru" && (
                  <chakra.span fontSize="xs" color="brand.gray">
                    Нажимая на кнопку вы соглашаетесь с{" "}
                    <chakra.a
                      textDecor="underline"
                      href="/uploads/museum_privacy_policy_747e25d95e.pdf"
                      target="_blank"
                      _hover={{ color: "brand.green" }}
                    >
                      Политикой защиты и обработки персональных данных в ЧУК
                      «Музейный комплекс»
                    </chakra.a>
                  </chakra.span>
                )}
              </Flex>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
