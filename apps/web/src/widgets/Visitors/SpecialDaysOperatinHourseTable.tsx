import { ComplexOperationManagement } from "@/entities";
import { isEmpty, isNotEmpty, isNotVoid, isVoid } from "@/shared";
import { getGenetiveRusMonth } from "@/shared/utils/dates";
import {
  chakra,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

interface SpecialDaysOperatinHourseTableProps {
  data: ComplexOperationManagement["special_days_operating_hours"];
}

export const SpecialDaysOperatinHourseTable: React.FC<
  SpecialDaysOperatinHourseTableProps
> = ({ data }) => {
  return (
    <TableContainer w="500px">
      <Table mt={5} border="1px solid" borderColor="brand.border">
        <Tbody>
          {data.map(({ id, day, value, opened, exhibition_centers }) => (
            <Tr key={id}>
              <Td px={5} py={3} border="1px solid" borderColor="brand.border">
                <Flex
                  justifyContent="space-between"
                  gap={5}
                  alignItems="center"
                >
                  <Flex flexDir="column" gap={2} w="full">
                    <chakra.span fontSize="lg" fontWeight="bold">
                      {Number(day.substring(8, 10))}{" "}
                      {getGenetiveRusMonth(Number(day.substring(5, 7)))}
                    </chakra.span>
                    {isNotVoid(exhibition_centers) &&
                      isNotEmpty(exhibition_centers) && (
                        <Flex flexDir="column" gap={3}>
                          {exhibition_centers?.map((center) => (
                            <Flex
                              key={center.id}
                              justifyContent="space-between"
                              gap={2}
                            >
                              <chakra.span fontSize="sm" fontWeight="medium">
                                {center.name}:
                              </chakra.span>
                              <chakra.span
                                fontSize="lg"
                                color={opened ? "brand.black" : "red.500"}
                              >
                                {value.toLowerCase()}
                              </chakra.span>
                            </Flex>
                          ))}
                        </Flex>
                      )}
                  </Flex>
                  {isVoid(exhibition_centers) ||
                    (isEmpty(exhibition_centers) && (
                      <chakra.span
                        fontSize="lg"
                        color={opened ? "brand.black" : "red.500"}
                      >
                        {value.toLowerCase()}
                      </chakra.span>
                    ))}
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
