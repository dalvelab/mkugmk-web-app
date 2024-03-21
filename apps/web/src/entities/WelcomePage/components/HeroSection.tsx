import Image from "next/image";
import { chakra } from '@chakra-ui/react';

import { StrapiMedia } from "@/shared"

interface WelcomeHeroSectionProps {
  media: StrapiMedia;
}

export const WelcomeHeroSection: React.FC<WelcomeHeroSectionProps> = ({media}) => {
  const type = media.mime.split('/')[0] === 'image' ? 'image' : 'video';

  if (type === 'image') {
    return (
      <chakra.div w="full" h="100vh" pos="absolute" zIndex={-1}>
        <Image style={{objectFit: 'cover'}} src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${media.url}`} fill alt="заглавное изображение" />
      </chakra.div>
    )
  } 

  return (
    <chakra.div w="full" h="100vh" pos="absolute" zIndex={-1} overflow="hidden">
      <video autoPlay muted loop style={{minHeight: "100vh", minWidth: "100%", objectFit: 'cover'}}>
        <source src={`${process.env.NEXT_PUBLIC_FILES_ENDPOINT}${media.url}`} type={media.mime} />
        Your browser does not support the video tag.
      </video>
    </chakra.div>
  )
}