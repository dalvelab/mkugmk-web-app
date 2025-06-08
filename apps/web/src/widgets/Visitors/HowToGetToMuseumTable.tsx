import { Button, chakra, Flex, Table } from "@chakra-ui/react";

import type { VisitorsPages } from "@/entities";
import { isNotVoid, Markdown } from "@/shared";

interface HowToGetToMuseumTableProps {
  title: string;
  data: VisitorsPages["navigation_page"]["how_to_get_to_museum"];
  getDirections?: string;
}

export const HowToGetToMuseumTable: React.FC<HowToGetToMuseumTableProps> = ({
  data,
  title,
  getDirections,
}) => {
  return (
    <Table.Root mt={5} border="1px solid" borderColor="brand.border">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader
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
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((info) => (
          <Table.Row key={info.id}>
            <Table.Cell minW="500px" px={5} py={5}>
              <Flex justifyContent="space-between" gap={10}>
                <Flex flexDir="column" gap={1} alignItems="flex-start">
                  <chakra.span
                    fontSize="lg"
                    whiteSpace={[
                      "no-wrap",
                      "no-wrap",
                      "pre-wrap",
                      "pre-wrap",
                      "pre-wrap",
                    ]}
                  >
                    {info.name}
                  </chakra.span>
                  {isNotVoid(info.caption) ? (
                    <chakra.span
                      fontSize="sm"
                      maxW="300px"
                      color="brand.gray"
                      whiteSpace="pre-wrap"
                    >
                      <Markdown>{info.caption}</Markdown>
                    </chakra.span>
                  ) : null}
                  {info.type === "other" && (
                    <chakra.a
                      href="https://yandex.ru/maps/-/CDbuR-iH"
                      target="_blank"
                    >
                      <Button
                        mt={4}
                        bg="brand.black"
                        color="white"
                        _hover={{ bgColor: "brand.black" }}
                      >
                        {getDirections}
                      </Button>
                    </chakra.a>
                  )}
                </Flex>
                <Flex flexDir="column" gap={5}>
                  <chakra.span fontSize="lg">{info.value}</chakra.span>
                </Flex>
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
