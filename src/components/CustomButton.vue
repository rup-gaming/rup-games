<template>
  <button @click="props.handleClick()">{{ text }}</button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String,
  handleClick: {
    type: Function,
    default() {
      return console.log("Clicked!");
    },
  },
});
</script>
