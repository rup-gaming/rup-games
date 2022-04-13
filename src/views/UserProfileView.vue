<template>
  <n-form class="profile-form">
    <profile-avatar
      v-model:path="avatar_url"
      @upload="updateProfile"
    ></profile-avatar>

    <div>
      <n-form-item label="Email">
        <n-input v-model:value="store.user.email" :disabled="true" />
      </n-form-item>

      <n-form-item path="username" label="Username">
        <n-input v-model:value="username" @keydown.enter.prevent />
      </n-form-item>
    </div>

    <n-form-item>
      <n-button
        :disabled="loading"
        :loading="loading"
        @click.prevent="updateProfile"
      >
        {{ loading ? "Updating" : "Update" }}
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabase } from "../supabase";
import { useMessage, NForm, NFormItem, NInput, NButton } from "naive-ui";
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

defineExpose({
  avatar_url,
});

onMounted(() => {
  getProfile();
});
</script>

<style scoped>
.profile-form {
  display: flex;
  flex-flow: row wrap;
  align-self: center;
  justify-self: center;
  justify-content: center;
}
</style>
