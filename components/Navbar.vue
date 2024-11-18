<script lang="ts" setup>
import { ref } from "vue";

import { useColorMode } from "@vueuse/core";
const mode = useColorMode();
mode.value = "dark";

import {
  NavigationMenu,
  /*   NavigationMenuContent,
   */ NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from /*   NavigationMenuTrigger,
 */ "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  /*
  SheetFooter,
  */
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { Menu } from "lucide-vue-next";
/*
import { Separator } from "@/components/ui/separator";
import GithubIcon from "@/icons/GithubIcon.vue";
import ToggleTheme from "./ToggleTheme.vue";
*/
interface RouteProps {
  href: string;
  label: string;
}

/* interface FeatureProps {
  title: string;
  description: string;
} */

const routeList: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "#features",
    label: "How it works",
  },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#community",
    label: "Community",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

/* const featureList: FeatureProps[] = [
  {
    title: "Showcase Your Value ",
    description: "Highlight how your product solves user problems.",
  },
  {
    title: "Build Trust",
    description:
      "Leverages social proof elements to establish trust and credibility.",
  },
  {
    title: "Capture Leads",
    description:
      "Make your lead capture form visually appealing and strategically.",
  },
]; */

const isOpen = ref<boolean>(false);
</script>

<template>
  <header
    :class="{
      'w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md': true,
    }"
  >
    <NuxtLink to="/">
      <img
        src="/assets/logo.png"
        width="300px"
        class="titlelogo"
        alt="Scandinavians Let Loose main logo"
    /></NuxtLink>
    <!-- Mobile -->
    <div class="flex items-center lg:hidden">
      <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
          <Menu @click="isOpen = true" class="cursor-pointer" />
        </SheetTrigger>

        <SheetContent
          side="left"
          class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card"
        >
          <div>
            <SheetHeader class="mb-4 ml-4">
              <SheetTitle class="flex items-center">
                <img src="/assets/logo.png" width="250px" />
              </SheetTitle>
            </SheetHeader>

            <div class="flex flex-col gap-2">
              <Button
                v-for="{ href, label } in routeList"
                :key="label"
                as-child
                variant="ghost"
                class="justify-start text-base"
              >
                <NuxtLink @click="isOpen = false" :to="href">
                  {{ label }}
                </NuxtLink>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Desktop -->
    <NavigationMenu class="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button
              v-for="{ href, label } in routeList"
              :key="label"
              as-child
              variant="ghost"
              class="justify-start text-base"
            >
              <NuxtLink :to="href">
                {{ label }}
              </NuxtLink>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </header>
</template>

<style scoped>
.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}

.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}

.titlelogo {
  margin-left: 20px;
}
</style>
