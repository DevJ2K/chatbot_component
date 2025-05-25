// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import eslintPlugin from "vite-plugin-eslint";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  pages: true,
  ssr: false,

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/ui",
  ],
  css: ["@/assets/css/main.css"],
  ui: {
    fonts: false,
    colorMode: false,
  },
  vite: {
    // clearScreen: true,
    plugins: [
      tailwindcss(),
      // eslintPlugin({
      //   emitWarning: true,
      //   emitError: true,
      //   failOnError: false,
      //   failOnWarning: false,
      // }),
      {
        name: "custom-middleware",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.startsWith("/.well-known")) {
              res.statusCode = 404;
              return res.end("Not Found");
            }
            next();
          });
        },
      },
    ],
  },
  eslint: {
    config: {},
  },
});
