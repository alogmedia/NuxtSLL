import { defineNuxtConfig } from "nuxt/config";

// Nuxt 3 Configuration
export default defineNuxtConfig({
  // Alias Configuration
  ssr: true,

  runtimeConfig: {
    VOTE_PAGE_HASH: process.env.VOTE_PAGE_HASH || "", // Ensure it has a fallback
  },

  // Tailwind CSS Module Configuration (Nuxt has built-in Tailwind support)
  modules: ["@nuxtjs/tailwindcss"],

  nitro: {
    preset: "cloudflare-pages",
  },

  build: {
    rollupOptions: {
      external: ["@vueuse/core"],
      transpile: ["echarts-liquidfill"],
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

  plugins: ["@/plugins/chartjs.ts"],
  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: "2024-11-24",
});
