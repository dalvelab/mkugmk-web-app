import { Text, chakra } from '@chakra-ui/react';

export const EmptyPage = () => {
  return (
    <chakra.section 
      pos="relative" 
      minH="100vh" 
      display="flex" 
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="medium">Нет данных для страницы</Text>
    </chakra.section>
  )
}