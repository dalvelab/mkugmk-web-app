import { NavbarLink } from "@/entities";
import { Flex, Grid } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export const VisitorsDropdown = ({}) => {
  const t = useTranslations("Navigation");

  return (
    <Flex flexDir="column" alignItems="flex-start">
      <Grid templateColumns="1fr 1fr" gap={3}>
        <NavbarLink
          href="/visitors/tickets"
          text={t("visitors_dropdown.tickets")}
          level={2}
        />
        <NavbarLink
          href="/visitors/interactive-playground"
          text={t("visitors_dropdown.interactive_playground")}
          level={2}
        />
        <NavbarLink
          href="/visitors/working-hours"
          text={t("visitors_dropdown.working_schedule")}
          level={2}
        />
        <NavbarLink
          href="/visitors/rules"
          text={t("visitors_dropdown.rules")}
          level={2}
        />
        <NavbarLink
          href="/visitors/navigation"
          text={t("visitors_dropdown.navigation")}
          level={2}
        />
        <NavbarLink
          href="/visitors/benefit-tickets-page"
          text={t("visitors_dropdown.benefit_tickets")}
          level={2}
        />
        <NavbarLink href="/faq" text={t("visitors_dropdown.faq")} level={2} />
        <NavbarLink
          href="/visitors/cafe-and-souvenirs"
          text={t("visitors_dropdown.cafe")}
          level={2}
        />
      </Grid>
    </Flex>
  );
};
