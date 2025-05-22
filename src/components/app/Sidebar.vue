<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()
interface Page {
    icon: string | null
    name: string
    link?: string
    title: string
    nested?: boolean
    children?: Page[] | Page
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
    {
        icon: 'mingcute:group-3-line',
        name: 'groups',
        link: '/groups',
        title: t('app.pages.groups'),
    },
    {
        icon: 'mdi:shield',
        name: 'Roles',
        link: '/roles',
        title: t('app.pages.roles'),
    },
    {
        icon: 'tabler:logs',
        name: 'activities',
        link: '/activities',
        title: t('app.pages.activities'),
    },
    {
        icon: 'mdi:cog',
        name: 'Settings',
        title: t('app.pages.settings'),
        children: [
            {
                icon: 'mdi:account-cog',
                name: 'Profile',
                link: '/settings/profile',
                title: t('app.pages.profile'),
            },
            {
                icon: 'mdi:shield-account',
                name: 'Security',
                link: '/settings/security',
                title: t('app.pages.security'),
            }
        ]
    }
]

const router = useRouter();
const route = useRoute();
const expandedItems = ref<Set<string>>(new Set());

const toggleExpand = (pageName: string) => {
    if (expandedItems.value.has(pageName)) {
        expandedItems.value.delete(pageName);
    } else {
        expandedItems.value.add(pageName);
    }
};

const goTo = (link: string | undefined) => {
    if (link) router.push(link);
};

function isRouteSelected(buttonPath: string | undefined): boolean {
    if (!buttonPath) return false;
    const normalize = (path: string) => path.replace(/\/+$/, '');

    const current = normalize(route.path);
    const button = normalize(buttonPath);

    if (button === '' || button === '/') {
        return current === '';
    }

    return current === button || current.startsWith(button + '/');
}

const isExpanded = (pageName: string): boolean => {
    return expandedItems.value.has(pageName);
};
</script>

<template>
    <aside class="w-64 bg-white h-screen shadow-md flex flex-col border-l border-gray-200 border-solid ">
        <div class="p-6 font-bold text-xl flex flex-row-reverse items-center justify-between gap-2">
            <img src="@/assets/appLogo.svg" alt="logo" class="w-10 h-10" />
            {{ $t('app.name') }}
        </div>
        <nav class="flex-1 px-4 flex flex-col justify-between">
            <ul class="space-y-2 mt-4">
                <li v-for="page in pages.filter(p => p.name !== 'Settings')" :key="page.name">
                    <button
                        class="flex items-center w-full px-4 py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-gray-700 gap-3 hover:text-primary group"
                        :class="{ 'bg-primary/5 text-primary border-l-4 border-primary': isRouteSelected(page.link) }"
                        @click="goTo(page.link)">
                        <Icon v-if="page.icon" :icon="page.icon" class="w-5 h-5" />
                        <span class="font-medium">{{ page.title }}</span>
                    </button>
                </li>
            </ul>

            <!-- Settings Section at Bottom -->
            <div class="mt-auto pt-4 border-t border-gray-200">
                <div v-for="page in pages.filter(p => p.name === 'Settings')" :key="page.name">
                    <button
                        class="flex items-center w-full px-4 py-2.5 rounded-lg hover:bg-primary/10 transition-colors text-gray-700 gap-3 hover:text-primary justify-between group mb-1"
                        :class="{ 'bg-primary/5 text-primary': isExpanded(page.name) }"
                        @click="toggleExpand(page.name)">
                        <div class="flex items-center gap-3">
                            <Icon v-if="page.icon" :icon="page.icon" class="w-5 h-5" />
                            <span class="font-medium">{{ page.title }}</span>
                        </div>
                        <Icon :icon="isExpanded(page.name) ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                            class="w-5 h-5 transition-transform" :class="{ 'rotate-180': !isExpanded(page.name) }" />
                    </button>
                    <!-- Settings Submenu -->
                    <div v-if="page.children && isExpanded(page.name)" class="space-y-1 ml-4">
                        <button v-for="child in (Array.isArray(page.children) ? page.children : [page.children])"
                            :key="child.name"
                            class="flex items-center w-full px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors text-gray-600 gap-3 hover:text-primary group"
                            :class="{ 'bg-primary/5 text-primary border-l-4 border-primary': isRouteSelected(child.link) }"
                            @click="goTo(child.link)">
                            <Icon v-if="child.icon" :icon="child.icon" class="w-4 h-4" />
                            <span class="font-medium text-sm">{{ child.title }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </aside>
</template>
