<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import DiscordIcon from "@/icons/DiscordIcon.vue";
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
              <Component
                class="w-20 h-20 m-auto mb-4"
                :is="DiscordIcon"
                alt="discord icon"
              />
              Ready to join the
              <span
                class="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text"
              >
                ranks?
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent class="lg:w-[80%] text-xl text-muted-foreground">
            Join our Discord community! Connect with like-minded<br />
            Hell Let Loose Enthusiasts. <br />Click to dive in! 🪖
          </CardContent>

          <CardFooter>
            <Button as-child>
              <NuxtLink
                to="https://discord.gg/scanhll"
                target="_blank"
                style="color: #000"
              >
                Join Discord
              </NuxtLink>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    <hr />
  </section>
</template>
