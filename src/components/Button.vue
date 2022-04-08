<template>
  <button>{{ text }}</button>
</template>

<script setup lang="ts">
// import { ref } from "vue";
const props = defineProps(["text"]);
</script>
