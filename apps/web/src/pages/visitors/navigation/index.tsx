import { chakra, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getVisitorsPages } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, isNotVoid, isNotEmpty, FileIcon } from '@/shared';
import type { VisitorsPages } from '@/entities';
import type { ApiResponse } from '@/shared';
import { AddressesTable, HowToGetToMuseumTable } from "@/widgets";
import Link from "next/link";

export default function Navigation({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  if (isVoid(data) || 
      isEmpty(data) || 
      isVoid(data.navigation_page) || 
      isEmpty(data.navigation_page)
    ) {
    return <EmptyState />
  }

  const { navigation_page } = data;

  const { title, addresses, complex_map, how_to_get_to_museum } = navigation_page;

  return (
    <>
      <chakra.section pt={6} pb={5}>
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
        </CustomContainer>
      </chakra.section>
      <chakra.section pb={10}>
        <Container maxW="container.xl">
          <Flex alignItems='flex-start'>
          {isNotVoid(complex_map) && (
            <Flex
              px={5}
              py={4}
              border="1px solid" 
              borderColor="brand.border" 
              alignItems='center' 
              gap={3}
              borderRadius="8px"
            >
              <FileIcon />
              <Flex flexDir='column' gap={0.5} alignItems="flex-start">
                <chakra.span fontSize='sm' lineHeight="1" fontWeight="medium">Карта музейного комплекса</chakra.span>
                <Link 
                  href={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${complex_map.url}`} 
                  target="_blank"
                  style={{lineHeight: '1'}}
                >
                  <chakra.span fontSize="xs" lineHeight="1" textDecor="underline" color="brand.gray">посмотреть</chakra.span>
                </Link>
              </Flex>
            </Flex>
          )}
          </Flex>
        </Container>
      </chakra.section>
      <chakra.section pb={10}>
        <Container maxW="container.xl">
          <Heading
            as="h2"
            fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
            fontWeight="bold"
          >
            Как доехать до Музейного комплекса
          </Heading>
          {isNotVoid(how_to_get_to_museum) && isNotEmpty(how_to_get_to_museum) && (
            <Grid 
              templateColumns={["1fr", "1fr", "85%", "1fr 1fr", "1fr 1fr"]} 
              gap={10}
            >
              <HowToGetToMuseumTable
                title="На общественном транспорте из Екатеринбурга" 
                data={how_to_get_to_museum.filter((data) => data.type === 'public_transport')} 
              />
              <HowToGetToMuseumTable
                title="На автомобиле или экскурсионном автобусе" 
                data={how_to_get_to_museum.filter((data) => data.type === 'other')} 
              />
            </Grid>
          )}
        </Container>
      </chakra.section>
      <chakra.section pb={10}>
        <Container maxW="container.xl" display="flex" flexDir="column">
          <Heading
            as="h2"
            fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
            fontWeight="bold"
          >
            Адреса выставочных площадок Музейного комплекса
          </Heading>
          <AddressesTable data={addresses} />
        </Container>
      </chakra.section>
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<VisitorsPages, null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getVisitorsPages({locale, isNavigationPage: true});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
     }
  }
};