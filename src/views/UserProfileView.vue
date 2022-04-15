<template>
  <div class="profile-container">
    <h2>Welcome {{ store.user.username || username }}</h2>
    <n-form
      class="profile-form"
      :style="store.windowWidth === 'xs' ? 'width: 260px;' : 'width: 320px;'"
      size="large"
    >
      <profile-avatar
        v-model:path="avatar_url"
        @upload="updateProfile"
      ></profile-avatar>

      <div class="form-input-group">
        <n-form-item label="Email">
          <n-input v-model:value="store.user.email" :disabled="true" />
        </n-form-item>

        <n-form-item path="username" label="Username" placeholder="">
          <n-input v-model:value="username" @keydown.enter.prevent />
        </n-form-item>
      </div>

      <n-button
        size="large"
        type="primary"
        :disabled="loading"
        :loading="loading"
        @click.prevent="showModal = true"
      >
        {{ loading ? "Updating" : "Update Profile" }}
      </n-button>

      <n-modal
        v-model:show="showModal"
        :mask-closable="false"
        preset="dialog"
        title="Confirmation"
        content="
        Are you sure that you want to update your profile?
        "
        positive-text="Yes"
        negative-text="No"
        @positive-click="updateProfile"
        @negative-click="onNegativeClick"
      />
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabase } from "../supabase";
import {
  useMessage,
  NForm,
  NFormItem,
  NInput,
  NButton,
  NModal,
} from "naive-ui";
import { useStore } from "../store/store";
import { ProfileAvatar } from "../components";

const message = useMessage();
const store = useStore();
const showModal = ref(false);
const loading = ref(true);
const username = ref("");
const avatar_url = ref("");

const onNegativeClick = () => {
  showModal.value = false;
};

async function getProfile() {
  try {
    loading.value = true;
    const user: any = supabase.auth.user();
    store.setUser({ ...store.user, ...user });

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
    message.success("Successfully updated profile!");
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
.profile-container {
  display: flex;
  flex: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.profile-form {
  display: flex;
  flex-flow: column wrap;
  align-self: center;
  justify-self: center;
  justify-content: center;
  max-width: 500px;
}

.form-input-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 24px;
}

.n-form-item {
  width: 100%;
}
</style>
