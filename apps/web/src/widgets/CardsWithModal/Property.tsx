import { CalendarIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { chakra, Flex } from "@chakra-ui/react";

import { LocationIcon, RubCurrencyIcon } from "@/shared";
import Link from "next/link";

interface PropertyProps {
  variant: 'email' | 'phone' | 'location' | 'tickets' | 'schedule';
  text: string;
}

export const Property: React.FC<PropertyProps> = ({ text, variant }) => {
  const iconMap: Record<typeof variant, React.ReactElement> = {
    'email': <EmailIcon />,
    'location': <LocationIcon />,
    'phone': <PhoneIcon />,
    'tickets': <RubCurrencyIcon />,
    'schedule': <CalendarIcon />, 
  }

  return (
    <Flex gap={3} alignItems="center" color="brand.gray">
      {iconMap[variant]}
      {variant === 'email' && (
        <Link href={`mailto:${text}`}>
          <chakra.span fontSize="sm">{text}</chakra.span>
        </Link>
      )}
      {variant === 'phone' && (
        <Link href={`tel:${text}`}>
          <chakra.span fontSize="sm">{text}</chakra.span>
        </Link>
      )}
      {variant !== 'email' && variant !== 'phone' && (
        <chakra.span fontSize="sm">{text}</chakra.span>
      )}
    </Flex>
  )
}