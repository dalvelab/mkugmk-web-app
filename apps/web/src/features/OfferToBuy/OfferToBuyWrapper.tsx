import { Button } from "@chakra-ui/react";

import { Link } from "@/shared";
import { OfferToBuy } from "./OfferToBuy";
import { useEffect, useState } from "react";

export const OfferToBuyWrapper = () => {
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.has("offertobuy")) {
      window.localStorage.setItem("new_offer_to_buy", "active");
    }

    const isNewOfferToBuyToggled =
      window.localStorage.getItem("new_offer_to_buy") === "active";

    setToggled(isNewOfferToBuyToggled);
  }, []);

  return (
    <>
      {toggled ? (
        <OfferToBuy />
      ) : (
        <Link
          href="https://airtable.com/app10ambf4PK4wk2P/shrzHsLRsgXpqdKBg"
          target="_blank"
          justifySelf={[
            "flex-start",
            "flex-start",
            "flex-end",
            "flex-end",
            "flex-end",
          ]}
        >
          <Button
            bgColor="brand.black"
            color="white"
            _hover={{ bgColor: "brand.black" }}
          >
            Связаться
          </Button>
        </Link>
      )}
    </>
  );
};
