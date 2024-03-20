import { useRef } from "react";

import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { chakra } from "@chakra-ui/react";

import styles from "./styles.module.css";

interface SliderProps {
  length: number;
  children: React.ReactNode;
}

type SwipeDirection = 'left' | 'right';

export const Slider: React.FC<SliderProps> = (props) => {
  const { length, children } = props;

  const elementRef: React.Ref<HTMLDivElement> = useRef(null);

  const handleSwipe = (direction: SwipeDirection) => {
    if (!elementRef.current) {
      return;
    }

    const swipeElement = elementRef.current;

    if (
      swipeElement.scrollLeft + swipeElement.offsetWidth <
        swipeElement.scrollWidth && direction === 'right'
    ) {
      swipeElement.scrollBy({
        left: swipeElement.clientWidth,
        behavior: "smooth",
      });
    }

    if (
      swipeElement.scrollLeft > 0 && direction === 'left'
    ) {
      swipeElement.scrollBy({
        left: -swipeElement.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <chakra.div mt={7}>
      <chakra.div pos="relative">
        {length > 2 && (
          <>
            <chakra.button
              onClick={() => handleSwipe('left')}
              w="40px"
              h="40px"
              borderRadius="full"
              bgColor="brand.black"
              color="white"
              pos="absolute"
              top="50%"
              left="8px"
              transform="auto"
              translateY="-50%"
              zIndex={2}
              display={["none","none", "flex", "flex", "flex"]}
              justifyContent="center"
              alignItems="center"
            >
              <ChevronLeftIcon fontSize={["xl", "3xl", "3xl", "3xl", "3xl"]} />
            </chakra.button>
            <chakra.button
              w="40px"
              h="40px"
              borderRadius="full"
              color="white"
              bgColor="brand.black"
              pos="absolute"
              top="50%"
              right="8px"
              transform="auto"
              translateY="-50%"
              zIndex={2}
              onClick={() => handleSwipe('right')}
              display={["none","none", "flex", "flex", "flex"]}
              justifyContent="center"
              alignItems="center"
            >
              <ChevronRightIcon fontSize={["xl", "3xl", "3xl", "3xl", "3xl"]} />
            </chakra.button>
          </>
        )}
        <chakra.div
          ref={elementRef}
          w="auto"
          display="flex"
          overflowX="scroll"
          gap={3}
          className={styles.wrapper}
        >
          {children}
        </chakra.div>
      </chakra.div>
    </chakra.div>
  );
};
