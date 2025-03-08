<template>
    <div class="relative w-[55%] m-5">
            <input type="text" placeholder="Search..." 
                class="w-full pl-10 pr-4 py-2 text-gray-700 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 ">
            <div class="absolute left-3 top-2  text-gray-500">
                🔍
            </div>
        </div>
  <div class="flex flex-row">
<div class="relative flex items-start justify-center border border-gray-300 bg-white w-[150%] h-[600px] rounded-2xl shadow-md mt-4 mx-4 space-y-24
sm:
md:w-[76%]
lg:w-[45%]
xl:w-[150%] xl:h-[600px]
">
   
<div class="text-2xl font-extrabold  transform hover:scale-95 transition cursor-pointer">
    Profile 
</div>  
<div class="relative flex flex-col w-[75%] h-[300px]  p-4 border bg-slate-50 shadow-lg rounded-lg 
md:space-y-10 md:-left-[15%]
lg:
xl:w-96 xl:-left-[38%] 
">
    <p><span class="font-semibold">📞Phone Number:</span> <span>+254 712 345 678</span></p>
    <p><span class="font-semibold">Customer Name:</span> <span>John Doe</span></p>
    <p><span class="font-semibold">Registration Date:</span> <span>2024-03-05</span></p>
    <p><span class="font-semibold">Customer ID:</span> <span>#123456</span></p>
</div>

</div>
<div class="relative flex items-start justify-center border border-gray-300 bg-white w-[70%] h-[750px] rounded-2xl shadow-md mt-4 mx-5">
</div>
  </div>
  <div class="relative flex items-start border border-gray-200 shadow-md bg-slate-50 w-full mt-10 ">
        <table class="w-full bg-green-300">
            <thead class="w-full">
                <tr>
                        <th class="py-3 px-4">Bet ID</th>
                        <th class="py-3 px-4 ">Bet Placed On</th>
                        <th class="py-3 px-4">Possible Win</th>
                        <th class="py-3 px-4">Stake</th>
                        <th class="py-3 px-4">Status</th>
                        <th class="py-3 px-4">Total Games</th>
                        <th class="py-3 px-4">Total Odds</th>
                        <th class="py-3 px-4">User ID</th>
                        </tr>
            </thead>
            <tbody>
                <tr class="hover:bg-green-500 cursor-pointer" @click="openModal()">
                        <td class="py-3 text-center">101</td>
                        <td class="py-3 text-center ">2024-03-05</td>
                        <td class="py-3 text-center ">5000</td>
                        <td class="py-3 text-center ">250</td>
                        <td class="py-3 text-center">
                      <button class="bg-yellow-300 rounded-2xl p-2">Pending</button>
                        </td>
                        <td class="py-3 text-center">5</td>
                        <td class="py-3 text-center">3.2</td>
                        <td class="py-3 text-center">202</td>
                    </tr>
                        </tbody>
             
    
        </table>
  

  </div>
  
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
    <BetslipModal :isOpen="isModalOpen"  @close="isModalOpen = false" />
  </div>
  </template>


<script setup>
import { ref } from 'vue';
import BetslipModal from './BetslipModal.vue';


const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};


const closeModal = () => {
  isModalOpen.value = false;
};
</script>