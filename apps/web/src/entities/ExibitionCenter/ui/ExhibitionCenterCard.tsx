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
import {
  getWorkingHoursForToday,
  selectScheduleForExhibitionCenter,
} from "@/shared/utils/dates";
import { OpenStatus, useComplexOperationManagement } from "@/shared";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ExhibitionCenterCardProps {
  exhibition_center: ExhibitionCenter;
  isLast?: boolean;
  locale?: string;
}

export const ExhibitionCenterCard: React.FC<ExhibitionCenterCardProps> = ({
  exhibition_center,
  locale,
  isLast,
}) => {
  const { id, name, card_description, banner, working_time } =
    exhibition_center;
  const t = useTranslations("ExhibitionCenter");

  const complexOperatingSettings = useComplexOperationManagement();

  const workTimeToday = getWorkingHoursForToday({
    data: selectScheduleForExhibitionCenter(
      working_time,
      id,
      complexOperatingSettings?.special_day_operating_hours,
      complexOperatingSettings?.exhibition_centers_including_special_day
    ),
    dayOfWeek: complexOperatingSettings?.dayOfWeek!,
    locale,
    isSpecialDayToday: complexOperatingSettings?.isOpened,
  });

  const [isPhone] = useMediaQuery("(max-width: 480px)");

  const height = isLast
    ? ["320px", "400px", "460px", "460px", "500px"]
    : ["320px", "400px", "460px", "380px", "410px"];

  return (
    <Flex
      as={motion.div}
      h={height}
      display="flex"
      boxSizing="border-box"
      border="1px solid"
      borderColor="brand.border"
      borderRadius="12px"
      initial={{ opacity: 0, transform: "translateX(-10%)" }}
      whileInView={{ opacity: 1, transform: "translateX(0)" }}
      viewport={{ once: true }}
      pos="relative"
      _last={
        isLast
          ? { gridColumn: ["auto", "auto", "auto", "span 2", "span 2"] }
          : {}
      }
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
