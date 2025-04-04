<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import LoadingSpinner from '../LoadingSpinner.vue';
const router = useRouter();
const customers = ref([]);
const page = ref(0);
const totalPages = ref(1);
const pageSize = 10;
const searchQuery = ref("");
const loading = ref(true)

const fetchCustomers = async () => {
  try {
    const response = await axios.get(`/admins/all/users?page=${page.value}&size=${pageSize}`);
    customers.value = response.data.content;
    totalPages.value = response.data.totalPages;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
  finally {
    loading.value = false
  }
};


const searchCustomers = async () => {
  if (searchQuery.value.trim() === "") {
    fetchCustomers();
    return;
  }
  try {

    const response = await axios.get(`/admins/search`, {
      params: { phoneNumber: searchQuery.value, page: 0, size: pageSize },
    });
    customers.value = response.data.content;
    totalPages.value = response.data.totalPages;
  } catch (error) {
    console.error("Error searching customers:", error);
  }
};

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    fetchCustomers();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value - 1) {
    page.value++;
    fetchCustomers();
  }
};
const viewCustomer = (phoneNumber) => {
  router.push({ name: "profiles", query: { phoneNumber } });
};

onMounted(fetchCustomers);
</script>


<template>
  <div class="p-6">
    <h2 class="text-2xl font-extrabold mb-4">Customers</h2>
    <div v-if="loading">
      <LoadingSpinner :show="loading" />
    </div>

    <div class="mb-4 flex items-center justify-between">
      <input v-model="searchQuery" @input="searchCustomers" type="text" placeholder="Search by Phone Number..."
        class="p-2 border border-gray-300 rounded w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
    </div>

    <div class="border border-gray-900 rounded-2xl">
      <table class="w-full rounded-2xl overflow-hidden bg-green-300">
        <thead class="bg-yellow-300">
          <tr class="bg-green-400">
            <th class="p-3 ">User ID</th>
            <th class="p-3 ">Phone Number</th>
            <th class="p-3 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="font-bold hover:bg-green-400" v-for="customer in customers" :key="customer.phoneNumber">
            <td class="p-3 text-center">{{ customer.id }}</td>
            <td class="p-3 text-center">{{ customer.phoneNumber }}</td>
            <td class="p-3 text-center">
              <button
                class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-green-950 transform hover:scale-95 transition"
                @click="viewCustomer(customer.phoneNumber)">
                View Profile
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-between items-center mt-4">
      <button :disabled="page === 0" @click="prevPage"
        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer">
        Previous
      </button>

      <span class="text-black">Page {{ page + 1 }} of {{ totalPages }}</span>

      <button :disabled="page >= totalPages - 1" @click="nextPage"
        class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer">
        Next
      </button>
    </div>
  </div>
</template>
