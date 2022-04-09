<template>
  <n-config-provider :theme="darkTheme">
    <n-layout style="height: 100vh">
      <n-layout-header bordered class="app-header">
        <router-link color="red" to="/">Home</router-link>
        <router-link to="/play">Play</router-link>
      </n-layout-header>
      <n-layout
        position="absolute"
        :native-scrollbar="false"
        class="main-layout"
      >
        <n-layout style="height: 100vh; padding: 24px">
          <router-view></router-view>
        </n-layout>
        <n-layout-footer bordered> Footer </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";
import {
  darkTheme,
  lightTheme,
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutFooter,
} from "naive-ui";

defineComponent({
  darkTheme,
  lightTheme,
});
</script>

<style scoped>
.app-header {
  height: 70px;
  padding: 0px 24px 0px 24px;
  display: flex;
  align-items: center;
}

.main-layout {
  top: 70px;
  padding: 0px;
}

.n-layout-footer {
  padding: 24px;
}
</style>
