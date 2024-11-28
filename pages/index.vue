<!-- src/pages/Home.vue -->
<template>
  <div class="video-container">
    <video autoplay muted loop playbackRate="0.8" id="background-video">
      <source src="/assets/bgmovie.mp4#t=4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <Navbar />
  <Hero />
  <!--<Features />-->
  <HowItWorks />
  <Team />
  <Community />
  <FAQ />
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
  object-fit: cover;
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
useHead({
  title: "Scandinavians Let Loose - Hell Let Loose Clan",
  meta: [
    {
      name: "description",
      content:
        "Scandinavians Let Loose is a WW2 gaming community dedicated to fun, team play, and daily matches. Join our clan today!",
    },
    {
      property: "og:title",
      content: "Scandinavians Let Loose",
    },
    {
      property: "og:description",
      content:
        "Scandinavians Let Loose is a WW2 gaming community dedicated to fun and team play.",
    },
    {
      property: "og:image",
      content: "/path/to/image.jpg",
    },
    {
      property: "og:url",
      content: "https://scanhll.com",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://scanhll.com", // Use your actual domain
    },
  ],
});
</script>
