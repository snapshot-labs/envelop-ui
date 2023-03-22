<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';

let verified = ref(false);

function verify() {
  verified.value = true;
}
</script>

<template>
  <div v-if="!verified">
    <h1>Verify your email</h1>
    <BaseButton primary @click="verify">Verify email</BaseButton>
  </div>
  <div v-else>[SUCCESS ICON] Your email is now confirmed</div>
</template>
