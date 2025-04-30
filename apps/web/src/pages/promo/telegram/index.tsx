import { chakra, Spinner } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

import { useEffect, useState } from "react";

const TIMER = 2000;

export default function Promo() {
  const [countdown, setCountdown] = useState(TIMER / 1000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
      if (countdown === 1) {
        clearTimeout(timer);
        window.location.href = "https://t.me/mk_pyshma";
      }
    }, TIMER);

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  return (
    <chakra.section
      pt={6}
      pb={10}
      display="flex"
      h="80vh"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      gap={5}
    >
      <Spinner size="xl" />
      <chakra.span fontSize="xl" textAlign="center">
        Переход произойдет через: <br /> {countdown}
      </chakra.span>
    </chakra.section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../../i18n/${locale}.json`)).default,
    },
  };
};
