import { Text, chakra } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface EmptyStateProps {
  isPage?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ isPage = true }) => {
  const router = useRouter();

  const locale = router.locale;

  return (
    <chakra.section
      pos="relative"
      minH={isPage ? "100vh" : "auto"}
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="xl" fontWeight="medium">
        {locale === "ru"
          ? "Нет данных для отображения контента"
          : "No data for content rendering"}
      </Text>
    </chakra.section>
  );
};
