<script setup lang="ts">
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
</script>

<template>
  <div class="modal">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h2 class="text-xl">Select an Image to continue</h2>
        <button class="modal-close-button" @click="$emit('close')">&times;</button>
      </div>
      <div class="image-grid">
        <img
          v-for="(image, index) in availableImages"
          :key="index"
          :src="image"
          @click="$emit('select', image)"
          class="image-item"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.image-grid {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4 w-full;
  .image-item {
    @apply w-full h-[200px] object-cover cursor-pointer rounded transition-transform duration-200 ease-in-out hover:scale-105;
  }
}
</style>
