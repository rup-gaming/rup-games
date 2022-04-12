<template>
  <div>
    <n-message-provider :duration="6000" :closable="true">
      <rup-sign-in-form></rup-sign-in-form>
    </n-message-provider>
  </div>
</template>

<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
import { RupSignInForm } from "../components";
</script>
