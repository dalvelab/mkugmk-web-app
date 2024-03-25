import { NavbarLink } from "@/entities/Navbar/ui/NavbarLink";
import { Flex } from "@chakra-ui/react";
// import { useTranslation } from "react-i18next";

export const VisitorsDropdown = ({}) => {
  // const { t } = useTranslation('navigation');

  // const exhibitionCentersLinkName = t('about_dropdown.exhibition_centers');
  // const partnersLinkName = t('about_dropdown.partners');

  return (
    <Flex flexDir='column' gap={3} alignItems="flex-start">
      <NavbarLink href="/tickets" text="Билеты" level={2} />
      <NavbarLink href="/working-hours" text="График работы" level={2} />
      <NavbarLink href="/navigation" text="Навигация" level={2} />
      <NavbarLink href="/interactive-playground" text="Интерактивная площадка" level={2} />
      <NavbarLink href="/cafe-and-souvenirs" text="Кафе и сувениры" level={2} />
    </Flex>
  )
}