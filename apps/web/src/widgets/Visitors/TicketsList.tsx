import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, chakra, Container, Flex, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"

import type { VisitorsPages } from "@/entities"
import { isNotEmpty, isNotVoid } from "@/shared";
import Link from "next/link";

interface TicketsListProps {
  tickets: VisitorsPages["tickets_page"]["tickets"];
}

export const TicketsList: React.FC<TicketsListProps> = ({tickets}) => {
  const t = useTranslations("Tickets_page");

  const [activeId, setActiveId] = useState<number>(tickets[0].id);

  const tableRef = useRef<HTMLDivElement | undefined>();

  function onClick(id: number) {
    setActiveId(id);

    if (isNotVoid(top) && isNotVoid(tableRef.current)) {
      window.scrollTo({top: tableRef.current.offsetTop - 100, behavior: 'smooth'})
    }
  }

  const activeTicket = tickets.find((ticket) => ticket.id === activeId);

  return (
    <chakra.section>
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
            <chakra.span fontSize="xl" fontWeight="semibold">{t("type_of_center")}</chakra.span>
            <Flex flexDir="column" gap={1}>
              {tickets.map((button) => (
                <chakra.button
                  display="flex"
                  py={3}
                  px={4}
                  key={button.id}
                  backgroundColor={button.id === activeId ? "#F4F4F5" : "white"}
                  _hover={{bgColor: "#F4F4F5"}}
                  borderRadius={8}
                  onClick={() => onClick(button.id)}
                >
                  <chakra.span whiteSpace="pre-wrap" textAlign="left">{button.name}</chakra.span>
                </chakra.button>
              ))}
            </Flex>
          </Flex>
          {/* @ts-ignore */}
          <TableContainer ref={tableRef} w="800px">
            <Table
              border="1px solid" 
              borderColor="brand.border"
            >
              <TableCaption
                px={0}
                py={0}
                whiteSpace="pre-wrap"
                textAlign="left"
                color="brand.gray"
                fontSize="xs"
                fontWeight="regular"
              >
                *Льготные билеты могут приобрести пенсионеры РФ, 
                учащиеся средне специальных и высших учебных  заведений РФ очной формы обучения
              </TableCaption>
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
                    {t("category")}
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
                {isNotVoid(activeTicket) && (
                  <Tr>
                    <Td
                      w="50%"
                      minW="280px"
                      px={5}
                      border="1px solid" 
                      borderColor="brand.border" 
                      verticalAlign="top"
                    >
                      <Flex flexDir="column" gap={6}>
                        {activeTicket.categories.map((category) => (
                          <Flex
                            key={category.id}
                            justifyContent="space-between"
                            fontSize={["md", "lg", "lg", "lg", "lg"]}
                            gap={5}
                          >
                            <Flex flexDir="column" gap={1}>
                              <chakra.span >{category.name}</chakra.span>
                              {isNotVoid(category.caption) && 
                                <chakra.span fontSize="xs" color="brand.gray">{category.caption}</chakra.span>
                              }
                            </Flex>
                            <chakra.span >{category.price} {t("currency")}</chakra.span>
                          </Flex>
                        ))}
                      </Flex>
                    </Td>
                    <Td 
                      w="50%" 
                      minW="300px" 
                      px={5} 
                      border="1px solid" 
                      borderColor="brand.border" 
                      verticalAlign="top"
                    >
                      <Flex flexDir="column" gap={10}>
                        {isNotEmpty(activeTicket.additional_text) && (
                          <chakra.span whiteSpace="pre-wrap">{activeTicket.additional_text}</chakra.span>
                        )}
                        {activeTicket.available_on_website && (
                          <Link href='/buy-ticket' target="_blank">
                            <Button colorScheme="green">{t("buy_ticket_button")}</Button>
                          </Link>
                        )}
                      </Flex>
                    </Td>
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