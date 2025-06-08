import { RxCross1 } from "react-icons/rx";
import { Flex, Dialog, IconButton } from "@chakra-ui/react";
import { useState } from "react";

import { LanguageSelect, Search } from "@/features";

import { About, Visitors, Main } from "./Menu";
import { ExhibitionCenter } from "@/entities";

interface SidebarProps {
  exhibition_centers: ExhibitionCenter[];
  isOpened: boolean;
  onClose: () => void;
}

type MenuBlocks = "about" | "visitors" | "main";

export const Sidebar: React.FC<SidebarProps> = ({
  onClose,
  isOpened,
  exhibition_centers,
}) => {
  const [selectedMenuBlock, setSelectedMenuBlock] =
    useState<MenuBlocks>("main");

  const handleSidebarClose = () => {
    setSelectedMenuBlock("main");
    onClose();
  };

  return (
    <Dialog.Root onOpenChange={handleSidebarClose} size="full" open={isOpened}>
      <Dialog.Content>
        <Dialog.Header zIndex={2}>
          <Flex w="full" justifyContent="space-between">
            <Flex gap={4}>
              <LanguageSelect size="lg" />
              <Search type="mobile" onSidebarClose={onClose} />
            </Flex>
            <IconButton
              boxSize={12}
              _hover={{ bg: "brand.border" }}
              aria-label="Закрыть меню"
              onClick={handleSidebarClose}
            >
              <RxCross1 />
            </IconButton>
          </Flex>
        </Dialog.Header>
        <Dialog.Body>
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
            fontSize={["2xl", "4xl", "4xl", "4xl", "3xl"]}
            color="brand.black"
            pl={6}
            gap={4}
          >
            {selectedMenuBlock === "main" ? (
              <Main
                onClick={handleSidebarClose}
                setSelectedMenuBlock={setSelectedMenuBlock}
              />
            ) : null}
            {selectedMenuBlock === "about" ? (
              <About
                exhibition_centers={exhibition_centers}
                back={() => setSelectedMenuBlock("main")}
                onClick={handleSidebarClose}
              />
            ) : null}
            {selectedMenuBlock === "visitors" ? (
              <Visitors
                back={() => setSelectedMenuBlock("main")}
                onClick={handleSidebarClose}
              />
            ) : null}
          </Flex>
        </Dialog.Body>
      </Dialog.Content>
    </Dialog.Root>
  );
};
