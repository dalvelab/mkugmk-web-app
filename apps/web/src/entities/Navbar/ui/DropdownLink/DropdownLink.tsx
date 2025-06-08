import { RxCaretDown } from "react-icons/rx";
import { chakra, Flex, Portal, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";

interface DropdownLinkProps {
  text: string;
  children: React.ReactNode;
}

export const DropdownLink: React.FC<DropdownLinkProps> = ({
  text,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const offsetLeft = dropdownRef.current?.offsetLeft;

  return (
    <chakra.div
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Flex ref={dropdownRef} alignItems="center" gap={1}>
        <Text cursor="pointer">{text}</Text>
        <RxCaretDown
          cursor="pointer"
          transform="auto"
          rotate={visible ? "180deg" : "0deg"}
        />
      </Flex>
      <Portal container={dropdownRef}>
        {visible && (
          <chakra.div pos="absolute" left={`${offsetLeft}px`} top="100%" pt={2}>
            <Flex
              p={4}
              bg="white"
              borderRadius="8px"
              border="1px solid"
              borderColor="brand.border"
              flexDir="column"
              gap={3}
              fontSize="md"
            >
              {children}
            </Flex>
          </chakra.div>
        )}
      </Portal>
    </chakra.div>
  );
};
