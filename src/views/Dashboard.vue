<template>
  <div class="flex h-screen bg-gray-10">
    <aside 
      class="w-60 bg-blue-900 text-white flex flex-col p-6 space-y-6 absolute md:relative md:block md:h-screen z-50 transition-transform transform md:translate-x-0"
      :class="{ '-translate-x-full': !isSidebarOpen }">
      
      <h2 class="text-2xl font-extrabold text-center text-black bg-blue-400 p-2">SoloBETS</h2>
      <nav class="flex-1">
        <ul class="space-y-4">
          <li><router-link to="/analytics" class="block p-2 rounded hover:bg-slate-950 transition font-bold text-lg">Dashboard Analytics</router-link></li>
          <li><router-link to="/profiles" class="block p-2 rounded hover:bg-slate-950 transition font-bold text-lg">Profiles</router-link></li>
          <li><router-link to="/customers" class="block p-2 rounded hover:bg-slate-950 transition font-bold text-lg">Customers</router-link></li>
          <li><router-link to="/transaction" class="block p-2 rounded hover:bg-slate-950 transition font-bold text-lg">Transactions</router-link></li>
          <li><router-link to="/games" class="block p-2 rounded hover:bg-slate-950 transition font-bold text-lg">Games</router-link></li>
        </ul>
      </nav>

      
      <div class="mt-auto">
        <router-link to="#" class="block p-3 rounded bg-red-500 hover:bg-red-700 text-center text-lg font-bold">Logout</router-link>
      </div>
    </aside>

    
    <button @click="toggleSidebar" class="absolute top-4 left-4 md:hidden bg-blue-900 text-white p-2 rounded">
      ☰
    </button>

    
    <main class="flex-1 p-6 bg-blue-950 overflow-auto scrollbar-hide">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = true;
};
</script>

<style>

</style>
