import type { AppProps } from "next/app";

import { chakra, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next'

import { Navbar, Footer } from "@/widgets";
import { chakraMKUGMKConfig, SEO, LanguageProvider } from '@/shared';
import { ScrollUpButton } from "@/features";
import { useRouter } from "next/router";

const theme = extendTheme({ ...chakraMKUGMKConfig })

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const pagesWithoutMargin = ['/'];

  const marginTop = pagesWithoutMargin.includes(router.pathname) ? 0 : [16, 16, 16, 20, 20];

  return (
    <>
      <SEO>
        <title>Музейный комплекс - Верхняя Пышма</title>
        <meta name="description" content="Крупнейший выставочный комплекс военной и автомобильной техники в России. Расположен в г. Верхняя Пышма, ул. Александра Козицына, 2" />
      </SEO>
      <ChakraProvider theme={theme}>
        <LanguageProvider>
          <Navbar />
          <chakra.main mt={marginTop}>
            <Component {...pageProps} />
            <ScrollUpButton />
          </chakra.main>
          <Footer />
        </LanguageProvider>
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(App);