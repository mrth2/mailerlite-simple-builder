<script setup lang="ts">
import { useEditorStore } from "@/stores";
import Button from "../core/Button.vue";
import { ref } from "vue";
import { Save } from "lucide-vue-next";

const EditorStore = useEditorStore();

const isSaving = ref(false);
function onSave() {
  isSaving.value = true;
  console.log("Saved data:");
  const result = JSON.stringify(EditorStore.data, null, 2)
  console.log(result);
  setTimeout(() => {
    alert('Saved your data! Check console for full result.\n' + result);
    isSaving.value = false;
  }, 1000);
}
</script>

<template>
  <header class="header-menu">
    <div class="text-lg font-bold uppercase">Simple Builder</div>
    <p class="text-xs mt-1.5 mr-auto">by HoaTrinh</p>
    <Button
      :disabled="isSaving"
      @click="onSave"
      class="flex items-center gap-2"
    >
      <Save class="w-5 h-5" />
      {{ isSaving ? "Saving..." : "Save" }}
    </Button>
  </header>
</template>

<style scoped lang="postcss">
.header-menu {
  @apply fixed z-50 top-0 inset-x-0 bg-black text-white px-4 py-5 h-14;
  @apply flex justify-between items-center gap-2;
}
</style>
