import { Badge, chakra, Container, Flex, Grid } from "@chakra-ui/react";

import type { TicketsAndServicesPage } from "@/entities";
import { isNotVoid, Markdown } from "@/shared";

interface OtherServicesListProps {
  other_services: TicketsAndServicesPage["other_services"];
}

export const OtherServicesList: React.FC<OtherServicesListProps> = ({
  other_services,
}) => {
  const bgColorMap: Record<string, string> = {
    "0": "blue",
    "1": "green",
    "2": "yellow",
    "3": "orange",
  };

  return (
    <chakra.section pb={10}>
      <Container maxW="container.xl">
        <Flex
          gap={5}
          alignItems="flex-start"
          flexDir={["column", "column", "column", "row", "row"]}
        >
          <Grid
            templateColumns={[
              "1fr",
              "1fr",
              "1fr 1fr",
              "1fr 1fr",
              "1fr 1fr 1fr",
            ]}
            gap={5}
          >
            {other_services.map((service) => (
              <Flex
                key={service.id}
                p={5}
                flexDir="column"
                border="1px solid"
                borderColor="brand.border"
                borderRadius={8}
              >
                <Badge
                  fontSize="sm"
                  colorScheme="green"
                  px={2}
                  alignSelf="flex-start"
                >
                  {service.name}
                </Badge>
                <chakra.span mt={5} fontSize="lg" fontWeight="medium">
                  {service.value}
                </chakra.span>
                {isNotVoid(service.additional_text) && (
                  <chakra.span mt={5} color="brand.gray" fontSize="sm">
                    <Markdown>{service.additional_text}</Markdown>
                  </chakra.span>
                )}
              </Flex>
            ))}
          </Grid>
        </Flex>
      </Container>
    </chakra.section>
  );
};
