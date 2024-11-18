<template>
  <section class="container py-16">
    <h1 class="text-4xl font-bold mb-8">Blog Articles</h1>
    <div v-if="articles.length">
      <div v-for="article in articles" :key="article._path" class="mb-6">
        <NuxtLink
          :to="article._path"
          class="text-2xl font-semibold text-primary"
        >
          {{ article.title }}
        </NuxtLink>
        <p class="text-muted-foreground">{{ article.description }}</p>
      </div>
    </div>
    <div v-else>
      <p>No articles found.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAsyncData } from "#app";
import { queryContent } from "@nuxt/content";

// Fetch blog articles from the content directory
const { data: articles } = await useAsyncData("blog-articles", () =>
  queryContent("blog").sort({ date: -1 }).find(),
);
</script>
