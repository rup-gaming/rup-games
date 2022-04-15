<template>
  <n-config-provider
    class="app-wrapper"
    :theme="store.darkMode ? darkTheme : lightTheme"
  >
    <n-message-provider :duration="6000" :closable="true">
      <rup-header> </rup-header>
      <rup-content> </rup-content>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { useStore } from "./store/store";
import { supabase } from "./supabase";
import {
  darkTheme,
  lightTheme,
  NConfigProvider,
  NMessageProvider,
} from "naive-ui";
import { RupHeader, RupContent } from "./components";

const store = useStore();

onresize = store.setWindowWidth;

supabase.auth.onAuthStateChange(async (_, session: any) => {
  const user: any = supabase.auth.user();
  let { data } = await supabase.from("profiles").select("*").single();
  store.setUser({
    ...user,
    ...data,
    isSignedIn: localStorage.getItem("supabase.auth.token") ? true : false,
  });
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(store.user.avatar_url);
    if (error) throw error;
    const copyOfData: any = data;
    store.setUser({
      ...store.user,
      avatar_url: URL.createObjectURL(copyOfData),
    });
  } catch (error: any) {
    console.error("Error downloading image: ", error.message);
  }
});

defineComponent({
  darkTheme,
  lightTheme,
});
</script>

<style scoped>
.app-wrapper {
  height: 100vh;
  display: flex;
  margin: 0px;
  flex-direction: column;
}
</style>
