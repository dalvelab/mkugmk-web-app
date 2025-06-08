import { RxArrowLeft } from "react-icons/rx";
import { Button, Container, BoxProps } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface SectionProps extends BoxProps {
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
          variant="ghost"
          color="brand.gray"
          fontSize={["md", "lg", "lg", "lg", "lg"]}
          fontWeight="regular"
          _hover={{ textDecoration: "none", color: "brand.black" }}
          onClick={back}
          justifySelf="flex-start"
          alignSelf="flex-start"
        >
          <RxArrowLeft /> {text}
        </Button>
      )}
      {children}
    </Container>
  );
};
