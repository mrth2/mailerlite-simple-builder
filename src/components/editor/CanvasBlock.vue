<script setup lang="ts">
import { ref, computed } from "vue";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CopyIcon,
  GripVerticalIcon,
  TrashIcon,
  ImagePlusIcon,
  EditIcon,
} from "lucide-vue-next";
import { useEditorStore } from "@/stores";
import ModalPickImage from "./ModalPickImage.vue";

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
const currentBlock = computed(
  () => EditorStore.blocks[currentBlockIndex.value]
);
const canPickImage = computed(() => currentBlock.value.type === "image");
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
const isChangingImage = ref(false);
function onChangeImage(imageUrl: string) {
  if (!currentBlock.value) return;
  EditorStore.updateBlock(props.blockId, {
    ...currentBlock.value.data,
    src: imageUrl,
  }); // update block with new image
  isChangingImage.value = false;
}
function onDuplicateBlock() {
  EditorStore.duplicateBlock(props.blockId); // duplicate block
}
function onDeleteBlock() {
  EditorStore.removeBlock(props.blockId); // remove block
}

const isDragging = ref(false);

const blockRef = ref<HTMLElement | null>(null);

const dropPosition = ref<"top" | "bottom" | null>(null);

function onDragStart(e: DragEvent) {
  if (!e.dataTransfer || !blockRef.value) return;

  isDragging.value = true;
  e.dataTransfer.effectAllowed = "move";
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
  dropPosition.value = mouseY < threshold ? "top" : "bottom";
  EditorStore.setDropPosition({
    to: dropPosition.value,
    blockId: props.blockId,
  });
}

function onDragLeave() {
  dropPosition.value = null;
  EditorStore.setDropPosition(null);
}

function onDrop(e: DragEvent) {
  e.preventDefault();
  if (
    !EditorStore.draggingBlockId ||
    EditorStore.draggingBlockId === props.blockId
  )
    return;

  const sourceIndex = EditorStore.getBlockIndex(EditorStore.draggingBlockId);
  const targetIndex = currentBlockIndex.value;

  if (sourceIndex !== -1 && targetIndex !== -1) {
    // If dropping below, increment target index to insert after current block
    const adjustedTargetIndex =
      dropPosition.value === "bottom" ? targetIndex + 1 : targetIndex;
    EditorStore.moveBlock(sourceIndex, adjustedTargetIndex);
  }

  dropPosition.value = null;
  EditorStore.setDragging(null);
}

// Compute classes based on drag state
const blockClasses = computed(() => ({
  active: showActions.value,
  dragging: isDragging.value,
  "drop-target-top": dropPosition.value === "top",
  "drop-target-bottom": dropPosition.value === "bottom",
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
    @dragleave="onDragLeave"
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
        <GripVerticalIcon class="w-4 h-4" />
      </button>
      <button
        v-if="canPickImage"
        v-tippy="{ content: 'Change image' }"
        class="block-action-item"
        data-aria-label="Change image"
        @click="isChangingImage = true"
      >
        <ImagePlusIcon class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Move Up' }"
        class="block-action-item"
        data-aria-label="Move Up"
        :disabled="!canMoveUp"
        @click="onMoveBlockUp"
      >
        <ArrowUpIcon class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Move Down' }"
        class="block-action-item"
        data-aria-label="Move Down"
        :disabled="!canMoveDown"
        @click="onMoveBlockDown"
      >
        <ArrowDownIcon class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Duplicate' }"
        class="block-action-item"
        data-aria-label="Duplicate"
        @click="onDuplicateBlock"
      >
        <CopyIcon class="w-4 h-4" />
      </button>
      <button
        v-tippy="{ content: 'Remove' }"
        class="block-action-item text-red-600"
        data-aria-label="Remove"
        @click="onDeleteBlock"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>
    <!-- modal to change image of an image block -->
    <Teleport to="body">
      <ModalPickImage
        v-if="isChangingImage"
        heading="Select an Image to change"
        @select="onChangeImage"
        @close="isChangingImage = false"
      />
    </Teleport>
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

  &.drop-target-top {
    &::before {
      content: "";
      @apply absolute -top-1 inset-x-0 h-1 bg-accent;
    }
  }

  &.drop-target-bottom {
    &::after {
      content: "";
      @apply absolute -bottom-1 inset-x-0 h-1 bg-accent;
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
