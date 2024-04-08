import type { GetStaticProps } from "next";

import { Flex, Text, chakra } from '@chakra-ui/react';
import { WarningIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function Custom500() {
  const { locale } = useRouter();

  return (
    <chakra.section 
      minH="calc(100vh - 80px)"
      pos="relative"
      display="flex"
      justifyContent='center'
      alignItems="center"
    >
      <Text textAlign="center" fontSize="2xl">{locale === 'ru' ? '500 - Ошибка на стороне сервера' : '500 - Server-side error occurred'}</Text>
    </chakra.section>
  )
}

export const getStaticProps: GetStaticProps = async ({locale}) => {

  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default,
     }
  }
};