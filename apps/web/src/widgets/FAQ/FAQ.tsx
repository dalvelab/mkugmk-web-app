import { useMemo, useRef, useState } from "react";

import { chakra, Separator, Flex } from "@chakra-ui/react";

import { FaqPage } from "@/entities";
import { RxChevronRight } from "react-icons/rx";
import { CollapsePanel, isNotVoid } from "@/shared";

interface FAQProps {
  questions_with_answers: FaqPage["questions_with_answers"];
}

function generateUniqueTopic(topics: string[]) {
  const unique = new Set<string>();

  topics.forEach((topic) => unique.add(topic));

  return Array.from(unique);
}

export const FAQ: React.FC<FAQProps> = ({ questions_with_answers }) => {
  const [selectedTopic, setSeletedTopic] = useState<string>(
    questions_with_answers[0].topic
  );

  const listRef = useRef<HTMLDivElement | null>(null);

  function onClick(topic: string) {
    setSeletedTopic(topic);

    if (isNotVoid(window.top) && isNotVoid(listRef.current)) {
      window.scrollTo({
        top: listRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }

  const uniqueTopics = useMemo(
    () =>
      generateUniqueTopic(
        questions_with_answers.map((faq) => faq.topic.trim())
      ),
    [questions_with_answers]
  );

  const filteredData = questions_with_answers.filter(
    (faq) => faq.topic === selectedTopic
  );

  return (
    <Flex
      gap={[6, 6, 6, 6, 10]}
      alignItems="flex-start"
      flexDir={["column", "column", "column", "row", "row"]}
    >
      <Flex
        minW="340px"
        maxW="390px"
        w={["100%", "auto", "auto", "auto", "auto"]}
        flexDir="column"
        py={3}
        px={[3, 5, 5, 5, 5]}
        border="1px solid"
        borderColor="brand.border"
        borderRadius={8}
        color="brand.black"
        gap={3}
      >
        <Flex flexDir="column" gap={2}>
          <chakra.span fontSize="xl" fontWeight="semibold">
            Темы
          </chakra.span>
          <Separator borderColor="brand.border" />
        </Flex>
        <Flex flexDir="column" gap={1}>
          {uniqueTopics.map((topic) => (
            <chakra.button
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={4}
              px={4}
              key={topic}
              backgroundColor={topic === selectedTopic ? "#F4F4F5" : "white"}
              _hover={{ bgColor: "#F4F4F5" }}
              borderRadius={8}
              onClick={() => onClick(topic)}
            >
              <chakra.span whiteSpace="pre-wrap" textAlign="left">
                {topic}
              </chakra.span>
              <RxChevronRight fontSize="xl" />
            </chakra.button>
          ))}
        </Flex>
      </Flex>
      <Flex
        w={["100%", "100%", "700px", "700px", "700px"]}
        pos="relative"
        flexDir="column"
        py={3}
        px={[0, 0, 0, 5, 5]}
        gap={3}
        ref={listRef}
      >
        <Flex flexDir="column" gap={2}>
          <chakra.span px={4} fontSize="xl" fontWeight="semibold">
            {selectedTopic}
          </chakra.span>
          <Separator borderColor="brand.border" />
        </Flex>
        <Flex flexDir="column" gap={1}>
          {filteredData.map((topic) => (
            <CollapsePanel
              key={topic.id}
              question={topic.question}
              answer={topic.answer}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
