import { StrapiWorkingTime, StrapiSpecialDay } from "@/shared";

export type ComplexOperationManagement = {
  common_operating_hours: StrapiWorkingTime[];
  special_days_operating_hours: StrapiSpecialDay[];
};
