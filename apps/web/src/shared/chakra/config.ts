import { defineConfig, defineRecipe } from "@chakra-ui/react";
import { InterFont } from "../fonts";

const buttonRecipe = defineRecipe({
  variants: {
    size: {
      xl: {
        fontSize: "lg",
        px: 6,
        fontWeight: 600,
        borderRadius: "l3",
      },
      lg: {
        fontSize: "md",
        fontWeight: 600,
        borderRadius: "l3",
      },
      md: {
        fontSize: "md",
        fontWeight: 600,
        borderRadius: "l3",
      },
      sm: {
        fontWeight: 600,
        borderRadius: "l3",
      },
    },
  },
});

export const chakraMKUGMKConfig = defineConfig({
  theme: {
    keyframes: {
      customPulse: {
        "50%": {
          width: "22px",
          height: "22px",
        },
        "100%": {
          width: "10px",
          height: "10px",
        },
      },
    },
    tokens: {
      colors: {
        green: {
          500: { value: "#38a169" },
          600: { value: "#38a169" },
        },
        yellow: {
          300: { value: "#F6E05E" },
          400: { value: "#ECC94B" },
        },
        red: {
          500: { value: "#E53E3E" },
        },
      },
      fonts: {
        body: { value: InterFont.style.fontFamily },
        heading: { value: InterFont.style.fontFamily },
        mono: { value: InterFont.style.fontFamily },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          green: { value: "#4ADE80" },
          black: { value: "#09090B" },
          border: { value: "#E2E8F0" },
          gray: { value: "#64748B" },
        },
      },
      sizes: {
        container: {
          xl: { value: "1440px" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
});
