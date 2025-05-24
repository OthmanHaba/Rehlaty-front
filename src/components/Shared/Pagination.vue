<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'

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

const { locale } = useI18n()

interface PaginationProps {
    pagination: LaravelPaginationData
    maxVisiblePages?: number
}

const props = withDefaults(defineProps<PaginationProps>(), {
    maxVisiblePages: 5
})

const emit = defineEmits<{
    (e: 'page-change', page: number): void
}>()

const changePage = (page: number) => {
    if (page === props.pagination.current_page || page < 1 || page > props.pagination.last_page) {
        return
    }
    emit('page-change', page)
}

const paginationPages = computed(() => {
    const { current_page, last_page } = props.pagination
    const { maxVisiblePages } = props

    if (last_page <= maxVisiblePages) {
        // Show all pages if there are fewer than maxVisiblePages
        return Array.from({ length: last_page }, (_, i) => i + 1)
    }

    // Always show first and last page
    const firstPage = 1
    const lastPage = last_page

    // Calculate range around current page
    let startPage = Math.max(current_page - Math.floor(maxVisiblePages / 2), firstPage)
    let endPage = startPage + maxVisiblePages - 1

    // Adjust if endPage exceeds last_page
    if (endPage > lastPage) {
        endPage = lastPage
        startPage = Math.max(endPage - maxVisiblePages + 1, firstPage)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})

const hasPreviousPage = computed(() => props.pagination.current_page > 1)
const hasNextPage = computed(() => props.pagination.current_page < props.pagination.last_page)

const isRTL = () => {
    return locale.value === 'ar'
}
</script>

<template>
    <div v-if="pagination.last_page > 1" class="flex justify-center items-center my-6">
        <div class="flex flex-wrap gap-1 items-center">
            <!-- Previous Page Button -->
            <button @click="changePage(pagination.current_page - 1)" :disabled="!hasPreviousPage" :class="[
                'flex items-center justify-center px-3 py-2 rounded-md border',
                hasPreviousPage
                    ? 'hover:bg-gray-100 cursor-pointer border-gray-300 text-gray-600'
                    : 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
            ]">
                <Icon :icon="isRTL() ? 'solar:arrow-right-linear' : 'solar:arrow-left-linear'" class="h-4 w-4" />
                <span class="hidden sm:inline-block ml-1">{{ $t('pagination.previous') }}</span>
            </button>

            <!-- First Page -->
            <button v-if="pagination.last_page > props.maxVisiblePages && !paginationPages.includes(1)"
                @click="changePage(1)"
                class="flex items-center justify-center px-3 py-2 rounded-md border hover:bg-gray-100 cursor-pointer border-gray-300 text-gray-600">
                1
            </button>

            <!-- Ellipsis if needed -->
            <span v-if="pagination.last_page > props.maxVisiblePages && paginationPages[0] > 2"
                class="px-3 py-2 text-gray-500">
                &hellip;
            </span>

            <!-- Page Numbers -->
            <button v-for="page in paginationPages" :key="page" @click="changePage(page)" :class="[
                'flex items-center justify-center px-3 py-2 rounded-md border',
                page === pagination.current_page
                    ? 'bg-primary text-white border-primary'
                    : 'hover:bg-gray-100 cursor-pointer border-gray-300 text-gray-600'
            ]">
                {{ page }}
            </button>

            <!-- Ellipsis if needed -->
            <span
                v-if="pagination.last_page > props.maxVisiblePages && paginationPages[paginationPages.length - 1] < pagination.last_page - 1"
                class="px-3 py-2 text-gray-500">
                &hellip;
            </span>

            <!-- Last Page -->
            <button
                v-if="pagination.last_page > props.maxVisiblePages && !paginationPages.includes(pagination.last_page)"
                @click="changePage(pagination.last_page)"
                class="flex items-center justify-center px-3 py-2 rounded-md border hover:bg-gray-100 cursor-pointer border-gray-300 text-gray-600">
                {{ pagination.last_page }}
            </button>

            <!-- Next Page Button -->
            <button @click="changePage(pagination.current_page + 1)" :disabled="!hasNextPage" :class="[
                'flex items-center justify-center px-3 py-2 rounded-md border',
                hasNextPage
                    ? 'hover:bg-gray-100 cursor-pointer border-gray-300 text-gray-600'
                    : 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
            ]">
                <span class="hidden sm:inline-block mr-1">{{ $t('pagination.next') }}</span>
                <Icon :icon="isRTL() ? 'solar:arrow-left-linear' : 'solar:arrow-right-linear'" class="h-4 w-4" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.pagination-button {
    transition: all 0.2s ease-in-out;
}
</style>
