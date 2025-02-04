import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

import {
  ApiResponse,
  StrapiSpecialDay,
  StrapiWorkingTime,
  WeekDay,
} from "../models";
import { checkComplexOperatingHours } from "../utils/dates";
import { isNotEmpty, isNotVoid } from "../utils";

export type ComplexOperationManagement = {
  common_operating_hours: StrapiWorkingTime[];
  special_days_operating_hours: StrapiSpecialDay[];
  website_top_warning?: string;
};

async function getComplexOperationManagement(
  locale?: string
): Promise<ApiResponse<ComplexOperationManagement, null>> {
  const res = await fetch(`/api/complex-operation-management?locale=${locale}`);

  return res.json();
}

type ComplextOperatingHoursContextType = {
  dayOfWeek: number;
  isOpened?: boolean;
  current_special_day_operating_hours?: StrapiWorkingTime[];
  special_days_operating_hours: StrapiSpecialDay[];
  exhibition_centers_including_special_day?: number[];
  website_top_warning?: string;
  common_operating_hours?: StrapiWorkingTime[];
};

const ComplexOperationManagementContext =
  createContext<ComplextOperatingHoursContextType | null>(null);

export const ComplexOperationManagementProvider = ({
  children,
  locale,
}: {
  locale?: string;
  children: React.ReactNode;
}) => {
  const dayOfWeek = new Date(
    new Date().toLocaleString("en", { timeZone: "Asia/Yekaterinburg" })
  ).getDay();

  const [value, setValue] = useState<ComplextOperatingHoursContextType>({
    dayOfWeek,
    special_days_operating_hours: [],
  });

  const {
    data: response,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`complex-operation-hours-${locale}`],
    queryFn: () => getComplexOperationManagement(locale),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      setValue({
        isOpened: true,
        dayOfWeek,
        special_days_operating_hours: [],
      });
    }

    if (isSuccess && isNotVoid(response.data)) {
      const { isAvailable, day } = checkComplexOperatingHours(
        response.data.special_days_operating_hours
      );

      const exhibitionCenterSelected =
        isNotVoid(day) &&
        isNotVoid(day.exhibition_centers) &&
        isNotEmpty(day.exhibition_centers);

      setValue({
        isOpened: isAvailable,
        current_special_day_operating_hours: isNotVoid(day)
          ? createFakeScheduleForSpecialDay(day)
          : undefined,
        exhibition_centers_including_special_day: exhibitionCenterSelected
          ? day?.exhibition_centers?.map((center) => center.id)
          : undefined,
        website_top_warning: response.data.website_top_warning,
        dayOfWeek,
        common_operating_hours: response.data.common_operating_hours,
        special_days_operating_hours:
          response.data.special_days_operating_hours,
      });
    }
  }, [dayOfWeek, isError, isSuccess, response?.data]);

  return (
    <ComplexOperationManagementContext.Provider value={value}>
      {children}
    </ComplexOperationManagementContext.Provider>
  );
};

export function useComplexOperationManagement() {
  const context = useContext(ComplexOperationManagementContext);

  if (context === undefined) {
    throw new Error(
      `useComplexOperationManagement must be used within a ComplexOperationManagementContext`
    );
  }

  return context;
}

function createFakeScheduleForSpecialDay(special_day: StrapiSpecialDay) {
  const weekDays: WeekDay[] = [
    "mon",
    "tue",
    "wed",
    "thurs",
    "fri",
    "sat",
    "sun",
  ];

  const workingSchedule: StrapiWorkingTime[] = [];

  for (let i = 0; i < weekDays.length; i++) {
    const workingDay = {
      ...special_day,
      day: weekDays[i],
    };

    workingSchedule.push(workingDay);
  }

  return workingSchedule;
}
