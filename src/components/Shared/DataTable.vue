<script setup lang="ts">
import type { DataTableColumn } from '@/types'


interface DataTableProps {
    columns: DataTableColumn[]
    data: Record<string, string | number | boolean>[]
}

const props = defineProps<DataTableProps>()
</script>

<template>
    <div class="overflow-x-auto rounded-lg shadow">
        <table class="w-full border-collapse bg-white">
            <thead>
                <tr class="bg-gray-100">
                    <th v-for="column in props.columns" :key="column.key"
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
                    <td v-for="column in props.columns" :key="column.key"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <slot :name="column.slot" :row="row" :value="row[column.key]">
                            {{ row[column.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="props.data.length === 0" class="text-center py-8 text-gray-500 bg-white">
            No data available
        </div>
        <!-- <div v-else class="flex justify-end p-4 bg-gray-50 border-t border-gray-200">
            <slot name="actions" />
        </div> -->
    </div>
</template>

<style scoped>
table {
    border-spacing: 0;
}
</style>
