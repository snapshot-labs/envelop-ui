<script setup lang="ts">
defineProps<{
  variant?: 'danger';
}>();
</script>

<template>
  <p
    :class="[
      'mb-4',
      {
        'text-red': variant === 'danger'
      }
    ]"
  >
    <slot />
  </p>
</template>
