import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

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

import { createWorkingSchedule } from "@/shared/utils/dates";
import { Markdown, StrapiWorkingTime } from "@/shared";

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
          {data.map(({ name, working_time }) => {
            const formattedSchedule = createWorkingSchedule(
              working_time,
              locale
            );

            return (
              <Tr key={uuidv4()}>
                <Td
                  w="50%"
                  px={5}
                  py={5}
                  border="1px solid"
                  borderColor="brand.border"
                >
                  <chakra.span fontSize="lg" fontWeight="medium">
                    <Markdown>{name}</Markdown>
                  </chakra.span>
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
