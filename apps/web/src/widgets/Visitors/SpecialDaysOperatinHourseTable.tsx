import { ComplexOperationManagement } from "@/entities";
import { getGenetiveRusMonth } from "@/shared/utils/dates";
import { chakra, Flex, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";

interface SpecialDaysOperatinHourseTableProps {
  data: ComplexOperationManagement["special_days_operating_hours"];
}

export const SpecialDaysOperatinHourseTable: React.FC<SpecialDaysOperatinHourseTableProps> = ({data}) => {
  return (
    <TableContainer w="400px">
      <Table
        mt={5}
        border="1px solid" 
        borderColor="brand.border"
      >
        <Tbody>
          {data.map(({id, day, value, opened}) => (
            <Tr key={id}>
              <Td px={5} py={3} border="1px solid" borderColor="brand.border">
                <Flex justify="space-between">
                  <chakra.span fontSize="lg">
                    {Number(day.substring(8, 10))} {" "}
                    {getGenetiveRusMonth(Number(day.substring(5, 7)))}
                  </chakra.span>
                  <chakra.span fontSize="lg" color={opened ? 'brand.black' : 'red.500'}>{value.toLowerCase()}</chakra.span>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}