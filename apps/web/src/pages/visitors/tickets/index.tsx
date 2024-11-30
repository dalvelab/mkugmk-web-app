import { chakra, Container, Flex, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import removeMarkdown from "remove-markdown";
import { useTranslations } from "next-intl";

import { getTicketsPage } from "@/entities";
import {
  isVoid,
  EmptyState,
  isEmpty,
  CustomContainer,
  isNotVoid,
  isNotEmpty,
  Markdown,
  File,
  SEO,
} from "@/shared";
import type { TicketsAndServicesPage } from "@/entities";
import type { ApiResponse } from "@/shared";
import { OtherServicesList, TicketsList } from "@/widgets";

export default function Tickets({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  const t = useTranslations("Tickets_page");

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />;
  }

  const {
    title,
    description,
    secondary_title,
    secondary_description,
    other_services,
    main_services,
    documents,
  } = data;

  return (
    <>
      <SEO title={title}>
        <meta name="description" content={removeMarkdown(description)} />
        <meta
          property="og:title"
          content={`${title} | Музейный комплекс - Верхняя Пышма`}
        />
        <meta property="og:type" content="website" />
      </SEO>
      <chakra.section pt={6} pb={10}>
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>
            {title}
          </Heading>
          <chakra.div
            maxW={["100%", "100%", "90%", "80%", "80%"]}
            mt={4}
            fontSize="lg"
            textAlign="justify"
          >
            <Markdown>{description}</Markdown>
          </chakra.div>
        </CustomContainer>
      </chakra.section>
      {isNotVoid(main_services) && isNotEmpty(main_services) && (
        <TicketsList main_services={main_services} />
      )}
      <chakra.section pt={10} pb={10}>
        <Container maxW="container.xl">
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>
            {secondary_title}
          </Heading>
          <chakra.div
            maxW={["100%", "100%", "90%", "80%", "80%"]}
            mt={4}
            fontSize="lg"
            textAlign="justify"
          >
            <Markdown>{secondary_description}</Markdown>
          </chakra.div>
        </Container>
      </chakra.section>
      {isNotVoid(other_services) && isNotEmpty(other_services) && (
        <OtherServicesList other_services={other_services} />
      )}
      {isNotVoid(documents) && (
        <chakra.section pt={10} pb={10}>
          <Container maxW="container.xl">
            <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>
              {t("documents")}
            </Heading>
            <Flex mt={6} gap={6} flexWrap="wrap">
              {documents.map((file) => (
                <File key={file.id} file={file} />
              ))}
            </Flex>
          </Container>
        </chakra.section>
      )}
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<TicketsAndServicesPage, null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({
  locale,
}) => {
  const page = await getTicketsPage({ locale });

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
    },
  };
};
