import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Container, Heading, Flex, Button, Text, Grid } from "@chakra-ui/react";

import { getWelcomePage } from '@/entities';
import { isVoid, EmptyState, isEmpty, Slider } from '@/shared';
import type { WelcomePage } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function BuyTicket({ pageContent }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = pageContent;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }

  return (
    <>
      <chakra.section
        pb={10} 
        pos="relative" 
        minH="100vh" 
        display="flex" 
        flexDir="column"
      >
        <Text>Разрабатывается</Text>
      </chakra.section>
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
      messages: (await import(`../../i18n/${locale}.json`)).default,
      pageContent
     }
  }
};