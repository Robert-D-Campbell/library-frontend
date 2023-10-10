<script setup>
import { defineAsyncComponent } from "vue";
const List = defineAsyncComponent(() => import("../components/List.vue"));
const Spinner = defineAsyncComponent(() => import("../components/Spinner.vue"));
</script>

<template>
  <Suspense>
    <template #default>
      <List endpoint="/api/books" />
    </template>
    <template #fallback><Spinner /></template>
  </Suspense>
</template>

<style>
.books {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
