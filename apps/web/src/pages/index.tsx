import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  chakra,
  Container,
  Heading,
  Flex,
  Button,
  Grid,
} from "@chakra-ui/react";

import {
  getWelcomePage,
  WelcomeHeroSection,
  getComplexOperationManagement,
  ExhibitionCenterCard,
} from "@/entities";
import {
  isVoid,
  EmptyState,
  isEmpty,
  isNotVoid,
  OpenStatus,
  useComplextOperatingHours,
  Markdown,
} from "@/shared";
import type { ComplexOperationManagement, WelcomePage } from "@/entities";
import type { ApiResponse } from "@/shared";
import { YoutubeVideoSlider } from "@/features";
import { useRouter } from "next/router";
import { getWorkingHoursForToday } from "@/shared/utils/dates";
import { motion } from "framer-motion";

export default function Home({
  pageContent,
  complexSettings,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = pageContent;
  const { data: complexSettingsData } = complexSettings;

  const { locale } = useRouter();

  const t = useTranslations("Index");
  const complexOperatingSettings = useComplextOperatingHours();

  if (isVoid(data) || isEmpty(data) || isVoid(complexSettingsData)) {
    return <EmptyState />;
  }

  const {
    title,
    description,
    banner,
    youtube_gallery,
    video_preview,
    exhibition_centers,
  } = data;

  const dayOfWeek = new Date(
    new Date().toLocaleString("en", { timeZone: "Asia/Yekaterinburg" })
  ).getDay();

  const workTimeToday = isNotVoid(complexSettingsData.common_operating_hours)
    ? getWorkingHoursForToday({
        data: isNotVoid(complexOperatingSettings?.special_day_operating_hours)
          ? complexOperatingSettings.special_day_operating_hours
          : complexSettingsData.common_operating_hours,
        dayOfWeek,
        locale,
        isSpecialDayToday: complexOperatingSettings?.isOpened,
      })
    : undefined;

  return (
    <>
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
            as={motion.div}
            display="flex"
            w={["full", "full", "full", "900px", "900px"]}
            h="full"
            flexDir="column"
            justifyContent="center"
            alignItems="flex-start"
            gap={5}
            initial={{ opacity: 0, transform: "translateY(-100%)" }}
            whileInView={{ opacity: 1, transform: "translateY(0)" }}
            viewport={{ once: true }}
          >
            <Heading
              as="h1"
              fontSize={["3xl", "4xl", "5xl", "5xl", "5xl"]}
              textTransform="uppercase"
              color="white"
            >
              {t("name")}
            </Heading>
            <OpenStatus workTimeToday={workTimeToday} theme="dark" />
            <Link href="/buy-ticket">
              <Button mt={2} size="lg" colorScheme="green">
                {t("buy_ticket")}
              </Button>
            </Link>
          </Flex>
        </Container>
      </chakra.section>
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
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            gap={5}
          >
            <Heading as="h2" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>
              {title}
            </Heading>
            <chakra.div
              textAlign="center"
              fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
              maxW={["100%", "100%", "100%", "100%", "80%"]}
            >
              <Markdown>{description}</Markdown>
            </chakra.div>
          </Flex>
        </Container>
      </chakra.section>
      <chakra.section pb={10} pos="relative" display="flex" flexDir="column">
        <Container
          maxWidth="container.xl"
          minH="50vh"
          display="flex"
          flexDir="column"
          alignItems="flex-start"
          pos="relative"
          gap={6}
        >
          <Grid
            templateColumns={["1fr", "1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
            w="100%"
            gap={5}
          >
            {exhibition_centers.map((exhibition_center) => (
              <ExhibitionCenterCard
                key={exhibition_center.id}
                exhibition_center={exhibition_center}
                dayOfWeek={dayOfWeek}
                locale={locale}
              />
            ))}
          </Grid>
        </Container>
      </chakra.section>
      <YoutubeVideoSlider youtube_gallery={youtube_gallery} />
    </>
  );
}

interface HomeProps {
  pageContent: ApiResponse<WelcomePage, null>;
  complexSettings: ApiResponse<ComplexOperationManagement, null>;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  locale,
}) => {
  const pageContent = await getWelcomePage({ locale });
  const complexSettings = await getComplexOperationManagement();

  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default,
      pageContent,
      complexSettings,
    },
  };
};
