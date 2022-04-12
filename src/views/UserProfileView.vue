<template>
  <form @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="store.user.email" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="website" v-model="website" />
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

const message = useMessage();
const store = useStore();
const router = useRouter();

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_url = ref("");

async function getProfile() {
  try {
    loading.value = true;
    const user: any = supabase.auth.user();
    store.setUser({
      id: user.id,
      username: user.username || "",
      email: user.email,
      website: user.website || "",
      avatar_url: user.avatar_url || "",
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", store.user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      website.value = data.website;
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
    store.setUser({
      id: user.id,
      username: user.username || "",
      email: user.email,
      website: user.website || "",
      avatar_url: user.avatar_url || "",
      created_at: user.created_at,
      updated_at: user.updated_at,
    });

    const updates = {
      id: store.user.id,
      username: username.value,
      website: website.value,
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

onMounted(() => {
  getProfile();
});
</script>
