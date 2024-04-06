import Image from 'next/image';
import { chakra, Flex, Heading } from "@chakra-ui/react";
import { isNotVoid, StrapiInfoCard } from '@/shared';

interface CardsWithModalProps {
  data: StrapiInfoCard;
}

export const CardsWithModal: React.FC<CardsWithModalProps> = ({data}) => {
  const { image, name, short_description, type } = data;

  const imageAltMap: Record<typeof data["type"], string> = {
    'cafes_and_souvenirs': `Изображение ${name}`,
    'interactive_playground': `Изображение ${name}`,
    'partners': `Логотип партнера ${name}`
  }

  return (
    <Flex
      w={['100%', '280px', '280px', '280px', '280px']}
      flexDir="column"
      cursor="pointer"
      pos="relative"
      borderRadius="12px"
      boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.09)"
    >
      <chakra.div 
        pos="relative" 
        w='100%'
        h="220px" 
        bgColor="brand.black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderTopLeftRadius="12px"
        borderTopRightRadius="12px"
        overflow="hidden"
      >
        {type === 'partners' ? (
          <Image 
            width={image.width} 
            height={image.height}
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`}
            alt={imageAltMap[type]} 
          />
        ) : (
          <Image 
            fill
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`}
            style={{objectFit: 'cover'}}
            alt={imageAltMap[type]} 
          />
        )}
      </chakra.div>
      <Flex p={4} gap={2} flexDir="column">
        <Heading as="h3" fontSize="lg" fontWeight="medium">{name}</Heading>
        {isNotVoid(short_description) && (
        <chakra.span fontSize="sm" color='brand.gray' lineHeight="110%">{short_description}</chakra.span>
        )}
      </Flex>
    </Flex>
  )
}