import { chakra, Flex, Grid } from "@chakra-ui/react";

interface AddressesTableProps {
  data: {
    id: number;
    name: string;
    address: string;
  }[];
}

export const AddressesTable: React.FC<AddressesTableProps> = ({ data }) => {
  return (
    <Grid
      w={["100%", "100%", "85%", "100%", "100%"]}
      mt={5}
      gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
      border="1px solid"
      borderColor="brand.border"
    >
      {data.map(({ id, name, address }, index) => {
        const borderRight = index % 2 === 0 ? "1px solid" : "none";
        const borderTop = index % 2 !== 0 ? "1px solid" : "none";
        return (
          <Flex
            key={id}
            px={5}
            py={5}
            justifyContent="space-between"
            borderRight={[
              "none",
              "none",
              "none",
              `${borderRight}`,
              `${borderRight}`,
            ]}
            borderTop={[
              `${borderTop}`,
              `${borderTop}`,
              `${borderTop}`,
              "none",
              "none",
            ]}
            borderColor={[
              "brand.border",
              "brand.border",
              "brand.border",
              "brand.border",
              "brand.border",
            ]}
            flexDir={["column", "column", "row", "row", "row"]}
            gap={[3, 3, 5, 5, 5]}
          >
            <chakra.span
              fontSize={["lg", "xl", "xl", "xl", "xl"]}
              fontWeight="medium"
            >
              {name}
            </chakra.span>
            <chakra.span
              maxW={["100%", "100%", "300px", "300px", "300px"]}
              whiteSpace="pre-wrap"
              color="brand.gray"
              fontSize="md"
            >
              {address}
            </chakra.span>
          </Flex>
        );
      })}
    </Grid>
  );
};
