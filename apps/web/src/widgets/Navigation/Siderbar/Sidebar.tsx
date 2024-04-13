import { CloseIcon } from "@chakra-ui/icons";
import { Flex, Modal, ModalBody, ModalContent, ModalHeader, IconButton } from "@chakra-ui/react"
import { useState } from "react";

import { LanguageSelect, Search } from "@/features";

import { About, Visitors, Main } from "./Menu";
import { ExhibitionCenter } from "@/entities";

interface SidebarProps {
  exhibition_centers: ExhibitionCenter[];
  isOpened: boolean;
  onClose: () => void;
}

type MenuBlocks = 'about' | 'visitors' | 'main';

export const Sidebar: React.FC<SidebarProps> = ({ onClose, isOpened, exhibition_centers }) => {
  const [selectedMenuBlock, setSelectedMenuBlock] = useState<MenuBlocks>('main');

  const handleSidebarClose = () => {
    setSelectedMenuBlock('main');
    onClose();
  }

  return (
    <Modal autoFocus={false} onClose={handleSidebarClose} size="full" isOpen={isOpened} motionPreset="slideInRight">
      <ModalContent>
        <ModalHeader zIndex={2}>
          <Flex w="full" justifyContent="space-between">
            <Flex gap={4}>
              <LanguageSelect size="lg" />
              <Search type="mobile" />
            </Flex>
            <IconButton
                boxSize={12}
                icon={<CloseIcon boxSize={4} />} 
                _hover={{bg: "brand.border"}} 
                aria-label='Закрыть меню'
                onClick={handleSidebarClose}
              />
          </Flex>
        </ModalHeader>
        <ModalBody>
          <Flex
            w="full" 
            height="100vh" 
            flexDir="column"
            alignItems="flex-start" 
            bgColor="white" 
            pos="fixed" 
            top={0} 
            left={0}
            justifyContent="center"
            fontSize={["3xl", "4xl", "4xl", "4xl", "4xl"]}
            color="brand.black"
            pl={6}
            gap={4}
          >
            {selectedMenuBlock === 'main' ? (
              <Main onClick={handleSidebarClose} setSelectedMenuBlock={setSelectedMenuBlock}/>
            ): null}
            {selectedMenuBlock === 'about' ? (
              <About exhibition_centers={exhibition_centers} back={() => setSelectedMenuBlock('main')} onClick={handleSidebarClose} />
            ) : null}
            {selectedMenuBlock === 'visitors' ? (
              <Visitors back={() => setSelectedMenuBlock('main')} onClick={handleSidebarClose} />
            ) : null}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}