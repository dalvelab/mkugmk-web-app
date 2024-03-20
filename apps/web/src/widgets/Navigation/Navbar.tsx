import Link from 'next/link';
import { useState } from 'react';
import { Button, chakra, Container, Flex, IconButton, Show, Text } from "@chakra-ui/react"
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';

export const Navbar = () => {
  const [opened, setOpened] = useState(false);
  return (
    <chakra.nav 
      transition="0.1s ease-in"
      w="full" 
      h={[16, 16, 16, 20, 20]}
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
            <Flex color="brand.black" flexDir="column">
              <Text fontSize="xl" textTransform="uppercase" fontWeight="bold">Музейный комплекс</Text>
              <Text lineHeight="14px" fontWeight="medium" fontSize="sm">г. Верхняя Пышма</Text>
            </Flex>
          </Link>
          <Flex gap={[6, 6, 6, 6, 8]} display={['none', 'none', 'none', 'flex', 'flex']} fontSize="lg" fontWeight="medium" color="brand.black">
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
          <Flex gap={7} display={["none", "none", "none", "flex", "flex"]}>
            <Button display={["none", "none", "none", "none", "block"]} size="md" colorScheme="green">Купить билет</Button>
            <Flex gap={4}>
              <IconButton icon={<SearchIcon />} aria-label='Открыть поиск' bg="transparent" _hover={{bg: "brand.border"}} />
              <Flex cursor="pointer" alignItems="center" gap={1}>
                <Text>RU</Text>
                <ChevronDownIcon />
              </Flex>
            </Flex>
          </Flex>
          <Flex
            display={['flex', 'flex', 'flex', 'none', 'none']}
            alignItems="center"
            gap={6}
            >
              <Button display={["none", "none", "block", "none", "none"]} size="md" colorScheme="green">Купить билет</Button>
            <IconButton boxSize={10} icon={<HamburgerIcon boxSize={8} />} bg="transparent" _hover={{bg: "brand.border"}} aria-label='Открыть меню' />
          </Flex>
        </Flex>
      </Container>
      {/* <Sidebar onClose={() => setOpened(false)} isOpen={opened} /> */}
    </chakra.nav>
  )
} 