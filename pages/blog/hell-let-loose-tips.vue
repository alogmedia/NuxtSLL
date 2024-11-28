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
import HLLTipsArticle from "@/components/articles/HLLTipsArticle.vue";
useHead({
  title: "Top 10 Hell Let Loose Tips to Dominate Every Match",
  meta: [
    {
      name: "description",
      content:
        "Master Hell Let Loose with these 10 essential tips! Enhance your teamwork, strategy, and gameplay to dominate the battlefield and lead your team to victory.",
    },
    {
      property: "og:title",
      content: "Scandinavians Let Loose - WW2 Clan",
    },
    {
      property: "og:description",
      content: "Top 10 Hell Let Loose Tips to Dominate Every Match",
    },
    {
      property: "og:image",
      content: "/path/to/image.jpg",
    },
    {
      property: "og:url",
      content: "https://scanhll.com/blog/hell-let-loose-tips",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://scanhll.com/blog/hell-let-loose-tips", // Use your actual domain
    },
  ],
});
</script>
