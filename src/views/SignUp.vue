<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 class="text-2xl font-semibold text-gray-700 text-center">Register</h2>
          <form @submit.prevent="handleSubmit" class="mt-6">
            <div class="mb-4">
              <label class="block text-gray-600 font-medium mb-1">Phone Number</label>
              <input type="tel" v-model="phone" placeholder="Enter phone number" class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none" required>
            </div>
            <div class="mb-4">
              <label class="block text-gray-600 font-medium mb-1">Password</label>
              <input type="password" v-model="password" placeholder="Enter password" class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-600 font-medium mb-1">Confirm Password</label>
                <input type="password" v-model="confirmPassword" placeholder="Enter password" class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none" required>
              </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Register</button>
          </form>
        </div>
      </div>
</template>
<script setup>
import { ref } from 'vue';

const phone = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleSubmit = () => {
  console.log('Phone:', phone.value);
  console.log('Password:', password.value);
  console.log('ConfirmPassword', confirmPassword.value)

};
</script>