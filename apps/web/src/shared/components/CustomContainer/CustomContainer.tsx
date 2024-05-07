import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ChakraProps, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface SectionProps extends ChakraProps {
  children: React.ReactNode;
  withBackButton?: boolean;
}

export const CustomContainer: React.FC<SectionProps> = ({
  children,
  withBackButton = false,
  ...props
}) => {
  const { locale, back } = useRouter();

  const text = locale === "ru" ? "Назад" : "Back";

  return (
    <Container {...props}>
      {withBackButton && (
        <Button
          mb={[4, 8, 8, 8, 8]}
          leftIcon={<ArrowBackIcon />}
          variant="link"
          color="brand.gray"
          fontSize={["md", "lg", "lg", "lg", "lg"]}
          fontWeight="regular"
          _hover={{ textDecoration: "none", color: "brand.black" }}
          onClick={back}
          justifySelf="flex-start"
          alignSelf="flex-start"
        >
          {text}
        </Button>
      )}
      {children}
    </Container>
  );
};
