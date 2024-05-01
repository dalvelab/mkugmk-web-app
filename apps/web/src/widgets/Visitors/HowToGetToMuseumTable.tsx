import { Button, chakra, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import type { VisitorsPages } from "@/entities";
import { isNotVoid, Markdown } from "@/shared";

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
                        <Markdown>{info.caption}</Markdown>
                      </chakra.span> : 
                      null}
                      {info.type === 'other' && (
                      <chakra.a href="https://yandex.ru/maps/-/CDRhq0lT" target="_blank">
                        <Button mt={4} bg="brand.black" color="white" _hover={{bgColor: 'brand.black'}}>
                          Проложить маршрут
                        </Button>
                      </chakra.a>
                    )}
                  </Flex>
                  <Flex flexDir="column" gap={5}>
                    <chakra.span fontSize="lg">
                      {info.value}
                    </chakra.span>
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}