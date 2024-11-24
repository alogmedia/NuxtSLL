<script setup lang="ts">
import { BarChart } from "@/components/ui/chart-bar";
import type { PropType } from "vue";

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
    type: Function as PropType<
      (tick: number | Date, i: number, ticks: (number | Date)[]) => string
    >,
    default: (tick: number | Date, i: number, ticks: (number | Date)[]) => {
      if (typeof tick === "number") {
        return `$${new Intl.NumberFormat("us").format(tick)}`;
      } else if (tick instanceof Date) {
        return tick.toLocaleDateString("en-US");
      }
      return "";
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
