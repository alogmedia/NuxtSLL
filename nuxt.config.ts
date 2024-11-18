import { defineNuxtConfig } from "nuxt/config";
import path from "path";

// Nuxt 3 Configuration
export default defineNuxtConfig({
  // Alias Configuration
  ssr: true,

  // Tailwind CSS Module Configuration (Nuxt has built-in Tailwind support)
  modules: ["@nuxtjs/tailwindcss"],

  build: {
    rollupOptions: {
      external: ["@vueuse/core"],
    },
  },
  tailwindcss: {
    cssPath: "@/assets/css/index.css",
  },

  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
