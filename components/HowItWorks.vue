<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { onMounted } from "vue";
import soldierImage from "@/assets/soldier.svg";
import soldier7Image from "@/assets/soldier7.svg";

interface HowItWorksProps {
  badgeTitle: string;
  title: string;
  description: string;
  image: string;
}

const HowItWorksList: HowItWorksProps[] = [
  {
    badgeTitle: "1",
    title: "Make a Difference with Every Deployment",
    description:
      "In Hell Let Loose it is important to make a difference with every deployment. We are a community that values teamwork and communication.",
    image: soldierImage,
  },
  {
    badgeTitle: "2",
    title: "Create an Impact with Every Choice",
    description:
      "You can have an impact with every choice you make, whether it is choosing the right class, the right weapon, or the right strategy.",
    image: soldier7Image,
  },
  {
    badgeTitle: "3",
    title: "Communicate and Coordinate",
    description:
      "Communication is key in Hell Let Loose. We try to communicate when we play together and share tips and tricks to the best of our ability.",
    image: soldierImage,
  },
  {
    badgeTitle: "4",
    title: "Learn and Improve",
    description:
      "Wether you are a new player or a veteran, we are always looking for ways to improve our gameplay and our community. Anyone is welcome to join us.",
    image: soldier7Image,
  },
];

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in");
        }
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll(".animation-item").forEach((item) => {
    observer.observe(item);
  });
});
</script>

<template>
  <section id="features" class="container py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
        Operations
      </h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">
        The way we do it!
      </h2>
    </div>

    <div class="lg:w-[80%] mx-auto relative">
      <div
        v-for="(
          { badgeTitle, title, description, image }, index
        ) in HowItWorksList"
        :key="title"
        :class="[
          'flex mb-8 items-center animation-item',
          { 'flex-row-reverse': index % 2 !== 0 },
          index % 2 === 0 ? 'slide-left' : 'slide-right',
        ]"
      >
        <Card class="h-full bg-transparent border-0 shadow-none">
          <CardHeader>
            <div class="pb-4">
              <Badge>{{ badgeTitle }}</Badge>
            </div>

            <CardTitle>
              {{ title }}
            </CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground w-[100%]">
            {{ description }}
          </CardContent>
        </Card>

        <img
          :src="image"
          :alt="`Image describing ${title} `"
          class="w-[150px] md:w-[250px] lg:w-[300px] mx-auto -scale-x-100"
          style="border-radius: 50%"
        />
        <div
          :class="[
            '-z-10 absolute right-0 w-44 h-72 lg:w-64 lg:h-80 rounded-full bg-primary/15 dark:bg-primary/10 blur-3xl',
            { 'left-0': index % 2 !== 0 },
          ]"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animation-item {
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.slide-left {
  transform: translateX(-100px);
}

.slide-right {
  transform: translateX(100px);
}

.slide-in {
  opacity: 1 !important;
  transform: translateX(0) !important;
}
</style>
