<script setup lang="ts">
import { useEditorStore } from "@/stores";
import type { IEditorBlock } from "@/types";

const EditorStore = useEditorStore();

function onStartDragBlock(event: DragEvent, blockType: IEditorBlock["type"]) {
  event.dataTransfer?.setData(
    "block",
    JSON.stringify(EditorStore.generateEmptyBlock(blockType))
  );
}
</script>
<template>
  <nav class="side-menu">
    <h2 class="text-xl font-semibold">Blocks</h2>
    <p>Simply drag & drop blocks below to the right</p>
    <ul class="ui-blocks">
      <li draggable="true" @dragstart="onStartDragBlock($event, 'text')">
        Text
      </li>
      <li draggable="true" @dragstart="onStartDragBlock($event, 'image')">
        Image
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="postcss">
.side-menu {
  @apply bg-slate-700 text-white p-4 space-y-5;
  ul.ui-blocks {
    @apply flex flex-col gap-3;
    li {
      @apply bg-green-200 p-2 rounded-lg shadow-sm text-primary cursor-move;
    }
  }
}
</style>
