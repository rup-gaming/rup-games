<template>
  <div class="auth-view">
    <rup-sign-in-form></rup-sign-in-form>
  </div>
</template>

<script setup lang="ts">
import { RupSignInForm } from "../components";
</script>

<style scoped>
.auth-view {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
