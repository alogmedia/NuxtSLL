<script setup lang="ts">
import killixImage from "@/assets/killix.webp";
import bartolleImage from "@/assets/bartolle.webp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { onMounted } from "vue";

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  positions: string[];
}

const teamList: TeamProps[] = [
  {
    imageUrl: killixImage,
    firstName: "Owner",
    lastName: "Killix",
    positions: ["Leader of", "Scandinavians Let Loose"],
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target); // Stop observing once faded in
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".fade-item").forEach((item) => {
    observer.observe(item);
  });
});
</script>

<template>
  <section id="team" class="container lg:w-[75%] py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
        Head Admins
      </h2>
      <h2 class="text-3xl md:text-4xl text-center font-bold"></h2>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-16"
      style="display: flex; justify-content: center"
    >
      <Card
        v-for="{ imageUrl, firstName, lastName, positions } in teamList"
        :key="imageUrl"
        class="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg fade-item"
      >
        <CardHeader class="p-0 gap-0">
          <div class="h-full overflow-hidden">
            <img
              :src="imageUrl"
              alt="admin image"
              class="w-full aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
            />
          </div>
          <CardTitle class="py-6 pb-4 px-6">
            {{ firstName }} <span class="text-primary">{{ lastName }}</span>
          </CardTitle>
        </CardHeader>

        <CardContent
          v-for="(position, index) in positions"
          :key="index"
          :class="{
            'pb-0 text-muted-foreground': true,
            'pb-4': index === positions.length - 1,
          }"
        >
          {{ position }}<span v-if="index < positions.length - 1">,</span>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.fade-item {
  opacity: 0;
  transition: opacity 1s ease;
}

.fade-in {
  opacity: 1 !important;
}
</style>
