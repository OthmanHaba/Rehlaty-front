<script setup lang="ts">
import Sidebar from '@/components/app/Sidebar.vue'
import Header from '@/components/app/Header.vue'
</script>

<template>
    <div class="flex min-h-screen">
        <Sidebar />
        <div class="flex-1 bg-white ">
            <Header />

            <div class="p-4">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
