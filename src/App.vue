<template>
    <h1>Square Game</h1>
    <router-link to="/">Home</router-link>
    <router-link to="/play">Play</router-link>
    <router-view></router-view>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>
