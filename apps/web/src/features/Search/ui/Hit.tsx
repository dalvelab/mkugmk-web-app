import { isNotVoid } from "@/shared";
import { chakra, Flex, Tag } from "@chakra-ui/react";
import Link from "next/link";

interface HitProps {
  type:
    | "visitors"
    | "news"
    | "exhibition_center"
    | "faq-page"
    | "partners-page"
    | "contacts-page";
  link: string;
  title: string;
  closeModal: VoidFunction;
  caption?: string;
}

export const Hit: React.FC<HitProps> = ({
  closeModal,
  title,
  type,
  link,
  caption,
}) => {
  const tagMap: Record<HitProps["type"], string> = {
    exhibition_center: "о музее",
    news: "новости",
    visitors: "посетителям",
    "faq-page": "часто задаваемые вопросы",
    "partners-page": "партнеры",
    "contacts-page": "контакты",
  };

  const tagColorScheme: Record<HitProps["type"], string> = {
    exhibition_center: "green",
    news: "blue",
    visitors: "purple",
    "faq-page": "orange",
    "partners-page": "gray",
    "contacts-page": "red",
  };

  return (
    <Link href={link} onClick={closeModal}>
      <Flex
        py={2}
        px={5}
        _hover={{ bgColor: "#F4F4F5" }}
        borderRadius={4}
        flexDir="column"
        alignItems="flex-start"
        gap={2}
      >
        <Tag size="sm" colorScheme={tagColorScheme[type]}>
          {tagMap[type]}
        </Tag>
        <Flex flexDir="column">
          <chakra.span fontSize="lg">{title}</chakra.span>
          {isNotVoid(caption) ? (
            <chakra.span noOfLines={1} fontSize="sm" color="brand.gray">
              {caption}
            </chakra.span>
          ) : null}
        </Flex>
      </Flex>
    </Link>
  );
};
