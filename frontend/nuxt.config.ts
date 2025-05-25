// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  pages: true,

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
  ],
  css: ["@/assets/css/main.css"],
  vite: {
    // clearScreen: true,
    plugins: [
      tailwindcss(),
      eslintPlugin({
        emitWarning: true,
        emitError: true,
        failOnError: false,
        failOnWarning: false,
      }),

    ],
  },
  eslint: {
    config: {},
  },
});
