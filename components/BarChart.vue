<template>
  <div>
    <plotly :data="chartData" :layout="chartLayout" :config="chartConfig" />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  chartData: {
    type: Object as PropType<{ labels: string[]; values: number[] }>,
    required: true,
  },
  chartTitle: {
    type: String,
    default: "Bar Chart",
  },
});

const chartData = computed(() => [
  {
    x: props.chartData.labels,
    y: props.chartData.values,
    type: "bar",
    marker: { color: "blue" },
  },
]);

const chartLayout = computed(() => ({
  title: props.chartTitle,
  xaxis: { title: "Maps" },
  yaxis: { title: "Votes" },
}));

const chartConfig = { responsive: true };
</script>
