import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Heading, Grid } from "@chakra-ui/react";
import { useTranslations } from 'next-intl';

import { CardEvent, getPaginatedEvents } from '@/entities';
import { isVoid, EmptyState, isEmpty, isNotEmpty, CustomContainer } from '@/shared';
import type { EventWithPagination } from '@/entities';
import type { ApiResponse, StrapiMeta } from '@/shared';

export default function Events({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = events;

  const t = useTranslations('News');

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  return (
    <chakra.section
      pt={6}
      pb={10}
      minH="100vh"
    >
      <CustomContainer
        withBackButton
        maxWidth="container.xl"
        alignItems="flex-start"
        display="flex"
        flexDir="column"
        pos="relative"
      >
        <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{t('title')}</Heading>
        <Grid
          mt={10}
          gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "repeat(3, minmax(300px, 400px))", "repeat(3, minmax(300px, 400px))"]}
          gap={[5, 5, 5, 5, 8]}
        >
          {isNotEmpty(data) && data.map((event, index) => (
            <CardEvent key={event.id} event={event} index={index} />
          ))}
        </Grid>
      </CustomContainer>
    </chakra.section>
  );
}

interface NewsProps {
  events: ApiResponse<EventWithPagination[], StrapiMeta>
}

export const getServerSideProps: GetServerSideProps<NewsProps> = async ({locale}) => {
  const events = await getPaginatedEvents({locale});

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      events
     }
  }
};