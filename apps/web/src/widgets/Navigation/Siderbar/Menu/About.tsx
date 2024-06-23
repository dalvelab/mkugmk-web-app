import { chakra, Button, Flex } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import type { ExhibitionCenter } from "@/entities";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "@/shared";

interface AboutProps {
  exhibition_centers: ExhibitionCenter[];
  back: VoidFunction;
  onClick: VoidFunction;
}

export const About: React.FC<AboutProps> = ({
  back,
  exhibition_centers,
  onClick,
}) => {
  const t = useTranslations("Navigation");

  const exhibitionCentersLinkName = t("about_dropdown.exhibition_centers");
  const partnersLinkName = t("about_dropdown.partners");

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
      <chakra.span>{exhibitionCentersLinkName}</chakra.span>
      <Flex pl={5} flexDir="column" gap={3}>
        {exhibition_centers.map(({ id, name }) => (
          <Link
            key={id}
            href={`/exhibition-centers/${id}`}
            fontSize={["xl", "3xl", "3xl", "3xl", "3xl"]}
            color="brand.gray"
            onClick={onClick}
          >
            {name}
          </Link>
        ))}
      </Flex>
      <Link href="/partners" onClick={onClick}>
        {partnersLinkName}
      </Link>
    </>
  );
};
