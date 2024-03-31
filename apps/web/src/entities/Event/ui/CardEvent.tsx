import Link from "next/link";

import { Flex, Text, chakra, shouldForwardProp } from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import { EventWithPagination } from "..";
import Image from "next/image";
import { getformatDateLocale } from "@/shared";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

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
          transform: 'translateX(-10%)',
        }}
        whileInView={{
          opacity: 1,
          transform: 'translateX(0)',
        }}
        viewport={{
          once: true
        }}
      >
        <chakra.div 
          pos="relative" 
          w='100%' 
          h={["220px", "300px", "240px", "200px", "220px"]}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTopLeftRadius="12px"
          borderTopRightRadius="12px"
          overflow="hidden"
        >
          <Image 
            fill
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${event.attributes.image.data.attributes.url}`}
            style={{objectFit: 'cover'}} 
            alt="Изображение новости" 
          />
        </chakra.div>
        <Flex p={4} flexGrow={1} flexDir="column">
          <Text fontSize={["lg", "xl", "xl", "lg", "xl"]} fontWeight="semibold">{event.attributes.title}</Text>
          <Text mt={2} pb={2} fontSize="md">
            Короткое описание
          </Text>
          <Flex mt={2} marginTop="auto" alignSelf="flex-end">
            <chakra.span fontSize="xs" color="brand.gray">
              {getformatDateLocale(new Date(event.attributes.createdAt))}
            </chakra.span>
          </Flex>
        </Flex>
      </ChakraBox>
    </Link>
  )
}