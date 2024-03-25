import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Container, Heading, Flex, Button, Text, Grid, HStack, StackDivider } from "@chakra-ui/react";

import { getSingleExibitionCenter, WelcomeHeroSection, WelcomeGallery } from '@/entities';
import { isVoid, EmptyState, isEmpty, Slider, isNotEmpty, isNotVoid } from '@/shared';
import type { ExhibitionCenter } from '@/entities';
import type { ApiResponse } from '@/shared';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function ExhibitionCenter({ exhibitionCenter }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = exhibitionCenter;

  const t = useTranslations('ExhibitionCenter');

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }
  
  const { name, description, banner, youtube_gallery, gallery } = data;

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
        <chakra.div w="full" h="100%" pos="absolute" zIndex={-1}>
          <Image 
            style={{objectFit: 'cover'}} 
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.url}`} 
            fill alt="заглавное изображение" 
          />
        </chakra.div>
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
              {name}
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
          pos="relative"
          >
          <HStack 
            divider={<StackDivider borderColor="brand.border" />} 
            gap={10}
          >
            <Heading whiteSpace="nowrap" as="h2" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>О музее</Heading>
            <Text textAlign="justify" fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}>{description}</Text>
          </HStack>
        </Container>
      </chakra.section>
      <chakra.section pt={[0, 10, 10, 10, 10]} pb={10} pos="relative">
        <Container 
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
          >
          <Grid gridTemplateColumns='1fr 1fr'>
          {isNotVoid(gallery) && isNotEmpty(gallery) && gallery.map((image) => (
              <chakra.div key={image.id} h="400px">
                <Image 
                  fill
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`}
                  alt='Изображение музея'
                />
              </chakra.div>
            ))}
          </Grid>
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

interface ExhibitionCenterProps {
  exhibitionCenter: ApiResponse<ExhibitionCenter, null>
}

export const getServerSideProps: GetServerSideProps<ExhibitionCenterProps> = async ({ locale, params }) => {
  const id = Number(params?.id); 

  const exhibitionCenter = await getSingleExibitionCenter({ id, locale});
  
  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      exhibitionCenter
     }
  }
};