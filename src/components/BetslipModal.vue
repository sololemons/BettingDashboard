<template>
  <div v-if="isOpen" id="betslipModal" class="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-2/3 relative">
      <button @click="closeModal" class="absolute top-2 right-4 text-gray-500 text-2xl hover:text-gray-700">&times;</button>

     
      <h2 class="text-lg font-bold mb-4 text-center">Bet Slip Details</h2>

      <div v-if="betslips.length > 0" class="overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="py-2 px-4">Betslip ID</th>
              <th class="py-2 px-4">Matches</th>
              <th class="py-2 px-4">Market</th>
              <th class="py-2 px-4">Odds</th>
              <th class="py-2 px-4">Pick</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="betslip in betslips" :key="betslip.id" class="text-center hover:bg-gray-100">
              <td class="py-2 px-4">{{ betslip.betSlipId }}</td>
              <td class="py-2 px-4">{{ betslip.matchInfo.homeTeam }}  🆚  {{ betslip.matchInfo.awayTeam }}</td>
              <td class="py-2 px-4">{{ betslip.market }}</td>
              <td class="py-2 px-4">{{ betslip.odds }}</td>
              <td class="py-2 px-4">{{ betslip.pick }}</td>
            </tr>
          </tbody>
        </table>
      </div>

     
      <div v-else class="text-center text-gray-500 mt-4">
        No bet slips found for this bet.
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  betslips: Array
});

const emit = defineEmits(["close"]);

function closeModal() {
  emit("close");
}
</script>
