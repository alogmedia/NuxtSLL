<template>
  <article class="container py-16">
    <header class="mb-8">
      <h1 class="text-4xl font-bold">{{ article.title }}</h1>
      <p class="text-muted-foreground">{{ article.description }}</p>
      <p class="text-sm text-gray-500">{{ formattedDate }}</p>
    </header>
    <div v-html="article.body" class="prose max-w-none"></div>
  </article>
</template>

<script setup lang="ts">
import { useAsyncData } from "#app";
import { queryContent, useContent } from "@nuxt/content";
import { useRoute } from "vue-router";

// Fetch the individual article based on the slug from the URL
const route = useRoute();
const slug = route.params.slug;

const { data: article } = await useAsyncData("blog-article", () =>
  queryContent("blog").where({ slug }).findOne(),
);

const formattedDate = new Date(article.value.date).toLocaleDateString();
</script>
