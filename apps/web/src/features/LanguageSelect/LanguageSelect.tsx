import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useLanguage } from "@/shared";

interface LanguageSelectProps {
	size?: 'sm' | 'lg';
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({ size = 'sm'}) => {
  const { language, handleLanguageChange } = useLanguage();

	return (
		<Menu>
			<MenuButton 
				bg={["gray.100", "gray.100", "gray.100", "transparent", "transparent"]}
				fontWeight="500"
				as={Button}
				fontSize={size === 'sm' ? "md" : 'lg'}
				rightIcon={<ChevronDownIcon boxSize={size === 'sm' ? 4 : 6} />} 
				_active={{bg: "gray.100"}}
				py={size === 'sm' ? 4 : 6}
			>
				{language === 'ru' ? 'RU' : 'EN'}
			</MenuButton>
			<MenuList p={2} minW="auto">
				<MenuItem 
					bg={language === 'ru' ? "brand.border" : "transparent"} 
					borderRadius="4px" 
					onClick={() => handleLanguageChange('ru')}
					fontSize="lg"
				>
					RU
				</MenuItem>
				<MenuItem 
					bg={language === 'en' ? "brand.border" : "transparent"} 
					borderRadius="4px" 
					onClick={() => handleLanguageChange('en')}
					fontSize="lg"
				>
					EN
				</MenuItem>
			</MenuList>
		</Menu>
	)
}