<template>
  <n-layout-header bordered>
    <router-link color="red" to="/">Home</router-link>
    <router-link to="/play">Play</router-link>
  </n-layout-header>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { NLayoutHeader } from "naive-ui";
</script>

<style scoped>
.n-layout-header {
  height: 70px;
  padding: 0px 24px 0px 24px;
  display: flex;
  align-items: center;
}
</style>
