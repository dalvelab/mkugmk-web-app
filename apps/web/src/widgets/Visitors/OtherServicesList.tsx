import { useRef, useState } from "react";

import { Button, chakra, Container, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import type { VisitorsPages } from "@/entities"
import { isNotEmpty, isNotVoid } from "@/shared";

interface OtherServicesListProps {
  other_services: VisitorsPages["tickets_page"]["other_services"];
}

export const OtherServicesList: React.FC<OtherServicesListProps> = ({other_services}) => {
  const [activeId, setActiveId] = useState<number>(other_services[0].id);

  const tableRef = useRef<HTMLDivElement | undefined>();

  function onClick(id: number) {
    setActiveId(id);
    window.scrollTo({top: tableRef.current?.scrollTop, behavior: 'smooth'})
  }

  const activeService = other_services.find((service) => service.id === activeId);

  return (
    <chakra.section>
      <Container maxW="container.xl">
        <Flex gap={5} alignItems="flex-start">
          <Flex
            flexDir="column"
            py={3}
            px={5}
            border="1px solid" 
            borderColor="brand.border"
            borderRadius={8}
            color="brand.black"
            gap={3}
          >
            <chakra.span fontSize="xl" fontWeight="semibold">Вид площадки</chakra.span>
            <Flex flexDir="column" gap={1}>
              {other_services.map((button) => (
                <Button
                  key={button.id}
                  py={6}
                  variant="ghost"
                  backgroundColor={button.id === activeId ? "#F4F4F5" : "white"}
                  fontWeight="regular"
                  _hover={{bgColor: "#F4F4F5"}}
                  justifyContent="flex-start"
                  onClick={() => onClick(button.id)}
                >
                  {button.name}
                </Button>
              ))}
            </Flex>
          </Flex>
          {/* @ts-ignore */}
          <TableContainer ref={tableRef} w="800px">
            <Table
              border="1px solid" 
              borderColor="brand.border"
            >
              <Thead>
                <Tr>
                  <Th
                    w="50%"
                    fontSize="xl"
                    textTransform="none"
                    color="brand.black"
                    px={5}
                    py={5}
                    fontWeight="semibold"
                  >
                    Категория
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
                    fontWeight="semibold"
                  >
                    Примечание
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {isNotVoid(activeService) && (
                  <Tr>
                    <Td w="50%" px={5} border="1px solid" borderColor="brand.border" verticalAlign="top">
                      <Flex flexDir="column" gap={6}>
                        <chakra.span >{activeService.name} руб.</chakra.span>
                      </Flex>
                    </Td>
                    {isNotEmpty(activeService.additional_text) && (
                      <Td w="50%" px={5} border="1px solid" borderColor="brand.border" verticalAlign="top">
                        <chakra.span whiteSpace="pre-wrap">{activeService.additional_text}</chakra.span>
                      </Td>
                    )}
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Container>
    </chakra.section>
  )
}