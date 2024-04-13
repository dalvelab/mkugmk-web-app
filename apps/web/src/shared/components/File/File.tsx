import Link from 'next/link';

import { chakra, Flex } from "@chakra-ui/react"
import { FileIcon } from "../Icons"
import { StrapiMedia } from '@/shared/models';
import { isNotVoid } from '@/shared/utils';

interface FileProps {
  file: StrapiMedia;
  name?: string;
}

export const File: React.FC<FileProps> = ({ file, name }) => {
  return (
    <Flex
      w="280px"
      px={5}
      py={4}
      border="1px solid" 
      borderColor="brand.border" 
      alignItems='center' 
      gap={3}
      borderRadius="8px"
    >
      <FileIcon />
      <Flex flexDir='column' gap={0.5} alignItems="flex-start">
        <chakra.span fontSize='sm' lineHeight="1" fontWeight="medium" noOfLines={2}>
          {isNotVoid(name) ? name: file.name}
        </chakra.span>
        <Link 
          href={file.url} 
          target="_blank"
          style={{lineHeight: '1'}}
        >
          <chakra.span fontSize="xs" lineHeight="1" textDecor="underline" color="brand.gray">посмотреть</chakra.span>
        </Link>
      </Flex>
    </Flex>
  )
}