<script setup lang="ts">
import type { IImageBlock } from "@/types";
import { defineProps } from "vue";

defineProps<{
  block: IImageBlock;
}>();
</script>

<template>
  <div class="image-block" :style="{ justifyContent: block.alignment }">
    <img
      :src="block.src || 'https://picsum.photos/400'"
      alt="Image"
      :width="block.width"
      :height="block.height"
    />
  </div>
</template>

<style scoped lang="postcss">
.image-block {
  @apply flex items-center py-4 px-8;

  img {
    @apply object-cover object-center rounded-xl;
  }
}
</style>
