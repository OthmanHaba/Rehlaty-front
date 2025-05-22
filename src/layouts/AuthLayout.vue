<script setup lang="ts">
import Sidebar from '@/components/app/Sidebar.vue'
import Header from '@/components/app/Header.vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
</script>

<template>
    <div class="flex min-h-screen">
        <Sidebar :class="[`fixed h-screen`, locale === 'ar' ? 'right-0' : 'left-0']" />
        <div class="flex-1 flex flex-col" :class="[locale === 'ar' ? 'mr-64' : 'ml-64']">
            <Header :class="[`fixed bg-white z-10`, locale === 'ar' ? 'left-0 right-64' : 'right-0 left-64']" />
            <div class="mt-16 p-4 overflow-y-auto h-[calc(100vh-4rem)]">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
