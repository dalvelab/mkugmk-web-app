import { Link } from '@chakra-ui/next-js';
import { Button, chakra, Container, Flex, Grid, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";

import { isVoid, isNotVoid, createWorkingSchedule } from '@/shared';
import { getFooter } from '@/entities';
import { useRouter } from 'next/router';
import { WarningIcon } from '@chakra-ui/icons';
import { useTranslations } from 'next-intl';
import { OrderCall } from '@/features';

export const Footer = () => {
  const t = useTranslations('Footer');
  const { locale } = useRouter();

  const { data: response, isLoading, isError } = useQuery(
    {
      queryKey: [`footer=${locale}`],
      queryFn: () => getFooter({ locale }),
      refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <chakra.footer
        w="full" 
        h="auto" 
        minH={40} 
        bgColor="white" 
        borderTop="1px solid" 
        borderColor="brand.border" 
        pos="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </chakra.footer>
    )
  }

  if (isVoid(response) || isVoid(response.data)) {
    return (
      <chakra.footer 
        w="full" 
        h="auto" 
        minH={40} 
        bgColor="white" 
        borderTop="1px solid" 
        borderColor="brand.border" 
        pos="relative"
        display="flex"
        flexDir="column"
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        {(isVoid(response) || isVoid(response.data)) && isVoid(response?.error) && (
          <Text fontSize="xl" fontWeight="medium">
            {locale === 'ru' ? 'Нет данных для отображения футера' : 'No data for footer rendering'}
          </Text>
        )}
        {isNotVoid(response?.error) || isError && (
          <Flex gap={1.5} alignItems="center">
            <WarningIcon color="red" />
            <Text fontSize="sm">
              {locale === 'ru' ? 'Произошла ошибка при загрузке данных' : 'Error loading data'}
            </Text>
          </Flex>
        )}
      </chakra.footer>
    )
  }

  const { city, address, contacts, working_time, pages, socials, map_link } = response.data;

  const formattedSchedule = createWorkingSchedule(working_time, locale);
  
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
            <Flex flexDir="column" alignItems="flex-start">
              <Text fontSize="3xl">{city}</Text>
              <Link 
                target="_blank" 
                rel="noreferer" 
                href={isNotVoid(map_link) ? map_link : '/'} 
                pos="relative" 
                _hover={{ textDecoration: 'none', color: 'brand.200' }}
                >
                  <Text fontSize="lg">{address}</Text>
              </Link>
            </Flex>
            <Link 
              href="/buy-ticket"
              alignSelf="center"
              justifySelf={["flex-start", "flex-start", "flex-start", "flex-end", "flex-end"]} 
            >
              <Button
                size="lg" 
                colorScheme="green"
              >
                {t('buy_ticket_button')}
              </Button>
            </Link>
          </Grid>
          <Grid 
            gridTemplateColumns={["auto", "1fr 1fr", "1fr 1fr", "auto auto auto auto", "auto auto auto auto"]} 
            justifyContent="space-between"
            gap={[8, 5, 5, 5, 5]}
            >
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">{t('contacts')}</Text>
              <Flex gap={1} flexDir="column">
                {contacts.map((contact) => (
                  <Link 
                    key={contact.id} 
                    href={contact.type === 'email' ? `mailto:${contact.text}` : `tel:${contact.text}`}
                  >
                    <Text>{contact.text}</Text>
                  </Link>
                ))}
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">{t('ticket_office')}</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                {formattedSchedule.map(({day, value, id, opened}) => (
                  <Grid key={id} gridTemplateColumns="1fr 1fr" gap={4}>
                    <chakra.span>{day}</chakra.span>
                    <chakra.span color={opened ? 'brand.black' : 'red.500'}>{value}</chakra.span>
                  </Grid>
                ))}
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium" color="brand.black">{t('socials')}</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                {socials.map((social) => (
                  <Link key={social.id} href={social.link} target='_blank'>
                    <Text>{social.name}</Text>
                  </Link>
                ))}
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">{t('visitors')}</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                <OrderCall />
                {pages.map((page) => (
                  <Link key={page.id} href={page.link} target='_blank'>
                    <Text>{page.name}</Text>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </Grid>
        </Flex>
        <chakra.div mt={8}>
          <Text fontSize="xs" color="brand.gray">Частное учреждение культуры «Музейный комплекс»</Text>
        </chakra.div>
      </Container>
    </chakra.footer> 
  )
}