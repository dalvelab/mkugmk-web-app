import { chakra, Grid } from "@chakra-ui/react"

import { StrapiMedia } from "@/shared"
import Image from "next/image";

import styles from './styles.module.css';

interface WelcomeGalleryProps {
  images: StrapiMedia[];
}

export const WelcomeGallery: React.FC<WelcomeGalleryProps> = ({images}) => {
  return (
    <Grid 
      className={styles.gallery} 
      gridTemplateColumns={["1fr 1fr", "1fr 1fr", "1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr"]} 
      gap={[2, 4, 4, 5, 5]}
    >
      {images.map((image) => (
        <chakra.div className={styles.gallery_image} key={image.id} pos="relative" cursor="pointer">
          <Image 
            src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${image.url}`} 
            fill 
            alt="Изображение галереи" 
            style={{objectFit: 'cover'}} 
          />
          {/* <chakra.div 
            pos="absolute" 
            bottom={0}
            left={0}
            w="100%"
            p={5}
            bgColor="rgba(0, 0, 0, 0.4)"
          >
            <chakra.span fontSize="2xl" color="white">TEXT HOVERABLE</chakra.span>
          </chakra.div> */}
        </chakra.div>
      ))}  
    </Grid>
  )
}