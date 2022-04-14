<template>
  <n-layout-content
    class="rup-content"
    embedded
    :native-scrollbar="false"
    content-style="display: flex; height: 100%; flex-direction: column;"
  >
    <div class="rup-content-inner">
      <router-view></router-view>
    </div>
    <rup-footer> </rup-footer>
  </n-layout-content>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { RupFooter } from "../components";
import { NLayoutContent } from "naive-ui";
</script>

<style scoped>
.rup-content {
  display: flex;
  margin-top: 64px;
  flex: auto;
  flex-direction: column;
}

.rup-content-inner {
  display: flex;
  flex: auto;
  flex-direction: column;
  padding: 25px;
}
</style>
