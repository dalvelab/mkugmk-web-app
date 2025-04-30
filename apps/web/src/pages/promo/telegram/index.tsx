import { Button, chakra } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";

export default function Promo() {
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
      <chakra.a href="https://t.me/mk_pyshma">
        <Button
          size="lg"
          bgColor="#1c93e3"
          _hover={{ bgColor: "#1c93e3" }}
          color="white"
        >
          Перейти в Telegram
        </Button>
      </chakra.a>
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
