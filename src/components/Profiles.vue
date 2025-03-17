<template>
  <div class="p-4">
    <div class="relative w-full max-w-lg mx-auto">
      <input
        v-model="searchPhone"
        type="text"
        placeholder="Search by Phone Number..."
        class="w-full pl-10 pr-4 py-2 text-gray-700 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <div class="absolute left-3 top-2 text-gray-500">🔍</div>
      <button
        @click="fetchUserProfile"
        class="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
      >
        Search
      </button>
    </div>

    <div class="flex flex-col lg:flex-row gap-4 mt-4">
      <div class="flex flex-col items-center border border-gray-300 bg-white w-full lg:w-1/2 xl:w-[40%] p-6 rounded-2xl shadow-md">
        <div class="text-2xl font-extrabold hover:scale-95 transition cursor-pointer">Profile</div>
        <div class="flex flex-col w-full p-4 border bg-stone-100 shadow-lg rounded-lg space-y-4 mt-4" v-if="user">
          <p><span class="font-semibold">📞 Phone Number:</span> {{ user.phoneNumber }}</p>
          <p><span class="font-semibold">Customer ID:</span> {{ user.id }}</p>
        </div>
      </div>

      <div class="border border-gray-300 bg-white w-full lg:w-1/2 xl:w-[60%] h-96 rounded-2xl shadow-md"></div>
    </div>

    <div v-if="bets.length > 0" class="relative overflow-x-auto bg-slate-50 shadow-md border border-gray-200 mt-10 rounded-lg">
      <table class="w-full bg-green-300">
        <thead class="bg-green-500 text-white">
          <tr>
            <th class="py-3 px-4">Bet ID</th>
            <th class="py-3 px-4">Bet Placed On</th>
            <th class="py-3 px-4">Possible Win</th>
            <th class="py-3 px-4">Stake</th>
            <th class="py-3 px-4">Status</th>
            <th class="py-3 px-4">Total Games</th>
            <th class="py-3 px-4">Total Odds</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bet in bets" :key="bet.betId" class="hover:bg-green-500 cursor-pointer text-center" @click="openModal(bet.betId)">
            <td class="py-3">{{ bet.betId }}</td>
            <td class="py-3">{{ bet.betPlacedOn }}</td>
            <td class="py-3">{{ bet.possibleWin }}</td>
            <td class="py-3">{{ bet.stake }}</td>
            <td class="py-3">
              <button class="bg-yellow-300 rounded-2xl px-4 py-1">{{ bet.status }}</button>
            </td>
            <td class="py-3">{{ bet.totalGames }}</td>
            <td class="py-3">{{ bet.totalOdds }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <BetslipModal :isOpen="isModalOpen" :betslips="betslips" @close="isModalOpen = false" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import BetslipModal from "./BetslipModal.vue";
import { useRoute } from "vue-router";

const router = useRoute()
const searchPhone = ref("");
const betslips = ref([]);
const user = ref(null);
const bets = ref([]);
const isModalOpen = ref(false);

const fetchUserProfile = async () => {
  if (!searchPhone.value) {
    console.warn("Enter a phone number to search.");
    return;
  }

  try {
const response = await axios.get(`http://localhost:8081/admins/get?phoneNumber=${encodeURIComponent(searchPhone.value)}`);

    user.value = response.data;
    console.log("data", response.data)
    if (user.value && user.value.id) {
      await fetchBets(user.value.id);
    } else {
      console.error("User ID not found in profile data.");
    }

  } catch (error) {
    console.error("No user found", error);
    user.value = null;
    bets.value = [];
  }
};

const fetchBets = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8081/admins/get/bets?id=${id}`);
    bets.value = response.data;
  } catch (error) {
    console.error("No bets found", error);
    bets.value = [];
  }
};

const openModal = async (betID) => {
  isModalOpen.value = true;
  await fetchBetslips(betID)

};
const fetchBetslips = async (betID) => {
  try {
    const response = await axios.get(`http://localhost:8081/admins/betId?betId=${betID}`);
    betslips.value = response.data;
  } catch (error) {
    console.error("No betslips found", error);
    betslips.value = [];
  }
};
onMounted(() => {
  if (router.query.phoneNumber) {
    searchPhone.value = router.query.phoneNumber;
    fetchUserProfile();
  }
});


</script>
