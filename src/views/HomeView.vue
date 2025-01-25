<script setup lang="ts">
import SideMenu from "@/components/editor/SideMenu.vue";
import CanvasEditor from "@/components/editor/CanvasEditor.vue";
import HeaderMenu from "@/components/editor/HeaderMenu.vue";
</script>

<template>
  <main class="grid bg-neutral grid-cols-[minmax(250px,350px)_1fr] gap-4 py-14">
    <HeaderMenu />
    <SideMenu />
    <CanvasEditor />
  </main>
</template>
