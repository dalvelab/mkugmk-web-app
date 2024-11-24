import { chakra, Container, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslations } from "next-intl";

import { getExibitionCenters, getWorkingHoursPage } from '@/entities';
import {
  isVoid,
  EmptyState,
  isEmpty,
  CustomContainer,
  isNotVoid,
  isNotEmpty,
  SEO,
  getEqualScheduleForExhibitionCenters,
  useComplexOperationManagement,
} from "@/shared";
import type {
  ExhibitionCenter,
  VisitorsPages,
} from "@/entities";
import type { ApiResponse } from "@/shared";
import { OperatingHoursTable, SpecialDaysOperatinHourseTable } from "@/widgets";
import { useRouter } from "next/router";

export default function WorkingHours({
  page,
  exhibitionCenters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  const { locale } = useRouter();
  const t = useTranslations("Working_hours_page");
  const complexOperatingSettings = useComplexOperationManagement();

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />;
  }

  const { title, public_areas } = data;
  const { data: exhibitionCentersData } = exhibitionCenters;

  const mergedExhibitionCentersSchedule = getEqualScheduleForExhibitionCenters(
    exhibitionCentersData,
    locale || "ru"
  );

  const schedule = [...mergedExhibitionCentersSchedule, ...public_areas];

  return (
    <>
      <SEO title={title}>
        <meta
          property="og:title"
          content={`${title} | Музейный комплекс - Верхняя Пышма`}
        />
        <meta property="og:type" content="website" />
      </SEO>
      <chakra.section pt={6}>
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
        </CustomContainer>
      </chakra.section>
      {isNotVoid(complexOperatingSettings) &&
        isNotEmpty(complexOperatingSettings.special_days_operating_hours) && (
          <chakra.section pt={5}>
            <Container maxW="container.xl">
              <Heading
                as="h2"
                fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
                fontWeight="medium"
              >
                {t("operating_hours_holidays")}
              </Heading>
              <SpecialDaysOperatinHourseTable
                data={complexOperatingSettings.special_days_operating_hours}
              />
            </Container>
          </chakra.section>
        )}
      {isNotEmpty(mergedExhibitionCentersSchedule) && (
        <chakra.section pt={10} pb={10}>
          <Container maxW="container.xl">
            <Heading
              as="h2"
              fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
              fontWeight="medium"
            >
              {t("operating_hours_centers_and_public_spaces")}
            </Heading>
            <OperatingHoursTable data={schedule} />
          </Container>
        </chakra.section>
      )}
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<VisitorsPages["working_hours_page"], null>;
  exhibitionCenters: ApiResponse<ExhibitionCenter[], null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getWorkingHoursPage({locale});
  const exhibitionCenters = await getExibitionCenters({locale, isPopulated: true});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
      exhibitionCenters
     }
  }
};