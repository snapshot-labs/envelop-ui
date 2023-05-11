<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSeoMeta } from '@vueuse/head';
import BasePage from '@/components/BasePage.vue';
import BaseButton from '@/components/BaseButton.vue';
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
  description: 'Verify your email to confirm your subscription to Snapshot mailing list'
});

async function verify() {
  loading.value = true;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
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
    });

    loading.value = false;
    status.value = response.status === 200 ? Status.SUCCESS : Status.ERROR;
  } catch (error) {
    status.value = Status.ERROR;
    loading.value = false;
    console.log(error);
  }
}

onMounted(() => verify());
</script>

<template>
  <BasePage :centered="true" title="Verify your email">
    <div v-if="status === Status.UNKNOWN">
      <MessageBody>Please wait while we are verifying your email address.</MessageBody>
    </div>
    <div v-else-if="status === Status.SUCCESS">
      <MessageBody data-test="message-success">Your email has been verified.</MessageBody>
      <RedirectButton class="mt-3" />
    </div>
    <div v-else>
      <MessageBody data-test="message-error" variant="danger">
        An error occured while verifying your email. Ensure your verification link is correct and
        try again, or
        <a title="Contact the support" href="https://discord.snapshot.org/">contact the support</a>.
      </MessageBody>
      <BaseButton primary :loading="loading" data-test="btn-verify" @click="verify"
        >Verify email</BaseButton
      >
    </div>
  </BasePage>
</template>
