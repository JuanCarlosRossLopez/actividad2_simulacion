<template>
  <section
    class="mb-12 p-6 rounded-lg shadow-sm bg-base-100 transition-all duration-300 hover:shadow-md"
    style="min-height: 100vh"
  >
    <div id="SQLInjection">
      <h2 class="text-2xl font-bold mb-4">SQL Injection</h2>
      <p class="mb-4">
        SQL Injection permite inyectar consultas SQL maliciosas en aplicaciones que interactúan con bases de datos.
      </p>
      <form @submit.prevent="submitComment" class="mb-4">
        <label for="sqlInput" class="block mb-2">Introduce el nombre:</label>
        <input v-model="nameItemUser" id="sqlInput" class="input input-bordered w-full mb-4" />
        <label for="sqlInput" class="block mb-2">Introduce la descripción:</label>
        <input v-model="descriptionItemUser" id="sqlInput" class="input input-bordered w-full mb-4" />
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
      <div class="prose mb-4"></div>
      <div>
        <h3 class="text-xl font-bold mb-2">Ejemplos básicos de SQL Injection:</h3>
        <ul class="list-disc list-inside">
          <li v-for="(item, index) in items" :key="index" class="mb-2">
            <p v-html="item.name"></p>
            <p v-html="item.description"></p>
          </li>
        </ul>
      </div>
      <div class="text-center">
        <button @click="show = !show" type="button" class="btn btn-primary my-4">Mostrar</button>
      </div>
      <div v-if="show">
        <h3 class="text-xl font-bold mb-2">Prevención de SQL Injection:</h3>
        <p class="mb-2">
          Para prevenir SQL Injection, es fundamental utilizar prácticas de codificación seguras.
        </p>
        <ul class="list-disc list-inside">
          <li>Utilizar consultas parametrizadas o procedimientos almacenados.</li>
          <li>Escapar correctamente las entradas del usuario.</li>
          <li>Evitar la construcción dinámica de consultas SQL.</li>
          <li>Implementar un sistema de roles y permisos en la base de datos.</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { onMounted } from 'vue';
import type { items } from '@/interfaces/Items';
import { addItemService, getItemsService } from '@/services/ApiService';
// Variables reactivas

const items: Ref<items[]> = ref ([{id: 1, name: 'consulta', description: 'SELECT * FROM users' }])

const nameItemUser = ref('');
const descriptionItemUser = ref('');
const show = ref(false);

// Métodos (placeholder para la funcionalidad)
const submitComment =  async () => {
  if (!nameItemUser.value.trim() || !descriptionItemUser.value.trim()) {
    alert('El campo de nombre o descripción no puede estar vacío.');
    return;
  }
  try {
    const response = await addItemService(nameItemUser.value.trim(), descriptionItemUser.value.trim());
    if (response.message) {
      alert(response.message);
    }
  items.value.push({
    id: Date.now(), // Generar ID único
    name: nameItemUser.value.trim() ,
    description: descriptionItemUser.value.trim(),
  });
  nameItemUser.value = ''; // Limpiar el input
  descriptionItemUser.value = '';

} catch (error) {
    console.error('Error en submitComment:', error); // Imprimir detalles del error
    alert('No se pudo enviar el comentario. Verifica los datos e inténtalo nuevamente.');
  }
}
  onMounted(async () => {
  const response = await getItemsService()
  if (response.results) {
    items.value = response.results
  } else {
    items.value = [{ id: 0, name: 'nada', description: 'Fallaste mano' }]
  }
})

</script>
