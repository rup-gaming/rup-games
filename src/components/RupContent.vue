<template>
  <n-layout position="absolute" :native-scrollbar="false" class="main-layout">
    <n-layout style="height: 100vh; padding: 24px">
      <router-view></router-view>
    </n-layout>
    <rup-footer></rup-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { NLayout } from "naive-ui";
import { RupFooter } from "../components";
</script>

<style scoped>
.main-layout {
  top: 64px;
  padding: 0px;
}
</style>
