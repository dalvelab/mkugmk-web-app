import Image from "next/image";
import { chakra } from '@chakra-ui/react';

import { StrapiMedia, isNotVoid } from "@/shared"

interface WelcomeHeroSectionProps {
  media: StrapiMedia;
  preview?: StrapiMedia;
}

export const WelcomeHeroSection: React.FC<WelcomeHeroSectionProps> = ({media, preview}) => {
  const type = media.mime.split('/')[0] === 'image' ? 'image' : 'video';

  if (type === 'image') {
    return (
      <chakra.div w="full" h="100%" pos="absolute" zIndex={-1}>
        <Image style={{objectFit: 'cover'}} src={media.url} fill alt="заглавное изображение" />
      </chakra.div>
    )
  } 

  return (
    <chakra.div w="full" h="100%" pos="absolute" zIndex={-1} overflow="hidden">
      <video 
        autoPlay
        playsInline
        aria-hidden
        muted
        loop
        tabIndex={-1}
        preload="auto"
        style={{minHeight: "100vh", minWidth: "100%", objectFit: 'cover'}} 
        poster={isNotVoid(preview) ? `${preview.url}` : undefined}
      >
        <source src={media.url} type={media.mime} />
        Your browser does not support the video tag.
      </video>
    </chakra.div>
  )
}