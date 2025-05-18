import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { chakra, Heading, Grid } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { CardEvent, getPaginatedEvents } from "@/entities";
import {
  isVoid,
  EmptyState,
  isEmpty,
  isNotEmpty,
  CustomContainer,
  SEO,
} from "@/shared";
import type { Event } from "@/entities";
import type { ApiResponse, StrapiMeta } from "@/shared";

export default function Events({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, meta } = events;

  const t = useTranslations("News");

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />;
  }

  return (
    <>
      <SEO title={t("title")} />
      <chakra.section pt={6} pb={10} minH="100vh">
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>
            {t("title")}
          </Heading>
          <Grid
            pt={10}
            gridTemplateColumns={[
              "1fr",
              "1fr",
              "1fr 1fr",
              "repeat(3, minmax(300px, 400px))",
              "repeat(3, minmax(300px, 400px))",
            ]}
            gap={[5, 5, 5, 5, 8]}
          >
            {isNotEmpty(data) &&
              data
                .sort((a, b) =>
                  new Date(b.publish_date) < new Date(a.publish_date) ? -1 : 1
                )
                .map((event, index) => (
                  <CardEvent key={event.id} event={event} index={index} />
                ))}
          </Grid>
        </CustomContainer>
      </chakra.section>
    </>
  );
}

interface NewsProps {
  events: ApiResponse<Event[], StrapiMeta>;
}

export const getServerSideProps: GetServerSideProps<NewsProps> = async ({
  locale,
}) => {
  const events = await getPaginatedEvents({ locale });

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      events,
    },
  };
};
