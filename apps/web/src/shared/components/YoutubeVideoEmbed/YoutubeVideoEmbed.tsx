import { chakra } from "@chakra-ui/react";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeVideoEmbedProps {
  id: string;
}

export const YoutubeVideoEmbed: React.FC<YoutubeVideoEmbedProps> = ({ id }) => {
  return (
    <chakra.div
      w={["428px", "500px", "500px", "500px", "500px"]}
      h={["240px", "280px", "280px", "280px", "280px"]}
      borderRadius="12px"
      overflow="hidden"
    >
      <LiteYouTubeEmbed id={id} title="YouTube Embed" noCookie />
    </chakra.div>
  );
};
