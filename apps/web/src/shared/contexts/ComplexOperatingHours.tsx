import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

import { ApiResponse, StrapiSpecialDay, StrapiWorkingTime } from "../models";
import { checkComplexOperatingHours } from "../utils/dates";
import { isNotVoid } from "../utils";

export type ComplexOperationManagement = {
  common_operating_hours: StrapiWorkingTime[];
  special_days_operating_hours: StrapiSpecialDay[]
}

async function getComplexOperationManagement(): Promise<ApiResponse<ComplexOperationManagement, null>> {
  const res = await fetch(`/api/complex-operation-management`);

  return res.json()
}

type ComplextOperatingHoursContextType = {
  isOpened?: boolean
};

const ComplextOperatingHoursContext = createContext<ComplextOperatingHoursContextType | null>(null);

export const ComplextOperatingHoursProvider = ({children}: {children: React.ReactNode}) => {
  const [value, setValue] = useState<ComplextOperatingHoursContextType>({
    isOpened: undefined
  });

  const { data: response, isLoading, isError, isSuccess } = useQuery(
    {
      queryKey: [`complex-operation-hours`],
      queryFn: () => getComplexOperationManagement(),
      refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      setValue({
        isOpened: true
      })
    }

    if (isSuccess && isNotVoid(response.data)) {
      const isOpened = checkComplexOperatingHours(response.data.special_days_operating_hours);

      setValue({
        isOpened
      })
    }
  }, [isError, isSuccess, response?.data]);

  return <ComplextOperatingHoursContext.Provider value={value}>{children}</ComplextOperatingHoursContext.Provider>
}

export function useComplextOperatingHours() {
  const context = useContext(ComplextOperatingHoursContext)

  if (context === undefined) {
    throw new Error(`useComplextOperatingHours must be used within a ComplextOperatingHoursContext`)
  }

  return context;
}