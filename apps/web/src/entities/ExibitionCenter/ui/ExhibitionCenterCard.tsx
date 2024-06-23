import {
  chakra,
  Button,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { ExhibitionCenter } from "../models";
import Image from "next/image";
import Link from "next/link";
import { getWorkingHoursForToday } from "@/shared/utils/dates";
import { OpenStatus, isNotVoid, useComplextOperatingHours } from "@/shared";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ExhibitionCenterCardProps {
  exhibition_center: ExhibitionCenter;
  dayOfWeek: number;
  locale?: string;
}

export const ExhibitionCenterCard: React.FC<ExhibitionCenterCardProps> = ({
  exhibition_center,
  dayOfWeek,
  locale,
}) => {
  const { id, name, card_description, banner, working_time } =
    exhibition_center;
  const t = useTranslations("ExhibitionCenter");

  const complexOperatingSettings = useComplextOperatingHours();

  const workTimeToday = getWorkingHoursForToday({
    data: isNotVoid(complexOperatingSettings?.special_day_operating_hours)
      ? complexOperatingSettings.special_day_operating_hours
      : working_time,
    dayOfWeek,
    locale,
    isSpecialDayToday: complexOperatingSettings?.isOpened,
  });

  const [isPhone] = useMediaQuery("(max-width: 480px)");

  return (
    <Flex
      as={motion.div}
      h={["320px", "400px", "460px", "380px", "410px"]}
      display="flex"
      boxSizing="border-box"
      border="1px solid"
      borderColor="brand.border"
      borderRadius="12px"
      initial={{ opacity: 0, transform: "translateX(-10%)" }}
      whileInView={{ opacity: 1, transform: "translateX(0)" }}
      viewport={{ once: true }}
      pos="relative"
    >
      <chakra.div w="100%" h="100%" pos="absolute" borderRadius="12px">
        <Image
          src={banner.url}
          fill
          alt="Изображение музея"
          style={{ borderRadius: "12px", objectFit: "cover" }}
        />
        <chakra.div
          w="100%"
          h="100%"
          pos="absolute"
          left={0}
          top={0}
          bgColor="black"
          opacity={0.6}
          borderRadius="12px"
        />
      </chakra.div>
      <Flex
        w="100%"
        gap={6}
        color="white"
        zIndex={2}
        px={[5, 5, 10, 5, 10]}
        flexDirection="column"
        justifyContent="center"
      >
        <OpenStatus
          workTimeToday={workTimeToday}
          theme="dark"
          fontSize={isPhone ? "sm" : "md"}
        />
        <Flex
          maxW="600px"
          gap={[4, 4, 4, 5, 5]}
          flexDir="column"
          alignItems="flex-start"
        >
          <Heading as="h2" fontSize={["xl", "2xl", "2xl", "2xl", "3xl"]}>
            {name}
          </Heading>
          <Text fontSize={["sm", "md", "md", "md", "md"]}>
            {card_description}
          </Text>
          <Link href={`/exhibition-centers/${id}`}>
            <Button
              bgColor="white"
              color="brand.black"
              _hover={{ bgColor: "green.500", color: "white" }}
            >
              {t("more_button")}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
