<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BaseButton from '@/components/BaseButton.vue';

enum Status {
  LOADING,
  SUCCESS,
  ERROR
}

let status = ref(Status.LOADING);

function unsubscribe() {
  if (true) {
    status.value = Status.SUCCESS;
  } else {
    status.value = Status.ERROR;
  }
}

onMounted(() => {
  console.log('Sending request to API to unsubscribe');
  unsubscribe();
});
</script>

<template>
  <div>
    <h1>Unsubscribe</h1>
  </div>
  <div v-if="status === Status.LOADING">[LOADING ICON]</div>
  <div v-else-if="status === Status.SUCCESS">[SUCCESS ICON] You have been unsubscribed</div>
  <div v-else-if="status === Status.ERROR">
    [ERROR ICON] An error occured
    <BaseButton @click="unsubscribe">Retry</BaseButton>
  </div>
</template>
