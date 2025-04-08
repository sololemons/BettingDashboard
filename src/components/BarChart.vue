<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
} from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  BarController,
);

defineProps({
  data: {
    Object,
    required: true,
  },
  options: {
    Object,
    required: true,
  },
});
</script>

<template>
  <div class="w-full h-80 md:w-3/4 md:h-60">
    <Bar :data="data" :options="options" />
  </div>
</template>

<style scoped></style>
