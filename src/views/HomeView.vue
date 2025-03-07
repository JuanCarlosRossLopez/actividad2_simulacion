<template>
  <main>
    <NavbarComponent @change-tab="handleTabChange" />

    <h1 class="text-4xl font-bold text-center mb-8">Bienvenido a la aplicación</h1>

    <div class="mt-8">
      <component :is="currentComponent" />
    </div>
  </main>
</template>

<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
import XSSComponent from '@/components/Attakcs/XSSComponent.vue'
import SQLInjComponent from '@/components/Attakcs/SQLInjComponent.vue'
import { ref } from 'vue'
import { computed } from 'vue'

const currentTab = ref('xss') // Tab por defecto
const componentsMap = {
  xss: XSSComponent,
  sql: SQLInjComponent,
}

const currentComponent = computed(() => componentsMap[currentTab.value])

const handleTabChange = (tab: string) => {
  currentTab.value = tab
}


</script>
