import { chakra, Container, Flex, Grid, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getNavigationPage } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, isNotVoid, isNotEmpty, File } from '@/shared';
import type { VisitorsPages } from '@/entities';
import type { ApiResponse } from '@/shared';
import { AddressesTable, HowToGetToMuseumTable } from "@/widgets";
import { useTranslations } from "next-intl";

export default function Navigation({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  const t = useTranslations('Navigation_page');

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  const { title, addresses, complex_map, how_to_get_to_museum, yandex_map_embed } = data;

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
            <File name={t("museum_complex_map")} file={complex_map} />
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
            {t("how_to_get_to_museum")}
          </Heading>
          {isNotVoid(how_to_get_to_museum) && isNotEmpty(how_to_get_to_museum) && (
            <Grid 
              templateColumns={["1fr", "1fr", "85%", "1fr 1fr", "1fr 1fr"]} 
              gap={10}
            >
              <HowToGetToMuseumTable
                title={t("public_transport")} 
                data={how_to_get_to_museum.filter((data) => data.type === 'public_transport')} 
              />
              <HowToGetToMuseumTable
                title={t("private_transport")} 
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
            {t("addresses")}
          </Heading>
          <AddressesTable data={addresses} />
        </Container>
      </chakra.section>
      {isNotEmpty(yandex_map_embed) && (
        <chakra.section pb={10}>
          <Container maxW="container.xl" display="flex" flexDir="column">
            <Heading
              as="h2"
              fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
              fontWeight="bold"
            >
              Музейный комплекс на картах
            </Heading>
            <chakra.iframe
              mt={5}
              src={yandex_map_embed}
              width="1280" 
              height="500">
            </chakra.iframe>
          </Container>
        </chakra.section>
      )}
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<VisitorsPages["navigation_page"], null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getNavigationPage({locale});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
     }
  }
};