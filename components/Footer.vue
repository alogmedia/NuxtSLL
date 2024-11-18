<script setup lang="ts">
/*import { ChevronsDown } from "lucide-vue-next";*/
import Separator from "./ui/separator/Separator.vue";
import icon from "/assets/icon.ico";
</script>

<template>
  <footer id="footer" class="container py-24 pb-16 sm:py-32 sm:pb-24">
    <div class="p-10 bg-muted/50 dark:bg-card border rounded-2xl">
      <div
        class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8"
      >
        <div class="col-span-full xl:col-span-2">
          <NuxtLink to="/" class="flex font-bold items-center">
            <img
              :src="icon"
              class="from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 text-white"
              alt="Scandinavians Let Loose icon"
            />

            <h3 class="text-2xl">Scandinavians Let Loose</h3>
          </NuxtLink>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Help</h3>
          <div>
            <NuxtLink to="#community" class="opacity-60 hover:opacity-100">
              Join Us
            </NuxtLink>
          </div>

          <div>
            <NuxtLink to="#faq" class="opacity-60 hover:opacity-100">
              FAQ
            </NuxtLink>
          </div>

          <div>
            <NuxtLink to="/privacypolicy" class="opacity-60 hover:opacity-100">
              Privacy Policy
            </NuxtLink>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Socials</h3>
          <div>
            <NuxtLink
              to="https://www.tiktok.com/@scanhll"
              class="opacity-60 hover:opacity-100"
            >
              TikTok
            </NuxtLink>
          </div>

          <div>
            <NuxtLink
              to="https://discord.gg/scanhll"
              class="opacity-60 hover:opacity-100"
            >
              Discord
            </NuxtLink>
          </div>

          <div>
            <NuxtLink
              to="https://www.youtube.com/@scanhll"
              class="opacity-60 hover:opacity-100"
            >
              YouTube
            </NuxtLink>
          </div>
          <!---<div>
            <a
              href="https://www.patreon.com/c/Scanhll"
              class="opacity-60 hover:opacity-100"
            >
            Patreon
            </a>
          </div>-->
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Contact</h3>
          <div>
            <NuxtLink
              to="https://discord.gg/scanhll"
              class="opacity-60 hover:opacity-100"
            >
              Discord
            </NuxtLink>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Other</h3>
          <div>
            <NuxtLink
              to="https://www.battlemetrics.com/servers/hll/22151086"
              class="opacity-60 hover:opacity-100"
            >
              SLL BattleMetrics
            </NuxtLink>
          </div>
          <div>
            <NuxtLink to="/artillery" class="opacity-60 hover:opacity-100">
              Artillery Calculator
            </NuxtLink>
          </div>
        </div>
      </div>

      <Separator class="my-6" />
      <section className="">
        <h3 class="">&copy; 2024 Scandinavians Let Loose</h3>
      </section>
    </div>
  </footer>
</template>
