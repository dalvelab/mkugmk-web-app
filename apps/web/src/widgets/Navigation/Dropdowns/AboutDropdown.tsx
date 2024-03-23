import { NavbarLink } from "@/entities/Navbar/ui/NavbarLink";
import { Flex } from "@chakra-ui/react";

interface AboutDropdownProps {
  exhibition_centers: {
    id: number;
    name: string;
  }[] 
}

export const AboutDropdown: React.FC<AboutDropdownProps> = ({exhibition_centers}) => {
  return (
    <Flex flexDir='column' gap={3} alignItems="flex-start">
      <NavbarLink href="/exhibition-centers" text="Выставочные центры" level={2} />
      <Flex pl={5}>
        {exhibition_centers.map(({id, name}) => (
          <NavbarLink key={id} href="/exhibition-centers" text={name} level={3} />
        ))}
      </Flex>
      <NavbarLink href="/partners" text="Партнеры" level={2} />
    </Flex>
  )
}