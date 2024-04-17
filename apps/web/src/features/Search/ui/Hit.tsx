import { chakra, Flex, Tag } from "@chakra-ui/react"
import Link from "next/link"

interface HitProps {
  type: 'visitors' | 'news' | 'exhibition_center';
  link: string;
  title: string;
  closeModal: VoidFunction;
}

export const Hit: React.FC<HitProps> = ({ closeModal, title, type, link }) => {
  const tagMap: Record<HitProps["type"], string> = {
    'exhibition_center': 'о музее',
    'news': 'новости',
    'visitors': 'посетителям'
  }

  const tagColorScheme: Record<HitProps["type"], string> = {
    'exhibition_center': 'green',
    'news': 'blue',
    'visitors': 'purple'
  }

  return (
    <Link href={`/visitors/${link}`} onClick={closeModal}>
      <Flex
        py={2}
        px={5}
        _hover={{bgColor: "#F4F4F5"}} 
        borderRadius={4}
        flexDir="column"
        alignItems="flex-start"
        gap={2}
      >
        <Tag size="sm" colorScheme={tagColorScheme[type]}>{tagMap[type]}</Tag>
        <chakra.span fontSize="lg">{title}</chakra.span>
      </Flex>
    </Link>
  )
}