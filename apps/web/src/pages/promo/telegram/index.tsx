import { SEO } from "@/shared";
import { Button, chakra, Flex, Spinner } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const TIMER = 3000;
const TG_LINK = "https://t.me/mk_pyshma";

export default function Promo() {
  const [countdown, setCountdown] = useState(TIMER / 1000);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
      if (countdown === 1) {
        clearTimeout(timer);
        window.location.href = TG_LINK;
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  return (
    <>
      <SEO title="Музейный комплекс | Промо Telegram" />
      <chakra.section
        pt={6}
        pb={10}
        display="flex"
        h="80vh"
        justifyContent="center"
        alignItems="center"
      >
        <Flex flexDir="column" alignItems="center" gap={5}>
          <chakra.span fontSize="xl" textAlign="center">
            Автоматический переход произойдет через: <br /> {countdown}
          </chakra.span>
          <chakra.a href={TG_LINK}>
            <Button
              size="lg"
              bgColor="#1c93e3"
              _hover={{ bgColor: "#1c93e3" }}
              color="white"
            >
              Перейти в Telegram
            </Button>
          </chakra.a>
        </Flex>
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
