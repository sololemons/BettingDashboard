<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.vue";

const transactions = ref([]);
const loading = ref(true);
const searchQuery = ref("");

const fetchTransactions = async () => {
  try {
    const response = await axios.get("/admins/fetch/all");
    transactions.value = response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  } finally {
    loading.value = false;
  }
};

const filteredTransactions = computed(() => {
  return transactions.value.filter((transaction) =>
    transaction.transactionRef
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase()),
  );
});

onMounted(fetchTransactions);
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div v-if="loading">
      <LoadingSpinner :show="loading" />
    </div>

    <h1 class="text-3xl font-bold text-center text-blue-600 mb-6">
      Transaction History
    </h1>

    <div class="flex justify-center mb-4">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by transaction reference..."
        class="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div class="overflow-x-auto">
      <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-blue-500 text-white">
          <tr>
            <th class="py-3 px-6 text-left">Phone Number</th>
            <th class="py-3 px-6 text-left">Amount</th>
            <th class="py-3 px-6 text-left">Transaction Ref</th>
            <th class="py-3 px-6 text-left">Transaction Type</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in filteredTransactions"
            :key="transaction.transactionRef"
            class="border-b hover:bg-gray-100 transition"
          >
            <td class="py-3 px-6">{{ transaction.phoneNumber }}</td>
            <td class="py-3 px-6">{{ transaction.amount.toFixed(2) }}</td>
            <td class="py-3 px-6 font-semibold">
              {{ transaction.transactionRef }}
            </td>
            <td class="py-3 px-6">
              <span
                class="px-3 py-1 text-sm font-semibold rounded-full"
                :class="{
                  'bg-red-500 text-white':
                    transaction.transactionType === 'DEBIT',
                  'bg-green-500 text-white':
                    transaction.transactionType === 'CREDIT',
                }"
              >
                {{ transaction.transactionType }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
