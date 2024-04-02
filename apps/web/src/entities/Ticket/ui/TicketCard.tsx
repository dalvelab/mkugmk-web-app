import Image from 'next/image';
import { chakra, Flex, Grid } from "@chakra-ui/react"
import { ExhibitionCenter } from '@/entities';

interface TicketProps {
  selected: number[];
  exhibition_center: ExhibitionCenter;
  addCenterToSelected: (id: number) => void;
}

export const TicketCard: React.FC<TicketProps> = ({ exhibition_center, addCenterToSelected, selected }) => {
  return (
    <Grid
      key={exhibition_center.id}
      as="button"
      gridTemplateColumns={["44px auto", "44px auto", "44px auto", "44px auto", "52px auto"]}
      p={[4, 4, 3, 4, 5]}
      border="1px solid" 
      bgColor={
        selected.find((id) => id === exhibition_center.id) ? 
        '#F4F4F5' :
        'transparent'}
      borderColor="brand.border"
      gap={4}
      alignItems="center"
      borderRadius="4px"
      onClick={() => addCenterToSelected(exhibition_center.id)}
    >
      <chakra.div
        w={["44px", "44px", "44px", "44px", "52px"]}
        h={["44px", "44px", "44px", "44px", "52px"]}
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
      <chakra.span
        textAlign="left"
        fontSize={["md", "md", "md", "md", "lg"]}
        fontWeight="medium"
      >
        {exhibition_center.name}
      </chakra.span>
    </Grid>
  )
}