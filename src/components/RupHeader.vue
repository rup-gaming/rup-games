<template>
  <n-layout-header bordered>
    <div class="side-container-left">
      <router-link to="/" style="text-decoration: none; height: 30px">
        <n-button text :focusable="false">
          <n-icon size="30" class="logo">
            <diamond-sharp />
          </n-icon>
          <n-h3 class="title">Rup Games</n-h3>
        </n-button>
      </router-link>
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
      <div
        class="side-container-right-desktop"
        v-show="store.windowWidth !== 'xs' && store.windowWidth !== 'sm'"
      >
        <n-button
          class="side-container-item"
          text
          tag="a"
          href="https://github.com/waylonturbes/square-game"
          target="_blank"
          :focusable="false"
        >
          GitHub
        </n-button>

        <n-button
          class="side-container-item"
          text
          style="margin-left: 0px"
          @click="disableDarkMode(store.darkMode === true ? false : true)"
          type="default"
        >
          <template #icon>
            <n-icon size="20">
              <light-mode-outlined v-if="store.darkMode === false" />
              <dark-mode-outlined v-else />
            </n-icon>
          </template>
          {{ store.darkMode === true ? "Dark" : "Light" }}
        </n-button>

        <div style="padding-left: 20px; display: flex; align-items: center">
          <n-dropdown
            v-if="store.user.isSignedIn"
            trigger="click"
            :options="profileOptions"
            @select="handleProfileSelect"
          >
            <n-button style="padding: 0px; height: 40px">
              <n-avatar size="large" :src="store.user.avatar_url"> </n-avatar>
            </n-button>
          </n-dropdown>

          <n-button v-else :focusable="false" @click.prevent="goToSignIn">
            Sign In
          </n-button>
        </div>
      </div>

      <n-button
        text
        :focusable="false"
        @click="activateDrawer"
        v-show="store.windowWidth === 'xs' || store.windowWidth === 'sm'"
      >
        <n-icon size="30">
          <menu-sharp />
        </n-icon>
      </n-button>
    </div>

    <n-drawer v-model:show="showDrawer" :width="240" placement="right">
      <n-drawer-content>
        <n-menu
          :value="`${currentRoute.name}`"
          mode="vertical"
          :options="appNavigation"
        />
        <div class="drawer-theme-btn-container">
          <n-button
            ghost
            class="drawer-theme-btn"
            @click="disableDarkMode(true)"
            type="default"
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
            class="drawer-theme-btn"
            @click="disableDarkMode(false)"
            type="default"
            v-else
          >
            <template #icon>
              <n-icon size="20">
                <light-mode-outlined />
              </n-icon>
            </template>
            Light
          </n-button>
        </div>
      </n-drawer-content>
    </n-drawer>
  </n-layout-header>
</template>

<script setup lang="ts">
import { defineComponent, h, ref, onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { supabase } from "../supabase";
import {
  NLayoutHeader,
  NIcon,
  NH3,
  NMenu,
  NButton,
  NDrawer,
  NDrawerContent,
  NAvatar,
  useMessage,
  NDropdown,
} from "naive-ui";
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
const router = useRouter();
const message = useMessage();

const showDrawer = ref(false);
const src = ref("");

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(store.user.avatar_url);
    if (error) throw error;
    const copyOfData: any = data;
    src.value = URL.createObjectURL(copyOfData);
  } catch (error: any) {
    console.error("Error downloading image: ", error.message);
  }
};

const disableDarkMode = (isDark: boolean) => {
  store.setDarkMode(isDark);
};

const activateDrawer = () => {
  showDrawer.value = !showDrawer.value;
};

const handleProfileSelect = async (key: string | number) => {
  if (String(key) === "profile") {
    router.push("/profile");
  } else {
    let { error } = await supabase.auth.signOut();
    if (error) {
      message.error(
        "Failed to sign out! If issue persists, delete your token in localStorage"
      );
    }
    router.push("/");
  }
};

const goToSignIn = () => {
  router.push("/signin");
};

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

const profileOptions = [
  {
    label: "Profile",
    key: "profile",
  },
  {
    label: "Sign Out",
    key: "sign-out",
  },
];

// const copyAvatarURL: any = store.user.avatar_url;

onMounted(() => {
  if (store.user.isSignedIn) {
    downloadImage();
  }
});

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
  align-items: center;
}
.side-container-right {
  display: flex;
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
  position: fixed;
}
.side-container-right-desktop {
  display: flex;
  align-items: center;
}
.drawer-theme-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.drawer-theme-btn {
  width: 176px;
  height: 42px;
}
</style>
