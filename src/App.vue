<template>
  <LoadingSpinner :show="loading" />
  <router-view></router-view>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted, watch } from "vue";
import { sessionStore } from "./stores/session";
import { useRouter } from "vue-router";
const router = useRouter();

const { loading } = storeToRefs(useAuthStore());
const session = sessionStore();
watch(
  () => session.token,
  (newToken) => {
    if (!newToken) {
      router.push({ name: "login" });
    }
  },
);

onMounted(() => {
  session.startSessionManagement();
});

onUnmounted(() => {
  session.stopSessionManagement();
});
</script>

<style scoped></style>
