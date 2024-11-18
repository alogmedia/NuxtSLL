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

  components: {
    dirs: [
      {
        path: "~/components/ui/",
        prefix: "Ui",
        extensions: ["vue"], // Only auto-import .vue files, ignore index.ts
      },
    ],
  },

  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
