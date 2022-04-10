<template>
  <n-layout-header bordered>
    <div class="logo-title">
      <n-icon size="30" class="logo">
        <diamond-sharp />
      </n-icon>
      <n-h3 class="title">Rup Games</n-h3>
    </div>
    <div class="links">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/play">Play</router-link>
    </div>
    <n-icon size="30">
      <menu-sharp />
    </n-icon>
  </n-layout-header>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { NLayoutHeader, NIcon, NH3 } from "naive-ui";
import { DiamondSharp, MenuSharp } from "@vicons/material";

defineComponent({
  DiamondSharp,
  MenuSharp,
});
</script>

<style scoped>
.logo-title {
  min-width: 200px;
  display: flex;
  height: 100%;
  align-items: center;
}

.logo {
  margin-right: 6px;
}

.title {
  margin: 0px;
}

.links {
  flex: auto;
}

.n-layout-header {
  height: 64px;
  padding: 0px 24px 0px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
