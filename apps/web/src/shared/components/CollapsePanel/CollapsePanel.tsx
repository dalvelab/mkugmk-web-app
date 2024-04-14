import { ChevronDownIcon } from "@chakra-ui/icons";
import { chakra, Box, Collapse, useDisclosure, Divider } from "@chakra-ui/react"
import { Markdown } from "../Markdown";

interface CollapsePanelProps {
  question: string;
  answer: string;
}

export const CollapsePanel: React.FC<CollapsePanelProps> = ({ question, answer }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <chakra.button
        display="flex"
        px={4}
        py={4}
        _hover={{bgColor: "#F4F4F5", borderColor: "#F4F4F5"}}
        _focus={{bgColor: "transparent"}}
        borderBottom="1px solid"
        borderColor={isOpen ? 'transparent' : "brand.border"}
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
        <ChevronDownIcon
          fontSize="2xl"
          transform="auto" 
          rotate={isOpen ? '180deg' : '0deg'}
          transition=".2s ease-in-out"
        />
      </chakra.button>
      <Collapse in={isOpen} animateOpacity>
        <chakra.div px={4} py={4} color="brand.gray">
          <Markdown>{answer}</Markdown>
        </chakra.div>
        <Divider borderColor="brand.border" />
      </Collapse>
    </>
  )
}