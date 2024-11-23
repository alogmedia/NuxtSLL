import { defineNuxtConfig } from "nuxt/config";

// Nuxt 3 Configuration
export default defineNuxtConfig({
  // Alias Configuration
  ssr: false, // Disable server-side rendering for static hosting
  target: "static", // Ensure static files are generated for Cloudflare Pages

  // Tailwind CSS Module Configuration (Nuxt has built-in Tailwind support)
  modules: ["@nuxtjs/tailwindcss", "@kgierke/nuxt-basic-auth"],

  basicAuth: {
    enabled: true,
    users: [
      {
        username: "notfound404",
        password: "Elpatr0n!",
      },
    ],
    allowedRoutes: ["/", "/artillery", "/privacypolicy", "/blog/.*", "/api/.*"],
  },

  build: {
    loaders: {
      scss: {
        implementation: require("sass"),
      },
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

  // PostCSS Configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
