<script setup lang="ts">
import { RouterView } from 'vue-router'
const locale = localStorage.getItem('locale') || 'ar';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>

<template>
    <div :dir="locale == 'ar' ? 'rtl' : 'ltr'">
        <RouterView />
    </div>
    <VueQueryDevtools />
</template>

<style scoped></style>
