import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslations } from 'next-intl';
import { chakra, Container, Heading, Flex, Button, Text, Grid } from "@chakra-ui/react";

import { getWelcomePage, WelcomeHeroSection, WelcomeGallery } from '@/entities';
import { isVoid, EmptyState, isEmpty, Slider, isNotEmpty, isNotVoid } from '@/shared';
import type { WelcomePage } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function Home({ pageContent }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = pageContent;

  const t = useTranslations('Index');

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }
  
  const { title, description, banner, youtube_gallery, gallery, video_preview } = data;

  return (
    <>
      <chakra.section 
        pos="relative" 
        h="100vh"
        display="flex" 
        flexDir="column"
        justifyContent="center"
      >
        <chakra.div pos="absolute" left={0} top={0} w="full" h="100%" bg="black" opacity={0.6} zIndex={0} />
        <WelcomeHeroSection media={banner} preview={video_preview} />
        <Container
          maxWidth="container.xl"
          mt={[16, 16, 16, 20, 20]}
          display="flex"
          flexDir="column"
          justifyContent="center"
          pos="relative"
          >
          <Flex 
            w={["full", "full", "full", "900px", "900px"]} 
            h="full"
            flexDir="column"
            justifyContent="center"
            alignItems="flex-start">
            <Heading 
              as="h1" 
              fontSize={["3xl", "4xl", "5xl", "5xl", "5xl"]} 
              textTransform="uppercase" 
              color="white"
            >
              {t('name')}
            </Heading>
            <Button mt={10} size="lg" colorScheme="green">
              {t('buy_ticket')}
            </Button>
          </Flex>
        </Container>
      </chakra.section>
      <chakra.section pt={[10, 20, 20, 20, 20]} pb={10} pos="relative">
        <Container 
          maxWidth="container.xl" 
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap={5}>
            <Heading as="h2" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
            <Text textAlign="center" fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}>{description}</Text>
          </Flex>
        </Container>
      </chakra.section>
      <chakra.section pt={[0, 10, 10, 10, 10]} pb={10} pos="relative">
        <Container 
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
          >
          {isNotVoid(gallery) && isNotEmpty(gallery) && (
            <WelcomeGallery images={gallery} />
          )}
        </Container>
      </chakra.section>
      {isNotEmpty(youtube_gallery) && (
        <chakra.section pt={10} pb={10} pos="relative">
          <Container 
            maxWidth="container.xl"
            display="flex"
            flexDir="column"
            pos="relative"
          >
            <Heading as="h3" color="brand.black" fontSize="4xl" pb={5}>Видеогалерея</Heading>
            <Slider length={youtube_gallery.length}>
              {youtube_gallery.map((video) => (
                <Flex 
                  key={video.id} 
                  w={["428px", "500px", "500px", "500px", "500px"]} 
                  flexDir="column"
                  gap={3}
                >
                  <chakra.div 
                    w="full" 
                    h={["240px", "280px", "280px", "280px", "280px"]} 
                    pos="relative"
                  >
                    <chakra.iframe
                      w={["428px", "500px", "500px", "500px", "500px"]} 
                      h={["240px", "280px", "280px", "280px", "280px"]} 
                      borderRadius="12px"
                      src={`https://www.youtube-nocookie.com/embed/${video.video_id}`} 
                      title="YouTube video player" 
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  </chakra.div>
                  <Text color="brand.black" fontSize="xl">{video.name}</Text>
                </Flex>
              ))}
            </Slider>
          </Container>
        </chakra.section>
      )}
    </>
  );
}

interface HomeProps {
  pageContent: ApiResponse<WelcomePage, null>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({locale}) => {
  const pageContent = await getWelcomePage({locale});

  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default,
      pageContent
     }
  }
};