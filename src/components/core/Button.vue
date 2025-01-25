<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
withDefaults(
  defineProps<{
    type?: "button" | "submit";
    disabled?: boolean;
  }>(),
  {
    type: "button",
    disabled: false,
  }
);
</script>
<template>
  <button class="btn" type="button">
    <slot />
  </button>
</template>

<style scoped lang="postcss">
.btn {
  @apply rounded py-2 px-5 bg-accent text-white bg-opacity-100 hover:bg-opacity-60 transition-opacity duration-200;
}
</style>
