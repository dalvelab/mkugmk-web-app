import Image from 'next/image';
import { chakra, Container, Heading, Flex, Text, Grid } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getPaginatedEvents } from '@/entities';
import { Link, isVoid, EmptyState, isEmpty, isNotEmpty, getformatDateLocale } from '@/shared';
import type { EventWithPagination, PartnerPage } from '@/entities';
import type { ApiResponse, StrapiMeta } from '@/shared';

export default function Events({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = events;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  return (
    <>
      <chakra.section
        pt={8}
        pb={10}
        pos="relative" 
        minH="100vh" 
        display="flex" 
        flexDir="column"
      >
        <Container
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>Новости и события</Heading>
          <Grid
            mt={10}
            gridTemplateColumns={["1fr", "1fr", "1fr 1fr", "repeat(3, minmax(300px, 400px))", "repeat(3, minmax(300px, 400px))"]}
            gap={[5, 5, 5, 5, 8]}
          >
            {isNotEmpty(data) && data.map((event) => (
              <Link key={event.id} href={`/news/${event.id}`}>
                <Flex
                  bg="white"
                  height="full"
                  flexDir="column"
                  cursor="pointer"
                  pos="relative"
                  borderRadius="12px"
                  boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.09)"
                >
                  <chakra.div 
                    pos="relative" 
                    w='100%' 
                    h={["240px", "300px", "260px", "220px", "220px"]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderTopLeftRadius="12px"
                    borderTopRightRadius="12px"
                    overflow="hidden"
                  >
                    <Image 
                      fill
                      src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${event.attributes.image.data.attributes.url}`}
                      style={{objectFit: 'cover'}} 
                      alt="Изображение новости" 
                    />
                  </chakra.div>
                  <Flex p={4} flexGrow={1} flexDir="column">
                    <Text fontSize="xl" fontWeight="semibold">{event.attributes.title}</Text>
                    <Text mt={2} pb={2} fontSize="md">
                      Короткое описание
                    </Text>
                    <Flex mt={2} marginTop="auto" alignSelf="flex-end">
                      <chakra.span fontSize="xs" color="brand.gray">
                        {getformatDateLocale(new Date(event.attributes.createdAt))}
                      </chakra.span>
                    </Flex>
                  </Flex>
                </Flex>
              </Link>
            ))}
          </Grid>
        </Container>
      </chakra.section>
    </>
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