import { useTranslations } from "next-intl";
import { chakra, Flex } from "@chakra-ui/react";

import { NavbarLink } from "@/entities/Navbar/ui/NavbarLink";
import { ExhibitionCenter } from "@/entities";

interface AboutDropdownProps {
  exhibition_centers: ExhibitionCenter[];
}

export const AboutDropdown: React.FC<AboutDropdownProps> = ({
  exhibition_centers,
}) => {
  const t = useTranslations("Navigation");

  const exhibitionCentersLinkName = t("about_dropdown.exhibition_centers");
  const partnersLinkName = t("about_dropdown.partners");

  return (
    <Flex flexDir="column" gap={3} alignItems="flex-start">
      <chakra.span>{exhibitionCentersLinkName}</chakra.span>
      <Flex pl={5} flexDir="column" gap={2}>
        {exhibition_centers.map(({ documentId, name }) => (
          <NavbarLink
            key={documentId}
            href={`/exhibition-centers/${documentId}`}
            text={name}
            level={3}
          />
        ))}
      </Flex>
      <NavbarLink href="/partners" text={partnersLinkName} level={2} />
    </Flex>
  );
};
