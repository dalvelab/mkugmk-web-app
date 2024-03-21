import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useLanguage } from "@/shared";

export const LanguageSelect = () => {
    const { language, handleLanguageChange } = useLanguage();

    return (
        <Menu>
            <MenuButton bg="transparent" fontWeight="500" as={Button} rightIcon={<ChevronDownIcon />} _active={{bg: "transparent"}}>
                {language === 'ru' ? 'RU' : 'EN'}
            </MenuButton>
            <MenuList p={2} minW="auto">
                <MenuItem 
                    bg={language === 'ru' ? "brand.border" : "transparent"} 
                    borderRadius="4px" 
                    onClick={() => handleLanguageChange('ru')}
                >
                    RU
                </MenuItem>
                <MenuItem 
                    bg={language === 'en' ? "brand.border" : "transparent"} 
                    borderRadius="4px" 
                    onClick={() => handleLanguageChange('en')}
                >
                    EN
                </MenuItem>
            </MenuList>
        </Menu>
    )
}