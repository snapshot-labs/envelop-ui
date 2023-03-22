<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';

function redirect() {
  window.location.href = 'https://snapshot.org';
}
</script>

<template>
  <BaseButton @click="redirect">Go back to Snapshot</BaseButton>
</template>
