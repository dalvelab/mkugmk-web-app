import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  chakra,
  Flex,
  IconButton,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { HamburgerIcon, WarningIcon } from "@chakra-ui/icons";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { LanguageSelect, Search } from "@/features";
import { DropdownLink, NavbarLink, getExibitionCenters } from "@/entities";
import { isNotEmpty, isNotVoid, useComplexOperationManagement } from "@/shared";

import { Sidebar } from "./Siderbar";
import { AboutDropdown, VisitorsDropdown } from "./Dropdowns";

export const Navbar = () => {
  const t = useTranslations("");
  const { locale } = useRouter();

  const [isLargerThan1100] = useMediaQuery("(min-width: 1100px)");
  const { scrollY } = useScroll();
  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`navigation-${locale}`],
    queryFn: () =>
      getExibitionCenters({
        locale,
        isPopulated: false,
        isClientRequest: true,
      }),
    refetchOnWindowFocus: false,
  });

  const complexOperatingSettings = useComplexOperationManagement();

  const [visible, setVisible] = useState(true);
  const [isOpened, setOpened] = useState(false);
  const [isAlert, setIsAlert] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (isNotVoid(previous) && latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <>
      <chakra.nav
        as={motion.nav}
        w="full"
        h={[16, 16, 16, 20, 20]}
        pos="sticky"
        borderBottom="1px solid"
        borderColor="brand.border"
        bgColor="white"
        top={0}
        left={0}
        zIndex={10}
        paddingInlineStart={4}
        paddingInlineEnd={4}
        transition=".1s, ease-in-out"
        animate={visible ? "visible" : "hidden"}
        variants={{
          visible: { y: 0 },
          hidden: { y: "calc(-100% - 2px)" }, // - 2px for border hide
        }}
      >
        <Flex
          as={motion.div}
          ps={isLargerThan1100 ? 4 : 0}
          display="flex"
          w="full"
          h="full"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          animate={visible ? "visible" : "hidden"}
          variants={{
            visible: { visibility: "visible" },
            hidden: { visibility: "hidden" },
          }}
        >
          <Link href="/">
            <Text fontSize="xl" textTransform="uppercase" fontWeight="bold">
              {t("Navigation.title")}
            </Text>
            <Text lineHeight="14px" fontWeight="medium" fontSize="sm">
              {t("Navigation.city")}
            </Text>
          </Link>
          <Flex
            pos="relative"
            gap={[5, 5, 5, 5, 8]}
            display={isLargerThan1100 ? "flex" : "none"}
            fontSize="lg"
            fontWeight="medium"
            color="brand.black"
          >
            <DropdownLink text={t("Navigation.menu.about")}>
              {isLoading && <Spinner />}
              {isNotVoid(response?.error) ||
                (isError && (
                  <Flex gap={1.5} alignItems="center">
                    <WarningIcon color="red" />
                    <Text fontSize="sm">
                      Произошла ошибка при загрузке данных
                    </Text>
                  </Flex>
                ))}
              {!isLoading && isNotVoid(response?.data) && (
                <AboutDropdown exhibition_centers={response.data} />
              )}
            </DropdownLink>
            <DropdownLink text={t("Navigation.menu.visitors")}>
              <VisitorsDropdown />
            </DropdownLink>
            {locale === "ru" && (
              <NavbarLink
                href="/news"
                text={t("Navigation.menu.news")}
                level={1}
              />
            )}
            <NavbarLink
              href="/visitors/cafe-and-souvenirs"
              text={t("Navigation.menu.cafe")}
              level={1}
            />
            <NavbarLink
              href="/contacts"
              text={t("Navigation.menu.contacts")}
              level={1}
            />
          </Flex>
          <Flex gap={[0, 4, 4, 0, 4]} display="flex" alignItems="center">
            <Link href="/buy-ticket">
              {/* Добавлен div потому что иначен не работает display на кнопке на последнем разрешении */}
              <chakra.div display={["none", "block", "block", "none", "block"]}>
                <Button
                  size={["sm", "sm", "md", "md", "md"]}
                  colorScheme="green"
                >
                  {t("Navigation.buy_ticket")}
                </Button>
              </chakra.div>
            </Link>
            <Flex gap={2} display={isLargerThan1100 ? "flex" : "none"}>
              <Search type="desktop" />
              <LanguageSelect />
            </Flex>
            <IconButton
              display={isLargerThan1100 ? "none" : "block"}
              boxSize={10}
              icon={<HamburgerIcon boxSize={8} />}
              bg="transparent"
              _hover={{ bg: "brand.border" }}
              aria-label="Открыть меню"
              onClick={() => setOpened(true)}
            />
          </Flex>
        </Flex>
      </chakra.nav>
      {isNotVoid(complexOperatingSettings) &&
        isNotVoid(complexOperatingSettings.website_top_warning) &&
        isNotEmpty(complexOperatingSettings.website_top_warning) &&
        isAlert && (
          <Flex
            w="100%"
            py={2}
            px={2}
            bgColor="yellow.300"
            h="auto"
            alignItems="center"
            justifyContent="center"
            zIndex={5}
            gap={[2, 4, 4, 4, 4]}
          >
            <chakra.div fontSize={["sm", "lg", "lg", "xl", "xl"]}>
              {complexOperatingSettings.website_top_warning}
            </chakra.div>
            <Button
              maxW={["80px", "104px", "104px", "104px", "104px"]}
              w="100%"
              size={["sm", "md", "md", "md", "md"]}
              colorScheme="yellow"
              _hover={{ bgColor: "yellow.400" }}
              onClick={() => setIsAlert(false)}
            >
              {t("Common.close")}
            </Button>
          </Flex>
        )}
      <Sidebar
        onClose={() => setOpened(false)}
        isOpened={isOpened}
        exhibition_centers={isNotVoid(response?.data) ? response.data : []}
      />
    </>
  );
};
