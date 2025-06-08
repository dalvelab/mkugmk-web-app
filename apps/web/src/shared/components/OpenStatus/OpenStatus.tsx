import { StrapiWorkingTime, isVoid } from "@/shared";
import { chakra, Box, Flex, JsxStyleProps } from "@chakra-ui/react";

interface OpenStatusProps {
  workTimeToday?: StrapiWorkingTime;
  theme: "light" | "dark";
  fontSize?: JsxStyleProps["fontSize"];
}

export const OpenStatus: React.FC<OpenStatusProps> = ({
  workTimeToday,
  theme,
  fontSize = "lg",
}) => {
  if (isVoid(workTimeToday)) {
    return null;
  }

  return (
    <Flex gap={3} alignItems="center" pl={1}>
      <Box
        bgColor={workTimeToday.opened ? "green.500" : "red.400"}
        w={3}
        h={3}
        borderRadius="50%"
        pos="relative"
        _after={{
          content: '""',
          w: "10px",
          h: "10px",
          bgColor: workTimeToday.opened
            ? "rgba(16,224,146, .2)"
            : "rgba(248, 119, 139, .2)",
          pos: "absolute",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "auto",
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 1,
          animation: "pulse",
        }}
      />
      <chakra.span
        fontSize={fontSize}
        color={theme === "dark" ? "white" : "brand.black"}
      >
        {workTimeToday.value}
      </chakra.span>
    </Flex>
  );
};
