import { chakra, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getBenefitTicketsPage } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, Markdown, SEO } from '@/shared';
import type { RulesPage } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function BenefitTickets({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  const { title, description } = data;

  return (
    <>
      <SEO>
        <title>{title} | Музейный комплекс - Верхняя Пышма</title>
        <meta property="og:title" content={`${title} | Музейный комплекс - Верхняя Пышма`} />
        <meta property="og:type" content="website" />
      </SEO>
      <chakra.section pt={6}>
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
          <chakra.div maxW={["100%", "100%", "90%", "80%", "80%"]} mt={4} fontSize="lg" textAlign="justify">
            <Markdown>{description}</Markdown>
          </chakra.div>
        </CustomContainer>
      </chakra.section>
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<RulesPage, null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getBenefitTicketsPage({locale});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
     }
  }
};