import { Button } from "@chakra-ui/react";

import { Link } from "@/shared";
import { useTranslations } from "next-intl";

interface MainProps {
  onClick: VoidFunction;
  setSelectedMenuBlock: (menu: "about" | "visitors" | "main") => void;
}

export const Main: React.FC<MainProps> = ({
  onClick,
  setSelectedMenuBlock,
}) => {
  const t = useTranslations("Navigation");

  return (
    <>
      <Link href="/" onClick={onClick}>
        {t("menu.home")}
      </Link>
      <Button
        variant="link"
        fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}
        lineHeight={["45px", "54px", "54px", "54px", "54px"]}
        _hover={{ textDecoration: "none" }}
        color="brand.black"
        fontWeight="regular"
        onClick={() => setSelectedMenuBlock("about")}
      >
        {t("menu.about")}
      </Button>
      <Button
        variant="link"
        fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}
        lineHeight={["45px", "54px", "54px", "54px", "54px"]}
        _hover={{ textDecoration: "none" }}
        color="brand.black"
        fontWeight="regular"
        onClick={() => setSelectedMenuBlock("visitors")}
      >
        {t("menu.visitors")}
      </Button>
      <Link href="/news" onClick={onClick}>
        {t("menu.news")}
      </Link>
      <Link href="/visitors/cafe-and-souvenirs" onClick={onClick}>
        {t("menu.cafe")}
      </Link>
      <Link href="/contacts" onClick={onClick}>
        {t("menu.contacts")}
      </Link>
      <Link href="/buy-ticket" onClick={onClick}>
        {t("menu.buy-ticket")}
      </Link>
    </>
  );
};
