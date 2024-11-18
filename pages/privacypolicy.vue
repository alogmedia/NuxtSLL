<template>
  <div class="video-container">
    <video autoplay muted loop id="background-video">
      <source src="/assets/bgmovie.mp4#t=4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
  <Navbar />
  <Policy />
  <Footer />
</template>

<style>
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
