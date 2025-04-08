<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { computed } from "vue";
import axios from "axios";
import BetCountsGraph from "../Charts/BetCountsGraph.vue";
import MarketCharts from "../Charts/MarketCharts.vue";

const bets = ref([]);
const users = ref([]);
const transactions = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get(`/admins/all/user`);
    users.value = response.data;
  } catch (error) {
    console.error("No users found", error);
    users.value = [];
  }
};
const fetchBets = async () => {
  try {
    const response = await axios.get(`/admins/all/bets`);
    bets.value = response.data;
  } catch (error) {
    console.error("No bets found", error);
    bets.value = [];
  }
};
const fetchTransactions = async () => {
  try {
    const response = await axios.get(`/admins/fetch/all`);
    transactions.value = response.data;
  } catch (error) {
    console.error("No transactions found", error);
    transactions.value = [];
  }
};

const totalActiveUsers = computed(() => users.value.length);
const totalBetsPlaced = computed(() => bets.value.length);

const totalRevenue = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.transactionType === "DEBIT")
    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
});

onMounted(() => {
  fetchBets();
  fetchUsers();
  fetchTransactions();
});
</script>

<template>
  <div class="flex flex-col justify-between items-start gap-4 p-4">
    <div
      class="relative flex flex-col bg-stone-200 rounded-2xl border border-gray-200 p-6 w-full sm:w-11/12 md:w-full"
    >
      <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6">
        <div
          class="bg-orange-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-xl shadow-md flex items-center justify-center transform hover:scale-95 transition border border-gray-300"
        >
          <p class="text-gray-700 font-semibold text-lg text-center">
            <span>Total Bets:</span
            ><span class="font-extrabold text-lg text-green-400">{{
              totalBetsPlaced
            }}</span>
          </p>
        </div>

        <div
          class="bg-yellow-300 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center transform hover:scale-95 transition border border-gray-300"
        >
          <p class="text-gray-700 font-semibold text-lg text-center">
            <span>Total Active Users:</span
            ><span class="font-extrabold text-lg text-green-400">{{
              totalActiveUsers
            }}</span>
          </p>
        </div>

        <div
          class="bg-red-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center transform hover:scale-95 transition border border-gray-300"
        >
          <p class="text-gray-700 font-semibold text-lg text-center">
            <span>Total Revenue: </span
            ><span class="font-extrabold text-lg text-green-400">{{
              totalRevenue
            }}</span>
          </p>
        </div>
        <div
          class="bg-blue-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center transform hover:scale-95 transition border border-gray-300"
        >
          <p class="text-gray-700 font-semibold text-lg text-center">
            Total Signups
          </p>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col sm:flex-row justify-between items-start bg-lime-300 p-6 rounded-2xl border border-gray-200 w-full sm:w-[90%] md:w-full"
    >
      <div class="w-full">
        <div class="font-extrabold text-2xl text-center mb-6">
          Analytics Graph
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6"
        >
          <BetCountsGraph />
          <MarketCharts />
        </div>
      </div>
    </div>
  </div>
</template>
