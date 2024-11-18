<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ref, onMounted } from "vue";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Can anyone join or only people from scandinavia?",
    answer:
      "Anyone can join the server, we have people from all over the world at all ages! Enlist on the discord and we will get back to you right away.",
    value: "item-1",
  },
  {
    question: "What is the name of your server?",
    answer: "Scandinavians Let Loose",
    value: "item-2",
  },
  {
    question: "How often do you play?",
    answer: "We try to seed the server every day at 19:00pm CET.",
    value: "item-3",
  },
  {
    question: "Do you offer VIP?",
    answer:
      "Yes, we offer VIP for our server, if you help us seed you get 5 Days of VIP, Donators get lifetime VIP!",
    value: "item-4",
  },

  {
    question: "What role can I play?",
    answer:
      "Anything, whatever you feel like, wether it is Armor Squad or Infantry, we have a spot for you.",
    value: "item-5",
  },
  {
    question: "Do you play competitively or just for fun?",
    answer: "We play for fun, but we do have a competitive team in the works.",
    value: "item-6",
  },
];

interface ServerDetails {
  name: string;
  players: number;
  maxPlayers: number;
  [key: string]: any;
}

// Reactive reference for the server data
const server = ref<ServerDetails | null>(null);
// Helper function to format server name by removing URLs
const formatServerName = (name: string): string => {
  const urlRegex = /https?:\/\/[^\s]+/;
  return name.replace(urlRegex, "").trim();
};

// Fetch server details from API
const fetchServerDetails = () => {
  fetch(
    "https://api.battlemetrics.com/servers?fields%5Bserver%5D=rank%2Cname%2Cplayers%2CmaxPlayers%2Caddress%2Cip%2Cport%2Ccountry%2Clocation%2Cdetails%2Cstatus&relations%5Bserver%5D=game%2CserverGroup&filter%5Bgame%5D=hll&filter%5Bsearch%5D=scandinavian",
  )
    .then((response) => response.json())
    .then((data) => {
      const serverAttributes = data.data[0].attributes;
      server.value = {
        ...serverAttributes,
        name: formatServerName(serverAttributes.name),
      };
    })
    .catch((error) => {
      console.error("Error fetching server details:", error);
    });
};

// Fetch server details when the component is mounted
onMounted(() => {
  fetchServerDetails();
});
</script>

<template>
  <section id="faq" class="container md:w-[700px] py-24 sm:py-32">
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">FAQS</h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">
        Common Questions
      </h2>
    </div>

    <Accordion type="single" collapsible class="AccordionRoot">
      <AccordionItem
        v-for="{ question, answer, value } in FAQList"
        :key="value"
        :value="value"
      >
        <AccordionTrigger class="text-left"> {{ question }} </AccordionTrigger>

        <AccordionContent>{{ answer }}</AccordionContent>
      </AccordionItem>
    </Accordion>

    <h3 class="font-medium mt-4">
      Still have questions?
      <NuxtLink to="https://discord.gg/scanhll" class="underline"
        >Join our discord!</NuxtLink
      >
    </h3>
  </section>
</template>
