<template>
  <n-config-provider :theme="darkTheme">
    <n-layout style="height: 100vh">
      <rup-header> </rup-header>
      <rup-content> </rup-content>
    </n-layout>
  </n-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { darkTheme, lightTheme, NConfigProvider, NLayout } from "naive-ui";
import { RupHeader, RupContent } from "./components";

defineComponent({
  darkTheme,
  lightTheme,
});
</script>
