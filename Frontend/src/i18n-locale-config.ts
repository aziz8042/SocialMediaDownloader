// src/i18n-local-config.ts
export const rtlLocales = ["ar", "he", "fa", "ur"]; // add languages that are RTL here

export const getDirection = (locale?: string): "ltr" | "rtl" =>
  (locale && rtlLocales.includes(locale)) ? "rtl" : "ltr";
