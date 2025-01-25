<script setup lang="ts">
import { useEditorStore } from "@/stores";
import { onMounted } from "vue";
import { computed } from "vue";
import TextBlock from "../blocks/TextBlock.vue";
import ImageBlock from "../blocks/ImageBlock.vue";
import ModalPickImage from "./ModalPickImage.vue";
import { ref } from "vue";
import type { IEditorBlock, IEditorBlockImage } from "@/types";

const EditorStore = useEditorStore();
const addedBlocks = computed(() => EditorStore.data?.blocks ?? []);

onMounted(() => {
  EditorStore.initialize(); // reset blocks on mount
});

function onDragBlockOver(event: DragEvent) {
  event.preventDefault();
}

// store pending image block, if dragging a new image block
const pendingImageBlock = ref<IEditorBlockImage | null>(null);
function onDropBlock(event: DragEvent) {
  event.preventDefault();
  try {
    const blockData: IEditorBlock = JSON.parse(
      event.dataTransfer?.getData("block") || "{}"
    );
    if (blockData.type === "image" && !blockData.data.src) {
      pendingImageBlock.value = blockData; // store pending image block
    } else if (blockData.type === "text") {
      EditorStore.addBlock(blockData); // add block if text
    }
  } catch (error) {
    console.error(error);
  }
}
function onSelectImage(imageUrl: string) {
  if (!pendingImageBlock.value) return;
  EditorStore.addBlock({
    ...pendingImageBlock.value,
    data: {
      ...pendingImageBlock.value.data,
      src: imageUrl,
    },
  }); // add image block with src
  pendingImageBlock.value = null; // reset pending image block
}
</script>

<template>
  <section class="canvas-editor">
    <div class="canvas-area" @dragover="onDragBlockOver" @drop="onDropBlock">
      <h2 class="text-xl font-semibold mb-4 ml-8">Editor</h2>
      <!-- Editor content will go here -->
      <div class="canvas-blocks">
        <div v-for="block in addedBlocks" :key="block.id">
          <TextBlock
            v-if="block.type === 'text'"
            :id="block.id"
            :data="block.data"
          />
          <ImageBlock
            v-else-if="block.type === 'image'"
            :id="block.id"
            :data="block.data"
          />
        </div>
      </div>
    </div>
    <Teleport to="body">
      <ModalPickImage
        v-if="!!pendingImageBlock"
        @select="onSelectImage"
        @close="pendingImageBlock = null"
      />
    </Teleport>
  </section>
</template>

<style scoped lang="postcss">
.canvas-editor {
  @apply p-10;

  .canvas-area {
    @apply bg-white rounded-lg py-8 max-w-screen-md mx-auto min-h-[calc(100vh-2rem)] shadow-sm;
  }
}
</style>
