<template>
  <n-config-provider :theme="darkTheme">
    <n-layout style="height: 100vh" :native-scrollbar="false">
      <n-layout-header bordered>
        <router-link color="red" to="/">Home</router-link>
        <router-link to="/play">Play</router-link>
      </n-layout-header>
      <n-layout
        :native-scrollbar="false"
        content-style="padding: 24px;"
        class="main-layout"
      >
        <router-view></router-view>
      </n-layout>
      <n-layout-footer bordered> Footer </n-layout-footer>
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
import {
  darkTheme,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
} from "naive-ui";

defineComponent({
  darkTheme,
});
</script>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
}

.n-layout-header {
  padding: 24px;
}

.n-layout-footer {
  padding: 24px;
}
</style>
