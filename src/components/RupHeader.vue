<template>
  <n-layout-header bordered>
    <div class="logo-title">
      <n-icon size="30" class="logo">
        <diamond-sharp />
      </n-icon>
      <n-h3 class="title">Rup Games</n-h3>
    </div>
    <div
      class="links"
      v-show="store.windowWidth !== 'xs' && store.windowWidth !== 'sm'"
    >
      <n-menu
        :value="`${currentRoute.name}`"
        mode="horizontal"
        :options="menuOptions"
      />
    </div>
    <n-button
      ghost
      @click="disableDarkMode(true)"
      type="primary"
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
      @click="disableDarkMode(false)"
      type="primary"
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
      v-show="store.windowWidth === 'xs' || store.windowWidth === 'sm'"
    >
      <menu-sharp />
    </n-icon>
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

const menuOptions: MenuOption[] = [
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
.logo-title {
  min-width: 240px;
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
