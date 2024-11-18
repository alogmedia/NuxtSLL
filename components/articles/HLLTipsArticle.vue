<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/index";

import { ref, onMounted } from "vue";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "1. Stick With Your Squad",
    answer:
      "Hell Let Loose is a team-based game, and lone wolves rarely survive. Always stay with your squad to provide and receive support. Squads are designed to work together, with each role complementing the others. Whether you're providing cover as a Rifleman or healing as a Medic, teamwork is essential.",
    value: "item-1",
  },
  {
    question: "2. Master Communication",
    answer:
      "Effective communication is the backbone of success in Hell Let Loose. Use these tips: <br><ul> <li><strong>Squad Chat:</strong> Share intel, mark enemies, and coordinate tactics.</li> <li><strong>Commander and Officer Channels:</strong> Provide updates and strategize with other squads.</li> <li><strong>Proximity Chat:</strong> Communicate with nearby players to reinforce teamwork. Clear, concise communication can be the difference between victory and defeat.</li> </ul>",
    value: "item-2",
  },
  {
    question: "3. Build and Protect Garrisons",
    answer:
      "Garrisons are the lifeline of your team. These spawn points allow reinforcements to stay close to the action. Engineers and Support players should prioritize building Garrisons in safe, strategic locations, while others should defend them at all costs.",
    value: "item-3",
  },
  {
    question: "4. Learn the Maps",
    answer:
      "Each map in Hell Let Loose has unique terrain, strongholds, and choke points. Spend time learning:<br> <ul><li><strong>Flanking Routes:</strong> Avoid direct confrontations by using alternative paths.</li><li><strong>Key Strongholds:</strong> Prioritize capturing and defending strategic locations.</li><li><strong>Cover and Concealment:<strong> Use terrain to your advantage to stay hidden and protected.</li><ul>",
    value: "item-4",
  },

  {
    question: "5. Choose the Right Role for the Situation",
    answer:
      "Hell Let Loose features diverse roles, each with unique responsibilities. Here’s a quick guide:<br><ul><li><strong>Rifleman:</strong> Ideal for beginners. Offers versatility in combat.</li><li><strong>Support:</strong> Provides ammunition and suppressive fire.</li><li><strong>Medic:</strong> Essential for reviving downed teammates.</li><li><strong>Engineer:</strong> Critical for building fortifications and Garrisons.</li><li><strong>Sniper:</strong> Great for picking off high-value targets from a distance. Adapt your role based on your squads needs and the flow of battle.</li></ul>",
    value: "item-5",
  },
  {
    question: "6. Stay Low and Use Cover",
    answer:
      "Unlike arcade shooters, Hell Let Loose punishes players who charge blindly into battle. Always use:<br> <ul><li><strong>Crouch and Prone Positions:</strong> Reduce your visibility and increase weapon accuracy.</li><li><strong>Natural Cover:</strong> Trees, rocks, and trenches are your best friends in combat.</li><li><strong>Smoke Grenades:</strong> Use them to obscure enemy vision when crossing open areas.</li></ul>",
    value: "item-6",
  },
  {
    question: "7. Make Every Shot Count",
    answer:
      "Ammo is limited, so precision is vital. Practice aiming for:<br> <ul><li><strong>Headshots:</strong> Instantly eliminate enemies.</li><li><strong>Priority Targets:</strong> Focus on snipers, machine gunners, or enemy engineers.</li><li>Control your weapon’s recoil by firing in short bursts and aiming down sights for accuracy.</li></ul>",
    value: "item-7",
  },
  {
    question: "8. Use Vehicles Strategically",
    answer:
      "Tanks and supply trucks are game-changers. Here’s how to use them effectively:<br> <ul><li><strong>Tanks:</strong> Coordinate with your crew to maximize firepower and mobility. Protect your tank’s rear from enemy attacks.</li><li><strong>Supply Trucks:</strong> Deliver resources to Engineers for building crucial fortifications and Garrisons. </li></ul>",
    value: "item-8",
  },
  {
    question: "9. Focus on Objectives, Not Just Kills",
    answer:
      "Hell Let Loose is about capturing and defending objectives. Prioritize teamwork over personal stats by: <br> <ul><li><strong>Securing key strongholds.</strong></li><li><strong>Building and maintaining Garrisons.</strong></li><li>Coordinating attacks with your squad to overwhelm the enemy. Kills matter less than maintaining map control and ensuring your team’s success.</li></ul>",
    value: "item-9",
  },
  {
    question: "10. Adapt to the Battlefield",
    answer:
      "The dynamic nature of Hell Let Loose requires constant adaptation. Stay flexible by: <br> <ul><li>Switching roles if your team needs something specific.</li><li>Adjusting your strategy based on the enemy’s movements.</li><li>Always being aware of the map and your surroundings.</li></ul>",
    value: "item-10",
  },
];
</script>

<template>
  <section id="community" class="py-12">
    <hr />
    <div class="container py-20 sm:py-20">
      <div class="lg:w-[80%] mx-auto">
        <Card
          class="bg-background shadow-none text-center flex flex-col items-center justify-center border-0"
        >
          <CardHeader>
            <CardTitle class="text-4xl md:text-3xl font-bold">
              <Component class="w-40 h-20 m-auto mb-4" />
              Top 10 Hell Let Loose Tips to Dominate Every Match
            </CardTitle>
          </CardHeader>
          <CardContent class="lg:w-[100%] text-md text-muted-foreground">
            <p>
              Hell Let Loose isn’t just a game—it’s a battle simulation where
              teamwork, strategy, and precision reign supreme. If you want to go
              beyond the basics and become a key player in every match, this
              guide is for you. Here are the top 10 tips to dominate every match
              in Hell Let Loose and lead your team to victory.
            </p>

            <Accordion type="single" collapsible class="AccordionRoot">
              <AccordionItem
                v-for="{ question, answer, value } in FAQList"
                :key="value"
                :value="value"
              >
                <AccordionTrigger class="text-left">
                  {{ question }}
                </AccordionTrigger>

                <AccordionContent>
                  <div v-html="answer"></div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <strong>Bonus Tip: Practice Makes Perfect</strong>
            <p>
              Mastering Hell Let Loose takes time. Practice regularly, learn
              from your mistakes, and seek advice from more experienced players.
              Join a clan or community like Scandinavians Let Loose to improve
              your skills with the support of dedicated teammates.
            </p>
            <strong>Conclusion</strong>
            <p>
              By following these top 10 tips, you’ll elevate your Hell Let Loose
              gameplay and become an invaluable asset to your team. From
              mastering communication to staying low and choosing the right
              role, these strategies will help you dominate every match. Gear
              up, soldier, and get ready to lead your team to victory!<br />
              <b
                >Looking for more tips and tricks? <br />Join our Hell Let Loose
                community and learn from seasoned players.</b
              >
            </p>
            <NuxtLink to="https://discord.gg/scanhll" class="underline"
              >Join our Discord</NuxtLink
            >
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
