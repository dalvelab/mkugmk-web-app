import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import {
  chakra,
  Button,
  Dialog,
  useDisclosure,
  Heading,
  Flex,
  Field,
  Input,
  Textarea,
  ButtonProps,
} from "@chakra-ui/react";
import { z } from "zod";
import { isNotVoid } from "@/shared";
import { useMutation } from "@tanstack/react-query";
import { sendEmailRequest } from "../SendEmail";
import { Toaster, toaster } from "@/shared/components/toaster";

const FormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z.string().min(1, "Телефон должен быть указан"),
  message: z.string().min(1, "Сообщение не может быть пустым"),
});

const initalForm = {
  name: "",
  phone: "",
  message: "",
};

interface OrderCallProps {
  buttonStyles?: ButtonProps["css"];
}

export const OrderCall: React.FC<OrderCallProps> = ({ buttonStyles }) => {
  const { locale } = useRouter();

  const t = useTranslations("Footer");

  const { open, onOpen, onClose } = useDisclosure();

  const [form, setForm] = useState(initalForm);
  const [errors, setErrors] = useState<z.ZodError<
    z.infer<typeof FormSchema>
  > | null>(null);

  const mutation = useMutation({
    mutationFn: sendEmailRequest,
    onSuccess: () => {
      toaster.create({
        title: "Успешно!",
        type: "success",
        duration: 2500,
        closable: true,
      });
      setForm(initalForm);
      onClose();
    },
    onError: () => {
      setForm(initalForm);

      toaster.error({
        title: "Произошла ошибка.",
        description: "Попробуйте позже",
        type: "error",
        duration: 2500,
        closable: true,
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
      message: `Заказ звонка с сайта. \n Имя: ${form.name}\n Телефон: ${form.phone}\n Сообщение: ${form.message}`,
    });
  }

  function onCloseModal() {
    onClose();
    setErrors(null);
    setForm(initalForm);
  }

  const nameError = errors?.issues.find((issue) => issue.path.includes("name"));
  const phoneError = errors?.issues.find((issue) =>
    issue.path.includes("phone")
  );
  const messageError = errors?.issues.find((issue) =>
    issue.path.includes("message")
  );

  return (
    <>
      <Dialog.Root
        size={["full", "lg", "lg", "lg", "lg"]}
        open={open}
        onOpenChange={onCloseModal}
      >
        <Dialog.Trigger asChild>
          <Button
            onClick={onOpen}
            variant="ghost"
            fontWeight="regular"
            css={buttonStyles}
            _hover={{ textDecor: "underline" }}
          >
            {t("order_call")}
          </Button>
        </Dialog.Trigger>
        <Toaster />
        <Dialog.Backdrop />
        <Dialog.Content>
          <Dialog.Header>
            <Heading
              color="brand.black"
              pt={4}
              as="h6"
              fontSize="3xl"
              fontWeight="medium"
            >
              {t("order_call")}
            </Heading>
          </Dialog.Header>
          <Dialog.Body pb={4}>
            <Flex flexDir="column" gap={5}>
              <chakra.span>
                Вы можете по телефону:{" "}
                <chakra.a
                  textDecor="underline"
                  href="tel:+73436847511"
                  target="_blank"
                >
                  +7 (34368) 4-75-11
                </chakra.a>{" "}
                <br /> Или заказать обратный звонок
              </chakra.span>
              <Field.Root required invalid={isNotVoid(nameError)}>
                <Field.Label>{t("order_call_modal_form_name")}</Field.Label>
                <Input
                  placeholder={t("order_call_modal_form_name")}
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
                  <Field.ErrorText>{nameError.message}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root required invalid={isNotVoid(phoneError)}>
                <Field.Label>{t("order_call_modal_form_phone")}</Field.Label>
                <Input
                  placeholder={t("order_call_modal_form_phone")}
                  value={form.phone}
                  maxLength={12}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      phone: event.target.value.replace(/[^\d.+]+/g, ""),
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(phoneError) && (
                  <Field.ErrorText>{phoneError.message}</Field.ErrorText>
                )}
              </Field.Root>
              <Field.Root required invalid={isNotVoid(messageError)}>
                <Field.Label>{t("order_call_modal_form_message")}</Field.Label>
                <Textarea
                  placeholder={t("order_call_modal_form_message")}
                  value={form.message}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      message: event.target.value,
                    })
                  }
                  onFocus={() => setErrors(null)}
                />
                {isNotVoid(messageError) && (
                  <Field.ErrorText>{messageError.message}</Field.ErrorText>
                )}
              </Field.Root>
              <Button
                bgColor="brand.black"
                color="white"
                _hover={{ bgColor: "brand.black" }}
                _focus={{ bgColor: "brand.black" }}
                onClick={onClick}
              >
                {t("order_call")}
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
                  </chakra.a>{" "}
                  и подтверждаете, что ознакомлены и согласны с{" "}
                  <chakra.a
                    textDecor="underline"
                    href="/visitors/rules"
                    _hover={{ color: "brand.green" }}
                  >
                    Правилами посещения музейного комплекса
                  </chakra.a>
                </chakra.span>
              )}
            </Flex>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
