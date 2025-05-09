<script setup lang="ts">
import DataTable from '@/components/Shared/DataTable.vue'
import { ref, onMounted } from 'vue'
import type { User } from '@/types/User'
import { UserRepository } from '@/lib/repsitories/User'
import type { DataTableColumn } from '@/types'

const handleEdit = (row: any) => {
    console.log(row)
}

const handleDelete = (row: any) => {
    console.log(row)
}

const columns = ref<DataTableColumn[]>();
const users = ref<User[]>([])
const title = ref<string>('')
const description = ref<string>('')

onMounted(async () => {
    const response = await UserRepository.getUsers()

    users.value = response.data;
    columns.value = response.meta.columns;
    title.value = response.meta.title;
    description.value = response.meta.description;
})
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
        </header>
    </div>

    <div class="mt-4 border p-2 border-primary/10  shadow-xs bg-white dark:bg-dark-700">
        <DataTable v-if="columns && users" :columns="columns" :data="users" />
        <div v-else>
            <p>No data</p>
        </div>
    </div>


</template>
