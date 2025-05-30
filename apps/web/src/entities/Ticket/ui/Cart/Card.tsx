import Image from "next/image";
import { chakra, Flex, Grid, IconButton } from "@chakra-ui/react";
import { ExhibitionCenter } from "@/entities";
import { DeleteIcon } from "@chakra-ui/icons";
import { isNotVoid } from "@/shared";

interface CartTicketCardProps {
  exhibition_center: ExhibitionCenter;
  widthDeleteButton?: boolean;
  deleteCenterFromSelected?: (id: number) => void;
}

export const CartTicketCard: React.FC<CartTicketCardProps> = ({
  widthDeleteButton = false,
  exhibition_center,
  deleteCenterFromSelected,
}) => {
  const Description = () => {
    const thumbnail = isNotVoid(exhibition_center.banner.formats)
      ? exhibition_center.banner.formats?.thumbnail.url
      : exhibition_center.banner.url;

    return (
      <>
        <chakra.div
          minW={["32px", "40px", "32px", "32px", "32px"]}
          h={["32px", "40px", "32px", "32px", "32px"]}
          pos="relative"
        >
          <Image
            fill
            src={thumbnail}
            alt={`Изображение ${exhibition_center.name}`}
            style={{ borderRadius: "50%" }}
          />
        </chakra.div>
        <chakra.span fontSize={["sm", "md", "md", "md", "sm"]}>
          {exhibition_center.name}
        </chakra.span>
      </>
    );
  };

  return (
    <Flex
      px={4}
      py={4}
      border="1px solid"
      borderColor="brand.border"
      alignItems="center"
      justifyContent={widthDeleteButton ? "space-between" : "flex-start"}
      gap={4}
      borderRadius="4px"
    >
      {widthDeleteButton ? (
        <>
          <Grid gridTemplateColumns="auto auto" gap={4} alignItems="center">
            <Description />
          </Grid>
          <IconButton
            size="sm"
            bgColor="transparent"
            color="brand.gray"
            icon={<DeleteIcon boxSize={4} />}
            aria-label="удалить выбранный центр"
            _hover={{ bgColor: "brand.border", color: "brand.black" }}
            onClick={
              isNotVoid(deleteCenterFromSelected)
                ? () => deleteCenterFromSelected(exhibition_center.id)
                : undefined
            }
          />
        </>
      ) : (
        <Description />
      )}
    </Flex>
  );
};
