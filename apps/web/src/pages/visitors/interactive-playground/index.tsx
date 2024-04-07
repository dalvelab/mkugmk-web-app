import { chakra, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { CardsWithModal } from '@/widgets';
import { getVisitorsPages } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, Markdown } from '@/shared';
import type { VisitorsPages } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function InteractivePlaygraounds({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  if (isVoid(data) || 
      isEmpty(data) || 
      isVoid(data.interactive_playground_page) || 
      isEmpty(data.interactive_playground_page)
    ) {
    return <EmptyState />
  }

  const { interactive_playground_page } = data;

  const { title, description, interactive_playgrounds } = interactive_playground_page;

  return (
    <chakra.section pt={6} pb={10}>
      <CustomContainer
        withBackButton
        maxWidth="container.xl"
        minH="70vh"
        display="flex"
        flexDir="column"
        pos="relative"
      >
        <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
        <chakra.div maxW={["100%", "100%", "90%", "80%", "70%"]} mt={4}>
          <Markdown>{description}</Markdown>
        </chakra.div>
        <CardsWithModal data={interactive_playgrounds} />
      </CustomContainer>
    </chakra.section>
  );
}

interface PartnerProps {
  page: ApiResponse<VisitorsPages, null>
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getVisitorsPages({locale, isInteractivePlaygroundPage: true});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page
     }
  }
};