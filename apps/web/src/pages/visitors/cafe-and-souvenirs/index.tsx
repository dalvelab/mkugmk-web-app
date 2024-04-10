import { chakra, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { CardsWithModal } from '@/widgets';
import { getVisitorsPages } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, Markdown } from '@/shared';
import type { VisitorsPages } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function CafeAndSouvenirs({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  if (isVoid(data) || 
      isEmpty(data) || 
      isVoid(data.cafe_and_souvenirs_page) || 
      isEmpty(data.cafe_and_souvenirs_page)
    ) {
    return <EmptyState />
  }

  const { cafe_and_souvenirs_page } = data;

  const { title, description, cafes_and_souvenirs } = cafe_and_souvenirs_page;

  return (
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
        <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
        <chakra.div maxW={["100%", "100%", "90%", "80%", "70%"]} mt={4} fontSize="lg">
          <Markdown>{description}</Markdown>
        </chakra.div>
        <CardsWithModal data={cafes_and_souvenirs} />
      </CustomContainer>
    </chakra.section>
  );
}

interface PartnerProps {
  page: ApiResponse<VisitorsPages, null>
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getVisitorsPages({locale, isCafeAndSouvenirsPage: true});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page
     }
  }
};