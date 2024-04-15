import { NavbarLink } from "@/entities/Navbar/ui/NavbarLink";
import { Flex } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export const VisitorsDropdown = ({}) => {
  const t = useTranslations('Navigation');

  return (
    <Flex flexDir='column' gap={3} alignItems="flex-start">
      <NavbarLink href="/visitors/tickets" text={t('visitors_dropdown.tickets')} level={2} />
      <NavbarLink href="/visitors/working-hours" text={t('visitors_dropdown.working_schedule')} level={2} />
      <NavbarLink href="/visitors/navigation" text={t('visitors_dropdown.navigation')} level={2} />
      <NavbarLink href="/visitors/interactive-playground" text={t('visitors_dropdown.interactive_playground')} level={2} />
      <NavbarLink href="/visitors/cafe-and-souvenirs" text={t('visitors_dropdown.cafe_and_souvenirs')} level={2} />
      <NavbarLink href="/visitors/rules" text={t('visitors_dropdown.rules')} level={2} />
    </Flex>
  )
}