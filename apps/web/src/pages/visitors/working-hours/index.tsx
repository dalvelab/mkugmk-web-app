import { chakra, Container, Heading } from "@chakra-ui/react";
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { getComplexOperationManagement, getExibitionCenters, getVisitorsPages } from '@/entities';
import { isVoid, EmptyState, isEmpty, CustomContainer, isNotVoid, isNotEmpty } from '@/shared';
import type { ComplexOperationManagement, ExhibitionCenter, VisitorsPages } from '@/entities';
import type { ApiResponse } from '@/shared';
import { OperatingHoursTable, SpecialDaysOperatinHourseTable } from "@/widgets";

export default function WorkingHours({ page, complexSettings, exhibitionCenters }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  if (isVoid(data) || 
      isEmpty(data) || 
      isVoid(data.working_hours_page) || 
      isEmpty(data.working_hours_page)
    ) {
    return <EmptyState />
  }

  const { working_hours_page } = data;

  const { title, public_areas } = working_hours_page;
  const { data: exhibitionCentersData } = exhibitionCenters;
  const { data: complexSettingsData } = complexSettings;

  return (
    <>
      <chakra.section pt={6}>
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{title}</Heading>
        </CustomContainer>
      </chakra.section>
      {isNotVoid(complexSettingsData) && isNotEmpty(complexSettingsData.special_days_operating_hours) && (
        <chakra.section pt={5}>
          <Container maxW="container.xl">
            <Heading
              as="h2"
              fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
              fontWeight="medium"
            >
              График работы в праздничные дни
            </Heading>
            <SpecialDaysOperatinHourseTable data={complexSettingsData.special_days_operating_hours} />
          </Container>
        </chakra.section>
      )}
      {isNotVoid(exhibitionCentersData) && (
        <chakra.section pt={10}>
          <Container maxW="container.xl">
            <Heading
              as="h2"
              fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
              fontWeight="medium"
            >
              График работы выставочных центров
            </Heading>
            <OperatingHoursTable data={exhibitionCentersData} />
          </Container>
        </chakra.section>
      )}
      {isNotEmpty(public_areas) && (
        <chakra.section pt={10}>
          <Container maxW="container.xl">
            <Heading
              as="h2"
              fontSize={["xl", "2xl", "2xl", "2xl", "2xl"]}
              fontWeight="medium"
            >
              График работы выставочных центров
            </Heading>
            <OperatingHoursTable data={public_areas} />
          </Container>
        </chakra.section>
      )}
    </>
  );
}

interface PartnerProps {
  page: ApiResponse<VisitorsPages, null>;
  complexSettings: ApiResponse<ComplexOperationManagement, null>;
  exhibitionCenters: ApiResponse<ExhibitionCenter[], null>;
}

export const getServerSideProps: GetServerSideProps<PartnerProps> = async ({locale}) => {
  const page = await getVisitorsPages({locale, isWorkingHoursPage: true});
  const complexSettings = await getComplexOperationManagement();
  const exhibitionCenters = await getExibitionCenters({locale, isPopulated: true});

  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
      page,
      complexSettings,
      exhibitionCenters
     }
  }
};