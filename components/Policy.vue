<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
</script>

<template>
  <section id="community" class="py-12">
    <hr />
    <div class="container py-20 sm:py-20">
      <div class="lg:w-[60%] mx-auto">
        <Card
          class="bg-background shadow-none text-center flex flex-col items-center justify-center border-0"
        >
          <CardHeader>
            <CardTitle class="text-4xl md:text-5xl font-bold">
              <Component class="w-20 h-20 m-auto mb-4" alt="discord icon" />
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent class="lg:w-[80%] text-xl text-muted-foreground">
            <strong>Privacy Policy Last updated: 11/11/2024</strong>

            <p>
              Thank you for visiting our website. Your privacy is important to
              us. This Privacy Policy explains what information we collect, how
              we use it, and your rights regarding your data when you visit our
              site.
            </p>

            <strong>Information We Collect</strong>
            <p>
              Our website does not collect, store, or process any personal data.
              We do not use cookies, and we do not track individual users'
              activity.
            </p>
            <strong>Data Hosting and Analytics</strong>
            <p>
              Our website content is created and served using Vue 3, and our
              data is hosted by Cloudflare Pages. We use Cloudflare’s web
              analytics to help us understand website traffic and improve our
              services. Cloudflare provides privacy-first, cookie-free analytics
              that do not store or collect personal data. For more information
              on Cloudflare’s data processing and privacy practices, please
              refer to their
              <NuxtLink
                to="https://www.cloudflare.com/privacypolicy/"
                style="color: lightblue"
                >Privacy Policy.</NuxtLink
              >
            </p>
            <strong> Your Rights</strong>
            <p>
              Since we do not collect or store any personal data, we do not
              retain or process any information that could be used to identify
              you. Should you have any questions or concerns, please feel free
              to reach out to us through our contact methods provided on the
              website.
            </p>
          </CardContent>

          <CardFooter> </CardFooter>
        </Card>
      </div>
    </div>
    <hr />
  </section>
</template>

<style scoped>
strong {
  display: flex;
  color: #fff;
  margin-top: 25px;
  justify-content: center;
}

p {
  text-align: left;
  text-align: center;
}
</style>
