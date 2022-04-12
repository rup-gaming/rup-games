<template>
  <n-config-provider :theme="store.darkMode ? darkTheme : lightTheme">
    <n-message-provider :duration="6000" :closable="true">
      <n-layout style="height: 100vh">
        <rup-header> </rup-header>
        <rup-content> </rup-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { useStore } from "./store/store";
import {
  darkTheme,
  lightTheme,
  NConfigProvider,
  NMessageProvider,
  NLayout,
} from "naive-ui";
import { RupHeader, RupContent } from "./components";

const store = useStore();

onresize = store.setWindowWidth;

defineComponent({
  darkTheme,
  lightTheme,
  RupHeader,
  RupContent,
});
</script>
