import { useEffect, useState } from "react";
import { RxArrowUp } from "react-icons/rx";
import { chakra, IconButton } from "@chakra-ui/react";

export const ScrollUpButton = () => {
  const [currentScrollY, setCurrentScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return currentScrollY > 120 ? (
    <chakra.div w="full" zIndex={2} pos="sticky" bg="red" bottom={2}>
      <IconButton
        colorPalette="black"
        boxSize={[10, 12, 12, 12, 12]}
        pos="absolute"
        right={4}
        bottom={2}
        mb={2}
        borderRadius="full"
        bgColor="white"
        color="brand.black"
        boxShadow="0 2px 10px 0 #00000026"
        aria-label="Кнопка наверх"
        onClick={scrollToTop}
      >
        <RxArrowUp />
      </IconButton>
    </chakra.div>
  ) : null;
};
