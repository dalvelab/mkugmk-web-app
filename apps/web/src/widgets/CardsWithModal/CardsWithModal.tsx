import Image from "next/image";
import { chakra, Flex, Grid, Heading, useDisclosure } from "@chakra-ui/react";

import { isNotEmpty, isNotVoid, StrapiInfoCard } from "@/shared";

import { CardsModal } from "./CardsModal";
import { useState } from "react";

interface CardsWithModalProps {
  data: StrapiInfoCard[];
}

function imageAltGenerator(name: string, type: StrapiInfoCard["type"]) {
  const imageAltMap: Record<StrapiInfoCard["type"], string> = {
    cafes_and_souvenirs: `Изображение ${name}`,
    interactive_playground: `Изображение ${name}`,
    partners: `Логотип партнера ${name}`,
  };

  return imageAltMap[type];
}

export const CardsWithModal: React.FC<CardsWithModalProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [activeId, setActiveId] = useState<number | undefined>();

  function openModal(index: number) {
    onOpen();
    setActiveId(index);
  }

  return (
    <>
      {isNotVoid(activeId) ? (
        <CardsModal isOpen={isOpen} onClose={onClose} data={data[activeId]} />
      ) : null}
      <Grid
        mt={7}
        gridTemplateColumns={[
          "1fr",
          "1fr 1fr",
          "1fr 1fr 1fr",
          "1fr 1fr 1fr",
          "1fr 1fr 1fr 1fr",
        ]}
        gap={10}
      >
        {isNotEmpty(data) &&
          data.map(({ id, image, name, short_description, type }, index) => (
            <Flex
              key={id}
              w={["100%", "300px", "300px", "300px", "300px"]}
              flexDir="column"
              cursor="pointer"
              pos="relative"
              borderRadius="12px"
              boxShadow="0 2px 4px 0 rgba(0, 0, 0, 0.09)"
              onClick={() => openModal(index)}
            >
              <chakra.div
                pos="relative"
                w="100%"
                h="220px"
                bgColor="brand.black"
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderTopLeftRadius="12px"
                borderTopRightRadius="12px"
                overflow="hidden"
              >
                {type === "partners" ? (
                  <Image
                    width={image.width}
                    height={image.height}
                    src={image.url}
                    alt={imageAltGenerator(name, type)}
                  />
                ) : (
                  <Image
                    fill
                    src={image.url}
                    alt={imageAltGenerator(name, type)}
                  />
                )}
              </chakra.div>
              <Flex p={4} gap={2} flexDir="column">
                <Heading as="h3" fontSize="lg" fontWeight="medium">
                  {name}
                </Heading>
                {isNotVoid(short_description) && (
                  <chakra.span fontSize="sm" color="brand.gray">
                    {short_description}
                  </chakra.span>
                )}
              </Flex>
            </Flex>
          ))}
      </Grid>
    </>
  );
};
