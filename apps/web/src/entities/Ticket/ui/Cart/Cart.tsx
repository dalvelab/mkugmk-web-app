import { useMemo } from "react";
import { Button, chakra, Flex, Grid, Heading } from "@chakra-ui/react";

import { ExhibitionCenter } from "@/entities";
import { isNotVoid } from "@/shared";

import { CartTicketCard } from "./Card";
import type { Ticket } from "../../models";

function getSelectedByIds(ids: number[], centers: ExhibitionCenter[]) {
  const result = [];

  for (let i = 0; i < centers.length; i++) {
    if (ids.includes(centers[i].id)) {
      result.push(centers[i]);
    }
  }

  return result;
}

function generateTicketsMap(tickets: Ticket[]) {
  const map: Record<string, string> = {};

  for (let i = 0; i < tickets.length; i++) {
    const key = tickets[i].exhibition_centers
      .sort((a, b) => a.id - b.id)
      .map((center) => center.id.toString())
      .reduce((acc, cur) => acc.concat(cur), "")
      .toString();

    map[key] = tickets[i].infotech_link;
  }

  return map;
}

interface CartProps {
  selected: number[];
  exhibition_centers: ExhibitionCenter[];
  includedOpenSpace?: ExhibitionCenter;
  deleteCenterFromSelected: (id: number) => void;
  tickets: Ticket[];
}

export const Cart: React.FC<CartProps> = ({
  deleteCenterFromSelected,
  selected,
  exhibition_centers,
  includedOpenSpace,
  tickets,
}) => {
  const selectedCenters = getSelectedByIds(selected, exhibition_centers);
  const isExhibitionCenterSelected = selectedCenters.some(
    (center) => center.type === "exhibition_center"
  );

  const totalSelected = selected
    .sort((a, b) => a - b)
    .map((id) => id.toString())
    .reduce((acc, cur) => acc + cur, "");
  const generatedTickets = useMemo(
    () => generateTicketsMap(tickets),
    [tickets]
  );

  return selected.length > 0 ? (
    <Flex
      p={[4, 4, 4, 4, 5]}
      border="1px solid"
      borderColor="brand.border"
      borderRadius="4px"
      flexDir="column"
    >
      <Heading as="h6" fontSize="2xl" fontWeight="semibold">
        Выбрано
      </Heading>
      <chakra.span mt={1} fontSize="xs" color="brand.gray">
        количество билетов можно будет выбрать далее
      </chakra.span>
      <Grid
        pt={4}
        pb={4}
        templateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]}
        gap={[5, 5, 5, 2, 2]}
      >
        {selectedCenters.map((exhibition_center) => {
          if (
            exhibition_center.type === "other" &&
            isExhibitionCenterSelected
          ) {
            return null;
          }

          return (
            <CartTicketCard
              key={exhibition_center.id}
              exhibition_center={exhibition_center}
              deleteCenterFromSelected={deleteCenterFromSelected}
              widthDeleteButton
            />
          );
        })}
      </Grid>
      {isNotVoid(includedOpenSpace) && isExhibitionCenterSelected && (
        <Grid
          templateColumns={["1fr", "1fr", "1fr 1fr", "1fr", "1fr"]}
          gap={5}
          pb={4}
        >
          <Flex flexDir="column" gap={2}>
            <chakra.span fontSize="xs" color="brand.gray">
              автоматически включено
            </chakra.span>
            <CartTicketCard exhibition_center={includedOpenSpace} />
          </Flex>
        </Grid>
      )}
      {isNotVoid(generatedTickets[totalSelected]) ? (
        <Button
          as="a"
          size={["md", "lg", "lg", "md", "lg"]}
          target="_blank"
          href={generatedTickets[totalSelected]}
          colorScheme="green"
          cursor="pointer"
        >
          Перейти к оформлению
        </Button>
      ) : null}
    </Flex>
  ) : null;
};
