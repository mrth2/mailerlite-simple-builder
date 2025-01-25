<script setup lang="ts">
import { ref } from "vue";
import { ArrowUp, ArrowDown, Copy, Trash } from "lucide-vue-next";

const props = defineProps<{
  blockId: string;
}>();

const emit = defineEmits<{
  (event: "remove"): void;
  (event: "moveUp"): void;
  (event: "moveDown"): void;
  (event: "duplicate"): void;
}>();

const showMenu = ref(false);
</script>

<template>
  <div
    class="canvas-block"
    :class="{ 'outline-2 outline-dashed outline-gray-300': showMenu }"
    @mouseover="showMenu = true"
    @mouseleave="showMenu = false"
  >
    <slot />

    <div v-if="showMenu" class="block-actions">
      <button
        @click="$emit('moveUp')"
        title="Move Up"
        class="block-action-item"
      >
        <ArrowUp class="w-4 h-4" />
      </button>
      <button
        @click="$emit('moveDown')"
        title="Move Down"
        class="block-action-item"
      >
        <ArrowDown class="w-4 h-4" />
      </button>
      <button
        @click="$emit('duplicate')"
        title="Duplicate"
        class="block-action-item"
      >
        <Copy class="w-4 h-4" />
      </button>
      <button
        @click="$emit('remove')"
        title="Remove"
        class="block-action-item text-red-600"
      >
        <Trash class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.canvas-block {
  @apply relative;
  .block-actions {
    @apply absolute -top-8 right-0 bg-white border border-gray-200 rounded p-1 flex gap-1 shadow-sm;
    .block-action-item {
      @apply p-2 hover:bg-gray-100 rounded;
    }
  }
}
</style>
