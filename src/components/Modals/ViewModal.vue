<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const admins = ref([]);

const fetchAdmins = async () => {
  try {
    const response = await axios.get("/admin/get/all");
    admins.value = response.data;
  } catch (error) {
    console.error("Failed to fetch admins");
  }
};

const deleteAdmin = async (adminId) => {
  if (!confirm("Are you sure you want to delete this admin?")) return;
  try {
    await axios.delete(`/admin/delete?adminId=${adminId}`);
    admins.value = admins.value.filter((admin) => admin.adminId !== adminId);
    console.success("Admin deleted successfully");
  } catch (error) {
    console.error("Failed to delete admin");
  }
};

onMounted(fetchAdmins);
</script>

<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Admin List</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 rounded-lg">
        <thead class="bg-gray-100">
          <tr class="text-left">
            <th class="p-3 border">First Name</th>
            <th class="p-3 border">Last Name</th>
            <th class="p-3 border">Email</th>
            <th class="p-3 border">Phone</th>
            <th class="p-3 border">Role</th>
            <th class="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="admin in admins"
            :key="admin.phoneNumber"
            class="border-b hover:bg-gray-50"
          >
            <td class="p-3">{{ admin.adminFirstName }}</td>
            <td class="p-3">{{ admin.adminLastName }}</td>
            <td class="p-3">{{ admin.adminEmail }}</td>
            <td class="p-3">{{ admin.phoneNumber }}</td>
            <td class="p-3">{{ admin.role }}</td>
            <td class="p-3">
              <button
                @click="deleteAdmin(admin.adminId)"
                class="text-black bg-red-500 hover:bg-red-600 rounded-lg p-2 text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
