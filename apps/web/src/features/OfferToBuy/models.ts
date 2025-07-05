import { Attachment } from "nodemailer/lib/mailer";
import { z } from "zod";

export interface OfferToBuyForm {
  name: string;
  year_manufactured: string;
  price: string;
  currency: string;
  contact_info: string;
  email: string;
  phone: string;
  description: string;
}

export const initalForm: OfferToBuyForm = {
  name: "",
  year_manufactured: "",
  price: "",
  currency: "",
  contact_info: "",
  email: "",
  phone: "",
  description: "",
};

export const OfferToBuyFormSchema = z.object({
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

export interface SendOfferToEmailPayload {
  name: string;
  message: string;
  files?: Attachment[];
}
