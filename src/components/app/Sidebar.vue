<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
interface Page {
    icon: string | null
    name: string
    link: string
    title: string
}
// here will add the pages of the application
const pages: Page[] = [
    {
        icon: 'mdi-light:home',
        name: 'Dashboard',
        link: '/',
        title: t('app.pages.dashboard'),
    },
    {
        icon: 'mdi:users',
        name: 'Users',
        link: '/users',
        title: t('app.pages.users'),
    },
]

const router = useRouter()
const goTo = (link: string) => router.push(link)
</script>

<template>
    <aside class="w-64 bg-white h-screen shadow-md flex flex-col border-l border-gray-200 border-solid">
        <div class="p-6 font-bold text-xl flex flex-row-reverse items-center justify-between gap-2">
            <img src="@/assets/appLogo.svg" alt="logo" class="w-10 h-10" />
            {{ $t('app.name') }}
        </div>
        <nav class="flex-1 px-4">
            <ul class="space-y-1 mt-4">
                <li v-for="page in pages" :key="page.name">
                    <div class="border border-gray-200 border-solid rounded-md">
                        <button
                            class="flex items-centerborder-solid w-full px-3 py-2 rounded-md hover:bg-primary transition-colors text-gray-700 gap-3 hover:text-white"
                            :class="{ 'border-l-4 border-primary ': page.link === $route.path }"
                            @click="goTo(page.link)">
                            <Icon v-if="page.icon" :icon="page.icon" class="w-5 h-5" />
                            <span>{{ page.title }}</span>
                        </button>
                    </div>
                </li>
            </ul>
        </nav>
    </aside>
</template>
