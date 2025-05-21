<script setup lang="ts">
import DataTable from '@/components/Shared/DataTable.vue'
import { ref, onMounted, computed } from 'vue'
import type { Group } from '@/types'
import { GroupRepository } from '@/lib/repsitories/Group'
import type { DataTableColumn } from '@/types'
import Modal from '@/components/Shared/Modal.vue'
import Button from '@/components/Shared/Button.vue'
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import DropDown from '@/components/Shared/DropDown.vue'
import { useValidationStore } from '@/composables/useValidationErrors'

const columns = ref<DataTableColumn[]>();
const groups = ref<Group[]>([])
const title = ref<string>('')
const description = ref<string>('')


onMounted(async () => {

    await GroupRepository.fetchAll()
        .then(
            res => {
                groups.value = res.data;
                columns.value = res.meta.columns;
                title.value = res.meta.title;
                description.value = res.meta.description;
            }
        ).catch(e => {
            console.error('Error fetching groups:', e)
        })
})

const handleSearch = async (value: string) => {
    const response = await GroupRepository.fetchAll({
        search: value,
    })

    groups.value = response.data;
    columns.value = response.meta.columns;
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

    <div class="mt-4 border p-2 border-primary/10  shadow-xs bg-white dark:bg-dark-700">
        <DataTable v-if="columns && groups" :columns="columns" :data="groups" :loading="false" has-search
                   @search="handleSearch" >
            <template #role="{ row }">
                <span class="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                    {{ row.role?.name }}
                </span>
            </template>

            <template #actions="{ row }">
                <router-link :to="`/groups/edit/${row.id}`">
                    <Button icon="mdi:pencil" variant="primary" :label="$t('common.edit')" />
                </router-link>
            </template>

        </DataTable>

        <div v-else>
            <p class="text-center text-sm text-contrast/70">
                {{ $t('common.noData') }}
            </p>
        </div>
    </div>


</template>
