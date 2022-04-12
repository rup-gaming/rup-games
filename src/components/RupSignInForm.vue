<template>
  <n-form inline :rules="rules" size="large">
    <n-form-item label="Email" path="email">
      <n-input v-model:value="email" placeholder="Input Email" />
    </n-form-item>

    <n-form-item>
      <n-button
        type="primary"
        @click.prevent="handleLogin"
        :loading="loading"
        :disabled="loading"
      >
        Send Login Link
      </n-button>
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NForm, NFormItem, NInput, NButton, useMessage } from "naive-ui";
import { supabase } from "../supabase";

const loading = ref(false);
const email = ref("");
const message = useMessage();

const rules = ref({
  email: {
    required: true,
    message: "Please input your email",
    trigger: "blur",
  },
});

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signIn({ email: email.value });
    if (error) throw error;
    message.success("Check your email for the login link!");
  } catch (error: any) {
    message.error(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};
</script>
