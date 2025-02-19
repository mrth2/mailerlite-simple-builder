<script setup lang="ts">
import { ref } from "vue";
import _cloneDeep from "lodash/cloneDeep";
import { useEditorStore } from "@/stores";
import type { ITextBlock } from "@/types";

const props = defineProps<{
  id: string;
  data: ITextBlock;
}>();

const emit = defineEmits<{
  (event: "focus"): void;
  (event: "blur"): void;
}>();

const EditorStore = useEditorStore();

const textData = ref(_cloneDeep(props.data));

function startEditBlock() {
  textData.value = _cloneDeep(props.data);
  emit("focus");
}
function updateTextBlock(event: FocusEvent) {
  textData.value.content = (event.target as HTMLDivElement).innerHTML;
  EditorStore.updateBlock(props.id, textData.value);
  emit("blur");
}
</script>

<template>
  <div
    class="text-block"
    contenteditable="true"
    v-html="textData.content"
    :style="{
      fontFamily: textData.fontFamily ?? 'inherit',
      fontSize: textData.fontSize ? `${textData.fontSize}px` : 'inherit',
      color: textData.color ?? 'inherit',
      textAlign: textData.textAlign ?? 'left',
    }"
    @focus="startEditBlock"
    @blur="updateTextBlock"
  />
</template>

<style scoped lang="postcss">
.text-block {
  @apply py-4 px-8;
  @apply focus-within:outline-none;
}
</style>
