// next.config.mjs
import { nextI18NextConfig } from './next-i18next.config.ts';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n, // keep as-is
};

export default config;
