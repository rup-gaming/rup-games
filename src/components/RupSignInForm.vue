<template>
  <div>
    <n-form
      ref="signInForm"
      :model="formValues"
      inline
      :rules="rules"
      size="large"
      class="sign-in-form"
    >
      <n-form-item label="Email" path="email">
        <n-input v-model:value="formValues.email" placeholder="Input Email" />
      </n-form-item>

      <n-button
        type="primary"
        @click.prevent="showModal = true"
        :loading="loading"
        :disabled="loading"
      >
        Send Login Link
      </n-button>

      <n-modal
        v-model:show="showModal"
        :mask-closable="false"
        preset="dialog"
        title="Confirmation"
        content="
        If confirmed, an email will be sent to the provided address to sign in.
        If this is your first time, clicking the 'Sign In' button in the email
        will register you as a new user.
        "
        positive-text="Confirm"
        negative-text="Cancel"
        @positive-click="handleLogin"
        @negative-click="onNegativeClick"
      />
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NForm,
  FormInst,
  NFormItem,
  NInput,
  NButton,
  NModal,
  useMessage,
} from "naive-ui";
import { supabase } from "../supabase";

const loading = ref(false);
const message = useMessage();
const showModal = ref(false);
const signInForm = ref<FormInst | null>(null);

const formValues = ref({
  email: "",
});

const onNegativeClick = () => {
  showModal.value = false;
};

const rules = ref({
  email: {
    required: true,
    message: "Please input your email",
    trigger: ["input", "blur"],
  },
});

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signIn({
      email: formValues.value.email,
    });
    if (error) throw error;
    message.success("Check your email for the sign-in link!");
  } catch (error: any) {
    message.error(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.sign-in-form {
  flex-direction: column;
}
</style>
