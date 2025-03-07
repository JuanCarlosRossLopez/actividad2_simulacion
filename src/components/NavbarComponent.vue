<template>
  <nav class="bg-gray-800 p-4">
    <div class="flex justify-between items-center">
      <h1 class="text-white text-lg font-bold">Navbar</h1>
      <div class="space-x-4">
        <button
          @click="$emit('change-tab', 'xss')"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          XSS Component
        </button>
        <button
          @click="$emit('change-tab', 'sql')"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          SQL Injection Component
        </button>
        <button
          @click="handleLogout"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
