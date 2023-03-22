<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSeoMeta } from '@vueuse/head';
import MessageTitle from '@/components/MessageTitle.vue';
import MessageBody from '@/components/MessageBody.vue';
import RedirectButton from '@/components/RedirectButton.vue';
import BaseButton from '@/components/BaseButton.vue';

enum Status {
  UNKNOWN,
  SUCCESS,
  ERROR
}

let status = ref(Status.UNKNOWN);
let loading = ref(false);
const route = useRoute();

useSeoMeta({
  title: 'Unsubscribe',
  description: 'Unsubscribe from Snapshot weekly summary mailing list'
});

function unsubscribe() {
  loading.value = true;

  fetch(`${import.meta.env.VITE_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      params: {
        email: route.query.email,
        signature: route.query.signature
      },
      method: 'snapshot.unsubscribe'
    })
  })
    .then(response => {
      loading.value = false;

      if (response.status === 200) {
        status.value = Status.SUCCESS;
      } else {
        status.value = Status.ERROR;
      }
    })
    .catch(error => {
      status.value = Status.ERROR;
      loading.value = false;
      console.log(error);
    });
}

onMounted(() => {
  unsubscribe();
});
</script>

<template>
  <MessageTitle>Unsubscribe</MessageTitle>

  <div v-if="status === Status.SUCCESS">
    <MessageBody>You have been unsubscribed from the Snapshot weekly summary.</MessageBody>
    <RedirectButton />
  </div>
  <div v-else-if="status === Status.ERROR">
    <MessageBody variant="danger">
      An error occured while processing your request. Please try again, or
      <a title="Contact the support" href="https://discord.snapshot.org/">contact the support</a>.
    </MessageBody>
    <BaseButton primary :loading="loading" @click="unsubscribe">Unsubscribe</BaseButton>
  </div>
</template>
