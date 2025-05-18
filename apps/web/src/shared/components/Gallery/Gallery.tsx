import Image from "next/image";
import { Grid } from "@chakra-ui/react";

import { ChakraBox, StrapiMedia } from "@/shared";

export const Gallery = ({ images }: { images: StrapiMedia[] }) => {
  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
      gap={[2, 4, 4, 5, 5]}
      overflow="hidden"
    >
      {images.map((image, index) => (
        <ChakraBox
          key={image.id}
          pos="relative"
          h={["300px", "380px", "520px", "400px", "480px"]}
          // @ts-ignore
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          initial={{
            opacity: 0,
            transform: index % 2 ? "translateX(10%)" : "translateX(-10%)",
          }}
          whileInView={{
            opacity: 1,
            transform: "translateX(0)",
          }}
          viewport={{
            once: true,
          }}
        >
          <Image
            src={image.url}
            fill
            alt="Изображение галереи"
            style={{
              objectFit: "cover",
              borderRadius: "4px",
              overflowClipMargin: "unset",
            }}
          />
        </ChakraBox>
      ))}
    </Grid>
  );
};
