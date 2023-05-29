<script setup lang="ts">
defineProps<{
  variant?: 'danger';
}>();
</script>

<template>
  <p
    :class="[
      'mb-4',
      'py-3',
      'px-4',
      'bg-[#737373]/10',
      'rounded-md',
      {
        'text-red bg-[#ef4444]/10': variant === 'danger'
      }
    ]"
  >
    <slot />
  </p>
</template>
