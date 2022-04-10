<template>
  <n-layout-header bordered>
    <div class="side-container-left">
      <n-icon size="30" class="logo">
        <diamond-sharp />
      </n-icon>
      <n-h3 class="title">Rup Games</n-h3>
    </div>

    <div
      class="menu"
      v-show="store.windowWidth !== 'xs' && store.windowWidth !== 'sm'"
    >
      <n-menu
        :value="`${currentRoute.name}`"
        mode="horizontal"
        :options="appNavigation"
      />
    </div>

    <div class="side-container-right">
      <n-button
        class="side-container-item"
        text
        tag="a"
        href="https://github.com/waylonturbes/square-game"
        target="_blank"
        v-show="store.windowWidth !== 'xs' && store.windowWidth !== 'sm'"
      >
        GitHub
      </n-button>

      <n-button
        ghost
        style="margin-left: 20px"
        @click="disableDarkMode(true)"
        type="default"
        v-show="store.windowWidth !== 'xs' && store.windowWidth !== 'sm'"
        v-if="!store.darkMode"
      >
        <template #icon>
          <n-icon size="20">
            <dark-mode-outlined />
          </n-icon>
        </template>
        Dark
      </n-button>

      <n-button
        ghost
        style="margin-left: 20px"
        @click="disableDarkMode(false)"
        type="default"
        v-show="store.windowWidth !== 'xs' && store.windowWidth !== 'sm'"
        v-else
      >
        <template #icon>
          <n-icon size="20">
            <light-mode-outlined />
          </n-icon>
        </template>
        Light
      </n-button>

      <n-icon
        size="30"
        style="margin-left: 20px"
        v-show="store.windowWidth === 'xs' || store.windowWidth === 'sm'"
      >
        <menu-sharp />
      </n-icon>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { defineComponent, h } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { NLayoutHeader, NIcon, NH3, NMenu, NButton } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { useStore } from "../store/store";
import {
  DiamondSharp,
  MenuSharp,
  LightModeOutlined,
  DarkModeOutlined,
} from "@vicons/material";

const store = useStore();
const currentRoute = useRoute();

function disableDarkMode(isDark: boolean) {
  store.setDarkMode(isDark);
}

const appNavigation: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home",
          },
        },
        { default: () => "Home" }
      ),
    key: "home",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/about",
        },
        { default: () => "About" }
      ),
    key: "about",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "play",
          },
        },
        { default: () => "Play" }
      ),
    key: "play",
  },
];

defineComponent({
  DiamondSharp,
  MenuSharp,
  LightModeOutlined,
  DarkModeOutlined,
});
</script>

<style scoped>
.side-container-left {
  min-width: 240px;
  display: flex;
  height: 100%;
  align-items: center;
}

.side-container-right {
  display: flex;
  height: 100%;
  align-items: center;
}

.side-container-right {
  display: flex;
  height: 100%;
  align-items: center;
}

.side-container-item {
  padding: 0px 20px;
}

.logo {
  margin-right: 6px;
}

.title {
  margin: 0px;
}

.menu {
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
