<script setup lang="ts">
const props = defineProps<{
  modelValue: string[];
  value: string;
}>();

const updateValue = () => {
  const arr = props.modelValue;
  if (arr.includes(props.value)) {
    arr.splice(arr.indexOf(props.value), 1);
  } else {
    arr.push(props.value);
  }
};
</script>

<template>
  <label class="flex items-baseline gap-3">
    <input
      :v-model="modelValue"
      :value="value"
      :checked="modelValue.includes(value)"
      type="checkbox"
      class="border-skin-text bg-skin-bg text-primary"
      @input="updateValue"
    />
    <div>
      <slot />
    </div>
  </label>
</template>
