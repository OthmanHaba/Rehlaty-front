<script setup lang="ts">
import DataTable from '@/components/Shared/DataTable.vue'
import { ref, computed } from 'vue'
import { GroupRepository } from '@/lib/repsitories/Group'
import Button from '@/components/Shared/Button.vue'
import { useI18n } from 'vue-i18n'
import { useQuery } from '@tanstack/vue-query'
import Pagination from '@/components/Shared/Pagination.vue'
import type { Role } from '@/types/User'
import type { Meta } from '@/types'

// Define interface for extended Group with role
interface GroupWithRole {
    id?: number
    name: string
    description?: string
    customers?: unknown[]
    created_at?: string
    updated_at?: string
    role?: Role | string
    [key: string]: unknown
}

// Extend the Meta interface to include pagination
interface ExtendedMeta extends Meta {
    pagination?: LaravelPaginationData
}

interface LaravelPaginationData {
    current_page: number
    data: Record<string, unknown>[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: {
        url: string | null
        label: string
        active: boolean
    }[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

const search = ref<string>('')
const { t } = useI18n()
const page = ref(1)
const { data, isLoading, refetch } = useQuery({
    queryKey: ['groups', search],
    queryFn: () => GroupRepository.fetchAll({
        search: search.value,
        per_page: 10,
        page: page.value
    })
})

const groups = computed(() => (data.value?.data || []) as GroupWithRole[])
const columns = computed(() => data.value?.meta?.columns || [])
const title = computed(() => data.value?.meta?.title || '')
const description = computed(() => data.value?.meta?.description || '')
const appends = [
    {
        key: 'actions',
        label: t('common.actions'),
        slot: 'actions',
    },
]

const handleSearch = (value: string) => {
    search.value = value
    refetch()
}

const handlePageChange = (_page: number) => {
    page.value = _page
    refetch()
}
</script>

<template>
    <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
        <header class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold text-contrast">
                {{ title }}
            </h1>
            <p class="text-sm text-contrast/70">
                {{ description }}
            </p>

            <div class="flex justify-end">
                <router-link to="groups/create">
                    <Button icon="mdi:plus" variant="primary" :label="$t('common.add')" />
                </router-link>
            </div>
        </header>
    </div>

    <div class="mt-4 border p-2 border-primary/10 shadow-xs bg-white dark:bg-dark-700">
        <DataTable :columns="columns" :data="groups" :loading="isLoading" has-search @search="handleSearch"
            :appends="appends">

            <template #role="{ row }">
                <span class="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                    {{ typeof row.role === 'object' && row.role ? (row.role as Role).name || '' : row.role || '' }}
                </span>
            </template>

            <template #actions="{ row }">
                <router-link :to="`/groups/edit/${row.id}`">
                    <Button icon="mdi:pencil" variant="primary" :label="$t('common.edit')" />
                </router-link>
            </template>
        </DataTable>

        <Pagination v-if="!isLoading" :pagination="data?.meta" @page-change="handlePageChange" />
    </div>
</template>
