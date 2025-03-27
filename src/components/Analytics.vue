<template>
  <div class="flex flex-col justify-between items-start gap-4 p-4">
    
 
    <div class="relative flex flex-col bg-stone-200 rounded-2xl border border-gray-200 p-6 w-full 
      sm:w-11/12 md:w-[53%] lg:w-[80%] xl:w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="bg-green-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-xl shadow-md flex items-center justify-center 
          transform hover:scale-95 transition border border-gray-300">
          <p class="text-gray-700 font-semibold text-lg text-center"><span class="mr-4">Total Bets:</span><span class="font-extrabold text-lg text-green-400"></span>{{ totalBetsPlaced  }}</p>
        </div>

        <div class="bg-yellow-300 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center 
          transform hover:scale-95 transition border border-gray-300">
          <font-awesome-icon :icon="['fas', 'users']" class=" text-blue-600 mr-3 text-4xl" />
          <p class="text-gray-700 font-semibold text-lg text-center"><span class="mr-4">Total Active Users:</span><span class="font-extrabold text-lg text-green-400">{{ totalActiveUsers }}</span></p>
        </div>

        <div class="bg-blue-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center 
          transform hover:scale-95 transition border border-gray-300">
          <font-awesome-icon :icon="['fas', 'dollar-sign']" class=" text-blue-600 mr-3 text-4xl" />
          <p class="text-gray-700 font-semibold text-lg text-center"><span class="mr-4">Total Revenue: </span><span class="font-extrabold text-lg text-green-400">{{ totalRevenue }}</span></p>
        </div>
        <div class="bg-blue-400 h-32 sm:h-40 md:h-44 lg:h-48 rounded-lg shadow-md flex items-center justify-center 
          transform hover:scale-95 transition border border-gray-300">
          <font-awesome-icon :icon="['fas', 'user-plus']" class=" text-blue-600 mr-3 text-4xl" />
          <p class="text-gray-700 font-semibold text-lg text-center">Total Signups</p>
        </div>
        
        

      </div>
    </div>

   
    <div class="flex flex-col sm:flex-row justify-between items-start bg-lime-300 p-6 rounded-2xl border border-gray-200 w-full 
      sm:w-[90%] md:w-[60%] lg:w-[60%] xl:w-[75%]">
      
      <div class="w-full">
        <div class="font-extrabold text-2xl text-center mb-6">Analytics Graph</div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          
          <div class="bg-stone-50 p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-center 
            h-40 sm:h-44 md:h-48 lg:h-56 xl:h-64">
            <p class="text-gray-700 font-semibold">Card 1</p>
          </div>

          <div class="bg-stone-50 p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-center 
            h-40 sm:h-44 md:h-48 lg:h-56 xl:h-64">
            <p class="text-gray-700 font-semibold">Card 2</p>
          </div>

          <div class="bg-stone-50 p-6 rounded-2xl shadow-md border border-gray-200 flex items-center justify-center 
            h-40 sm:h-44 md:h-48 lg:h-56 xl:h-64">
            <p class="text-gray-700 font-semibold">Card 3</p>
          </div>

    

          

         

        </div>
      </div>
    </div>
   
  </div>


</template>
<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import{ computed } from 'vue';
import axios from 'axios';


const bets = ref([]);
const users = ref([]);
const transactions = ref([]);



const fetchBets = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/admins/all/bets`);
    bets.value = response.data;
  } catch (error) {
    console.error("No bets found", error);
    bets.value = [];
  }
};

const fetchUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/admins/all/user`);
    users.value = response.data;
  } catch (error) {
    console.error("No users found", error);
    users.value = [];
  }
};
const fetchTransactions = async () => {
  try {
    const response = await axios.get(`http://localhost:8081/admins/fetch/all`);
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
    .filter(transaction => transaction.transactionType === 'DEBIT') 
    .reduce((sum, transaction) => sum + (transaction.amount || 0), 0); 
});


onMounted(() => {
  fetchBets();
  fetchUsers();
  fetchTransactions();
 
});
</script>
