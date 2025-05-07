<script setup lang="ts">
import { useBreadcrumb } from '@/composables/useBreadcrumb'
import { Icon } from '@iconify/vue';
const { breadcrumbItems, navigateTo } = useBreadcrumb()
</script>

<template>
    <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center">
            <li v-for="(item, index) in breadcrumbItems" :key="item.path" class="inline-flex items-center">
                <template v-if="index !== 0">
                    <Icon icon="mdi:chevron-left" class="w-4 h-4 mx-1 text-gray-400" />
                </template>
                <button @click="navigateTo(item.path)" :class="[
                    'inline-flex items-center text-sm',
                    item.active
                        ? 'font-medium text-primary'
                        : 'text-gray-500 hover:text-primary'
                ]">
                    {{ item.title }}
                </button>
            </li>
        </ol>
    </nav>
</template>
