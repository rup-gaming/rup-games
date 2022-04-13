<template>
  <n-layout class="content" :native-scrollbar="false" style="padding: 24px">
    <router-view></router-view>
  </n-layout>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { NLayout } from "naive-ui";
</script>

<style scoped>
.main-layout {
  top: 64px;
  padding: 0px;
}
</style>
