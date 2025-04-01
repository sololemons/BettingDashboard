<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import moment from "moment";
import BarChart from "../BarChart.vue";

const bets = ref([]);
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const selectedDate = ref(moment().format("YYYY-MM-DD"));

const betCountsData = ref({
    labels: weekDays,
    datasets: [
        {
            label: "Bets per Day",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            data: Array(7).fill(0)
        }
    ]
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: { title: { display: true, text: "Day of the Week" } },
        y: { title: { display: true, text: "Number of Bets" }, beginAtZero: true }
    }
};

const fetchBets = async () => {
    try {
        const response = await axios.get("http://localhost:8081/admins/all/bets");
        bets.value = response.data;

        const betCounts = { Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0 };
        const weekStart = moment(selectedDate.value).startOf("isoWeek");

        bets.value.forEach((bet) => {
            const betDate = moment(bet.betPlacedOn).format("YYYY-MM-DD");
            if (moment(betDate).isBetween(weekStart, weekStart.clone().endOf("isoWeek"), null, "[]")) {
                const dayName = moment(betDate).format("dddd");
                betCounts[dayName]++;
            }
        });
        betCountsData.value.datasets[0].data = weekDays.map((day) => betCounts[day]);
    } catch (error) {
        console.error("Failed to fetch bets:", error);
    }
};

onMounted(fetchBets);
watch(selectedDate, fetchBets);
</script>
<template>
    <div class="w-full border border-gray-200 px-10 rounded-2xl shadow-md bg-white p-6">
        <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700">Select Date:</label>
            <input type="date" id="date" v-model="selectedDate" @change="fetchBets"
                class="mt-1 p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500" />
        </div>


        <BarChart :chart-data="betCountsData" :chart-options="chartOptions" />
    </div>
</template>
