import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useLanguage } from "@/shared";

export const LanguageSelect = () => {
  const { language, handleLanguageChange } = useLanguage();

	return (
		<Menu>
			<MenuButton 
				bg={["gray.100", "gray.100", "gray.100", "transparent", "transparent"]}
				fontWeight="500"
				as={Button}
				rightIcon={<ChevronDownIcon />} 
				_active={{bg: "gray.100"}}
			>
				{language === 'ru' ? 'RU' : 'EN'}
			</MenuButton>
			<MenuList p={2} minW="auto">
				<MenuItem 
					bg={language === 'ru' ? "brand.border" : "transparent"} 
					borderRadius="4px" 
					onClick={() => handleLanguageChange('ru')}
					fontSize={["md", "md", "lg", "lg", "lg"]}
				>
					RU
				</MenuItem>
				<MenuItem 
					bg={language === 'en' ? "brand.border" : "transparent"} 
					borderRadius="4px" 
					onClick={() => handleLanguageChange('en')}
					fontSize={["md", "md", "lg", "lg", "lg"]}
				>
					EN
				</MenuItem>
			</MenuList>
		</Menu>
	)
}