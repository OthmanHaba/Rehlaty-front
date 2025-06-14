<script setup lang="ts">
import DataTable from '@/components/Shared/DataTable.vue'
import { ref, computed } from 'vue'
import { useActivityQuery } from '@/lib/queries/activity'

const search = ref<string>('')

const { data, isLoading, error, refetch } = useActivityQuery(search)

const activities = computed(() => data.value?.data || [])
const columns = computed(() => data.value?.meta?.columns || [])
const errorMessage = computed(() => {
    if (!error.value) return ''
    return error.value.message || 'Unknown error occurred'
})

const handleRefetch = () => {
    refetch()
}
</script>

<template>
    <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
        <header class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold text-contrast">
                {{ $t('common.activities') }}
            </h1>
        </header>
    </div>

    <div class="mt-4 border p-2 border-primary/10  shadow-xs bg-white dark:bg-dark-700">
        <div v-if="error"
            class="p-4 mb-4 bg-red-100 border border-red-200 rounded-md dark:bg-red-900/20 dark:border-red-800">
            <p class="text-red-700 dark:text-red-400">{{ $t('common.error_occurred') }}</p>
            <p v-if="errorMessage" class="mt-1 text-sm text-red-600 dark:text-red-300">{{ errorMessage }}</p>
            <button @click="handleRefetch"
                class="mt-2 px-3 py-1 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                {{ $t('common.try_again') }}
            </button>
        </div>
        <DataTable :columns="columns" :data="activities as any[]" :loading="isLoading">
            <template #description="{ row }">
                <div class="flex gap-2">
                    <span class="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                        {{ row.description }}
                    </span>
                </div>
            </template>
            <template #causer="{ row }">
                <div class="flex gap-2">
                    <span class="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                        {{ row.causer?.name || '' }}
                    </span>
                </div>
            </template>
        </DataTable>

    </div>
</template>
