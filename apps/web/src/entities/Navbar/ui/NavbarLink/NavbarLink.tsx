import { Link } from "@chakra-ui/next-js"

interface NavbarLinkProps {
  level: 1 | 2 | 3;
  text: string;
  href: string;
}

export const NavbarLink: React.FC<NavbarLinkProps> = ({level, text, href}) => {
  return (
    <Link 
      href={href}
      fontWeight={level !== 3 ? 'medium' : 'regular'}
      color={level !== 3 ? 'brand.black' : 'brand.gray'}
      _hover={{textDecoration: 'none', color: 'green.500'}}
    >
      {text}
    </Link>
  )
}