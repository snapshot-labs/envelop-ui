<script setup lang="ts">
import { RouterView } from 'vue-router';
import BrandLogo from '@/components/BrandLogo.vue';
</script>

<template>
  <div class="grid h-screen place-items-center">
    <div class="max-w-screen-xs xs:w-[420px] text-center p-5 py-6">
      <BrandLogo />
      <RouterView />
    </div>
  </div>
</template>
