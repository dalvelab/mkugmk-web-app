import { RxChevronDown } from "react-icons/rx";
import {
  chakra,
  Collapsible,
  useDisclosure,
  Separator,
} from "@chakra-ui/react";
import { Markdown } from "../Markdown";

interface CollapsePanelProps {
  question: string;
  answer: string;
}

export const CollapsePanel: React.FC<CollapsePanelProps> = ({
  question,
  answer,
}) => {
  const { open, onToggle } = useDisclosure();

  return (
    <>
      <chakra.button
        display="flex"
        px={4}
        py={4}
        _hover={{ bgColor: "#F4F4F5", borderColor: "#F4F4F5" }}
        _focus={{ bgColor: "transparent" }}
        borderBottom="1px solid"
        borderColor={open ? "transparent" : "brand.border"}
        justifyContent="space-between"
        onClick={onToggle}
        gap={5}
      >
        <chakra.span
          whiteSpace="pre-wrap"
          textAlign="left"
          fontWeight="medium"
          fontSize="lg"
        >
          {question}
        </chakra.span>
        <RxChevronDown
          fontSize="2xl"
          transform="auto"
          rotate={open ? "180deg" : "0deg"}
        />
      </chakra.button>
      <Collapsible.Root open={open}>
        <chakra.div px={4} py={4} color="brand.gray" textAlign="justify">
          <Markdown>{answer}</Markdown>
        </chakra.div>
        <Separator borderColor="brand.border" />
      </Collapsible.Root>
    </>
  );
};
