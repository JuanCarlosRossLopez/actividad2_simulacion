<template>
  <main>
    <NavbarComponent>
      
    </NavbarComponent>

    <h1 class="text-4xl font-bold text-center mb-8">Bienvenido a la aplicación</h1>
    <button
      @click="handleLogout"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Cerrar Sesión
    </button>
  </main>
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/user'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
