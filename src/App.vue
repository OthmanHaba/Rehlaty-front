<script setup lang="ts">
import { RouterView } from 'vue-router'
const locale = localStorage.getItem('locale') || 'ar';

</script>

<template>
    <div :dir="locale == 'ar' ? 'rtl' : 'ltr'">
        <RouterView />
    </div>
</template>

<style scoped></style>
