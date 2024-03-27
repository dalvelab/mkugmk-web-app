import { StrapiWorkingTime } from "@/shared"

export type ComplexOperationManagement = {
  common_operating_hours: StrapiWorkingTime[];
  special_days_operating_hours: {
    time: string;
    day: Date;
    opened: string;
  }[]
}