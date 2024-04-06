import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, chakra,  Flex, IconButton, Spinner, Text, useMediaQuery } from "@chakra-ui/react"
import { HamburgerIcon, SearchIcon, WarningIcon } from '@chakra-ui/icons';
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useQuery } from '@tanstack/react-query';

import { LanguageSelect } from '@/features';
import { DropdownLink, NavbarLink, getExibitionCenters } from '@/entities';
import { isNotVoid } from '@/shared';

import { Sidebar } from './Siderbar';
import { AboutDropdown, VisitorsDropdown } from './Dropdowns';

export const Navbar = () => {
  const t = useTranslations('Navigation');
  const { locale } = useRouter();

  const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)')
  const { scrollY } = useScroll();
  const { data: response, isLoading, isError } = useQuery(
    {
      queryKey: [`navigation-${locale}`],
      queryFn: () => getExibitionCenters({locale, isPopulated: false, isClientRequest: true}),
      refetchOnWindowFocus: false,
  });

  const [visible, setVisible] = useState(true);
  const [isOpened, setOpened] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    if (isNotVoid(previous) && latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <>
      <chakra.nav
        as={motion.nav}
        w="full" 
        h={[16, 16, 16, 20, 20]}
        pos="sticky" 
        borderBottom="1px solid"
        borderColor="brand.border" 
        bgColor="white"
        top={0} 
        left={0}
        zIndex={10}
        paddingInlineStart={4}
        paddingInlineEnd={4}
        transition=".1s, ease-in-out"
        animate={visible ? 'visible' : 'hidden'}
        variants={{
          visible: { y: 0 },
          hidden: { y: 'calc(-100% - 2px)' }, // - 2px for border hide
        }}
        >
          <Flex
            as={motion.div}
            ps={isLargerThan1100 ? 4 : 0} 
            display="flex"
            w="full" 
            h="full" 
            justifyContent="space-between" 
            alignItems="center" 
            gap={2}
            animate={visible ? 'visible' : 'hidden'}
            variants={{
              visible: { visibility: 'visible' },
              hidden: { visibility: 'hidden' },
            }}
          >
            <Link href="/">
              <Text fontSize="xl" textTransform="uppercase" fontWeight="bold">{t('title')}</Text>
              <Text lineHeight="14px" fontWeight="medium" fontSize="sm">{t('city')}</Text>
            </Link>
            <Flex
              pos="relative"
              gap={[5, 5, 5, 5, 8]}
              display={isLargerThan1100 ? 'flex' : 'none'}
              fontSize="lg"
              fontWeight="medium"
              color="brand.black"
            >
              <DropdownLink text={t('menu.about')}>
                {isLoading && <Spinner/>}
                {isNotVoid(response?.error) || isError && (
                  <Flex gap={1.5} alignItems="center">
                    <WarningIcon color="red" />
                    <Text fontSize="sm">Произошла ошибка при загрузке данных</Text>
                  </Flex>
                )}
                {!isLoading && isNotVoid(response?.data) && (
                  <AboutDropdown exhibition_centers={response.data} />
                )}
              </DropdownLink>
              <DropdownLink text={t('menu.visitors')}>
                  <VisitorsDropdown />
              </DropdownLink>
              <NavbarLink href="/news" text={t('menu.news')} level={1} />
              <NavbarLink href="/contacts" text={t('menu.contacts')} level={1} />
            </Flex>
            <Flex gap={[0, 4, 4, 0, 4]} display="flex" alignItems="center">
              <Link href="/buy-ticket">
                {/* Добавлен div потому что иначен не работает display на кнопке на последнем разрешении */}
                <chakra.div display={["none", "block", "block", "none", "block"]}>
                  <Button
                    size={["sm", "sm", "md", "md", "md"]}
                    colorScheme="green"
                  >
                    {t('buy_ticket')}
                  </Button>
                </chakra.div>
              </Link>
              <Flex gap={2} display={isLargerThan1100 ? "flex" : "none"}>
                <IconButton icon={<SearchIcon />} aria-label='Открыть поиск' bg="transparent" _hover={{bg: "brand.border"}} />
                <LanguageSelect />
              </Flex>
              <IconButton
                display={isLargerThan1100 ? 'none' : 'block'}
                boxSize={10} 
                icon={<HamburgerIcon boxSize={8} />} 
                bg="transparent" 
                _hover={{bg: "brand.border"}} 
                aria-label='Открыть меню'
                onClick={() => setOpened(true)}
              />
            </Flex>
          </Flex>
      </chakra.nav>
      <Sidebar 
        onClose={() => setOpened(false)} 
        isOpened={isOpened} 
        exhibition_centers={isNotVoid(response?.data) ? response.data : []}
      />
    </>
  )
} 