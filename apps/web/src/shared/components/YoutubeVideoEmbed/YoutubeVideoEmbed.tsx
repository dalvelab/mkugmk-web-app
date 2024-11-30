import { chakra } from "@chakra-ui/react";

interface YoutubeVideoEmbedProps {
  id: string;
}

export const YoutubeVideoEmbed: React.FC<YoutubeVideoEmbedProps> = ({ id }) => {
  const splittedId = id.split("_");

  if (splittedId.length !== 2) {
    return null;
  }

  return (
    <chakra.div
      w={["428px", "500px", "500px", "500px", "500px"]}
      h={["240px", "280px", "280px", "280px", "280px"]}
      borderRadius="12px"
      overflow="hidden"
    >
      <iframe
        src={`https://vk.com/video_ext.php?oid=${splittedId[0]}&id=${splittedId[1]}&hd=2`}
        width="100%"
        height="100%"
        allow="encrypted-media; fullscreen; picture-in-picture;"
      ></iframe>
    </chakra.div>
  );
};
