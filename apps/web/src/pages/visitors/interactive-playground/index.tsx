import { chakra, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import removeMarkdown from "remove-markdown";

import { CardsWithModal } from "@/widgets";
import { getInteractivePlaygroundPage } from "@/entities";
import {
  isVoid,
  EmptyState,
  isEmpty,
  CustomContainer,
  Markdown,
  SEO,
} from "@/shared";
import type { VisitorsPages } from "@/entities";
import type { ApiResponse } from "@/shared";

export default function InteractivePlaygrounds({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />;
  }

  const { title, description, interactive_playgrounds } = data;

  return (
    <>
      <SEO title={title} description={removeMarkdown(description)} />
      <chakra.section pt={6} pb={10}>
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          minH="70vh"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>
            {title}
          </Heading>
          <chakra.div
            maxW={["100%", "100%", "90%", "80%", "70%"]}
            mt={4}
            fontSize="lg"
            textAlign="justify"
          >
            <Markdown>{description}</Markdown>
          </chakra.div>
          <CardsWithModal data={interactive_playgrounds} />
        </CustomContainer>
      </chakra.section>
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<VisitorsPages["interactive_playground_page"], null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({
  locale,
}) => {
  const page = await getInteractivePlaygroundPage({ locale });

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
    },
  };
};
