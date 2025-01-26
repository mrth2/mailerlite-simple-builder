<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ref } from "vue";

defineEmits<{
  (event: "close"): void;
  (event: "select", image: string): void;
}>();

const availableImages = [
  "https://picsum.photos/400",
  "https://picsum.photos/401",
  "https://picsum.photos/402",
  "https://picsum.photos/403",
];

const loadedImages = ref<Set<string>>(new Set());

const handleImageLoad = (image: string) => {
  loadedImages.value.add(image);
};
</script>

<template>
  <div class="modal modal-pick-image">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="text-xl">Select an Image to continue</h2>
        <X
          class="modal-close-button cursor-pointer w-6 h-6"
          @click="$emit('close')"
        />
      </div>
      <div class="image-grid">
        <div
          v-for="(image, index) in availableImages"
          :key="index"
          class="image-container"
        >
          <div v-show="!loadedImages.has(image)" class="image-skeleton" />
          <img
            :src="image"
            @load="handleImageLoad(image)"
            @click="$emit('select', image)"
            class="image-item"
            :class="{ hidden: !loadedImages.has(image) }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.image-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4 w-full;

  .image-container {
    @apply relative w-full h-[200px];
  }

  .image-skeleton {
    @apply w-full h-full rounded bg-gray-200 animate-pulse;
  }

  .image-item {
    @apply absolute inset-0 w-full h-full object-cover cursor-pointer rounded transition-transform duration-200 ease-in-out hover:scale-105;
  }
}
</style>
