<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSeoMeta } from '@vueuse/head';
import BaseButton from '@/components/BaseButton.vue';
import MessageTitle from '@/components/MessageTitle.vue';
import MessageBody from '@/components/MessageBody.vue';
import RedirectButton from '@/components/RedirectButton.vue';

enum Status {
  UNKNOWN,
  SUCCESS,
  ERROR
}

let status = ref(Status.UNKNOWN);
let loading = ref(false);
const route = useRoute();

useSeoMeta({
  title: 'Verify email',
  description: 'Verify your email to confirm your subscription to Snapshot weekly summary'
});

function verify() {
  loading.value = true;

  fetch(`${import.meta.env.VITE_API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      params: {
        email: route.query.email,
        signature: route.query.signature,
        address: route.query.address
      },
      method: 'snapshot.verify'
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
</script>

<template>
  <MessageTitle>Verify your email</MessageTitle>
  <div v-if="status === Status.UNKNOWN">
    <MessageBody>
      Please verify your email to confirm your subscription to the Snapshot weekly summary.
    </MessageBody>
    <BaseButton :loading="loading" primary @click="verify">Verify email</BaseButton>
  </div>
  <div v-else-if="status === Status.SUCCESS">
    <MessageBody>Your email has been verified.</MessageBody>
    <RedirectButton />
  </div>
  <div v-else>
    <MessageBody variant="danger">
      An error occured while verifying your email. Ensure your verification link is correct and try
      again, or
      <a title="Contact the support" href="https://discord.snapshot.org/">contact the support</a>.
    </MessageBody>
    <BaseButton primary :loading="loading" @click="verify">Verify email</BaseButton>
  </div>
</template>
