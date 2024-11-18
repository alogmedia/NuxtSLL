import { defineNuxtConfig } from "nuxt/config";

// Nuxt 3 Configuration
export default defineNuxtConfig({
  // Alias Configuration
  ssr: true,

  // Tailwind CSS Module Configuration (Nuxt has built-in Tailwind support)
  modules: ["@nuxtjs/tailwindcss", "@nuxthq/studio"],

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
        path: "~/components", // Main components directory for general components
        extensions: ["vue"],
      },
    ],
  },

  css: [
    "@/assets/css/index.css", // Assuming Tailwind is imported here
  ],

  studio: {
    gitInfo: {
      name: "NuxtSLL",
      owner: "alogmedia",
      url: "https://github.com/alogmedia/NuxtSLL",
    },
  },
  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
