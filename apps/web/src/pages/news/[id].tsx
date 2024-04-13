import Image from 'next/image';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { chakra, Flex, Heading } from "@chakra-ui/react";

import { getSingleEvent } from '@/entities';
import { getformatDateLocale, isVoid, EmptyState, isEmpty, Markdown, CustomContainer } from '@/shared';
import type { Event } from '@/entities';
import type { ApiResponse } from '@/shared';

export default function SingleNews({ event }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = event;

  if (isVoid(data) || isEmpty(data)) {
    return <EmptyState />
  }
  
  const { title, description, createdAt, image } = data;

  return (
    <chakra.section pt={6} pb={10}>
      <CustomContainer withBackButton maxWidth="container.xl" flexDir="column">
        <Flex flexDir="column">
          <Flex
            gap={[5, 5, 5, 10, 10]}
            alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]}
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
                style={{borderRadius: "8px", objectFit: 'cover'}}
              />
            </chakra.div>
            <Flex flexDir="column" alignItems="flex-start" gap={[1, 1, 1, 2, 2]}>
              <Heading as='h1' fontSize={["2xl", "3xl", "3xl", "3xl", "3xl"]}>{title}</Heading>
              <chakra.span fontSize={["sm", "sm", "sm", "md", "md"]} color="brand.gray">{getformatDateLocale(new Date(createdAt))}</chakra.span>
            </Flex>
          </Flex>
          <chakra.div mt={7} fontSize="lg">
            <Markdown>
              {description}
            </Markdown>
          </chakra.div>
        </Flex>
      </CustomContainer>
    </chakra.section>
  );
}

interface SingleNewsProps {
  event: ApiResponse<Event, null>
}

export const getServerSideProps: GetServerSideProps<SingleNewsProps> = async ({ locale, params }) => {
  const id = Number(params?.id); 

  const event = await getSingleEvent({ id, locale});
  
  return {
    props: {
      messages: (await import(`../../i18n/${locale}.json`)).default,
      event
     }
  }
};