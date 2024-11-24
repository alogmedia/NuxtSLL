<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";

const props = defineProps({
  chartData: {
    type: Array as PropType<Array<Record<string, any>>>, // Dynamic array of objects
    required: true,
  },
  index: {
    type: String,
    default: "name", // The key to use for the X-axis
  },
  categories: {
    type: Array as PropType<string[]>, // The categories to display
    required: true,
  },
  yFormatter: {
    type: Function as PropType<(tick: number | string, i: number) => string>,
    default: (tick: number | string) => {
      return typeof tick === "number"
        ? `$${new Intl.NumberFormat("us").format(tick)}`
        : "";
    },
  },
});
</script>

<template>
  <div>
    <BarChart
      :data="chartData"
      :index="index"
      :categories="categories"
      :y-formatter="yFormatter"
    />
  </div>
</template>
