import { chakra, Spinner } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

import { useEffect } from "react";

export default function Promo() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://t.me/mk_pyshma";
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <chakra.section
        pt={6}
        pb={10}
        display="flex"
        h="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </chakra.section>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
    },
  };
};
