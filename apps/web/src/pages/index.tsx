import { chakra, Container, Heading, Flex, Button, Text, Grid } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <chakra.section 
        pb={10} 
        pos="relative" 
        minH="100vh" 
        display="flex" 
        flexDir="column"
      >
        <chakra.div pos="absolute" left={0} top={0} w="full" h="100vh" bg="black" opacity={0.5} zIndex={0} />
        <Container
          maxWidth="container.xl" 
          h="calc(100vh - 80px)"
          mt={20}
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Flex w="900px" h="full" flexDir="column" justifyContent="center" alignItems="flex-start">
            <Heading as="h1" fontSize="5xl" textTransform="uppercase">Музейный комплекс военной и гражданской техники</Heading>
            <Button mt={10} size="lg" colorScheme="green">Купить билет</Button>
          </Flex>
        </Container>
      </chakra.section>
      <chakra.section pt={10} pb={10} pos="relative">
        <Container 
          maxWidth="container.xl" 
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap={5}>
            <Heading as="h2" fontSize="4xl">Музейный комплекс</Heading>
            <Text textAlign="center" fontSize="2xl">Один из крупнейших в мире музеев военной и автомобильной техники и истории. 
              В настоящее время в состав Музейного комплекса входят четыре выставочных центра 
              и открытая экспозиционная площадка. В настоящее время в состав Музейного комплекса 
              входят четыре выставочных центра и открытая экспозиционная площадка.
            </Text>
          </Flex>
        </Container>
      </chakra.section>
      <chakra.section pt={10} pb={10} id="afisha" scrollMarginTop={20} pos="relative">
        <Container 
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Grid gridTemplateColumns="1fr 1fr 1fr"></Grid>
        </Container>
      </chakra.section>
    </>
  );
}
