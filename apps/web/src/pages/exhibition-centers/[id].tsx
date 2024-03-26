import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@chakra-ui/next-js';
import { chakra, Container, Heading, Flex, Button, Text, Grid, HStack, StackDivider } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getSingleExibitionCenter } from '@/entities';
import { isVoid, EmptyState, isEmpty, isNotEmpty, isNotVoid } from '@/shared';
import type { ExhibitionCenter } from '@/entities';
import type { ApiResponse } from '@/shared';
import { YoutubeVideoSlider } from '@/features';

export default function ExhibitionCenter({ exhibitionCenter }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = exhibitionCenter;

  const t = useTranslations('ExhibitionCenter');

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }
  
  const { name, description, banner, youtube_gallery, gallery, excursion_phone } = data;

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
            gap={[3, 4, 6, 6, 10]}
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Heading whiteSpace="nowrap" as="h2" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>О музее</Heading>
            <Text textAlign="justify" fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}>{description}</Text>
          </HStack>
        </Container>
      </chakra.section>
      <chakra.section pt={[0, 10, 10, 10, 10]} pb={[0, 10, 10, 10, 10]} pos="relative">
        <Container maxWidth="container.xl" display="flex" flexDir="column" pos="relative">
          <Grid 
            gridTemplateColumns={['1fr', '1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr']}
            gap={5}
          >
          {isNotVoid(gallery) && isNotEmpty(gallery) && gallery.map((image) => (
              <chakra.div 
                key={image.id} 
                h={["300px", "400px", "320px", "400px", "400px"]} 
                pos="relative"
              >
                <Image 
                  fill
                  src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`}
                  alt='Изображение музея'
                  style={{objectFit: 'cover', borderRadius: "12px"}}
                />
              </chakra.div>
            ))}
          </Grid>
        </Container>
      </chakra.section>
      <YoutubeVideoSlider youtube_gallery={youtube_gallery} />
      <chakra.section pt={[0, 10, 10, 10, 10]} pb={10} pos="relative">
        <Container maxWidth="container.xl" display="flex" flexDir="column" pos="relative">
          <HStack 
              divider={<StackDivider borderColor="brand.border" />} 
              gap={[3, 4, 6, 6, 10]}
              flexDir={["column", "column", "row", "row", "row"]}
              alignItems={["flex-start", "flex-start", "center", "center", "center"]}
            >
            <Heading as="h2" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>
              Полезная информация
            </Heading>
            <Grid 
              w="100%"
              gridTemplateColumns={["auto", "auto", "auto", "auto auto auto", "auto auto auto"]}
              justifyContent="space-between"
              gap={4}
            >
              <Flex flexDir="column" gap={2}>
                <chakra.span fontSize='md' color="brand.gray">Режим работы</chakra.span>
                <Flex 
                  flexDir="column" 
                  gap={1} 
                  fontSize={["lg", "xl", "xl", "xl", "xl"]} 
                  color="brand.black"
                >
                  <Grid gridTemplateColumns="1fr 1fr" justifyContent="space-between">
                    <chakra.span>пн</chakra.span>
                    <chakra.span>выходной</chakra.span>
                  </Grid>
                  <Grid gridTemplateColumns="1fr 1fr" justifyContent="space-between">
                    <chakra.span>вт-вс</chakra.span>
                    <chakra.span>10:00 - 19:00</chakra.span>
                  </Grid>
                </Flex>
              </Flex>
              <Flex flexDir="column" gap={2}>
                <chakra.span fontSize='md' color="brand.gray">Билеты</chakra.span>
                <Link 
                  href="/tickets" 
                  fontSize={["lg", "xl", "xl", "xl", "xl"]} 
                  color="brand.black"
                >
                  Посмотреть цены
                </Link>
              </Flex>
              {isNotEmpty(excursion_phone) && (
                <Flex flexDir="column" gap={2}>
                  <chakra.span fontSize='md' color="brand.gray">Заказать экскурсию</chakra.span>
                  <Link 
                    href={`tel:${excursion_phone}`} 
                    target='_blank' 
                    fontSize={["lg", "xl", "xl", "xl", "xl"]}
                  >
                    {excursion_phone}
                  </Link>
                </Flex>
              )}
            </Grid>
          </HStack>
        </Container>
      </chakra.section>
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