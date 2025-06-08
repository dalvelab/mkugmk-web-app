import { Badge, chakra, Container, Flex, Grid } from "@chakra-ui/react";

import type { TicketsAndServicesPage } from "@/entities";
import { isNotVoid, Markdown } from "@/shared";

interface OtherServicesListProps {
  other_services: TicketsAndServicesPage["other_services"];
}

export const OtherServicesList: React.FC<OtherServicesListProps> = ({
  other_services,
}) => {
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
                  colorPalette="green"
                  px={2}
                  alignSelf="flex-start"
                  whiteSpace="pre-wrap"
                >
                  {service.name}
                </Badge>
                <chakra.span mt={5} fontSize="md" fontWeight="bold">
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
