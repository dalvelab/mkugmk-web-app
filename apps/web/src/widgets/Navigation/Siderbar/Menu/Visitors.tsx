import { Button, Flex } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { Link } from "@/shared";

interface VisitorsProps {
  back: VoidFunction;
  onClick: VoidFunction;
}

export const Visitors: React.FC<VisitorsProps> = ({ back, onClick }) => {
  const t = useTranslations('Navigation');

  return (
    <>
      <Button 
        variant="link" 
        fontWeight="400" 
        color="brand.black" 
        pb={3}
        fontSize="lg"
        leftIcon={<ArrowBackIcon />}
        onClick={back}
        _hover={{textDecoration: "none"}}
      >
        {t('sidebar_back')}
      </Button>
      <Link href="/tickets" onClick={onClick}>{t('visitors_dropdown.tickets')}</Link>
      <Link href="/working-hours" onClick={onClick}>{t('visitors_dropdown.working_schedule')}</Link>
      <Link href="/navigation" onClick={onClick}>{t('visitors_dropdown.navigation')}</Link>
      <Link href="/interactive-playground" onClick={onClick}>{t('visitors_dropdown.interactive_playground')}</Link>
      <Link href="/cafe-and-souvenirs" onClick={onClick}>{t('visitors_dropdown.cafe_and_souvenirs')}</Link>
    </>
  )
}