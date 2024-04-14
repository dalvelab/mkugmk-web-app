import { chakra, Container, Flex, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslations } from "next-intl";

import { getFaqPage } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, isNotVoid, isNotEmpty, Markdown } from '@/shared';
import type { FaqPage, VisitorsPages } from '@/entities';
import type { ApiResponse } from '@/shared';
import { FAQ, OtherServicesList, TicketsList } from "@/widgets";

export default function FAQPage({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  const t = useTranslations("Tickets_page");

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  const { title, description, questions_with_answers } = data;

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
      {isNotVoid(questions_with_answers) && isNotEmpty(questions_with_answers) ? (
        <chakra.section pb={10}>
          <Container maxW="container.xl">
            <FAQ questions_with_answers={questions_with_answers} />
          </Container>
        </chakra.section>
      ) : null}
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<FaqPage, null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getFaqPage({ locale });

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      page,
     }
  }
};