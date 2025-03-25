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

          <div class="mt-auto relative"> 
            <li class="block p-2 rounded hover:bg-slate-950 transition font-bold text-emerald-300 cursor-pointer items-center justify-between" @click="toggleDropDown">
              <font-awesome-icon :icon="['fas', 'user-shield']" class="mr-2" />
              Admin Profile
              <span>▼</span>
            </li>
            <ul v-if="dropdownOpen" class="absolute bg-white shadow-md rounded mt-1 w-40 text-black">
              <li>
                <router-link to="/viewmodal" class="block px-4 py-2 bg-blue-950 hover:bg-slate-200 transition text-white">
                  View Admin
                </router-link>
              </li>
              <li class="block px-4 py-2 bg-blue-900 hover:bg-slate-200 transition cursor-pointer text-white items-center" @click="showModal = true">
                <font-awesome-icon :icon="['fas', 'user-plus']" class="mr-2" />
                Add Admin
              </li>
            </ul>
          </div> 
        </ul>
      
      </nav>

      <div v-if="authStore.isAuthenticated" class="mt-auto">
    <button @click="logout" class="block p-3 rounded bg-red-500 hover:bg-red-700 text-center text-lg font-bold">
      Logout
    </button>
  </div>
    </aside>

    
    <button @click="toggleSidebar" class="absolute top-4 left-4 md:hidden bg-blue-900 text-white p-2 rounded">
      ☰
    </button>
    <AddAdminModal :isOpen="showModal" @close="showModal = false" />

    
    <main class="flex-1 p-6 bg-blue-950 overflow-auto scrollbar-hide">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from '@/stores/auth'

import { useRouter } from "vue-router";
import AddAdminModal from "@/components/AddAdminModal.vue";
const router = useRouter();
const authStore = useAuthStore();
const dropdownOpen = ref(false);
const showModal = ref(false);

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = true;
};

const toggleDropDown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};
const logout = () => {
  authStore.logout(); 
  router.push("/login"); 
};

</script>

<style>

</style>
