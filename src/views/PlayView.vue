<template>
    <p>Count: {{ count }}</p>
    <custom-button text="Increment" :handleClick="handleClick"></custom-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomButton from "../components/CustomButton.vue";

const count = ref(0);
const handleClick = () => (count.value += 1);
</script>
