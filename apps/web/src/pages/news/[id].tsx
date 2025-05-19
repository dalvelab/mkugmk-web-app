import Image from "next/image";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { chakra, Flex, Heading } from "@chakra-ui/react";
import removeMarkdown from "remove-markdown";

import { getSingleEvent } from "@/entities";
import {
  getformatDateLocale,
  isVoid,
  EmptyState,
  isEmpty,
  Markdown,
  CustomContainer,
  SEO,
} from "@/shared";
import type { Event } from "@/entities";
import type { ApiResponse } from "@/shared";

export default function SingleNews({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = event;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />;
  }

  const { title, description, publish_date, image } = data;

  return (
    <>
      <SEO
        title={title}
        description={removeMarkdown(description).split("\n")[0]}
      >
        <meta property="og:image" content={image.url} />
      </SEO>
      <chakra.section pt={6} pb={10}>
        <CustomContainer
          withBackButton
          maxWidth="container.xl"
          flexDir="column"
        >
          <Flex flexDir="column">
            <Flex
              gap={[5, 5, 5, 10, 10]}
              alignItems={[
                "flex-start",
                "flex-start",
                "flex-start",
                "center",
                "center",
              ]}
              flexDir={["column", "column", "column", "row", "row"]}
            >
              <chakra.div
                pos="relative"
                minW={["full", "full", "75%", "540px", "600px"]}
                h={["248px", "360px", "380px", "380px", "400px"]}
              >
                <Image
                  fill
                  src={image.url}
                  alt="Изображение новости"
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    overflowClipMargin: "unset",
                  }}
                />
              </chakra.div>
              <Flex
                flexDir="column"
                alignItems="flex-start"
                gap={[1, 1, 1, 2, 2]}
              >
                <Heading as="h1" fontSize={["2xl", "3xl", "3xl", "3xl", "3xl"]}>
                  {title}
                </Heading>
                <chakra.span
                  fontSize={["sm", "sm", "sm", "md", "md"]}
                  color="brand.gray"
                >
                  {getformatDateLocale(new Date(publish_date))}
                </chakra.span>
              </Flex>
            </Flex>
            <chakra.div mt={7} fontSize="lg" textAlign="justify">
              <Markdown>{description}</Markdown>
            </chakra.div>
          </Flex>
        </CustomContainer>
      </chakra.section>
    </>
  );
}

interface SingleNewsProps {
  event: ApiResponse<Event, null>;
}

export const getServerSideProps: GetServerSideProps<SingleNewsProps> = async ({
  locale,
  params,
}) => {
  const id = params?.id as string;

  const event = await getSingleEvent({ id, locale });

  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      event,
    },
  };
};
