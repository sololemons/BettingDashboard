
<template>
  <LoadingSpinner :show="loading"/>
  
  <router-view></router-view>

</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from './components/LoadingSpinner.vue';
const authStore = useAuthStore()
const loading = computed(() => authStore.loading);

</script>



<style scoped>

</style>