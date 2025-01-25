<script setup lang="ts">
import { defineProps } from "vue";
import type { ITextBlock } from "@/types";

defineProps<{
  block: ITextBlock;
}>();
</script>

<template>
  <div
    class="text-block"
    contenteditable="true"
    v-html="block.content"
    :style="{
      fontFamily: block.fontFamily ?? 'inherit',
      fontSize: block.fontSize ? `${block.fontSize}px` : 'inherit',
      color: block.color ?? 'inherit',
      textAlign: block.textAlign ?? 'left',
    }"
  />
</template>

<style scoped lang="postcss">
.text-block {
  @apply py-4 px-8;
}
</style>
