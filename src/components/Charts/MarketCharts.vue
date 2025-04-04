<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import moment from 'moment';
import BarChart from '../BarChart.vue';

const betslips = ref([]);
const selectedDate = ref(moment().format("YYYY-MM-DD"));
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const marketChartData = ref({
    labels: weekDays,
    datasets: [
        {
            label: "1X2",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            data: Array(7).fill(0)
        },
        {
            label: "Double Chance",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            data: Array(7).fill(0)
        }
    ]
});

const marketChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: { title: { display: true, text: "Day of the Week" } },
        y: { title: { display: true, text: "Number of Betslips" }, beginAtZero: true }
    }
};

const fetchBetslips = async () => {
    try {
        const response = await axios.get("/admins/all/betslips");
        betslips.value = response.data;
        updateMarketChart();
    } catch (error) {
        console.error("Failed to fetch betslips:", error);
    }
};

const updateMarketChart = () => {
    const marketCounts = {
        Market1x2: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 },
        MarketDoubleChance: { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 }
    };

    const weekStart = moment(selectedDate.value).startOf("isoWeek");

    betslips.value.forEach((betslip) => {
        const betSlipDate = moment(betslip.betSlipPlacedOn.split("T")[0]);
        if (betSlipDate.isBetween(weekStart, weekStart.clone().endOf("isoWeek"), null, "[]")) {
            const dayName = betSlipDate.format("dddd");
            if (betslip.market === "1X2") {
                marketCounts.Market1x2[dayName]++;
            } else if (betslip.market === "Double Chance") {
                marketCounts.MarketDoubleChance[dayName]++;
            }
        }
    });

    marketChartData.value = {
        ...marketChartData.value,
        datasets: [
            {
                ...marketChartData.value.datasets[0],
                data: weekDays.map(day => marketCounts.Market1x2[day])
            },
            {
                ...marketChartData.value.datasets[1],
                data: weekDays.map(day => marketCounts.MarketDoubleChance[day])
            }
        ]
    };
};

onMounted(() => {
    fetchBetslips();
});

watch(selectedDate, async () => {
    await fetchBetslips();
    updateMarketChart();
});
</script>

<template>
    <div class="w-full border border-gray-200 px-10 rounded-2xl shadow-md bg-white p-6">
        <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700">Select Date:</label>
            <input type="date" id="date" v-model="selectedDate" @change="fetchBetslips"
                class="mt-1 p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500" />
        </div>

        <BarChart :data="marketChartData" :options="marketChartOptions" />
    </div>
</template>
