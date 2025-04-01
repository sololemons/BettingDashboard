<script setup>
import { defineAsyncComponent } from "vue";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController } from "chart.js";


const BarChart = defineAsyncComponent(() =>
    import("vue-chart-3").then((m) => m.BarChart)
);


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController);


defineProps({
    chartData: Object,
    chartOptions: Object
});
</script>

<template>
    <div class="w-[100%] max-w-[600px] m-auto">
        <BarChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
</template>


<style scoped></style>