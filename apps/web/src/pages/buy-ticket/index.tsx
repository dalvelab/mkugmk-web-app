import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';
import { chakra, Heading, Grid, Flex, Button, Text } from "@chakra-ui/react";
import { useTranslations } from 'next-intl';

import { Cart, TicketCard, getExibitionCenters, getTickets } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, isNotVoid } from '@/shared';
import type { ExhibitionCenter, Ticket } from '@/entities';
import type { ApiResponse } from '@/shared';
import { InfoOutlineIcon } from '@chakra-ui/icons';

export default function BuyTicket({ exhibition_centers, tickets }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data: ticketsData } = tickets;
  const { data } = exhibition_centers;

  const t = useTranslations("Buy_Tickets")

  const [mode, setMode] = useState<'default' | 'pushkin_card'>('default');
  const [selected, setSelected] = useState<number[]>([]);

  if (isVoid(data) || isEmpty(data) || isVoid(ticketsData) || isEmpty(ticketsData)) {
    return <EmptyState />
  }

  const ticketsFilteredByMode = ticketsData
    .filter((ticket) => mode === 'pushkin_card' ? ticket.pushkin_card : !ticket.pushkin_card);
  const alwaysIncluded = data.find((center) => center.type === 'other');

  function addCenterToSelected(id: number) {
    if (selected.includes(id) || mode === 'pushkin_card' && selected.length > 0) {
      return;
    }

    // Add alwaysIncluded automatically with exhibition_center
    // Only possible when selected is empty
    if (isNotVoid(alwaysIncluded) && alwaysIncluded.id !== id && isEmpty(selected)) {
      setSelected([id, alwaysIncluded.id]);

      return;
    }

    setSelected([...selected, id]);
  }

  function deleteCenterFromSelected(deleteItemId: number) {
    const toBeDeletedIndex = selected.findIndex((id) => id === deleteItemId);

    const selectedCopy = [...selected];

    selectedCopy.splice(toBeDeletedIndex, 1);

    if (selectedCopy.length === 1 && selectedCopy[0] === alwaysIncluded?.id) {
      setSelected([]);

      return;
    }

    setSelected(selectedCopy);
  }

  function changeMode(selectedMode: typeof mode) {
    setSelected([]);
    setMode(selectedMode);
  }

  return (
    <chakra.section
      pt={6}
      pb={10}
      minH="100vh"
    >
      <CustomContainer
        withBackButton
        maxWidth="container.xl"
        display="flex"
        flexDir="column"
        alignItems='flex-start'
        pos="relative"
      >
        <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{t("title")}</Heading>
        <Flex
          mt={4}
          p={1.5}
          bgColor="#F4F4F5"
          borderRadius="8px"
        >
          <Button
            px={[3, 7, 7, 7, 7]}
            py={[3, 5, 5, 5, 5]}
            fontSize={["xs", "md", "md", "md", "md"]}
            bgColor={mode === "default" ? "brand.black" : "transparent"}
            color={mode === "default" ? "white" : "brand.black"}
            _hover={{bgColor: mode === "default" ? "brand.black" : "transparent"}}
            onClick={() => changeMode('default')}
          >
            Стандартные билеты
          </Button>
          <Button
            px={[3, 7, 7, 7, 7]}
            py={[3, 5, 5, 5, 5]}
            fontSize={["xs", "md", "md", "md", "md"]}
            bgColor={mode === "pushkin_card" ? "brand.black" : "transparent"}
            color={mode === "pushkin_card" ? "white" : "brand.black"}
            _hover={{bgColor: mode === "pushkin_card" ? "brand.black" : "transparent"}}
            onClick={() => changeMode('pushkin_card')}
          >
            Пушкинская карта
          </Button>
        </Flex>
        <Text mt={5} fontSize="lg" color="brand.gray">
          {mode === 'default' ? 
            "Выберите один или несколько выставочных центров" :
            "Выберите один выставочный центр" 
          }
        </Text>
        <Grid
          w="100%"
          mt={4}
          gap={4}
          gridTemplateColumns={
            ["auto",
            "auto",
            "auto",
            "minmax(auto, 700px) 360px",
            "minmax(auto, 780px) 360px"
            ]
          }
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Flex w="100%" flexDir="column" gap={6}>
            <Flex
              p={3}
              gap={[3, 4, 4, 4, 4]}
              border="1px solid"
              borderColor="brand.border"
              borderRadius="4px"
              alignItems={["flex-start", "center", "center", "center", "center"]}
              flexDir={["column", "row", "row", "row", "row"]}
            >
              <InfoOutlineIcon fontSize="3xl" />
              <chakra.span color="brand.black" fontSize="sm" fontWeight="medium">
                При приобретении входного билета в один из выставочных центров вход на “Открытую площадку” бесплатный. 
                В данном случае билет приобретать не нужно.
              </chakra.span>
            </Flex>
            <Grid
              templateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]}
              gap={5}
            >
              {data
                .filter((exhibition_center) => 
                  mode === 'pushkin_card' ? 
                  exhibition_center.type === 'exhibition_center' : 
                  true
                )
                .map((exhibition_center) => (
                  <TicketCard
                    key={exhibition_center.id}
                    mode={mode}
                    exhibition_center={exhibition_center}
                    addCenterToSelected={addCenterToSelected}
                    selected={selected}
                  />
                )
              )}
            </Grid>
          </Flex>
          <Cart
            selected={selected}
            deleteCenterFromSelected={deleteCenterFromSelected}
            tickets={ticketsFilteredByMode}
            exhibition_centers={data}
            includedOpenSpace={alwaysIncluded}
          />
        </Grid>
      </CustomContainer>
    </chakra.section>
  );
}

interface BuyTicketProps {
  tickets: ApiResponse<Ticket[], null>;
  exhibition_centers: ApiResponse<ExhibitionCenter[], null>
}

export const getServerSideProps: GetServerSideProps<BuyTicketProps> = async ({locale}) => {
  const tickets = await getTickets({locale});
  const exhibition_centers = await getExibitionCenters({locale, isPopulated: true})

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      tickets,
      exhibition_centers
     }
  }
};