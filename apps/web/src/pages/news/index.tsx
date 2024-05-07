import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  chakra,
  Heading,
  Grid,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { CardEvent, getPaginatedEvents } from "@/entities";
import {
  isVoid,
  EmptyState,
  isEmpty,
  isNotEmpty,
  CustomContainer,
  isNotVoid,
  SEO,
} from "@/shared";
import type { EventWithPagination } from "@/entities";
import type { ApiResponse, StrapiMeta } from "@/shared";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const ruFilter: Record<EventWithPagination["attributes"]["type"], string> = {
  event: "События",
  news: "Новости",
};

const enFilter: Record<EventWithPagination["attributes"]["type"], string> = {
  event: "Events",
  news: "News",
};

export default function Events({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = events;

  const { locale } = useRouter();

  const t = useTranslations("News");

  const [filter, setFilter] = useState<
    EventWithPagination["attributes"]["type"] | undefined
  >();

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />;
  }

  const filteredData = isNotVoid(filter)
    ? data.filter((event) => event.attributes.type === filter)
    : data;

  return (
    <>
      <SEO title={t("title")} />
      <chakra.section pt={6} pb={10} minH="100vh">
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          display="flex"
          flexDir="column"
          pos="relative"
        >
          <Heading as="h1" fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}>
            {t("title")}
          </Heading>
          <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton
                  mt={4}
                  isActive={isOpen}
                  as={Button}
                  border="1px solid"
                  borderColor="brand.border"
                  rightIcon={<ChevronDownIcon fontSize="2xl" />}
                  bg="transparent"
                  _active={{ bgColor: "transparent" }}
                  _hover={{ bgColor: "transparent" }}
                  alignSelf="flex-start"
                >
                  <chakra.div
                    maxW="180px"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                  >
                    {isVoid(filter)
                      ? locale === "ru"
                        ? "Выбрать"
                        : "Select type"
                      : locale === "ru"
                      ? ruFilter[filter]
                      : enFilter[filter]}
                  </chakra.div>
                </MenuButton>
                <MenuList borderColor="brand.300" p={2}>
                  <MenuItem
                    borderRadius={4}
                    _focus={{ bgColor: "transparent" }}
                    _hover={{ bgColor: "rgba(0, 0, 0, 0.04)" }}
                    onClick={() => setFilter("news")}
                  >
                    {locale === "ru" ? ruFilter["news"] : enFilter["news"]}
                  </MenuItem>
                  <MenuItem
                    borderRadius={4}
                    _focus={{ bgColor: "transparent" }}
                    _hover={{ bgColor: "rgba(0, 0, 0, 0.04)" }}
                    onClick={() => setFilter("event")}
                  >
                    {locale === "ru" ? ruFilter["event"] : enFilter["event"]}
                  </MenuItem>
                </MenuList>
              </>
            )}
          </Menu>
          <Grid
            pt={10}
            gridTemplateColumns={[
              "1fr",
              "1fr",
              "1fr 1fr",
              "repeat(3, minmax(300px, 400px))",
              "repeat(3, minmax(300px, 400px))",
            ]}
            gap={[5, 5, 5, 5, 8]}
          >
            {isEmpty(filteredData) && (
              <chakra.span fontSize="xl">
                {locale === "ru"
                  ? "По выбранному фильтру нет данных"
                  : "No data found with selected filter"}
              </chakra.span>
            )}
            {isNotEmpty(filteredData) &&
              filteredData.map((event, index) => (
                <CardEvent key={event.id} event={event} index={index} />
              ))}
          </Grid>
        </CustomContainer>
      </chakra.section>
    </>
  );
}

interface NewsProps {
  events: ApiResponse<EventWithPagination[], StrapiMeta>;
}

export const getServerSideProps: GetServerSideProps<NewsProps> = async ({
  locale,
}) => {
  const events = await getPaginatedEvents({ locale });

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      events,
    },
  };
};
