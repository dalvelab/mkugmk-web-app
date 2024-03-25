import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next'
import { Button, chakra, Container, Flex, IconButton, Spinner, Text, useMediaQuery } from "@chakra-ui/react"
import { HamburgerIcon, SearchIcon, WarningIcon } from '@chakra-ui/icons';

import { LanguageSelect } from '@/features';

import { AboutDropdown, VisitorsDropdown } from './Dropdowns';
import { type ExhibitionCenter, DropdownLink, NavbarLink, getExibitionCenters } from '@/entities';
import { type ApiResponse, isNotVoid } from '@/shared';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation('navigation');
  const [isLargerThan1100] = useMediaQuery('(min-width: 1100px)')

  const [visible, setVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0); 

  // Loading Exhibition centers list to render it in AboutDropdown
  const [exhibitionCentersData, setExhibitionCentersData] = useState<ApiResponse<ExhibitionCenter[], null> | null>(null);
  const [isLoading, setLoading] = useState(false);

	const handleScroll = useCallback((e: Event) => {
    if (scrollY > window.scrollY) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    setScrollY(window.scrollY);
  }, [scrollY]);

	useEffect(() => {
			window.addEventListener("scroll", handleScroll);
			return () => {
					window.removeEventListener("scroll", handleScroll);
			};
	}, [handleScroll]);

  useEffect(() => {
    setLoading(true);
    getExibitionCenters({locale: router.locale, isPopulated: false, isClientRequest: true}).then((data) => {
      setExhibitionCentersData(data);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    })
  }, [router.locale]);

  return (
    <chakra.nav 
      transition="0.1s ease-in"
      opacity={visible ? 1 : 0}
      visibility={visible ? 'visible' : 'hidden'}
      w="full" 
      h={[16, 16, 16, 20, 20]}
      pos="fixed" 
      borderBottom="1px solid"
      borderColor="brand.border" 
      bgColor="white"
      top={0} 
      left={0}
      zIndex={2}
      >
      <Container maxWidth="container.xl" h="full">
        <Flex w="full" h="full" justifyContent="space-between" alignItems="center" gap={2}>
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
            <DropdownLink text={t('link_about')}>
              {isLoading && <Spinner/>}
              {isNotVoid(exhibitionCentersData?.error) && (
                <Flex gap={1.5} alignItems="center">
                  <WarningIcon color="red" />
                  <Text fontSize="sm">Произошла ошибка при загрузке данных</Text>
                </Flex>
              )}
              {!isLoading && isNotVoid(exhibitionCentersData?.data) && (
                <AboutDropdown exhibition_centers={exhibitionCentersData.data} />
              )}
            </DropdownLink>
            <DropdownLink text={t('link_visitors')}>
                <VisitorsDropdown />
            </DropdownLink>
            <NavbarLink href="/news" text={t('link_news')} level={1} />
            <NavbarLink href="/contacts" text={t('link_contacts')} level={1} />
          </Flex>
          <Flex gap={[0, 4, 4, 0, 5]} display="flex" alignItems="center">
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
            />
          </Flex>
        </Flex>
      </Container>
      {/* <Sidebar onClose={() => setOpened(false)} isOpen={opened} /> */}
    </chakra.nav>
  )
} 