<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue';
import { getCommentsService, addCommentsService } from '@/services/ApiService';
import { onMounted } from 'vue';
import type { Comment } from "@/interfaces/Comments";

const comments: Ref<Comment[]> = ref([{ id: 1, user_id: 1, comment: 'Hola crayola' }]);

const commentUser = ref('');
const show = ref(false);

const submitComment = async () => {
  if (commentUser.value) {
    const response = await addCommentsService(1, commentUser.value);
    if (response.message) {
      alert(response.message);
    }
  }
};

onMounted(async () => {
  const response = await getCommentsService();
  if (response.result) {
    comments.value = response.result;
  } else {
    comments.value = [{ id: 0, user_id: 0, comment: 'Fallaste mano' }];
  }
});

</script>
