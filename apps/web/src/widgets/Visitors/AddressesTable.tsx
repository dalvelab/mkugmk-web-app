import { chakra, Flex, Table, TableContainer, Tbody, Td, Tr } from "@chakra-ui/react";

interface AddressesTableProps {
  data: {
    id: number;
    name: string;
    address: string;
  }[]
}

export const AddressesTable: React.FC<AddressesTableProps> = ({data}) => {
  return (
    <TableContainer w={["100%", "100%", "85%", "600px", "600px"]}>
      <Table
        mt={5}
        border="1px solid" 
        borderColor="brand.border"
      >
        <Tbody>
          {data.map(({id, name, address}) => (
            <Tr key={id}>
              <Td
                minW="300px"
                px={5}
                py={5}
                border="1px solid" 
                borderColor="brand.border" 
                color="brand.black" 
                fontSize={["lg", "xl", "xl", "xl", "xl"]}
                fontWeight="medium"
                whiteSpace="pre-wrap"
              >
                {name}
              </Td>
              <Td
                minW="400px"
                w="50%"
                px={5}
                py={5}
                border="1px solid" 
                borderColor="brand.border" 
                color="brand.gray" 
                fontSize="md"
                lineHeight="1.5"
              >
                <chakra.span maxW="300px" whiteSpace="pre-wrap">
                  {address}
                </chakra.span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}