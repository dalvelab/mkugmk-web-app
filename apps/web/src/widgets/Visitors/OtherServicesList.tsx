import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { chakra, Container, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import type { VisitorsPages } from "@/entities"
import { isNotVoid, Markdown } from "@/shared";

interface OtherServicesListProps {
  other_services: VisitorsPages["tickets_page"]["other_services"];
}

export const OtherServicesList: React.FC<OtherServicesListProps> = ({other_services}) => {
  const t = useTranslations("Tickets_page");

  const [activeId, setActiveId] = useState<number>(other_services[0].id);

  const tableRef = useRef<HTMLDivElement | undefined>();

  function onClick(id: number) {
    setActiveId(id);

    if (isNotVoid(tableRef.current)) {
      window.scrollTo({top: tableRef.current.offsetTop - 100, behavior: 'smooth'})
    }
  }

  const activeService = other_services.find((service) => service.id === activeId);

  return (
    <chakra.section pb={10}>
      <Container maxW="container.xl">
        <Flex
          gap={5}
          alignItems="flex-start"
          flexDir={["column", "column", "column", "row", "row"]}
        >
          <Flex
            minW="340px"
            maxW="390px"
            w={["100%", "auto", "auto", "auto", "auto"]}
            flexDir="column"
            py={3}
            px={5}
            border="1px solid" 
            borderColor="brand.border"
            borderRadius={8}
            color="brand.black"
            gap={3}
          >
            <chakra.span fontSize="xl" fontWeight="semibold">
              {t("type_of_service")}
            </chakra.span>
            <Flex flexDir="column" gap={1}>
              {other_services.map((button) => (
                <chakra.button
                  key={button.id}
                  py={3}
                  px={4}
                  backgroundColor={button.id === activeId ? "#F4F4F5" : "white"}
                  _hover={{bgColor: "#F4F4F5"}}
                  borderRadius={8}
                  onClick={() => onClick(button.id)}
                >
                  <Flex flexDir="column" alignItems="flex-start" gap={0.5}>
                    <chakra.span whiteSpace="pre-wrap" textAlign="left">{button.name}</chakra.span>
                    {isNotVoid(button.caption) ? 
                      <chakra.span
                        fontSize="xs"
                        noOfLines={1}
                        textOverflow="ellipsis"
                        color='brand.gray'>
                          {button.caption}
                      </chakra.span> : null
                    }
                  </Flex>
                </chakra.button>
              ))}
            </Flex>
          </Flex>
          {/* @ts-ignore */}
          <TableContainer ref={tableRef} w="100%">
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
                    {t("price")}
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
                    {t("info")}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {isNotVoid(activeService) && (
                  <Tr>
                    <Td
                      w="50%"
                      minW="280px"
                      px={5} 
                      border="1px solid" 
                      borderColor="brand.border" 
                      verticalAlign="top"
                    >
                      <Flex flexDir="column" gap={6} textAlign="justify">
                        <Markdown>
                          {activeService.value}
                        </Markdown>
                      </Flex>
                    </Td>
                    {isNotVoid(activeService.additional_text) && (
                      <Td
                        w="50%"
                        minW="300px"
                        px={5}
                        border="1px solid" 
                        borderColor="brand.border" 
                        verticalAlign="top"
                        textAlign="justify"
                      >
                        <Markdown>
                          {activeService.additional_text}
                        </Markdown>
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