import { Button, Flex } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "@/shared";

interface VisitorsProps {
  back: VoidFunction;
  onClick: VoidFunction;
}

export const Visitors: React.FC<VisitorsProps> = ({ back, onClick }) => {
  const t = useTranslations("Navigation");

  return (
    <>
      <Button
        variant="link"
        fontWeight="400"
        color="brand.black"
        pb={3}
        fontSize="lg"
        leftIcon={<ArrowBackIcon />}
        onClick={back}
        _hover={{ textDecoration: "none" }}
      >
        {t("sidebar_back")}
      </Button>
      <Link href="/visitors/tickets" onClick={onClick}>
        {t("visitors_dropdown.tickets")}
      </Link>
      <Link href="/visitors/working-hours" onClick={onClick}>
        {t("visitors_dropdown.working_schedule")}
      </Link>
      <Link href="/visitors/navigation" onClick={onClick}>
        {t("visitors_dropdown.navigation")}
      </Link>
      <Link href="/visitors/interactive-playground" onClick={onClick}>
        {t("visitors_dropdown.interactive_playground")}
      </Link>
      <Link href="/visitors/cafe-and-souvenirs" onClick={onClick}>
        {t("visitors_dropdown.cafe_and_souvenirs")}
      </Link>
      <Link href="/visitors/rules" onClick={onClick}>
        {t("visitors_dropdown.rules")}
      </Link>
      <Link href="/visitors/benefit-tickets-page" onClick={onClick}>
        {t("visitors_dropdown.benefit_tickets")}
      </Link>
      <Link href="/faq" onClick={onClick}>
        {t("visitors_dropdown.faq")}
      </Link>
    </>
  );
};
