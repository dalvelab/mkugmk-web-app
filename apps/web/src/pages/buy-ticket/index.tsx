import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Heading, Grid, Flex, Button } from "@chakra-ui/react";
import { useTranslations } from 'next-intl';

import { getContactsPage } from '@/entities';
import { Link, isVoid, EmptyState, isEmpty, isNotEmpty, CustomContainer, Markdown } from '@/shared';
import type { ContactsPage } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function BuyTicket({ page }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = page;

  const t = useTranslations("Buy_Tickets")

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
        <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>{t("title")}</Heading>
      </CustomContainer>
    </chakra.section>
  );
}

interface BuyTicketProps {
  page: ApiResponse<ContactsPage, null>
}

export const getServerSideProps: GetServerSideProps<BuyTicketProps> = async ({locale}) => {
  const page = await getContactsPage({locale});

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      page
     }
  }
};