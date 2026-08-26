
// src/theme.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const createTheme = (direction: "ltr" | "rtl") =>
  extendTheme({
    config,
    direction, // 👈 supports LTR / RTL
    fonts: {
      heading: "Poppins, sans-serif",
      body: "Poppins, sans-serif",
    },
    styles: {
      global: {
        body: {
          direction,
        },
      },
    },
  });
