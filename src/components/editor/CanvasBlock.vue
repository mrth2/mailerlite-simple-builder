<script setup lang="ts">
import { ref } from "vue";
import { ArrowUp, ArrowDown, Copy, Trash, GripVertical } from "lucide-vue-next";
import { useEditorStore } from "@/stores";
import { computed } from "vue";

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

const EditorStore = useEditorStore();
const currentBlockIndex = computed(() =>
  EditorStore.getBlockIndex(props.blockId)
);
const canMoveUp = computed(() => currentBlockIndex.value > 0);
const canMoveDown = computed(
  () => currentBlockIndex.value < EditorStore.blocks.length - 1
);
// actions
function onMoveBlockUp() {
  EditorStore.moveBlockUp(props.blockId); // move block up
}
function onMoveBlockDown() {
  EditorStore.moveBlockDown(props.blockId); // move block down
}
function onDuplicateBlock() {
  const block = EditorStore.blocks.find((b) => b.id === props.blockId);
  if (!block) return;
  EditorStore.addBlock(block); // duplicate block
}
function onDeleteBlock() {
  EditorStore.removeBlock(props.blockId); // remove block
}

const isDragging = ref(false);
const draggedOverIndex = ref<number | null>(null);

const blockRef = ref<HTMLElement | null>(null);

function onDragStart(e: DragEvent) {
  if (!e.dataTransfer || !blockRef.value) return;

  // Create ghost element with content
  const ghost = document.createElement("div");
  ghost.classList.add("canvas-block-ghost");
  // Copy the content area (slot content)
  const content = blockRef.value.querySelector(".block-content");
  if (content) {
    ghost.appendChild(content.cloneNode(true));
  }

  // Hide the ghost element but keep it in DOM for drag image
  ghost.style.position = "absolute";
  ghost.style.left = "-9999px";
  document.body.appendChild(ghost);

  // Set drag image
  e.dataTransfer.setDragImage(ghost, 0, 0);

  // Clean up ghost after drag starts
  requestAnimationFrame(() => {
    document.body.removeChild(ghost);
  });

  isDragging.value = true;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", props.blockId);
  EditorStore.setDragging(props.blockId);
}

function onDragEnd() {
  isDragging.value = false;
  EditorStore.setDragging(null);
}

// drag and drop handlers
function onDragOver(e: DragEvent) {
  e.preventDefault();
  if (!e.dataTransfer) return;

  const rect = blockRef.value?.getBoundingClientRect();
  if (!rect) return;

  e.dataTransfer.dropEffect = "move";

  // Determine if we should place before or after based on mouse position
  const mouseY = e.clientY;
  const threshold = rect.top + rect.height / 2;
  const targetIndex =
    mouseY < threshold ? currentBlockIndex.value : currentBlockIndex.value + 1;
}

function onDrop(e: DragEvent) {
  e.preventDefault();
  const sourceBlockId = e.dataTransfer?.getData("text/plain");
  if (!sourceBlockId || sourceBlockId === props.blockId) return;

  const sourceIndex = EditorStore.getBlockIndex(sourceBlockId);
  const targetIndex = currentBlockIndex.value;

  if (sourceIndex !== -1 && targetIndex !== -1) {
    EditorStore.moveBlock(sourceIndex, targetIndex);
  }

  EditorStore.setDragging(null);
}

// Compute classes based on drag state
const blockClasses = computed(() => ({
  active: showActions.value,
  dragging: isDragging.value,
}));
</script>

<template>
  <div
    ref="blockRef"
    class="canvas-block"
    :class="blockClasses"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    @dragover="onDragOver"
    @drop="onDrop"
  >
    <div class="block-content">
      <slot :on-focus="onBlockFocus" :on-blur="onBlockBlur" />
    </div>

    <div v-if="showActions" class="block-actions">
      <button
        v-tippy="{ content: 'Drag to move' }"
        class="block-action-item drag-handle"
        draggable="true"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
      >
        <GripVertical class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Move Up' }"
        class="block-action-item"
        :disabled="!canMoveUp"
        @click="onMoveBlockUp"
      >
        <ArrowUp class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Move Down' }"
        class="block-action-item"
        :disabled="!canMoveDown"
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
  @apply relative border-2 border-dashed border-transparent hover:border-accent transition-all duration-300 ease-out;

  &.active {
    @apply border-accent;
  }

  &.dragging {
    @apply opacity-50;
  }

  &.drop-target {
    @apply border-primary border-solid;

    &::before {
      content: "";
      @apply absolute -top-1 left-0 right-0 h-0.5 bg-primary;
    }
  }

  .block-actions {
    @apply absolute -top-8 right-0 bg-white border border-gray-200 rounded p-1 flex gap-1 shadow-sm;

    .block-action-item {
      @apply p-2 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed;

      &.drag-handle {
        @apply cursor-move;
      }
    }
  }
}

.canvas-block-ghost {
  @apply bg-white rounded shadow-lg p-4 border border-accent;
  width: 400px;
  pointer-events: none;
}

.block-content {
  @apply w-full;
}
</style>
