import {
  Button,
  chakra,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

import type { StrapiYoutubeVideo } from "@/shared";
import { isNotEmpty, isNotVoid, Slider, YoutubeVideoEmbed } from "@/shared";
import Link from "next/link";

interface YoutubeVideoSliderProps {
  youtube_gallery?: StrapiYoutubeVideo[];
}

export const YoutubeVideoSlider: React.FC<YoutubeVideoSliderProps> = ({
  youtube_gallery,
}) => {
  return isNotEmpty(youtube_gallery) && isNotVoid(youtube_gallery) ? (
    <chakra.section pt={10} pb={10} pos="relative">
      <Container
        maxWidth="container.xl"
        display="flex"
        flexDir="column"
        pos="relative"
      >
        <Heading as="h3" color="brand.black" fontSize="4xl" pb={5}>
          Видеогалерея
        </Heading>
        <Slider length={youtube_gallery.length}>
          {youtube_gallery.map((video) => (
            <Flex
              key={video.id}
              w={["428px", "500px", "500px", "500px", "500px"]}
              flexDir="column"
              gap={3}
            >
              <chakra.div
                w="full"
                h={["240px", "280px", "280px", "280px", "280px"]}
                pos="relative"
              >
                <YoutubeVideoEmbed id={video.video_id} />
              </chakra.div>
              <Text color="brand.black" fontSize="xl">
                {video.name}
              </Text>
            </Flex>
          ))}
        </Slider>
        <Link href="https://www.youtube.com/@mkugmk" target="_new">
          <Button
            mt={5}
            alignSelf="flex-start"
            bgColor="brand.black"
            color="white"
            _hover={{ bgColor: "brand.black" }}
            _focus={{ bgColor: "brand.black" }}
          >
            Все видео
          </Button>
        </Link>
      </Container>
    </chakra.section>
  ) : null;
};
