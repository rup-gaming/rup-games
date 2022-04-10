<template>
  <n-config-provider :theme="darkTheme">
    <n-layout style="height: 100vh">
      <rup-header :windowWidth="windowWidth"> </rup-header>
      <rup-content> </rup-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { darkTheme, lightTheme, NConfigProvider, NLayout } from "naive-ui";
import { RupHeader, RupContent } from "./components";

const windowWidth = ref<number>(innerWidth);

const getWindowWidth = () => {
  windowWidth.value = innerWidth;
};

onresize = getWindowWidth;

defineComponent({
  darkTheme,
  lightTheme,
});
</script>
