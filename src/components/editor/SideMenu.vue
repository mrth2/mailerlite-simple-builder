<script setup lang="ts">
import { Text, Image } from "lucide-vue-next";
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
    <p>Simply drag & drop blocks below to the right</p>
    <ul class="ui-blocks">
      <li draggable="true" @dragstart="onStartDragBlock($event, 'text')">
        <Text class="w-5 h-5" />
        Text
      </li>
      <li draggable="true" @dragstart="onStartDragBlock($event, 'image')">
        <Image class="w-5 h-5" />
        Image
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
.side-menu {
  @apply bg-slate-700 text-white p-4 space-y-5;
  @apply fixed top-14 h-screen;

  ul.ui-blocks {
    @apply flex flex-col gap-3;
    li {
      @apply bg-accent text-white p-2 rounded-lg shadow-sm cursor-move;
      @apply flex gap-2 items-center;
    }
  }
}
</style>
