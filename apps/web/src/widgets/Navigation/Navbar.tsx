import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from 'next-i18next'
import { Button, chakra, Container, Flex, IconButton, Show, Text } from "@chakra-ui/react"
import { ChevronDownIcon, HamburgerIcon, SearchIcon } from '@chakra-ui/icons';

import { LanguageSelect } from '@/features';

export const Navbar = () => {
  const [opened, setOpened] = useState(false);

  const { t } = useTranslation('navigation');

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
              <Text fontSize="xl" textTransform="uppercase" fontWeight="bold">{t('title')}</Text>
              <Text lineHeight="14px" fontWeight="medium" fontSize="sm">{t('city')}</Text>
            </Flex>
          </Link>
          <Flex gap={[6, 6, 6, 6, 8]} display={['none', 'none', 'none', 'flex', 'flex']} fontSize="lg" fontWeight="medium" color="brand.black">
            <Flex cursor="pointer" alignItems="center" gap={1}>
              <Text>{t('link_about')}</Text>
              <ChevronDownIcon />
            </Flex>
            <Flex cursor="pointer" alignItems="center" gap={1}>
              <Text>{t('link_visitors')}</Text>
              <ChevronDownIcon />
            </Flex>
            <Link href="/">{t('link_news')}</Link>
            <Link href="/">{t('link_contacts')}</Link>
          </Flex>
          <Flex gap={7} display={["none", "none", "none", "flex", "flex"]}>
            <Link href="/buy-ticket">
              <Button display={["none", "none", "none", "none", "block"]} size="md" colorScheme="green">{t('buy_ticket')}</Button>
            </Link>
            <Flex gap={2}>
              <IconButton icon={<SearchIcon />} aria-label='Открыть поиск' bg="transparent" _hover={{bg: "brand.border"}} />
              <LanguageSelect />
            </Flex>
          </Flex>
          <Flex
            display={['flex', 'flex', 'flex', 'none', 'none']}
            alignItems="center"
            gap={6}
            >
              <Link href="/buy-ticket">
                <Button display={["none", "none", "block", "none", "none"]} size="md" colorScheme="green">{t('buy_ticket')}</Button>
              </Link>
            <IconButton boxSize={10} icon={<HamburgerIcon boxSize={8} />} bg="transparent" _hover={{bg: "brand.border"}} aria-label='Открыть меню' />
          </Flex>
        </Flex>
      </Container>
      {/* <Sidebar onClose={() => setOpened(false)} isOpen={opened} /> */}
    </chakra.nav>
  )
} 