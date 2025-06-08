import {
  isEmpty,
  isNotEmpty,
  isNotVoid,
  isVoid,
  StrapiSpecialDay,
} from "@/shared";
import { getGenetiveRusMonth } from "@/shared/utils/dates";
import { chakra, Flex, Table } from "@chakra-ui/react";

interface SpecialDaysOperatinHourseTableProps {
  data: StrapiSpecialDay[];
}

export const SpecialDaysOperatinHourseTable: React.FC<
  SpecialDaysOperatinHourseTableProps
> = ({ data }) => {
  return (
    <Table.Root w="500px" mt={5} border="1px solid" borderColor="brand.border">
      <Table.Body>
        {data.map(({ id, day, value, opened, exhibition_centers }) => (
          <Table.Row key={id}>
            <Table.Cell
              px={5}
              py={3}
              border="1px solid"
              borderColor="brand.border"
            >
              <Flex justifyContent="space-between" gap={5} alignItems="center">
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
                            <chakra.span
                              whiteSpace="break-spaces"
                              fontSize="sm"
                              fontWeight="medium"
                            >
                              {center.name}
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
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
