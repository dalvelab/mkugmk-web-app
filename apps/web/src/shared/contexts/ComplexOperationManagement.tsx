import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

import {
  ApiResponse,
  StrapiSpecialDay,
  StrapiWorkingTime,
  WeekDay,
} from "../models";
import { checkComplexOperatingHours } from "../utils/dates";
import { isNotVoid } from "../utils";

export type ComplexOperationManagement = {
  common_operating_hours: StrapiWorkingTime[];
  special_days_operating_hours: StrapiSpecialDay[];
  website_top_warning?: string;
};

async function getComplexOperationManagement(): Promise<
  ApiResponse<ComplexOperationManagement, null>
> {
  const res = await fetch(`/api/complex-operation-management`);

  return res.json();
}

type ComplextOperatingHoursContextType = {
  isOpened?: boolean;
  special_day_operating_hours?: StrapiWorkingTime[];
  website_top_warning?: string;
};

const ComplexOperationManagementContext =
  createContext<ComplextOperatingHoursContextType | null>(null);

export const ComplexOperationManagementProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<ComplextOperatingHoursContextType>({});

  const {
    data: response,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [`complex-operation-hours`],
    queryFn: () => getComplexOperationManagement(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      setValue({
        isOpened: true,
      });
    }

    if (isSuccess && isNotVoid(response.data)) {
      const { isAvailable, day } = checkComplexOperatingHours(
        response.data.special_days_operating_hours
      );

      setValue({
        isOpened: isAvailable,
        special_day_operating_hours: isNotVoid(day)
          ? createFakeScheduleForSpecialDay(day)
          : undefined,
        website_top_warning: response.data.website_top_warning,
      });
    }
  }, [isError, isSuccess, response?.data]);

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
