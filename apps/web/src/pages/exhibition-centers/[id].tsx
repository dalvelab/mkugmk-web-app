import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";
import {
  chakra,
  Container,
  Heading,
  Flex,
  Button,
  Grid,
  HStack,
  StackDivider,
} from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { getSingleExibitionCenter } from "@/entities";
import {
  isVoid,
  EmptyState,
  isEmpty,
  isNotEmpty,
  isNotVoid,
  createWorkingSchedule,
  OpenStatus,
  getWorkingHoursForToday,
  Markdown,
  Gallery,
  useComplexOperationManagement,
  SEO,
  selectScheduleForExhibitionCenter,
} from "@/shared";
import { OrderCall, YoutubeVideoSlider } from "@/features";
import type { ExhibitionCenter } from "@/entities";
import type { ApiResponse } from "@/shared";

export default function ExhibitionCenter({
  exhibitionCenter,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = exhibitionCenter;
  const { locale } = useRouter();

  const t = useTranslations("ExhibitionCenterSingle");
  const complexOperatingSettings = useComplexOperationManagement();

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />;
  }

  const {
    id,
    name,
    description,
    banner,
    youtube_gallery,
    gallery,
    working_time,
    ticket_sale_enabled,
    additional_center,
    is_excursion_available,
  } = data;

  const formattedSchedule = createWorkingSchedule(working_time, locale);
  const workTimeToday = getWorkingHoursForToday({
    data: selectScheduleForExhibitionCenter(
      working_time,
      id,
      complexOperatingSettings?.special_day_operating_hours,
      complexOperatingSettings?.exhibition_centers_including_special_day
    ),
    dayOfWeek: complexOperatingSettings?.dayOfWeek!,
    locale,
    isSpecialDayToday: complexOperatingSettings?.isOpened,
  });

  return (
    <>
      <SEO title={name}>
        <meta
          property="og:title"
          content={`${name} | Музейный комплекс - Верхняя Пышма`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={banner.url} />
      </SEO>
      <chakra.section
        pos="relative"
        h={[
          "calc(100vh - 64px)",
          "calc(100vh - 64px)",
          "calc(100vh - 64px)",
          "calc(100vh - 80px)",
          "calc(100vh - 80px)",
        ]}
        display="flex"
        flexDir="column"
        justifyContent="center"
      >
        <chakra.div
          pos="absolute"
          left={0}
          top={0}
          w="full"
          h="100%"
          bg="black"
          opacity={0.6}
          zIndex={0}
        />
        <chakra.div w="full" h="100%" pos="absolute" zIndex={-1}>
          <Image
            style={{ objectFit: "cover" }}
            src={banner.url}
            fill
            alt="заглавное изображение"
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
            alignItems="flex-start"
            gap={5}
          >
            <Heading
              as="h1"
              fontSize={["3xl", "4xl", "5xl", "5xl", "5xl"]}
              textTransform="uppercase"
              color="white"
            >
              {name}
            </Heading>
            <OpenStatus workTimeToday={workTimeToday} theme="dark" />
            {ticket_sale_enabled && (
              <Link href="/buy-ticket">
                <Button mt={2} size="lg" colorScheme="green">
                  {t("buy_ticket_button")}
                </Button>
              </Link>
            )}
          </Flex>
        </Container>
      </chakra.section>
      <chakra.section pt={[10, 20, 20, 20, 20]} pb={10} pos="relative">
        <Container maxWidth="container.xl" display="flex" pos="relative">
          <HStack
            divider={<StackDivider borderColor="brand.border" />}
            gap={[2, 4, 6, 6, 10]}
            flexDir={["column", "column", "row", "row", "row"]}
            alignItems="flex-start"
          >
            <Heading
              whiteSpace="nowrap"
              as="h2"
              fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}
            >
              {t("about_museum")}
            </Heading>
            <chakra.div textAlign="justify" fontSize="xl">
              <Markdown>{description}</Markdown>
            </chakra.div>
          </HStack>
        </Container>
      </chakra.section>
      {isNotVoid(gallery) && isNotEmpty(gallery) && (
        <chakra.section
          bgColor="brand.black"
          pt={[10, 20, 20, 20, 20]}
          pb={[10, 20, 20, 20, 20]}
          pos="relative"
        >
          <Container
            maxWidth="container.xl"
            display="flex"
            flexDir="column"
            pos="relative"
          >
            <Gallery images={gallery} />
          </Container>
        </chakra.section>
      )}
      {isNotVoid(additional_center) && isNotEmpty(additional_center) && (
        <>
          <chakra.section pt={[10, 20, 20, 20, 20]} pb={10} pos="relative">
            <Container
              maxWidth="container.xl"
              display="flex"
              flexDir="column"
              justifyContent="center"
              pos="relative"
            >
              <HStack
                divider={<StackDivider borderColor="brand.border" />}
                gap={[2, 4, 6, 6, 10]}
                flexDir={["column", "column", "row", "row", "row"]}
                alignItems="flex-start"
              >
                <Heading
                  whiteSpace="nowrap"
                  as="h2"
                  fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}
                >
                  {additional_center[0].title}
                </Heading>
                <chakra.div textAlign="justify" fontSize="xl">
                  <Markdown>{additional_center[0].description}</Markdown>
                </chakra.div>
              </HStack>
            </Container>
          </chakra.section>
          {isNotVoid(additional_center[0].gallery) &&
            isNotEmpty(additional_center[0].gallery) && (
              <chakra.section
                bgColor="brand.black"
                pt={[10, 20, 20, 20, 20]}
                pb={[10, 20, 20, 20, 20]}
                pos="relative"
              >
                <Container
                  maxWidth="container.xl"
                  display="flex"
                  flexDir="column"
                  pos="relative"
                >
                  <Gallery images={additional_center[0].gallery} />
                </Container>
              </chakra.section>
            )}
        </>
      )}
      <YoutubeVideoSlider youtube_gallery={youtube_gallery} />
      <chakra.section
        pt={[10, 20, 20, 20, 20]}
        pb={[10, 20, 20, 20, 20]}
        pos="relative"
      >
        <Container
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <HStack
            divider={<StackDivider borderColor="brand.border" />}
            gap={[3, 4, 6, 6, 10]}
            flexDir={["column", "column", "row", "row", "row"]}
            alignItems={[
              "flex-start",
              "flex-start",
              "center",
              "center",
              "center",
            ]}
          >
            <Grid
              w="100%"
              gridTemplateColumns={[
                "auto",
                "auto",
                "auto",
                "auto auto auto auto",
                "auto auto auto auto",
              ]}
              justifyContent="space-between"
              gap={4}
            >
              <Flex flexDir="column" gap={2}>
                <chakra.span fontSize="xl" color="brand.gray">
                  {t("tickets")}
                </chakra.span>
                <Link
                  href="/visitors/tickets"
                  fontSize="lg"
                  color="brand.black"
                  textDecoration="underline"
                >
                  {t("view_prices_link")}
                </Link>
              </Flex>
              <Flex flexDir="column" gap={2}>
                <chakra.span fontSize="xl" color="brand.gray">
                  Схема проезда
                </chakra.span>
                <Link
                  href="/visitors/navigation"
                  fontSize="lg"
                  color="brand.black"
                  textDecoration="underline"
                >
                  Посмотреть схему
                </Link>
              </Flex>
              {is_excursion_available && (
                <Flex flexDir="column" gap={2}>
                  <chakra.span fontSize="xl" color="brand.gray">
                    Экскурсии
                  </chakra.span>
                  <OrderCall
                    buttonStyles={{
                      alignSelf: "flex-start",
                      fontSize: "lg",
                      textDecor: "underline",
                    }}
                  />
                </Flex>
              )}
              <Flex flexDir="column" gap={2}>
                <chakra.span fontSize="xl" color="brand.gray">
                  {t("working_schedule")}
                </chakra.span>
                <Flex
                  flexDir="column"
                  gap={1}
                  fontSize="lg"
                  color="brand.black"
                >
                  {formattedSchedule.map(({ day, value, id, opened }) => (
                    <Grid key={id} gridTemplateColumns="1fr 1fr" gap={10}>
                      <chakra.span>{day}</chakra.span>
                      <chakra.span color={opened ? "brand.black" : "red.500"}>
                        {value}
                      </chakra.span>
                    </Grid>
                  ))}
                </Flex>
              </Flex>
            </Grid>
          </HStack>
        </Container>
      </chakra.section>
    </>
  );
}

interface ExhibitionCenterProps {
  exhibitionCenter: ApiResponse<ExhibitionCenter, null>;
}

export const getServerSideProps: GetServerSideProps<
  ExhibitionCenterProps
> = async ({ locale, params }) => {
  const id = Number(params?.id);

  const exhibitionCenter = await getSingleExibitionCenter({ id, locale });

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      exhibitionCenter,
    },
  };
};
