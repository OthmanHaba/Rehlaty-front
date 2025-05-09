<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Breadcrumb from '@/components/app/Breadcrumb.vue'
import { useUserStore } from '@/stores/user'
import DynamicMenu from '@/components/Shared/DynamicMenu.vue'
import Button from '@/components/Shared/Button.vue'
const userStore = useUserStore()
const user = userStore.user


const logout = () => {
    userStore.logout()
}

</script>

<template>
    <div class="flex items-center justify-between px-6 py-4 bg-white shadow-sm">

        <Breadcrumb />

        <div class="flex items-center gap-4">

            <!-- Search -->
            <div class="relative">
                <input type="text" placeholder="Search..."
                    class="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                <Icon icon="mdi-light:magnify" class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <!-- Notifications -->
            <button class="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
                <Icon icon="ic:baseline-notifications" class="w-6 h-6" />
                <span class="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
            </button>

            <!-- User Menu -->
            <div class="flex items-center gap-3">
                <div class="text-right">
                    <p class="text-sm font-medium text-contrast">{{ user?.name }}</p>
                    <p class="text-xs text-gray-500">{{ user?.role ?? 'admin' }}</p>
                </div>
                <DynamicMenu>
                    <template #trigger>
                        <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <Icon icon="heroicons:user-circle" class="w-8 h-8 text-primary" />
                        </button>
                    </template>

                    <template #content>
                        <div class="pt-2">
                            <Button full-width variant="danger" @click="logout"
                                icon="heroicons:arrow-right-on-rectangle" label="Logout" />
                        </div>
                    </template>
                </DynamicMenu>
            </div>
        </div>
    </div>
</template>