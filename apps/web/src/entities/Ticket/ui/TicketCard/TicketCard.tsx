import Image from "next/image";
import { chakra, Grid } from "@chakra-ui/react";
import { ExhibitionCenter } from "@/entities";
import { CheckIcon, LockIcon } from "@chakra-ui/icons";
import { isNotVoid } from "@/shared";

interface TicketProps {
  mode: "default" | "pushkin_card";
  selected: number[];
  exhibition_center: ExhibitionCenter;
  addCenterToSelected: (id: number) => void;
}

export const TicketCard: React.FC<TicketProps> = ({
  exhibition_center,
  addCenterToSelected,
  selected,
  mode,
}) => {
  const isSelected = selected.find((id) => id === exhibition_center.id);
  const disabled =
    selected.length > 0 &&
    mode === "pushkin_card" &&
    !selected.includes(exhibition_center.id);

  const thumbnail = isNotVoid(exhibition_center.banner.formats)
    ? exhibition_center.banner.formats.thumbnail.url
    : exhibition_center.banner.url;

  return (
    <Grid
      as={disabled ? "div" : "button"}
      pos="relative"
      gridTemplateColumns={[
        "44px auto",
        "44px auto",
        "44px auto",
        "44px auto",
        "52px auto",
      ]}
      p={[4, 4, 3, 4, 5]}
      border="1px solid"
      bgColor={isSelected ? "#F4F4F5" : "transparent"}
      borderColor="brand.border"
      gap={4}
      alignItems="center"
      borderRadius="4px"
      onClick={() => addCenterToSelected(exhibition_center.id)}
    >
      {mode === "pushkin_card" && !disabled && (
        <chakra.div pos="absolute" right={0} top="-16px" w="100px" h="28px">
          {isSelected ? (
            <Image
              fill
              sizes=""
              src="/pushkin_card_colored.png"
              alt="Логотип пушкинской карты"
            />
          ) : (
            <Image
              fill
              src="/pushkin_card_default.png"
              alt="Логотип пушкинской карты"
            />
          )}
        </chakra.div>
      )}
      <chakra.div
        w={["44px", "44px", "44px", "44px", "52px"]}
        h={["44px", "44px", "44px", "44px", "52px"]}
        pos="relative"
        borderRadius="50%"
        overflow="hidden"
        color={disabled ? "brand.gray" : "white"}
        bgColor={disabled ? "brand.border" : "green.500"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isSelected && !disabled && <CheckIcon />}
        {!isSelected && !disabled && (
          <Image
            fill
            src={thumbnail}
            alt={`Изображение ${exhibition_center.name}`}
            style={{ objectFit: "cover" }}
          />
        )}
        {disabled && <LockIcon />}
      </chakra.div>
      <chakra.span
        textAlign="left"
        fontSize={["md", "md", "md", "md", "lg"]}
        fontWeight="medium"
        color={disabled && !isSelected ? "brand.gray" : "brand.black"}
      >
        {exhibition_center.name}
      </chakra.span>
    </Grid>
  );
};
