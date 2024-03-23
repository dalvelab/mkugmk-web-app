import { Link } from '@chakra-ui/next-js';
import { Button, chakra, Container, Flex, Grid, Spinner, Text } from "@chakra-ui/react"

import { isVoid, type ApiResponse, isNotVoid } from '@/shared';
import { useEffect, useState } from 'react';
import { getFooter } from '@/entities';
import type { Footer as StrapiFooter } from '@/entities';
import { useRouter } from 'next/router';
import { WarningIcon } from '@chakra-ui/icons';

export const Footer = () => {
  const router = useRouter();

  const [footerData, setFooterData] = useState<ApiResponse<StrapiFooter, null> | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getFooter({locale: router.locale}).then((data) => {
      setFooterData(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false)
    })
  }, [router.locale]);

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

  if (isVoid(footerData) || isVoid(footerData.data)) {
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
        {(isVoid(footerData) || isVoid(footerData.data)) && isVoid(footerData?.error) && (
          <Text fontSize="xl" fontWeight="medium">Нет данных для отображения футера</Text>
        )}
        {isNotVoid(footerData?.error) && (
          <Flex gap={1.5} alignItems="center">
            <WarningIcon color="red" />
            <Text fontSize="sm">Произошла ошибка при загрузке данных</Text>
          </Flex>
        )}
      </chakra.footer>
    )
  }

  const { city, address, contacts, working_time, pages, socials, yandex_map_link } = footerData.data;
  
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
                href={yandex_map_link} 
                pos="relative" 
                _hover={{ textDecoration: 'none', color: 'brand.200' }}
                >
                  <Text fontSize="lg">{address}</Text>
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
            gap={[8, 5, 5, 5, 5]}
            >
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">Контакты</Text>
              <Flex gap={1} flexDir="column">
                {contacts.map((contact) => (
                  <Link key={contact.id} href="/">
                    <Text>{contact.text}</Text>
                  </Link>
                ))}
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">Режим работы кассы:</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                {working_time.map((time) => (
                  <Grid key={time.id} gridTemplateColumns="1fr 1fr" gap={4}>
                    <Text>{time.day}</Text>
                    <Text>{time.value}</Text>
                  </Grid>
                ))}
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium" color="brand.black">Социальные сети</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                {socials.map((social) => (
                  <Link key={social.id} href="/">
                    <Text>{social.name}</Text>
                  </Link>
                ))}
              </Flex>
            </Flex>
            <Flex flexDir="column" gap={2}>
              <Text fontSize="lg" fontWeight="medium">Посетителям</Text>
              <Flex gap={1} flexDir="column" alignSelf="flex-start">
                {pages.map((page) => (
                  <Link key={page.id} href="/">
                    <Text>{page.name}</Text>
                  </Link>
                ))}
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