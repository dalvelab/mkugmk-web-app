/* eslint-disable @next/next/no-img-element */

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { NextIntlClientProvider } from "next-intl";
import { chakra, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Navbar, Footer } from "@/widgets";
import {
  chakraMKUGMKConfig,
  ComplexOperationManagementProvider,
  SEO,
  YandexMetrika,
} from "@/shared";
import { ScrollUpButton } from "@/features";

import "../shared/styles.css";
import Head from "next/head";

const theme = extendTheme({ ...chakraMKUGMKConfig });
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        {process.env.NEXT_PUBLIC_METRIKA === "production" && (
          <noscript>
            <div>
              <img
                src="https://mc.yandex.ru/watch/97698136"
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        )}
      </Head>
      <YandexMetrika />
      <NextIntlClientProvider
        locale={router.locale}
        messages={pageProps.messages}
        timeZone="Asia/Yekaterinburg"
      >
        <SEO>
          <meta
            name="description"
            content="Крупнейший выставочный комплекс военной и автомобильной техники в России. Расположен в г. Верхняя Пышма, ул. Александра Козицына, 2"
          />
        </SEO>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <ComplexOperationManagementProvider>
              <Navbar />
              <chakra.main pb={8} minH="calc(80vh - 80px)">
                <Component {...pageProps} />
              </chakra.main>
              <ScrollUpButton />
              <Footer />
            </ComplexOperationManagementProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </NextIntlClientProvider>
    </>
  );
}

export default App;
