import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

import {
  chakra,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import {
  createWorkingSchedule,
  getWorkingHoursForToday,
} from "@/shared/utils/dates";
import { StrapiWorkingTime, useComplextOperatingHours } from "@/shared";

interface OperatingHoursProps {
  data: {
    id: number;
    working_time: StrapiWorkingTime[];
    name: string;
  }[];
}

export const OperatingHoursTable: React.FC<OperatingHoursProps> = ({
  data,
}) => {
  const { locale } = useRouter();

  const t = useTranslations("Working_hours_page");
  const complexOperatingSettings = useComplextOperatingHours();

  const dayOfWeek = new Date(
    new Date().toLocaleString("en", { timeZone: "Asia/Yekaterinburg" })
  ).getDay();

  return (
    <TableContainer maxW="800px">
      <Table mt={5} border="1px solid" borderColor="brand.border">
        <Thead>
          <Tr>
            <Th
              w="50%"
              fontSize="xl"
              textTransform="none"
              color="brand.black"
              px={5}
              py={5}
            >
              {t("centers")}
            </Th>
            <Th
              w="50%"
              fontSize="xl"
              textTransform="none"
              color="brand.black"
              px={5}
              py={5}
              border="1px solid"
              borderColor="brand.border"
            >
              {t("operating_hours")}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(({ id, name, working_time }) => {
            const formattedSchedule = createWorkingSchedule(
              working_time,
              locale
            );
            const workTimeToday = getWorkingHoursForToday({
              data: working_time,
              dayOfWeek,
              locale,
              isSpecialDayToday: complexOperatingSettings?.isOpened,
            });

            return (
              <Tr key={id}>
                <Td
                  w="50%"
                  px={5}
                  py={5}
                  border="1px solid"
                  borderColor="brand.border"
                >
                  <Flex flexDir="column" alignItems="flex-start" gap={1}>
                    <chakra.span fontSize="lg" fontWeight="medium">
                      {name}
                    </chakra.span>
                    <chakra.span fontSize="sm" color="brand.gray">
                      {workTimeToday.value}
                    </chakra.span>
                  </Flex>
                </Td>
                <Td
                  w="50%"
                  px={5}
                  py={5}
                  border="1px solid"
                  borderColor="brand.border"
                >
                  <Flex flexDir="column" gap={2}>
                    {formattedSchedule.map(
                      ({ id, day, opened, value }, index) => (
                        <Flex
                          key={id}
                          justifyContent="space-between"
                          color="brand.black"
                          gap={4}
                        >
                          <chakra.span>{day}</chakra.span>
                          <chakra.span
                            color={opened ? "brand.black" : "red.500"}
                            whiteSpace="pre-wrap"
                            textAlign="right"
                          >
                            {value}
                          </chakra.span>
                        </Flex>
                      )
                    )}
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
