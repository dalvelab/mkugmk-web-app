import { StrapiWorkingTime } from "@/shared"

export type ComplexOperationManagement = {
  common_operating_hours: StrapiWorkingTime[];
  special_days_operating_hours: {
    id: number;
    value: string;
    day: string;
    opened: string;
  }[]
}