import { NavbarLink } from "@/entities/Navbar/ui/NavbarLink";
import { Flex } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

export const VisitorsDropdown = ({}) => {
  const t = useTranslations('Navigation');

  return (
    <Flex flexDir='column' gap={3} alignItems="flex-start">
      <NavbarLink href="/tickets" text={t('visitors_dropdown.tickets')} level={2} />
      <NavbarLink href="/working-hours" text={t('visitors_dropdown.working_schedule')} level={2} />
      <NavbarLink href="/navigation" text={t('visitors_dropdown.navigation')} level={2} />
      <NavbarLink href="/interactive-playground" text={t('visitors_dropdown.interactive_playground')} level={2} />
      <NavbarLink href="/cafe-and-souvenirs" text={t('visitors_dropdown.cafe_and_souvenirs')} level={2} />
    </Flex>
  )
}