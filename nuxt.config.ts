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

  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },

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

  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
