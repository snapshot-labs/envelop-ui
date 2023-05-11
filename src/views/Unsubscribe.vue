<script setup lang="ts">
import { ref, computed, onMounted, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSeoMeta } from '@vueuse/head';
import BasePage from '@/components/BasePage.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import MessageBody from '@/components/MessageBody.vue';
import MessageBox from '@/components/MessageBox.vue';
import InputCheckbox from '@/components/InputCheckbox.vue';
import RedirectButton from '@/components/RedirectButton.vue';
import BaseButton from '@/components/BaseButton.vue';

enum Status {
  UNKNOWN,
  WAITING,
  SUCCESS,
  ERROR
}

let status = ref(Status.UNKNOWN);
let loading = ref(false);
let subscriptionsList: Ref<Record<string, Record<string, string>>> = ref({});
let updatedSubscriptions: Ref<string[]> = ref([]);
const route = useRoute();

useSeoMeta({
  title: 'Manage email subscriptions',
  description: 'Manage your snapshot mailing subscriptions'
});

async function initForm() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/subscriptionsList`);
  status.value = Status.WAITING;

  if (response.status === 200) {
    subscriptionsList.value = await response.json();
    updatedSubscriptions.value = Object.keys(subscriptionsList.value);
  } else {
    status.value = Status.ERROR;
  }
}

function update() {
  return unsubscribe(updatedSubscriptions.value);
}

function unsubscribeFromAll() {
  return unsubscribe([]);
}

async function unsubscribe(subscriptions: string[]) {
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
          subscriptions
        },
        method: 'snapshot.unsubscribe'
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

const subscriptionsListReady = computed(() => {
  return Object.keys(subscriptionsList).length > 0;
});

onMounted(() => initForm());
</script>

<template>
  <BasePage title="Email preferences" :centered="false">
    <div v-if="status === Status.UNKNOWN">
      <MessageBody><LoadingSpinner :big="true" /></MessageBody>
    </div>
    <div v-else-if="status === Status.SUCCESS">
      <MessageBody v-if="updatedSubscriptions.length === 0">
        You have been unsubscribed from the Snapshot mailing list.
      </MessageBody>
      <MessageBody v-else>Your email subscription preferences have been updated.</MessageBody>
      <RedirectButton class="mt-3" />
    </div>
    <div v-else class="text-left">
      <div v-if="status === Status.ERROR">
        <MessageBox variant="danger">
          An error occured while processing your request. Please try again, or
          <a title="Contact the support" href="https://discord.snapshot.org/">contact the support</a
          >.
        </MessageBox>
      </div>
      <form v-if="subscriptionsListReady">
        <p class="mb-2">Select the email categories you wish to receive:</p>
        <template v-for="(data, key) in subscriptionsList" :key="key">
          <InputCheckbox v-model="updatedSubscriptions" :value="key" class="py-2">
            <span class="subscription-name">{{ data.name }}</span>
            <small class="subscription-description">{{ data.description }}</small>
          </InputCheckbox>
        </template>
        <BaseButton primary :loading="loading" type="submit" class="mt-5" @click="update"
          >Update preferences</BaseButton
        >
        <BaseButton :loading="loading" type="submit" class="mt-3" @click="unsubscribeFromAll"
          >Unsubscribe from all</BaseButton
        >
      </form>
    </div>
  </BasePage>
</template>

<style scoped lang="scss">
.subscription-name {
  color: var(--heading-color);
}

.subscription-description {
  line-height: 1.5;
  display: block;
}
</style>
