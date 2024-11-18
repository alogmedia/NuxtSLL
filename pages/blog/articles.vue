<!-- src/pages/Home.vue -->
<template>
  <div class="video-container">
    <video autoplay muted loop playbackRate="0.8" id="background-video">
      <source src="/assets/bgmovie.mp4#t=4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <Navbar />
  <HLLTipsArticle />
  <Footer />
</template>

<style scoped>
/* Add the styles for the video background */
#background-video {
  position: fixed;
  background-color: #000;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  opacity: 0.3;
  z-index: -1;
}

@media only screen and (max-width: 600px) {
  #background-video {
    object-fit: cover;
  }
}
</style>

<script setup lang="ts">
import rules from "@/data/rules.json";
import { useHead } from "#app";
import HLLTipsArticle from "@/components/articles/HLLTipsArticle.vue";
useHead({
  title: "Scandinavians Let Loose - Articles",
  meta: [
    {
      name: "description",
      content:
        "Articles, guides and content regarding Hell Let Loose, made by Scandinavians Let Loose players!",
    },
    {
      property: "og:title",
      content: "Scandinavians Let Loose - WW2 Clan",
    },
    {
      property: "og:description",
      content: "Hell Let Loose articles, guides and content.",
    },
    {
      property: "og:image",
      content: "/path/to/image.jpg",
    },
    {
      property: "og:url",
      content: "https://scanhll.com/articles",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://scanhll.com/articles", // Use your actual domain
    },
  ],
});
</script>
