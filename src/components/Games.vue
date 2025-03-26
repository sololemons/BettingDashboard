<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold text-center text-green-600 mb-6">Upcoming Matches</h1>

    
    <div v-if="loading" class="flex justify-center items-center h-32">
      <LoadingSpinner :show="loading"/>
    </div>

   
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="match in matches" 
        :key="match.matchId" 
        class="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition transform hover:scale-105"
      >
        <div class="text-lg font-semibold text-center text-gray-800">
          {{ match.homeTeam }} 🆚 {{ match.awayTeam }}
        </div>
        <p class="text-center text-gray-500 mt-2">{{ formatDate(match.startTime) }}</p>

        <div v-for="market in match.markets" :key="market.marketId" class="mt-4">
          <h3 class="text-lg font-semibold text-green-700">{{ market.marketName }}</h3>

          <div class="flex flex-wrap gap-2 mt-2">
            <button
              v-for="odd in market.oddsList"
              :key="odd.oddsId"
              class="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition w-full sm:w-auto text-center"
            >
              {{ odd.oddType }}: <span class="font-bold">{{ odd.oddsValue }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner.vue";

const matches = ref([]);
const loading = ref(true);

const fetchMatches = async () => {
  loading.value = true;
  try {
    const response = await axios.get("http://localhost:8081/admins/games");
    matches.value = response.data;
  } catch (error) {
    console.error("Error fetching matches:", error);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const options = { weekday: "long", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(fetchMatches);
</script>
