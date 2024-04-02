import Image from 'next/image';
import { chakra, Flex, Grid, IconButton } from "@chakra-ui/react"
import { ExhibitionCenter } from '@/entities';
import { DeleteIcon } from '@chakra-ui/icons';
import { isNotVoid } from '@/shared';

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
    return (
      <>
        <chakra.div
          w={["32px", "40px", "32px", "32px", "32px"]}
          h={["32px", "40px", "32px", "32px", "32px"]}
          pos="relative"
          borderRadius="50%"
          overflow="hidden"
        >
        <Image
          fill
          src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${exhibition_center.banner.formats?.thumbnail.url}`}
          alt={`Изображение ${exhibition_center.name}`} 
        />
        </chakra.div>
        <chakra.span fontSize={["sm", "md", "md", "md", "sm"]}>{exhibition_center.name}</chakra.span>
      </>
    )
  }

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
              _hover={{bgColor: "brand.border", color: "brand.black"}}
              onClick={isNotVoid(deleteCenterFromSelected) ? () => deleteCenterFromSelected(exhibition_center.id) : undefined}
            />
          </>
          ) : (
            <Description />
          )
        }
    </Flex>
  )
}