<script setup lang="ts">
import DataTable from '@/components/Shared/DataTable.vue'
import { onMounted, ref } from 'vue'
import { ActivityRepository } from '@/lib/repsitories/Activity.ts'
import type { Activity, DataTableColumn } from '@/types'

const columns = ref<DataTableColumn[]>()
const loading = ref<boolean>(false)
const activities = ref<Activity[]>();
onMounted(async () => {

    loading.value = true;

    const response = await ActivityRepository.fetchAll();
    console.log(response.meta);

    activities.value = response.data;
    columns.value = response.meta.columns;

    loading.value = false;

})

</script>

<template>

    <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
        <header class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold text-contrast">
                {{ $t('common.activities')}}
            </h1>


        </header>
    </div>

    <div class="mt-4 border p-2 border-primary/10  shadow-xs bg-white dark:bg-dark-700">

        <DataTable v-if="columns && activities" :columns="columns" :data="activities" :loading="false"  >
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
                        {{ row.causer.name }}
                    </span>
                </div>
            </template>

        </DataTable>

        <div v-else>
            <p class="text-center text-sm text-contrast/70">
                {{ $t('common.noData') }}
            </p>
        </div>
    </div>
</template>
