<template>
    <div class="flex h-screen bg-gray-100 ">
      <aside class="w-60 bg-slate-500 text-white flex flex-col p-6 space-y-10">
        <h2 class="text-2xl font-extrabold text-center text-black bg-blue-400">SoloBETS</h2>
        <nav class="flex-1">
          <ul class="space-y-6">
            <li>
              <router-link to="/analytics" class="block p-2 rounded hover:bg-slate-950 transform hover:scale-95 transition font-bold text-lg ">Dashboard Analytics</router-link>
            </li>
            <li>
              <router-link to="/profiles" class="block p-2 rounded hover:bg-slate-950 transform hover:scale-95 transition font-bold text-lg">Profiles</router-link>
            </li>
            <li>
              <router-link to="#" class="block p-2 rounded hover:bg-slate-950 transform hover:scale-95 transition font-bold text-lg">Customers</router-link>
            </li>
            <li>
                <router-link to="#" class="block p-2 rounded hover:bg-slate-950 transform hover:scale-95 transition font-bold text-lg">Transactions</router-link>
              </li>
          </ul>
        </nav>
      </aside>
      <main class="flex-1 p-6 bg-gray-900 overflow-auto scrollbar-hide">
        <router-view></router-view>
      </main>
    </div>
  </template>
  
  <script setup>
 
  </script>
  
  <style>
 
  </style>
  