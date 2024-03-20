import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { chakra, Container, Heading, Flex, Button, Text, Grid } from "@chakra-ui/react";

import { getWelcomePage, WelcomeHeroSection, WelcomeGallery } from '@/entities';
import { isVoid ,EmptyPage, isEmpty, Slider } from '@/shared';
import type { WelcomePageResponse } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function Home({ pageContent }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = pageContent;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyPage />
  }

  const { title, description, banner, youtube_gallery, gallery } = data;

  return (
    <>
      <chakra.section 
        pb={10} 
        pos="relative" 
        minH="100vh" 
        display="flex" 
        flexDir="column"
      >
        <chakra.div pos="absolute" left={0} top={0} w="full" h="100vh" bg="black" opacity={0.6} zIndex={0} />
        <WelcomeHeroSection media={banner} />
        <Container
          maxWidth="container.xl" 
          h={["calc(100vh - 64px)", "calc(100vh - 64px)", "calc(100vh - 80px)", "calc(100vh - 80px)", "calc(100vh - 80px)"]}
          mt={16}
          display="flex"
          flexDir="column"
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
              Музейный комплекс военной и гражданской техники
            </Heading>
            <Button mt={10} size="lg" colorScheme="green">Купить билет</Button>
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
          <Flex flexDir="column" justifyContent="center" alignItems="center" gap={5}>
            <Heading as="h2" fontSize="4xl">{title}</Heading>
            <Text textAlign="center" fontSize="2xl">{description}
            </Text>
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
          <WelcomeGallery images={gallery} />
        </Container>
      </chakra.section>
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
                    src={`https://www.youtube.com/embed/${video.video_id}?feature=oembed`} 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </chakra.div>
                <Text color="brand.black" fontSize="xl">{video.name}</Text>
              </Flex>
            ))}
          </Slider>
        </Container>
      </chakra.section>
    </>
  );
}

interface HomeProps {
  pageContent: ApiResponse<WelcomePageResponse, null>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const pageContent = await getWelcomePage({locale: 'ru'});

  return {
    props: { pageContent }
  }
};