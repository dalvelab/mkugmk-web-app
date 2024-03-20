import { Link } from '@chakra-ui/next-js';
import { Button, chakra, Container, Flex, Grid, Text } from "@chakra-ui/react"

export const Footer = () => {
  return (
    <chakra.footer 
      w="full" 
      h="auto" 
      minH={40} 
      bgColor="white" 
      borderTop="1px solid" 
      borderColor="brand.border" 
      pos="relative"
    >
      <Container maxW="container.xl" pt={8} pb={2} display="flex" flexDir="column">
        <Flex flexDir="column" gap={8}>
          <Grid 
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr"]}
            gap={4}
          >
            <Flex flexDir="column">
              <Text fontSize="3xl">Верхняя Пышма</Text>
              <Link 
                target="_blank" 
                rel="noreferer" 
                href="https://yandex.ru/maps/-/CDFtm2P2" 
                pos="relative" 
                _hover={{ textDecoration: 'none', color: 'brand.200' }}
                >
                  <Text fontSize="lg">ул.Александра Козицына, д. 2</Text>
              </Link>
            </Flex>
            <Button 
              alignSelf="center" 
              justifySelf={["flex-start", "flex-start", "flex-start", "flex-end", "flex-end"]} 
              size="lg" 
              colorScheme="green"
            >
              Купить билет
            </Button>
          </Grid>
          <Grid 
            gridTemplateColumns={["auto", "1fr 1fr", "1fr 1fr", "auto auto auto auto", "auto auto auto auto"]} 
            justifyContent="space-between"
            gap={5}
            >
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">Контакты</Text>
              <Flex gap={1} flexDir="column">
                <Link href="/">
                  <Text>+7 (343 68) 4-67-84</Text>
                </Link>
                <Link href="/">
                  <Text>mk@mkugmk.ru</Text>
                </Link>
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">Режим работы кассы:</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                <Grid gridTemplateColumns="1fr 1fr" gap={4}>
                  <Text>понедельник</Text>
                  <Text>выходной</Text>
                </Grid>
                <Grid gridTemplateColumns="1fr 1fr" gap={4}>
                  <Text>вторник-воскресенье</Text>
                  <Text>10:00 - 19:00</Text>
                </Grid>
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium" color="brand.black">Социальные сети</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                <Link href="/">
                  <Text>Вконтакте</Text>
                </Link>
                <Link href="/">
                  <Text>Телеграм</Text>
                </Link>
                <Link href="/">
                  <Text>YouTube</Text>
                </Link>
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">Посетителям</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                <Link href="/">
                  <Text>FAQ</Text>
                </Link>
                <Link href="/">
                  <Text>Оставить отзыв</Text>
                </Link>
                <Link href="/">
                  <Text>Заказать звонок</Text>
                </Link>
              </Flex>
            </Flex>
          </Grid>
        </Flex>
        <chakra.div mt={8}>
          <Text fontSize="xs" color="brand.gray">Частное учреждение культуры «Музейный комплекс», 2024</Text>
        </chakra.div>
      </Container>
    </chakra.footer> 
  )
}