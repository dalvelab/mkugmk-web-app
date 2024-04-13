import Link from 'next/link';

import { chakra, Flex } from "@chakra-ui/react"
import { FileIcon } from "../Icons"
import { StrapiMedia } from '@/shared/models';
import { isNotVoid } from '@/shared/utils';
import { useRouter } from 'next/router';

interface FileProps {
  file: StrapiMedia;
  name?: string;
}

export const File: React.FC<FileProps> = ({ file, name }) => {
  const { locale } = useRouter();

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
          {isNotVoid(name) ? name : file.name}
        </chakra.span>
        <Link 
          href={file.url} 
          target="_blank"
          style={{lineHeight: '1'}}
        >
          <chakra.span fontSize="xs" lineHeight="1" textDecor="underline" color="brand.gray">
            {locale === 'ru' ? 'посмотреть' : 'view'}
          </chakra.span>
        </Link>
      </Flex>
    </Flex>
  )
}