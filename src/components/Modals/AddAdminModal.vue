<script setup>
import { defineEmits, ref } from 'vue';
import axios from "axios";

const props = defineProps({
  isOpen:
  {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(['add-admin', 'close']);

const admin = ref({
  adminFirstName: '',
  adminLastName: '',
  adminEmail: '',
  phoneNumber: '',
  role: ''
});

const addAdmin = async () => {
  try {
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };
    await axios.post('http://localhost:8081/admin/add', admin.value, { headers });
    emit('add-admin', admin.value);
    closeModal();
  } catch (error) {
    console.error('Error adding admin:', error);
  }
};

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-lg font-bold mb-3 text-center">Add Admin</h2>

      <form @submit.prevent="addAdmin">
        <div class="mb-2">
          <label class="block text-sm font-semibold mb-1">First Name</label>
          <input type="text" v-model="admin.adminFirstName"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div class="mb-2">
          <label class="block text-sm font-semibold mb-1">Last Name</label>
          <input type="text" v-model="admin.adminLastName"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div class="mb-2">
          <label class="block text-sm font-semibold mb-1">Email</label>
          <input type="email" v-model="admin.adminEmail"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div class="mb-2">
          <label class="block text-sm font-semibold mb-1">Phone Number</label>
          <input type="text" v-model="admin.phoneNumber"
            class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div class="mb-2">
          <label class="block text-sm font-semibold mb-1">Role</label>
          <select v-model="admin.role" class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500" required>
            <option value="Customercare">Customer Care</option>
            <option value="SuperAdmin">Super Admin</option>
            <option value="Support">Support</option>
          </select>
        </div>

        <div class="flex justify-end mt-3">
          <button type="button" @click="closeModal"
            class="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-600">Cancel</button>
          <button type="submit" class="px-3 py-1 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Add
            Admin</button>
        </div>
      </form>
    </div>
  </div>
</template>
