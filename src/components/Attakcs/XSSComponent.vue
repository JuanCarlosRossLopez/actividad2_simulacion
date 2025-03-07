<template>
  <section
    class="mb-12 p-6 rounded-lg shadow-sm bg-base-100 transition-all duration-300 hover:shadow-md"
    style="min-height: 100vh"
  >
    <div id="XSS">
      <h2 class="text-2xl font-bold mb-4">Cross-Site Scripting (XSS)</h2>
      <p class="mb-4">
        XSS permite inyectar scripts maliciosos en páginas web vistas por otros usuarios.
      </p>
      <form @submit.prevent="submitComment" class="mb-4">
        <label for="xssInput" class="block mb-2">Introduce un script:</label>
        <input v-model="commentUser" id="xssInput" class="input input-bordered w-full mb-4" />
        <button type="submit" class="btn btn-primary">Enviar</button>
      </form>
      <div class="prose mb-4"></div>
      <div>
        <h3 class="text-xl font-bold mb-2">Ejemplos básicos de XSS:</h3>
        <ul class="list-disc list-inside">
          <li v-for="(comment, index) in comments" :key="index" class="mb-2">
            <p v-html="comment.comment"></p>
          </li>
        </ul>
      </div>
      <div class="text-center">
        <button @click="show = !show" type="submit" class="btn btn-primary my-4">Mostrar</button>
      </div>
      <div v-if="show">
        <h3 class="text-xl font-bold mb-2">Prevención de XSS:</h3>
        <p class="mb-2">
          Para prevenir XSS, es importante escapar correctamente los datos de entrada y utilizar
          métodos seguros para renderizar contenido HTML.
        </p>
        <ul class="list-disc list-inside">
          <li>Escapar caracteres especiales en el lado del servidor.</li>
          <li>Utilizar bibliotecas de sanitización de HTML.</li>
          <li>Implementar Content Security Policy (CSP).</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { onMounted } from 'vue'
import type { Comment } from '@/interfaces/Comments'
import { addCommentService, getCommentService } from '@/services/ApiService'

const comments: Ref<Comment[]> = ref([{ id: 1, user_id: 1, comment: 'Hola crayola' }])

const commentUser = ref('')
const show = ref(false)

const submitComment = async () => {
  if (!commentUser.value.trim()) {
    alert('El comentario no puede estar vacío');
    return;
  }

  try {
    const response = await addCommentService(1, commentUser.value.trim());
    if (response.message) {
      alert(response.message);
    }
    // Actualizar comentarios localmente
    comments.value.push({
      id: Date.now(), // Generar un ID único
      user_id: 1,
      comment: commentUser.value.trim(),
    });
    commentUser.value = ''; // Limpiar el input
  } catch (error) {
    console.error('Error en submitComment:', error); // Imprimir detalles del error
    alert('No se pudo enviar el comentario. Verifica los datos e inténtalo nuevamente.');
  }
};


onMounted(async () => {
  const response = await getCommentService()
  if (response.results) {
    comments.value = response.results
  } else {
    comments.value = [{ id: 0, user_id: 0, comment: 'Fallaste mano' }]
  }
})
</script>
