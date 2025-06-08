import { useRouter } from "next/router";
import { RxChevronDown } from "react-icons/rx";
import { Button, Menu } from "@chakra-ui/react";
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
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          bg={[
            "gray.100",
            "gray.100",
            "gray.100",
            "transparent",
            "transparent",
          ]}
          fontWeight="500"
          as={Button}
          fontSize={size === "sm" ? "md" : "lg"}
          _active={{ bg: "gray.100" }}
          py={size === "sm" ? 4 : 6}
        >
          {locale === "ru" ? "RU" : "EN"} <RxChevronDown />
        </Button>
      </Menu.Trigger>
      <Menu.Content p={2} minW="auto" fontSize={size === "sm" ? "md" : "lg"}>
        <Menu.Item
          value="RU"
          bg={locale === "ru" ? "brand.border" : "transparent"}
          borderRadius="4px"
          onClick={() => handleLanguageChange("ru")}
        >
          RU
        </Menu.Item>
        <Menu.Item
          value="EN"
          bg={locale === "en" ? "brand.border" : "transparent"}
          borderRadius="4px"
          onClick={() => handleLanguageChange("en")}
        >
          EN
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
};
