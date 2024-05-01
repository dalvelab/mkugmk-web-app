import { chakra, Heading, Grid } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { CardsWithModal } from '@/widgets';
import { getPartnersPage } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, SEO } from '@/shared';
import type { PartnerPage } from '@/entities';
import type { ApiResponse } from '@/shared';
import { useTranslations } from "next-intl";

export default function Partners({ partners }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = partners;

  const t = useTranslations();

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  return (
    <>
      <SEO title={t('Navigation.about_dropdown.partners')} />
      <chakra.section pt={6} pb={10}>
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          minH="70vh"
          display="flex"
          flexDir="column"
          pos="relative"
          alignItems="flex-start"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{t('Navigation.about_dropdown.partners')}</Heading>
          <Grid
            mt={7}
            gridTemplateColumns={["1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
            gap={10}
          >
          <CardsWithModal data={data.partners} />
          </Grid>
        </CustomContainer>
      </chakra.section>
    </>
  );
}

interface PartnerProps {
  partners: ApiResponse<PartnerPage, null>
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const partners = await getPartnersPage({locale});

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      partners
     }
  }
};