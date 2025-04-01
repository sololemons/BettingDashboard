<template>
  <LoadingSpinner :show="loading" />

  <router-view></router-view>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import LoadingSpinner from './components/LoadingSpinner.vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import router from '@/router';
import { onMounted, onUnmounted } from 'vue';
const { loading } = storeToRefs(useAuthStore());

const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000;
const INACTIVITY_LOGOUT_TIME = 5 * 60 * 1000;

let lastActivityTime = Date.now();
let tokenRefreshTimer = null;
let inactivityTimer = null;
let isPageActive = true;


const isTokenExpired = () => {
  const token = localStorage.getItem('token');
  if (!token) return true;

  const decoded = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = decoded.exp * 1000;
  return Date.now() > expirationTime;
};

const refreshAuthToken = async () => {
  try {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };
    const response = await axios.post('http://localhost:8081/auth/get/refresh-token', {}, { headers });

    const newRefreshToken = response.data.token;

    if (newRefreshToken) {
      localStorage.setItem('token', newRefreshToken);
      console.log('Token refreshed successfully');
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    logoutUser();
  }
};


const resetInactivityTimer = () => {
  lastActivityTime = Date.now();
  if (inactivityTimer) clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {

    if (isTokenExpired()) {
      logoutUser();
    } else if (!isPageActive) {
      logoutUser();
    }
  }, INACTIVITY_LOGOUT_TIME);
};

const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  router.push('/');
  alert('Session expired due to inactivity or token expiration');
};

const handleVisibilityChange = () => {
  isPageActive = !document.hidden;
  if (isPageActive) {
    resetInactivityTimer();
  }
};

onMounted(() => {
  window.addEventListener('mousemove', resetInactivityTimer);
  window.addEventListener('keydown', resetInactivityTimer);
  window.addEventListener('scroll', resetInactivityTimer);

  document.addEventListener('visibilitychange', handleVisibilityChange);

  tokenRefreshTimer = setInterval(refreshAuthToken, TOKEN_REFRESH_INTERVAL);

  resetInactivityTimer();
});

onUnmounted(() => {
  window.removeEventListener('mousemove', resetInactivityTimer);
  window.removeEventListener('keydown', resetInactivityTimer);
  window.removeEventListener('scroll', resetInactivityTimer);
  document.removeEventListener('visibilitychange', handleVisibilityChange);

  clearInterval(tokenRefreshTimer);
  clearTimeout(inactivityTimer);
});
</script>

<style scoped></style>
