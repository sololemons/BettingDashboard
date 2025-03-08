<template>
    <div v-if="isModalOpen" id="betslipModal" class="fixed inset-0 bg-black bg-opacity-65 flex items-center justify-center">
        <div class="bg-white p-6 rounded-lg shadow-lg w-2/3">
          
          <button @click="closeModal" class="float-right text-gray-500 text-xl">&times;</button>
          
          <h2 class="text-lg font-bold mb-3">Bet Slip Details</h2>
          <table class="w-full border-collapse border border-gray-300">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="py-2 px-4">Betslip ID</th>
                <th>Matches</th>
                <th class="py-2 px-4">Market</th>
                <th class="py-2 px-4">Odds</th>
                <th class="py-2 px-4">Pick</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
</template>
<script setup>
const props = defineProps({
  isOpen: Boolean,
});
const emit = defineEmits(["close"]);
function closeModal() {
    emit('close');
  }
  
</script>