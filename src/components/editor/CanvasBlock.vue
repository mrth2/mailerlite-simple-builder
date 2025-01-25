<script setup lang="ts">
import { ref } from "vue";
import { ArrowUp, ArrowDown, Copy, Trash } from "lucide-vue-next";
import { useEditorStore } from "@/stores";

const props = defineProps<{
  blockId: string;
}>();

const showActions = ref(false);
function onMouseOver() {
  showActions.value = true;
}
function onMouseLeave() {
  if (isFocusing.value) return;
  showActions.value = false;
}

const isFocusing = ref(false);
function onBlockFocus() {
  isFocusing.value = true;
  showActions.value = true;
}
function onBlockBlur() {
  isFocusing.value = false;
  showActions.value = false;
}

// actions
const EditorStore = useEditorStore();
function onMoveBlockUp() {
  // EditorStore.moveBlockUp(props.blockId); // move block up
}
function onMoveBlockDown() {
  // EditorStore.moveBlockDown(props.blockId); // move block down
}
function onDuplicateBlock() {
  const block = EditorStore.blocks.find((b) => b.id === props.blockId);
  if (!block) return;
  EditorStore.addBlock(block); // duplicate block
}
function onDeleteBlock() {
  EditorStore.removeBlock(props.blockId); // remove block
}
</script>

<template>
  <div
    class="canvas-block"
    :class="{ active: showActions }"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
  >
    <slot :on-focus="onBlockFocus" :on-blur="onBlockBlur" />

    <div v-if="showActions" class="block-actions">
      <button
        v-tippy="{ content: 'Move Up' }"
        class="block-action-item"
        @click="onMoveBlockUp"
      >
        <ArrowUp class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Move Down' }"
        class="block-action-item"
        @click="onMoveBlockDown"
      >
        <ArrowDown class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Duplicate' }"
        class="block-action-item"
        @click="onDuplicateBlock"
      >
        <Copy class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Remove' }"
        class="block-action-item text-red-600"
        @click="onDeleteBlock"
      >
        <Trash class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.canvas-block {
  @apply relative border-2 border-dashed border-transparent hover:border-accent transition-colors duration-300 ease-out;

  &.active {
    @apply border-accent;
  }

  .block-actions {
    @apply absolute -top-8 right-0 bg-white border border-gray-200 rounded p-1 flex gap-1 shadow-sm;
    .block-action-item {
      @apply p-2 hover:bg-gray-100 rounded;
    }
  }
}
</style>
