<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <div class="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 class="text-4xl font-bold text-red-600 mb-4">403</h1>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Unauthorized Access</h2>
        <p class="text-gray-600 mb-6">You do not have permission to access this page.</p>
        <router-link to="/login" class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition">
          Go to Login
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>

  </script>
  
  <style scoped>
  </style>
  