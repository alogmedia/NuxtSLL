<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Paintbrush,
  MessageCircle,
  TabletSmartphone,
  BadgeCheck,
  Goal,
  PictureInPicture,
  MousePointerClick,
  Newspaper,
} from "lucide-vue-next";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "tabletSmartphone",
    title: "Experienced Leadership",
    description:
      "Our leaders have been through countless battles, but they know it’s all about having a good time. We focus on guiding the squad to victory while keeping things light and enjoyable for everyone.",
  },
  {
    icon: "badgeCheck",
    title: "Brotherhood in Arms",
    description:
      "From rookies to veterans, we fight as one. No soldier is left behind, and every comrade has a role in the success of the mission.",
  },
  {
    icon: "goal",
    title: "Flexible Tactics",
    description:
      "We adapt, we have fun, and we figure things out as we go. Sure, we throw in some cool strategies from the WWII playbook, but the main goal is to have an awesome time while we play.",
  },
  {
    icon: "pictureInPicture",
    title: "A Taste of History",
    description:
      "We enjoy the vibe of the WWII era. From the gear to the battlefield experience, we aim to create a fun and immersive environment that gives a nod to history, but never takes itself too seriously.",
  },
  {
    icon: "mousePointerClick",
    title: "Always Ready for Action",
    description:
      "Our server’s always buzzing! Whether it’s a casual game, an impromptu match, or just hanging out, we’re here around the clock to make sure there’s always something happening.",
  },
  {
    icon: "newspaper",
    title: "Relentless Improvement",
    description:
      "Just like the soldiers of WWII, we never stop learning. Constant training and debriefs ensure we keep sharpening our skills and adapting to new challenges.",
  },
];

const iconMap: Record<
  string,
  | typeof TabletSmartphone
  | typeof BadgeCheck
  | typeof Goal
  | typeof PictureInPicture
  | typeof Paintbrush
  | typeof MousePointerClick
  | typeof MessageCircle
  | typeof Newspaper
> = {
  tabletSmartphone: TabletSmartphone,
  badgeCheck: BadgeCheck,
  goal: Goal,
  pictureInPicture: PictureInPicture,
  paintbrush: Paintbrush,
  mousePointerClick: MousePointerClick,
  messageCircle: MessageCircle,
  newspaper: Newspaper,
};
</script>

<template>
  <section id="features" class="container py-24 sm:py-32">
    <h2 class="text-lg text-primary text-center mb-2 tracking-wider">
      Features
    </h2>

    <h2 class="text-3xl md:text-4xl text-center font-bold mb-4">
      What Makes Us Different
    </h2>

    <h3 class="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      In the chaos of battle, we stand united. Our clan thrives on
      communication, teamwork, but most importantly having fun.
    </h3>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="{ icon, title, description } in featureList" :key="title">
        <Card class="h-full bg-background border-0 shadow-none">
          <CardHeader class="flex justify-center items-center">
            <div
              class="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4"
            >
              <component :is="iconMap[icon]" class="size-6 text-primary" />
            </div>

            <CardTitle>
              {{ title }}
            </CardTitle>
          </CardHeader>

          <CardContent class="text-muted-foreground text-center">
            {{ description }}
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<style lang="less" scoped></style>
