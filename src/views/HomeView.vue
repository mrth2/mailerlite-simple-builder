<script setup lang="ts">
import HeaderMenu from "@/components/editor/HeaderMenu.vue";
import SideMenu from "@/components/editor/SideMenu.vue";
import CanvasEditor from "@/components/editor/CanvasEditor.vue";
</script>

<template>
  <main class="grid bg-neutral grid-cols-[minmax(250px,350px)_1fr] gap-4 pt-14">
    <HeaderMenu />
    <SideMenu />
    <div /> <!-- Empty div to fill the gap -->
    <CanvasEditor />
  </main>
</template>
