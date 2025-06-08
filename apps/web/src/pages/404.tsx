import type { GetStaticProps } from "next";

import { Text, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Custom404() {
  const { locale } = useRouter();

  return (
    <chakra.section
      minH="calc(100vh - 80px)"
      pos="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" fontSize="2xl">
        {locale === "ru" ? "404 - Страница не найдена" : "404 - Page not found"}
      </Text>
    </chakra.section>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../i18n/${locale}.json`)).default,
    },
  };
};
