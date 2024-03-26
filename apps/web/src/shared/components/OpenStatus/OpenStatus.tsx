import { StrapiWorkingTime } from "@/shared";
import { chakra, keyframes, Box, Flex } from "@chakra-ui/react"

const pulse = keyframes`  
  50% {
    width: 22px;
    height: 22px;
  }   
  100% {
    width: 10px;
    height: 10px;
  } 
`;

interface OpenStatusProps {
  workTimeToday: StrapiWorkingTime;
  theme: 'light' | 'dark';
}

export const OpenStatus: React.FC<OpenStatusProps> = ({ workTimeToday, theme }) => {
  return (
    <Flex gap={3} alignItems="center" pl={1}>
      <Box 
        bgColor={workTimeToday.opened ? "green.500" : 'red.400'} 
        w={3} 
        h={3} 
        borderRadius="50%"
        pos="relative"
        _after={{
          content: '""',
          w: '10px',
          h: '10px',
          bgColor: workTimeToday.opened ? 'rgba(16,224,146, .2)' : 'rgba(248, 119, 139, .2)',
          pos: "absolute",
          borderRadius: "50%",
          top: '50%',
          left: '50%',
          transform: "auto",
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 1,
          animation: `${pulse} 2s infinite`
        }}
      />
      <chakra.span fontSize="sm" color={theme === 'dark' ? 'white' : 'brand.black'}>{workTimeToday.value}</chakra.span>
    </Flex>
  )
}