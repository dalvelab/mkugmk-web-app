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
};

const ComplextOperatingHoursContext =
  createContext<ComplextOperatingHoursContextType | null>(null);

export const ComplextOperatingHoursProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState<ComplextOperatingHoursContextType>({
    isOpened: undefined,
    special_day_operating_hours: undefined,
  });

  const {
    data: response,
    isLoading,
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
      });
    }
  }, [isError, isSuccess, response?.data]);

  return (
    <ComplextOperatingHoursContext.Provider value={value}>
      {children}
    </ComplextOperatingHoursContext.Provider>
  );
};

export function useComplextOperatingHours() {
  const context = useContext(ComplextOperatingHoursContext);

  if (context === undefined) {
    throw new Error(
      `useComplextOperatingHours must be used within a ComplextOperatingHoursContext`
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
