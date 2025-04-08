<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const phoneNumber = ref("");
const password = ref("");

const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;

    await authStore.login({
      phoneNumber: phoneNumber.value,
      password: password.value,
    });

    router.push("/dashboard");
  } catch (error) {
    console.error("Login failed", error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-stone-300">
    <div class="bg-slate-950 p-8 rounded-2xl shadow-lg w-96">
      <h2 class="text-2xl font-extrabold text-green-400 text-center">Login</h2>
      <form @submit.prevent="handleLogin" class="mt-6">
        <p v-if="authStore.errorMessage" class="text-red-500 text-sm mt-2">
          {{ authStore.errorMessage }}
        </p>
        <div class="mb-4">
          <label
            id="phoneNumber"
            for="phoneNumber"
            class="block text-green-400 font-semibold mb-1"
            >Phone Number</label
          >
          <input
            type="tel"
            v-model="phoneNumber"
            placeholder="Enter phone number"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>
        <div class="mb-4">
          <label
            id="password"
            for="password"
            class="block text-green-400 font-medium mb-1"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            placeholder="Enter password"
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full bg-green-400 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
      <p class="text-sm text-gray-600 text-center mt-4">
        Don't have an account?
        <router-link to="/signup" class="text-blue-600 hover:underline"
          >Sign Up</router-link
        >
      </p>
    </div>
  </div>
</template>
