<script setup lang="ts">
import { ImageIcon, TextIcon } from "lucide-vue-next";
import { useEditorStore } from "@/stores";
import type { IEditorBlock } from "@/types";

const EditorStore = useEditorStore();

function onStartDragBlock(event: DragEvent, blockType: IEditorBlock["type"]) {
  if (!event.dataTransfer) return;
  event.dataTransfer.effectAllowed = "copyMove";
  const newEmptyBlock = EditorStore.generateEmptyBlock(blockType);
  EditorStore.setDragging(newEmptyBlock.id);
  event.dataTransfer.setData("block", JSON.stringify(newEmptyBlock));
}
</script>
<template>
  <nav class="side-menu">
    <h2 class="text-xl font-semibold">Blocks</h2>
    <p>Simply drag & drop blocks below to the <strong>Editor area</strong></p>
    <ul class="ui-blocks">
      <li draggable="true" @dragstart="onStartDragBlock($event, 'text')">
        <TextIcon class="w-5 h-5" />
        Text
      </li>
      <li draggable="true" @dragstart="onStartDragBlock($event, 'image')">
        <ImageIcon class="w-5 h-5" />
        Image
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
.side-menu {
  @apply bg-slate-700 text-white p-4;
  @apply fixed z-10 bottom-0 inset-x-0 flex flex-col justify-start gap-5;

  ul.ui-blocks {
    @apply flex flex-row flex-wrap gap-3;
    li {
      @apply bg-accent text-white p-2 rounded-lg shadow-sm cursor-move;
      @apply min-w-40 flex gap-2 items-center;
      opacity: 0.9999; /* set opacity to prevent rounded corners bug */
    }
  }
}
@screen lg {
  .side-menu {
    @apply max-w-80 bottom-auto top-14 h-screen;
    ul.ui-blocks {
      @apply flex-col;
      li {
        @apply min-w-0;
      }
    }
  }
}
</style>
