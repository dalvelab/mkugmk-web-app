import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useTranslation } from 'next-i18next'
import { chakra, Container, Heading, Flex, Button, Text, Grid } from "@chakra-ui/react";

import { getWelcomePage, WelcomeHeroSection, WelcomeGallery } from '@/entities';
import { isVoid ,EmptyPage, isEmpty, Slider } from '@/shared';
import type { WelcomePageResponse } from '@/entities';
import type { ApiResponse } from '@/shared';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function BuyTicket({ pageContent }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = pageContent;

  const { t } = useTranslation('common');

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
        <Text>Разрабатывается</Text>
      </chakra.section>
    </>
  );
}

interface HomeProps {
  pageContent: ApiResponse<WelcomePageResponse, null>
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({locale}) => {
  const pageContent = await getWelcomePage({locale});

  return {
    props: {
      // @ts-ignore
      ...(await serverSideTranslations(locale, ['common', 'navigation'])),
      pageContent
     }
  }
};