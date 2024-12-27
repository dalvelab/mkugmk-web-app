import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button, chakra, Container, Flex, Grid, Text } from "@chakra-ui/react";

import type { TicketsAndServicesPage } from "@/entities";
import { isNotEmpty, isNotVoid, Markdown } from "@/shared";
import Link from "next/link";
import { OrderCall } from "@/features";

interface TicketsListProps {
  main_services: TicketsAndServicesPage["main_services"];
}

export const TicketsList: React.FC<TicketsListProps> = ({ main_services }) => {
  const t = useTranslations("Tickets_page");

  const [activeId, setActiveId] = useState<number>(main_services[0].id);

  const contentRef = useRef<HTMLDivElement | null>(null);

  function onClick(id: number) {
    setActiveId(id);

    if (isNotVoid(window.top) && isNotVoid(contentRef.current)) {
      window.scrollTo({
        top: contentRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }

  const activeService = main_services.find(
    (service) => service.id === activeId
  );

  return (
    <chakra.section>
      <Container maxW="container.xl">
        <Flex
          gap={5}
          alignItems="flex-start"
          flexDir={["column", "column", "column", "row", "row"]}
        >
          <Flex
            minW={["100%", "340px", "340px", "340px", "340px"]}
            maxW={["100%", "390px", "390px", "390px", "390px"]}
            w="100%"
            flexDir="column"
            py={3}
            px={3}
            border="1px solid"
            borderColor="brand.border"
            borderRadius={8}
            color="brand.black"
            gap={3}
          >
            <Flex
              flexDir="column"
              gap={1}
              justifyContent="space-between"
              ref={contentRef}
            >
              {main_services.map((button) =>
                isNotVoid(button.link) && isNotEmpty(button.link) ? (
                  <Link href={button.link} key={button.id}>
                    <chakra.button
                      display="flex"
                      py={3}
                      px={4}
                      key={button.id}
                      backgroundColor={
                        button.id === activeId ? "#F4F4F5" : "white"
                      }
                      _hover={{ bgColor: "#F4F4F5" }}
                      borderRadius={8}
                    >
                      <chakra.span whiteSpace="pre-wrap" textAlign="left">
                        {button.name}
                      </chakra.span>
                    </chakra.button>
                  </Link>
                ) : (
                  <chakra.button
                    display="flex"
                    py={3}
                    px={4}
                    key={button.id}
                    backgroundColor={
                      button.id === activeId ? "#F4F4F5" : "white"
                    }
                    _hover={{ bgColor: "#F4F4F5" }}
                    borderRadius={8}
                    onClick={() => onClick(button.id)}
                  >
                    <chakra.span whiteSpace="pre-wrap" textAlign="left">
                      {button.name}
                    </chakra.span>
                  </chakra.button>
                )
              )}
            </Flex>
          </Flex>
          <Grid
            gridTemplateColumns={[
              "1fr",
              "1fr",
              "1fr 1fr",
              "1fr 1fr",
              "1fr 1fr 1fr",
            ]}
            gap={5}
          >
            {isNotVoid(activeService?.tickets) &&
              isNotEmpty(activeService.tickets) &&
              activeService.tickets.map((ticket) => (
                <Flex
                  minW={["100%", "340px", "340px", "340px", "340px"]}
                  maxW={["100%", "390px", "390px", "390px", "390px"]}
                  key={ticket.id}
                  p={5}
                  flexDir="column"
                  border="1px solid"
                  borderColor="brand.border"
                  borderRadius={8}
                >
                  <chakra.span
                    minH="60px"
                    textAlign="center"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    {ticket.name}
                  </chakra.span>
                  <Flex mt={5} flexDir="column" gap={5} h="100%">
                    {ticket.categories.map((category) => (
                      <Flex
                        key={category.id}
                        w="full"
                        alignItems="center"
                        justifyContent="space-between"
                        fontSize="lg"
                      >
                        <chakra.span>
                          <Markdown>{category.name}</Markdown>
                        </chakra.span>
                        <Text>
                          {category.price} {t("currency")}
                        </Text>
                      </Flex>
                    ))}
                    {ticket.available_on_website && (
                      <Link href="/buy-ticket">
                        <Button colorScheme="green">
                          {t("buy_ticket_button")}
                        </Button>
                      </Link>
                    )}
                    {ticket.is_excursion && (
                      <OrderCall
                        buttonStyles={{
                          fontSize: "md",
                          h: "10",
                          px: "4",
                          fontWeight: "medium",
                          bgColor: "brand.black",
                          color: "white",
                          alignSelf: "flex-start",
                          _hover: { textDecor: "none" },
                          borderRadius: "8",
                        }}
                      />
                    )}
                    {isNotVoid(ticket.additional_text) &&
                      isNotEmpty(ticket.additional_text) && (
                        <chakra.span fontSize="xs" color="brand.gray">
                          {ticket.additional_text}
                        </chakra.span>
                      )}
                  </Flex>
                </Flex>
              ))}
          </Grid>
        </Flex>
      </Container>
    </chakra.section>
  );
};
