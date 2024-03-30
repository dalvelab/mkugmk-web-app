import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from 'next-intl';
import { chakra, ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar, Footer } from "@/widgets";
import { chakraMKUGMKConfig, SEO, LanguageProvider } from '@/shared';
import { ScrollUpButton } from "@/features";

const theme = extendTheme({ ...chakraMKUGMKConfig })
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextIntlClientProvider locale={router.locale} messages={pageProps.messages} timeZone="Asia/Yekaterinburg">
      <SEO>
        <title>Музейный комплекс - Верхняя Пышма</title>
        <meta name="description" content="Крупнейший выставочный комплекс военной и автомобильной техники в России. Расположен в г. Верхняя Пышма, ул. Александра Козицына, 2" />
      </SEO>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <LanguageProvider>
            <Navbar />
            <chakra.main pb={8}>
              <Component {...pageProps} />
            </chakra.main>
            <ScrollUpButton />
            <Footer />
          </LanguageProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}

export default App;