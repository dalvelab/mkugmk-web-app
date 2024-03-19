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
          <Flex justifyContent="space-between">
            <Flex 
              gap={4} 
              alignItems={["flex-start", "flex-start", "center", "center", "center"]} 
              flexDir={["column", "column", "row", "row", "row"]}
            >
              <Text fontSize="3xl">Верхняя Пышма</Text>
              <Link 
                target="_blank" 
                rel="noreferer" 
                href="https://yandex.ru/maps/-/CCUk5JdIsD" 
                pos="relative" 
                _hover={{ textDecoration: 'none', color: 'brand.200' }}
                >
                  <Text fontSize="lg" _after={
                    { 'content': '""',
                    'width': '100%',
                    'height': '1px',
                    'bgColor': 'gray.900',
                    'pos': 'absolute',
                    'left': 0,
                    'bottom': '-1px',
                    }}>
                      ул.Александра Козицына, д. 2
                    </Text>
              </Link>
            </Flex>
            <Button size="lg" colorScheme="green">Купить билет</Button>
          </Flex>
          <Flex justifyContent="space-between">
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
              <Flex gap={1} flexDir="column">
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
              <Flex gap={1} flexDir="column">
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
          </Flex>
        </Flex>
        <Flex mt={8} justifyContent="space-between" flexDirection={["column-reverse", "column-reverse", "column-reverse", "row", "row"]} gap={[4, 4, 4, null, null]}>
          <Text fontSize="sm" color="brand.300">Частное учреждение культуры «Музейный комплекс», 2024</Text>
          <Link href="/" referrerPolicy="no-referrer" target="_blank">
            <Text fontSize="sm" color="brand.300" textDecoration="underline">Политика конфиденциальности</Text>
          </Link>
        </Flex>
      </Container>
    </chakra.footer> 
  )
}