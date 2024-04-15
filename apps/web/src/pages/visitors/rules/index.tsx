import { chakra, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getRulesPage } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, Markdown } from '@/shared';
import type { RulesPage } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function Rules({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  const { title, description } = data;

  return (
    <chakra.section pt={6}>
      <CustomContainer
        withBackButton
        maxWidth="container.xl"
        display="flex"
        flexDir="column"
        pos="relative"
      >
        <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
        <chakra.div maxW={["100%", "100%", "90%", "80%", "80%"]} mt={4} fontSize="lg">
          <Markdown>{description}</Markdown>
        </chakra.div>
      </CustomContainer>
    </chakra.section>
  );
}

interface PartnerProps {
  page: ApiResponse<RulesPage, null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getRulesPage({locale});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
     }
  }
};