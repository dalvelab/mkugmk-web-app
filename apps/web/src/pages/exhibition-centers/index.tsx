import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Container, Flex, Heading, Text } from "@chakra-ui/react";

import { getExibitionCentersPage, ExhibitionCenterCard } from '@/entities';
import { isVoid ,EmptyState, isEmpty } from '@/shared';
import type { ExhibitionCentersPage } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function ExhibitionCenters({ pageContent }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = pageContent;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  const { title, description, exhibition_centers } = data;

  return (
    <>
      <chakra.section
        pt={8}
        pb={10} 
        pos="relative"
        display="flex" 
        flexDir="column"
      >
        <Container
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Flex flexDir="column" alignItems="flex-start" gap={5}>
            <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
            <Text fontSize={["xl", "xl", "xl", "2xl", "2xl"]}>{description}</Text>
          </Flex>
        </Container>
      </chakra.section>
      <chakra.section
        pb={10} 
        pos="relative"
        display="flex" 
        flexDir="column"
      >
        <Container
          maxWidth="container.xl"
          minH="50vh"
          display="flex"
          flexDir="column"
          alignItems="flex-start"
          pos="relative"
          gap={6}
          >
          {exhibition_centers.map((exhibition_center) => (
            <ExhibitionCenterCard key={exhibition_center.id} exhibition_center={exhibition_center} />
          ))}
        </Container>
      </chakra.section>
    </>
  );
}

interface ExhibitionCentersProps {
  pageContent: ApiResponse<ExhibitionCentersPage, null>
}

export const getServerSideProps: GetServerSideProps<ExhibitionCentersProps> = async ({locale}) => {
  const pageContent = await getExibitionCentersPage({locale});

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      pageContent
     }
  }
};