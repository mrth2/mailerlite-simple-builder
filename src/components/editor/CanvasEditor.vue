<script setup lang="ts">
function onDragBlockOver(event: DragEvent) {
  event.preventDefault();
  // console.log("Drag over", event.dataTransfer, event.dataTransfer?.dropEffect);
}
function onDropBlock(event: DragEvent) {
  event.preventDefault();
  console.log("Drop", event.dataTransfer, event.dataTransfer?.dropEffect);
  try {
    const blockData = JSON.parse(event.dataTransfer?.getData("block") || "{}");
    console.log("Block data", blockData);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <section class="canvas-editor">
    <div class="canvas-area" @dragover="onDragBlockOver" @drop="onDropBlock">
      <h2 class="text-xl font-semibold mb-4">Editor</h2>
      <!-- Editor content will go here -->
    </div>
  </section>
</template>

<style scoped lang="postcss">
.canvas-editor {
  @apply p-10;

  .canvas-area {
    @apply bg-white rounded-lg p-8 max-w-screen-md mx-auto min-h-[calc(100vh-2rem)] shadow-sm;
  }
}
</style>
