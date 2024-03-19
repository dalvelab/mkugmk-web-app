import Link from 'next/link';
import { useState } from 'react';
import { Button, chakra, Container, Flex, IconButton, Text } from "@chakra-ui/react"
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const [opened, setOpened] = useState(false);
  return (
    <chakra.nav 
      transition="0.1s ease-in"
      w="full" 
      h={20}
      pos="fixed" 
      borderBottom="1px solid"
      borderColor="brand.border" 
      bgColor="white"
      top={0} 
      left={0} 
      zIndex={opened ? "toast" :"docked"}
      >
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="space-between" alignItems="center">
          <Link href="/">
            <Flex color="brand.black" flexDir="column" gap={1.5}>
              <Text fontSize="xl" textTransform="uppercase" fontWeight="bold">Музейный комплекс</Text>
              <Text lineHeight={0} fontSize="sm">Верхняя Пышма</Text>
            </Flex>
          </Link>
          <Flex gap={8} display={['none', 'none', 'none', 'flex', 'flex']} fontSize="lg" fontWeight="medium" color="brand.black">
            <Flex cursor="pointer" alignItems="center" gap={1}>
              <Text>О комплексе</Text>
              <ChevronDownIcon />
            </Flex>
            <Flex cursor="pointer" alignItems="center" gap={1}>
              <Text>Посетителям</Text>
              <ChevronDownIcon />
            </Flex>
            <Link href="/">События и новости</Link>
            <Link href="/">Контакты</Link>
          </Flex>
          <Flex gap={7}>
            <Button size="md" colorScheme="green">Купить билет</Button>
            <Flex gap={4}>
              <IconButton icon={<SearchIcon />} aria-label='Открыть поиск' bg="transparent" _hover={{bg: "brand.border"}} />
              <Flex cursor="pointer" alignItems="center" gap={1}>
                <Text>RU</Text>
                <ChevronDownIcon />
              </Flex>
            </Flex>
          </Flex>
          <chakra.div
            display={['block', 'block', 'block', 'none', 'none']}
            >
            {/* <MenuButton onClick={() => setOpened(!opened)} opened={opened} /> */}
          </chakra.div>
        </Flex>
      </Container>
      {/* <Sidebar onClose={() => setOpened(false)} isOpen={opened} /> */}
    </chakra.nav>
  )
} 