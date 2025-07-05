import { useRef, useState } from "react";
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
  Grid,
  Select,
  Box,
  Text,
  IconButton,
  FormHelperText,
} from "@chakra-ui/react";
import { z } from "zod";
import { FileIcon, isEmpty, isNotEmpty, isNotVoid, isVoid } from "@/shared";
import { useMutation } from "@tanstack/react-query";

import { DeleteIcon } from "@chakra-ui/icons";
import { sendOfferToBuyEmailRequest } from "./api";
import { initalForm, OfferToBuyFormSchema } from "./models";
import {
  formatFilesToSendEmail,
  formatOfferToBuyMessage,
  getFileExtension,
} from "./utils";

const MAX_FILES_SIZE = 1024 * 1024 * 25; // 25 MB
const VALID_FORMATS = ["gif", "bmp", "png", "jpg", "jpeg", "pdf"];

export const OfferToBuy: React.FC = () => {
  const { locale } = useRouter();
  const toast = useToast();

  const t = useTranslations("Footer");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState(initalForm);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<{ file: File; id: string }[] | null>(null);
  const [filesError, setFilesError] = useState<string | null>(null);
  const [errors, setErrors] = useState<z.ZodError<
    z.infer<typeof OfferToBuyFormSchema>
  > | null>(null);

  const fileInput = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation({
    mutationFn: sendOfferToBuyEmailRequest,
    onSuccess: () => {
      toast({
        title: "Успешно!",
        status: "success",
        duration: 2500,
        position: "top-right",
        isClosable: true,
      });
      setFiles(null);
      setForm(initalForm);
      setLoading(false);
      onClose();
    },
    onError: () => {
      setLoading(false);
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

  async function onClick() {
    const result = OfferToBuyFormSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error);

      return;
    }

    // Обработка для файлов отдельно от обычных полей
    if (isNotVoid(filesError) && isNotEmpty(files)) {
      return;
    }

    setLoading(true);
    setFilesError(null);

    const attachedFiles = files ? files.map(({ file }) => file) : undefined;

    const message = formatOfferToBuyMessage(form);
    const attachments = await formatFilesToSendEmail(attachedFiles);

    mutation.mutate({ message, files: attachments, name: form.name });
  }

  const resetErrors = () => {
    setErrors(null);
    setFilesError(null);
  };

  function onCloseModal() {
    onClose();
    setErrors(null);
    setForm(initalForm);
    setFiles([]);
    setFilesError(null);
  }

  const processFiles = (files: File[]) => {
    setFiles([]);
    fileInput.current?.blur();

    if (files.length > 10) {
      setFilesError("Можно приложить максимум 10 файлов");
      return;
    }

    const filesSize = files
      .map((file) => file.size)
      .reduce((acc, prev) => acc + prev, 0);

    if (filesSize > MAX_FILES_SIZE) {
      setFilesError("Превышен лимит на размер файлов");
      return;
    }

    let isValidExtensions = true;

    files.forEach((file) => {
      const extension = getFileExtension(file.name);

      if (!VALID_FORMATS.includes(extension)) {
        isValidExtensions = false;
        return;
      }
    });

    if (!isValidExtensions) {
      setFilesError(
        `Невалидный формат файла. Разрешены только ${VALID_FORMATS.reduce(
          (acc, val) => acc + ", " + val
        )}`
      );
      return;
    }

    const filesWithId = files.map((file) => {
      return {
        id: uuidv4(),
        file,
      };
    });

    setFiles(filesWithId);
  };

  const deleteFile = (id: string) => {
    if (isVoid(files) && isEmpty(files)) {
      return;
    }

    const index = files.findIndex((file) => file.id === id);

    const filesCopy = [...files];
    filesCopy.splice(index, 1);

    setFiles(filesCopy);
  };

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
        size={["full", "full", "2xl", "2xl", "2xl"]}
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
                  onFocus={resetErrors}
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
                  onFocus={resetErrors}
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
                  onFocus={resetErrors}
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
                  onFocus={resetErrors}
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
                  onFocus={resetErrors}
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
                  onFocus={resetErrors}
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
                  onFocus={resetErrors}
                />
                {isNotVoid(descriptionError) && (
                  <FormErrorMessage>
                    {descriptionError.message}
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={isNotVoid(filesError)}>
                <FormLabel>Файлы</FormLabel>
                <Box
                  role="button"
                  pos="relative"
                  border="1px solid rgb(226, 232, 240)"
                  borderRadius="6px"
                  h={20}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  cursor="pointer"
                  _focusWithin={{
                    borderColor: "#3182ce;",
                    boxShadow: "0 0 0 1px #3182ce;",
                  }}
                >
                  <Text color="gray.500">Выберите файлы</Text>
                  <Input
                    opacity={0}
                    h="inherit"
                    ref={fileInput}
                    position="absolute"
                    cursor="pointer"
                    type="file"
                    py={1}
                    multiple
                    onFocus={resetErrors}
                    onChange={(event) =>
                      // @ts-ignore
                      processFiles([...event.target.files] as File[])
                    }
                  />
                </Box>
                <FormHelperText>
                  максимум 10 шт, общий размер не более 25МБ
                </FormHelperText>
                {isNotVoid(filesError) && (
                  <FormErrorMessage>{filesError}</FormErrorMessage>
                )}
              </FormControl>
              {isNotVoid(files) && (
                <Grid
                  flexWrap="wrap"
                  pos="relative"
                  gridTemplateColumns="1fr 1fr"
                  gap={2}
                >
                  {files.map(({ id, file }) => (
                    <Flex
                      maxW="300px"
                      key={id}
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
                      <IconButton
                        ml="auto"
                        size="sm"
                        bgColor="transparent"
                        color="brand.gray"
                        icon={<DeleteIcon boxSize={4} />}
                        aria-label="удалить выбранный центр"
                        _hover={{
                          bgColor: "brand.border",
                          color: "brand.black",
                        }}
                        onClick={() => deleteFile(id)}
                      />
                    </Flex>
                  ))}
                </Grid>
              )}
              <Flex flexDir="column" gap={2}>
                <Button
                  size="lg"
                  bgColor="brand.black"
                  isLoading={loading}
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
