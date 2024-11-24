<script lang="ts" setup>
import { Bar } from "vue-chartjs";
import { PropType } from "vue";

const props = defineProps({
  chartData: {
    type: Object as PropType<any>,
    required: true,
  },
  chartOptions: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>

<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
