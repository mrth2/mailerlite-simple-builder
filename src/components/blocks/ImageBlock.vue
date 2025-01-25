<script setup lang="ts">
import type { IImageBlock } from "@/types";
import { defineProps } from "vue";

const props = defineProps<{
  id: string;
  data: IImageBlock;
}>();

// if image src is not provided, request user to pick an image
</script>

<template>
  <div class="image-block" :style="{ justifyContent: data.alignment }">
    <img
      :src="data.src || 'https://picsum.photos/400'"
      alt="Image"
      :width="data.width"
      :height="data.height"
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
