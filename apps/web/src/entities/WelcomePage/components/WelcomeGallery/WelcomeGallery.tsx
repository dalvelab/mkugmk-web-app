import { chakra, Grid } from "@chakra-ui/react"

import { isNotVoid, StrapiMedia } from "@/shared"
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
        <chakra.div 
          className={styles.gallery_image} 
          key={image.id} 
          pos="relative"
        >
          <Image 
            src={image.url} fill alt="Изображение галереи" style={{objectFit: 'cover'}} 
          />
          <chakra.div display={isNotVoid(image.caption) ? 'block' : 'none'} className={styles.gallery_image_caption}>
            <chakra.span>{image.caption}</chakra.span>
          </chakra.div>
        </chakra.div>
      ))}  
    </Grid>
  )
}