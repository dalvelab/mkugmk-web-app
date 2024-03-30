import { useState } from "react";
import { ArrowUpIcon } from "@chakra-ui/icons"
import { chakra, IconButton } from "@chakra-ui/react"
import { useMotionValueEvent, useScroll } from "framer-motion";

export const ScrollUpButton = () => {
  const { scrollY } = useScroll();

	const [ currentScrollY, setCurrentScrollY ] = useState(0);

	useMotionValueEvent(scrollY, "change", (latest) => {
		setCurrentScrollY(latest);
	})

	const scrollToTop = () => {
		window.scrollTo({top: 0, behavior: 'smooth'})
	}

	return (
		currentScrollY > 120 ? (
			<chakra.div w="full" zIndex={2} pos="sticky" bg="red" bottom={2}>
				<IconButton
						colorScheme="black"
						boxSize={[10, 12, 12, 12, 12]}
						pos="absolute"
						right={4}
						bottom={2}
						mb={2}
						isRound
						icon={<ArrowUpIcon boxSize={[5, 7, 7, 7, 7]} />}
						bgColor="white"
						color='brand.black'
						boxShadow="0 2px 10px 0 #00000026"
						aria-label="Кнопка наверх"
						onClick={scrollToTop}
					>
					</IconButton>
				</chakra.div>
		) : null
	)
}