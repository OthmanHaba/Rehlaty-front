<script setup lang="ts">
import type { DataTableColumn } from '@/types'
import { ref, watch, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface DataTableProps {
    columns: DataTableColumn[]
    //TODO make the input add generac
    data: Record<string, string | number | boolean>[]
    loading?: boolean
    hasSearch?: boolean
    hasFilter?: boolean
    appends?: { key: string; label: string; slot?: string }[]
}

const props = withDefaults(defineProps<DataTableProps>(), {
    hasSearch: false,
    hasFilter: false,
})

const emit = defineEmits<{
    (e: 'search', value: string): void
    (e: 'filter', filters: Record<string, string | number | boolean>): void
}>()

const searchQuery = ref('')
const activeFilters = ref<Record<string, string | number | boolean>>({})
const debounceTimeout = ref<number | null>(null)

// Debounced search function
const handleSearch = (value: string) => {
    if (debounceTimeout.value) {
        clearTimeout(debounceTimeout.value)
    }

    debounceTimeout.value = setTimeout(() => {
        emit('search', value)
    }, 300)
}

// Handle filter changes
const handleFilterChange = (key: string, value: string | number | boolean) => {
    activeFilters.value[key] = value
    emit('filter', activeFilters.value)
}

// Clear search
const clearSearch = () => {
    searchQuery.value = ''
    emit('search', '')
}

// Watch for search query changes
watch(searchQuery, (newValue) => {
    handleSearch(newValue)
})

const columns = computed(() => {
    return props.columns.concat(props.appends || [])
})
</script>

<template>
    <div class="space-y-4">
        <!-- Search and Filter Controls -->
        <div class="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow">
            <!-- Search Input -->
            <div class="flex-1 relative" v-if="hasSearch">
                <div class="relative w-1/3">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon icon="solar:card-search-bold" class="h-5 w-5 text-gray-400" />
                    </div>
                    <input v-model="searchQuery" type="text" :placeholder="$t('common.search')"
                        class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                    <button v-if="searchQuery" @click="clearSearch"
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                        <Icon icon="solar:close-bold" class="h-5 w-5" />
                    </button>
                </div>
            </div>

            <!-- Filter Controls -->
            <div class="flex items-center gap-2" v-if="hasFilter">
                <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
                    <Icon icon="solar:filter-bold" class="h-5 w-5 text-gray-500" />
                    <span class="text-sm text-gray-600">{{ $t('common.filters') }}</span>
                </div>
                <slot name="filters" :handle-filter-change="handleFilterChange" :active-filters="activeFilters">
                    <!-- Default filter slot content -->
                    <div class="flex items-center gap-2">
                        <slot name="default-filters" />
                    </div>
                </slot>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="props.loading" class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto rounded-lg shadow">
            <table class="w-full border-collapse bg-white">
                <thead>
                    <tr class="bg-gray-100">
                        <th v-for="column in columns" :key="column.key"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                            <div class="flex items-center gap-2">
                                {{ column.label }}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(row, index) in props.data" :key="index"
                        class="hover:bg-gray-50 transition-colors duration-200">
                        <td v-for="column in columns" :key="column.key"
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <slot :name="column.slot" :row="row" :value="row[column.key]">
                                {{ row[column.key] }}
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="props.data.length === 0" class="text-center py-12 bg-white">
                <div class="flex flex-col items-center justify-center space-y-4">
                    <Icon icon="solar:database-bold" class="h-16 w-16 text-gray-300" />
                    <h3 class="text-lg font-medium text-gray-900">{{ $t('common.noData') }}</h3>
                    <p class="text-sm text-gray-500">{{ $t('common.noDataDescription') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
table {
    border-spacing: 0;
}
</style>
