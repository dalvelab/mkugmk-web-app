import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { isNotEmpty } from "@/shared";

interface LanguageSelectProps {
  size?: "sm" | "lg";
}

type SupportedLanguages = "ru" | "en";

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  size = "sm",
}) => {
  const { locale, push, pathname, query } = useRouter();

  const handleLanguageChange = (language: SupportedLanguages) => {
    if (isNotEmpty(query)) {
      push("/", "/", { locale: language });

      return;
    }

    push(pathname, pathname, { locale: language });
  };

  return (
    <Menu>
      <MenuButton
        bg={["gray.100", "gray.100", "gray.100", "transparent", "transparent"]}
        fontWeight="500"
        as={Button}
        fontSize={size === "sm" ? "md" : "lg"}
        rightIcon={<ChevronDownIcon boxSize={size === "sm" ? 4 : 6} />}
        _active={{ bg: "gray.100" }}
        py={size === "sm" ? 4 : 6}
      >
        {locale === "ru" ? "RU" : "EN"}
      </MenuButton>
      <MenuList p={2} minW="auto" fontSize={size === "sm" ? "md" : "lg"}>
        <MenuItem
          bg={locale === "ru" ? "brand.border" : "transparent"}
          borderRadius="4px"
          onClick={() => handleLanguageChange("ru")}
        >
          RU
        </MenuItem>
        <MenuItem
          bg={locale === "en" ? "brand.border" : "transparent"}
          borderRadius="4px"
          onClick={() => handleLanguageChange("en")}
        >
          EN
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
