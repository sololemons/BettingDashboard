<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router';
const phoneNumber = ref('');
const password = ref('');
const confirmPassword = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    const signupSucess = await authStore.
      register({
        phoneNumber: phoneNumber.value,
        password: password.value,
        confirmPassword: confirmPassword.value

      });
    if (signupSucess) {
      router.push({ name: "login" });
    }
    else {
      console.error("Failed to Navigate")
    }
  }
  catch (error) {
    console.error("Registering failed", error)
  }

}
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-stone-300">
    <div class="bg-zinc-950 p-8 rounded-2xl shadow-lg w-96">
      <h2 class="text-2xl font-semibold text-green-400 text-center">Register</h2>
      <form @submit.prevent="handleSubmit" class="mt-6">
        <div class="mb-4">
          <label class="block text-green-400 font-medium mb-1">Phone Number</label>
          <input type="tel" v-model="phoneNumber" placeholder="Enter phone number"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none" required>
        </div>
        <div class="mb-4">
          <label class="block text-green-400 font-medium mb-1">Password</label>
          <input type="password" v-model="password" placeholder="Enter password"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none" required>
        </div>
        <div class="mb-4">
          <label class="block text-green-400 font-medium mb-1">Confirm Password</label>
          <input type="password" v-model="confirmPassword" placeholder="Enter password"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none" required>
        </div>
        <button type="submit"
          class="w-full bg-green-400 text-white py-2 rounded-lg hover:bg-blue-700 transition">Register</button>
      </form>
    </div>
  </div>
</template>
