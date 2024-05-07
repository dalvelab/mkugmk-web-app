import { useTranslations } from "next-intl";
import { Flex } from "@chakra-ui/react";

import { NavbarLink } from "@/entities/Navbar/ui/NavbarLink";

interface AboutDropdownProps {
  exhibition_centers: {
    id: number;
    name: string;
  }[];
}

export const AboutDropdown: React.FC<AboutDropdownProps> = ({
  exhibition_centers,
}) => {
  const t = useTranslations("Navigation");

  const exhibitionCentersLinkName = t("about_dropdown.exhibition_centers");
  const partnersLinkName = t("about_dropdown.partners");

  return (
    <Flex flexDir="column" gap={3} alignItems="flex-start">
      <NavbarLink
        href="/exhibition-centers"
        text={exhibitionCentersLinkName}
        level={2}
      />
      <Flex pl={5} flexDir="column" gap={2}>
        {exhibition_centers.map(({ id, name }) => (
          <NavbarLink
            key={id}
            href={`/exhibition-centers/${id}`}
            text={name}
            level={3}
          />
        ))}
      </Flex>
      <NavbarLink href="/partners" text={partnersLinkName} level={2} />
    </Flex>
  );
};
