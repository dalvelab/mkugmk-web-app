import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, ChakraProps, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface SectionProps extends ChakraProps {
  children: React.ReactNode;
  withBackButton?: boolean;
}

export const CustomContainer: React.FC<SectionProps> = ({ children, withBackButton = false, ...props }) => {
  const { locale, back } = useRouter();

  const text = locale === 'ru' ? 'Назад' : 'Back';

  return (
    <Container {...props}>
      {withBackButton && (
        <Button
          pb={8}
          leftIcon={<ArrowBackIcon />}
          variant="link"
          color="brand.gray"
          fontSize="lg"
          fontWeight="regular"
          _hover={{ textDecoration: 'none', color: 'brand.black' }}
          onClick={back}
        >
          {text}
        </Button>
      )}
      {children}
    </Container>
  )
}