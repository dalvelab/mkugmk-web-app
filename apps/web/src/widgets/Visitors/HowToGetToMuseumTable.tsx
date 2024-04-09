import { chakra, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import type { VisitorsPages } from "@/entities";
import { isNotVoid, type StrapiWorkingTime } from "@/shared";

interface HowToGetToMuseumTableProps {
  title: string;
  data: VisitorsPages["navigation_page"]["how_to_get_to_museum"];
}

export const HowToGetToMuseumTable: React.FC<HowToGetToMuseumTableProps> = ({ data, title }) => {
  return (
    <TableContainer>
      <Table
        mt={5}
        border="1px solid" 
        borderColor="brand.border"
      >
        <Thead>
          <Tr>
            <Th
              fontSize={["lg", "xl", "xl", "xl", "xl"]}
              textTransform="none"
              color="brand.black"
              fontWeight="medium"
              px={5}
              py={5}
              whiteSpace="pre-wrap"
              lineHeight="1.3"
            >
              {title}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((info) => (
            <Tr key={info.id}>
              <Td
                minW="500px"
                px={5}
                py={5}
              >
                <Flex justifyContent="space-between" gap={10}>
                  <Flex flexDir="column" gap={1} alignItems="flex-start">
                    <chakra.span 
                      fontSize="lg"
                      whiteSpace={["no-wrap", "no-wrap", "pre-wrap", "pre-wrap", "pre-wrap"]}
                    >
                      {info.name}
                    </chakra.span>
                    {isNotVoid(info.caption) ? 
                      <chakra.span
                        fontSize="sm"
                        maxW="300px"
                        color="brand.gray"
                        whiteSpace="pre-wrap"
                      >
                        {info.caption}
                      </chakra.span> : 
                      null}
                  </Flex>
                  <chakra.span fontSize="lg">
                    {info.value}
                  </chakra.span>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}