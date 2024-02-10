<script setup lang="ts">
import BrandLogo from '@/components/BrandLogo.vue';
import MessageTitle from '@/components/MessageTitle.vue';

withDefaults(defineProps<{ centered?: boolean; title: string }>(), {
  centered: true
});
</script>

<template>
  <div
    :class="[
      'max-w-screen-xs',
      'xs:w-[420px]',
      'p-5',
      'py-6',
      { 'text-center': centered }
    ]"
  >
    <BrandLogo />
    <div v-if="centered" class="space-sep"></div>
    <div v-else class="line-sep"></div>
    <MessageTitle>{{ title }}</MessageTitle>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.line-sep {
  @apply my-4;

  display: block;
  height: 2px;
  background: var(--border-color);
}
.space-sep {
  @apply my-5;
}
</style>
