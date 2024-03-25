import { chakra, keyframes, Button, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ExhibitionCenter } from "../models";
import Image from "next/image";
import Link from "next/link";

const pulse = keyframes`  
  50% {
    width: 22px;
    height: 22px;
  }   
  100% {
    width: 10px;
    height: 10px;
  } 
`;

interface ExhibitionCenterCardProps {
  exhibition_center: ExhibitionCenter;
}

export const ExhibitionCenterCard: React.FC<ExhibitionCenterCardProps> = ({exhibition_center}) => {
  const { id, name, card_description, banner } = exhibition_center;

  return (
    <Flex 
      w="100%"
      py={[6, 6, 6, 6, 8]}
      px={[6, 6, 6, 6, 10]}
      border="1px solid"
      borderColor="brand.border"
      borderRadius="12px"
    >
      <Flex
        w="100%"
        justifyContent={["none", "none", "none", "space-between", "space-between"]} 
        gap={5}
        alignItems={["flex-start", "flex-start", "flex-start", "center", "center"]}
        flexDir={["column-reverse", "column-reverse", "column-reverse", "row", "row"]}
      >
        <Flex flexDir="column" gap={[2, 2, 2, 6, 6]} color="brand.black">
          <Flex gap={3} alignItems="center" pl={1}>
            <Box 
              bgColor="green.500" 
              w={3} 
              h={3} 
              borderRadius="50%"
              pos="relative"
              _after={{
                content: '""',
                w: '10px',
                h: '10px',
                bgColor: 'rgba(16,224,146, .2)',
                pos: "absolute",
                borderRadius: "50%",
                top: '50%',
                left: '50%',
                transform: "auto",
                translateX: "-50%",
                translateY: "-50%",
                zIndex: 1,
                animation: `${pulse} 2s infinite`
              }}
            />
            <chakra.span fontSize="sm">Сегодня открыто с 9:00 до 19:00</chakra.span>
          </Flex>
          <Flex maxW="600px" gap={[4, 4, 4, 5, 5]} flexDir="column" alignItems='flex-start'>
            <Heading 
              as='h2'
              fontSize={["2xl", "3xl", "3xl", "4xl", "4xl"]}
            >
              {name}
            </Heading>
            <Text fontSize="md">{card_description}</Text>
            <Link href={`/exhibition-centers/${id}`}>
              <Button 
                size={["md", "lg", "lg", "lg", "lg"]} 
                bgColor="brand.black" 
                color="white" 
                _hover={{bgColor: "brand.black"}}
              >
                Подробнее
              </Button>
            </Link>
          </Flex>
        </Flex>
        <chakra.div 
          w={["100%", "100%", "100%", "440px", "440px"]} 
          h={["240px", "360px", "380px", "300px", "300px"]} 
          pos="relative"
        >
          <Image 
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${banner.url}`} 
            fill 
            alt="Изображение музея"
            style={{objectFit: 'cover', borderRadius: '12px'}}
           />
        </chakra.div>
      </Flex>
    </Flex>
  )
}