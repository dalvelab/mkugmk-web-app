import { ArrowUpIcon } from "@chakra-ui/icons"
import { IconButton } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

export const ScrollUpButton = () => {
	const [scrollY, setScrollY] = useState(0); 

	const handleScroll = useCallback(() => {
		setScrollY(window.scrollY);
	}, []);

	useEffect(() => {
			window.addEventListener("scroll", handleScroll);
			return () => {
					window.removeEventListener("scroll", handleScroll);
			};
	}, [handleScroll]);

	const scrollToTop = () => {
			window.scrollTo({top: 0, behavior: 'smooth'})
	}

	return (
			scrollY > 30 ? (
					<IconButton
							colorScheme="black"
							boxSize={12}
							pos="fixed"
							right={2}
							bottom={2}
							mb={2}
							isRound
							icon={<ArrowUpIcon boxSize={7} />}
							bgColor="brand.black"
							color='white'
							aria-label="Кнопка наверх"
							zIndex={2}
							onClick={scrollToTop}
					>
					</IconButton>
			) : null
	)
}