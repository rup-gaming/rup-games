<template>
  <form @submit.prevent="updateProfile">
    <profile-avatar
      v-model:path="avatar_url"
      @upload="updateProfile"
    ></profile-avatar>

    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="store.user.email" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>

    <div>
      <input
        type="submit"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabase } from "../supabase";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { useStore } from "../store/store";
import { ProfileAvatar } from "../components";

const message = useMessage();
const store = useStore();
const router = useRouter();

const loading = ref(true);
const username = ref("");
const avatar_url = ref("");

async function getProfile() {
  try {
    loading.value = true;
    const user: any = supabase.auth.user();
    store.setUser(user);

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, avatar_url`)
      .eq("id", store.user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      avatar_url.value = data.avatar_url;
    }
  } catch (error: any) {
    message.error(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const user: any = supabase.auth.user();
    store.setUser(user);

    const updates = {
      id: store.user.id,
      username: username.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });

    if (error) throw error;
    message.success("Successfully Updated Profile!");
  } catch (error: any) {
    message.error(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
    message.success("Successfully Signed Out!");
    router.push("/");
  } catch (error: any) {
    message.error(error.message);
  } finally {
    loading.value = false;
  }
}

defineExpose({
  avatar_url,
});

onMounted(() => {
  getProfile();
});
</script>
