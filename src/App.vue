<template>
  <LoadingSpinner :show="loading" />

  <router-view></router-view>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from './components/LoadingSpinner.vue';
import { storeToRefs } from 'pinia';
const { loading } = storeToRefs(useAuthStore());
</script>



<style scoped></style>