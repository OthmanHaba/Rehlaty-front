<script lang="ts" setup>
import { RoleRepository } from '@/lib/repsitories/Role';
import type { DataTableColumn } from '@/types';
import type { Role } from '@/types/User';
import { onMounted, ref } from 'vue';
import Button from '@/components/Shared/Button.vue';
import Modal from '@/components/Shared/Modal.vue';
import FormWrapper from '@/components/Shared/From/FormWrapper.vue';
import FormInput from '@/components/Shared/From/FormInput.vue';
import DataTable from '@/components/Shared/DataTable.vue';

const title = ref<string>('')
const description = ref<string>('')
const columns = ref<DataTableColumn[]>()
const roles = ref<Role[]>()
const isModalOpen = ref<boolean>(false)

const formData = ref<Role>({
    id: 0,
    name: '',
    permissions: [],
})

const handleSearch = async (value: string) => {
    const response = await RoleRepository.getRoles(value)
    roles.value = response.data
    columns.value = response.meta.columns
    title.value = response.meta.title
    description.value = response.meta.description
}

onMounted(async () => {
    const response = await RoleRepository.getRoles()

    console.log(response.data);

    roles.value = response.data
    columns.value = response.meta.columns
    console.log(response.meta);
    title.value = response.meta.title
    description.value = response.meta.description
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

            <div class="flex justify-end">
                <Button @click="isModalOpen = true" icon="mdi:plus" variant="primary" :label="$t('common.add')" />

            </div>

            <Modal v-model="isModalOpen" title="My Modal" @close="isModalOpen = false">
                <FormWrapper>
                    <FormInput label="Name" v-model="formData.name" />

                </FormWrapper>
            </Modal>
        </header>
    </div>

    <div class="mt-4 border p-2 border-primary/10  shadow-xs bg-white dark:bg-dark-700">
        <DataTable v-if="columns && roles" :columns="columns" :data="roles" :loading="false" has-search
            @search="handleSearch" />

        <div v-else>
            <p class="text-center text-sm text-contrast/70">
                {{ $t('common.noData') }}
            </p>
        </div>
    </div>
</template>