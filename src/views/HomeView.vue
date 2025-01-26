<script setup lang="ts">
import HeaderMenu from "@/components/editor/HeaderMenu.vue";
import SideMenu from "@/components/editor/SideMenu.vue";
import CanvasEditor from "@/components/editor/CanvasEditor.vue";
</script>

<template>
  <main>
    <HeaderMenu />
    <SideMenu />
    <CanvasEditor />
  </main>
</template>

<style scoped lang="postcss">
main {
  --side-menu-width: theme("width.80");
  @apply bg-neutral gap-4 pt-14 lg:pl-[var(--side-menu-width)];
  @apply pb-40 lg:pb-0;
}
</style>
