import { ArrowUpIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"

export const ScrollUpButton = () => {
    const isScrolled = true;

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        isScrolled ? (
            <IconButton
                colorScheme="black"
                pos="fixed"
                right={2}
                bottom={2}
                mb={2}
                isRound
                icon={<ArrowUpIcon />}
                bg="brand.black"
                color='white'
                aria-label="Кнопка наверх"
                zIndex={1}
                onClick={scrollToTop}
            >
            </IconButton>
        ) : null
    )
}