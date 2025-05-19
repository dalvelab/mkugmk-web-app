import Image from "next/image";
import { Grid } from "@chakra-ui/react";

import { StrapiMedia } from "@/shared";

export const Gallery = ({ images }: { images: StrapiMedia[] }) => {
  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr", "1fr", "1fr 1fr", "1fr 1fr"]}
      gap={[2, 4, 4, 5, 5]}
      overflow="hidden"
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.url}
          fill
          alt="Изображение галереи"
          style={{
            objectFit: "cover",
            borderRadius: "4px",
            overflowClipMargin: "unset",
          }}
        />
      ))}
    </Grid>
  );
};
