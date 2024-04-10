import { chakra, Container, Flex, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getVisitorsPages } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, isNotVoid, isNotEmpty, Markdown, File } from '@/shared';
import type { VisitorsPages } from '@/entities';
import type { ApiResponse } from '@/shared';
import { OtherServicesList, TicketsList } from "@/widgets";

export default function Tickets({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  if (isVoid(data) || 
      isEmpty(data) || 
      isVoid(data.tickets_page) || 
      isEmpty(data.tickets_page)
    ) {
    return <EmptyState />
  }

  const { tickets_page } = data;

  const {
    title,
    description,
    tickets,
    secondary_title,
    secondary_description,
    other_services,
    documents
  } = tickets_page;

  return (
    <>
      <chakra.section pt={6} pb={10}>
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
      {isNotVoid(tickets) && isNotEmpty(tickets) && (
        <TicketsList tickets={tickets} />
      )}
      <chakra.section pt={10} pb={10}>
        <Container maxW="container.xl">
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{secondary_title}</Heading>
          <chakra.div maxW={["100%", "100%", "90%", "80%", "80%"]} mt={4} fontSize="lg">
            <Markdown>{secondary_description}</Markdown>
          </chakra.div>
        </Container>
      </chakra.section>
      {isNotVoid(other_services) && isNotEmpty(other_services) && (
        <OtherServicesList other_services={other_services} />
      )}
      <chakra.section pt={10} pb={10}>
        <Container maxW="container.xl">
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>Документы</Heading>
          <Flex mt={6} gap={6} flexWrap="wrap">
            {documents.map((file) => (
              <File key={file.id} file={file} />
            ))}
          </Flex>
        </Container>
      </chakra.section>
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<VisitorsPages, null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getVisitorsPages({locale, isTicketsPage: true});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
     }
  }
};