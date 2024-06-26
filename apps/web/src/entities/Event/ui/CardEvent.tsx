import Image from "next/image";
import { Flex, Text, chakra } from "@chakra-ui/react";
import removeMd from "remove-markdown";

import { getformatDateLocale, ChakraBox, Link } from "@/shared";

import { EventWithPagination } from "../models";

interface CardEventProps {
  event: EventWithPagination;
  index: number;
}

export const CardEvent: React.FC<CardEventProps> = ({ event, index }) => {
  return (
    <Link href={`/news/${event.id}`}>
      <ChakraBox
        display="flex"
        bg="white"
        height="full"
        flexDir="column"
        cursor="pointer"
        pos="relative"
        borderRadius="12px"
        boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.09)"
        // @ts-ignore
        transition={{
          duration: index < 6 ? 0.15 * index : 0.9,
          ease: "easeInOut",
        }}
        initial={{
          opacity: 0,
          transform: "translateX(-10%)",
        }}
        whileInView={{
          opacity: 1,
          transform: "translateX(0)",
        }}
        viewport={{
          once: true,
        }}
      >
        <chakra.div
          pos="relative"
          w="100%"
          h={["60vw", "60vw", "30vw", "20vw", "276px"]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTopLeftRadius="12px"
          borderTopRightRadius="12px"
          overflow="hidden"
        >
          <Image
            fill
            src={event.attributes.image.data.attributes.url}
            alt={event.attributes.title}
          />
        </chakra.div>
        <Flex p={4} flexGrow={1} flexDir="column">
          <Text fontSize={["lg", "xl", "xl", "lg", "xl"]} fontWeight="semibold">
            {event.attributes.title}
          </Text>
          <chakra.div mt={2} mb={2} fontSize="md" noOfLines={3}>
            {removeMd(event.attributes.description)}
          </chakra.div>
          <Flex mt={2} marginTop="auto" alignSelf="flex-end">
            <chakra.span fontSize="xs" color="brand.gray">
              {getformatDateLocale(new Date(event.attributes.publish_date))}
            </chakra.span>
          </Flex>
        </Flex>
      </ChakraBox>
    </Link>
  );
};
