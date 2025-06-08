import { Link as ChakraNextLink, LinkProps } from "@chakra-ui/react";

export const Link: React.FC<LinkProps> = ({ children, href, ...props }) => {
  return (
    <ChakraNextLink href={href} {...props} _hover={{ textDecoration: "none" }}>
      {children}
    </ChakraNextLink>
  );
};
