import type { AppProps } from "next/app";

import { chakra, ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Navbar, Footer } from "@/widgets";
import { chakraMKUGMKConfig, SEO } from '@/shared';


const theme = extendTheme({ ...chakraMKUGMKConfig })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO>
        <title>Музейный комплекс - Верхняя Пышма</title>
        <meta name="description" content="Крупнейший выставочный комплекс военной и автомобильной техники в России. Расположен в г. Верхняя Пышма, ул. Александра Козицына, 2" />
      </SEO>
      <ChakraProvider theme={theme}>
        <Navbar />
        <chakra.main>
          <Component {...pageProps} />
        </chakra.main>
        <Footer />
      </ChakraProvider>
    </>
  );
}
