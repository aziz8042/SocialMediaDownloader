// // next-i18next.config.js
// module.exports = {
//   i18n: {
//     defaultLocale: "en",
//     locales: [
//       "en","es","hi","ar","fr","de","ru","pt","ja","ko","tr","it",
//       "id","ms","bn","ur","fa","th","vi","pl","nl","fil"
//     ],
//     localeDetection: false,
//   },
//   // reloadOnPrerender useful in dev for next-i18next v8+
//   reloadOnPrerender: process.env.NODE_ENV === "development",
// };





// // next-i18next.config.mjs
// export const nextI18NextConfig = {
//   i18n: {
//     defaultLocale: "en",
//     locales: [
//       "en","es","hi","ar","fr","de","ru","pt","ja","ko","tr","it",
//       "id","ms","bn","ur","fa","th","vi","pl","nl","fil"
//     ],
//     localeDetection: false,
//   },
// };


// next-i18next.config.ts
import type { UserConfig } from 'next-i18next';
import path from "path";
export const nextI18NextConfig: UserConfig = {
  i18n: {
    defaultLocale: "en",
    locales: [
       "en","es","hi","ar","fr","de","ru","pt","ja","ko","tr","it",
       "id","ms","bn","th","fil","zh","zh-TW","my"
     ],
    localeDetection: false,
  },
  localePath: path.resolve('./src/locales'),
  
};
