import { chakra, keyframes, Button, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ExhibitionCenter } from "../models";
import Image from "next/image";
import Link from "next/link";
import { getWorkingHoursForToday } from "@/shared/utils/dates";
import { OpenStatus } from "@/shared";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ExhibitionCenterCardProps {
  exhibition_center: ExhibitionCenter;
  dayOfWeek: number;
  locale?: string;
}

export const ExhibitionCenterCard: React.FC<ExhibitionCenterCardProps> = ({exhibition_center, dayOfWeek, locale}) => {
  const { id, name, card_description, banner, working_time } = exhibition_center;

  const workTimeToday = getWorkingHoursForToday(working_time,  dayOfWeek, locale);

  const t = useTranslations('ExhibitionCenter');

  return (
    <Flex 
      as={motion.div}
      display="flex"
      w="100%"
      py={[4, 6, 6, 6, 8]}
      px={[4, 6, 6, 6, 10]}
      border="1px solid"
      borderColor="brand.border"
      borderRadius="12px"
      initial={{ opacity: 0, transform: 'translateX(-10%)' }}
      whileInView={{ opacity: 1, transform: 'translateX(0)' }}
      viewport={{ once: true }}
    >
      <Flex
        w="100%"
        justifyContent={["none", "none", "none", "space-between", "space-between"]} 
        gap={5}
        alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]}
        flexDir={["column-reverse", "column-reverse", "column-reverse", "row", "row"]}
      >
        <Flex flexDir="column" gap={[2, 2, 2, 6, 6]} color="brand.black">
          <OpenStatus workTimeToday={workTimeToday} theme='light' />
          <Flex maxW="600px" gap={[4, 4, 4, 5, 5]} flexDir="column" alignItems='flex-start'>
            <Heading 
              as='h2'
              fontSize={["2xl", "3xl", "3xl", "4xl", "4xl"]}
            >
              {name}
            </Heading>
            <Text fontSize="md">{card_description}</Text>
            <Link href={`/exhibition-centers/${id}`}>
              <Button 
                size={["md", "lg", "lg", "lg", "lg"]} 
                bgColor="brand.black" 
                color="white" 
                _hover={{bgColor: "brand.black"}}
              >
                {t('more_button')}
              </Button>
            </Link>
          </Flex>
        </Flex>
        <chakra.div 
          w={["100%", "100%", "100%", "440px", "440px"]} 
          h={["240px", "360px", "380px", "300px", "300px"]} 
          pos="relative"
        >
          <Image 
            src={banner.url} 
            fill 
            alt="Изображение музея"
            style={{objectFit: 'cover', borderRadius: '12px'}}
           />
        </chakra.div>
      </Flex>
    </Flex>
  )
}